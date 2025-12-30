
import { SongDetails, SpotifyAPIResponse } from '../types';

const CORS_PROXIES = [
  (url: string) => `/api/spotdown/song-details?url=${encodeURIComponent(url)}`,
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(`https://spotdown.org/api/song-details?url=${encodeURIComponent(url)}`)}`,
  (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://spotdown.org/api/song-details?url=${encodeURIComponent(url)}`)}`,
];

const DOWNLOAD_PROXIES = [
  () => `/api/spotdown/download`,
  () => `https://corsproxy.io/?${encodeURIComponent('https://spotdown.org/api/download')}`,
];

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 15000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

export const spotifyService = {
  fetchSongDetails: async (url: string): Promise<SongDetails> => {
    let lastError: Error | null = null;

    for (const proxyFn of CORS_PROXIES) {
      try {
        const proxyUrl = proxyFn(url);
        console.log(`Trying proxy: ${proxyUrl.substring(0, 50)}...`);

        const response = await fetchWithTimeout(proxyUrl, {}, 12000);

        if (!response.ok) {
          console.warn(`Proxy returned ${response.status}, trying next...`);
          continue;
        }

        const data: SpotifyAPIResponse = await response.json();

        if (data.songs && data.songs.length > 0) {
          console.log('Successfully fetched song details');
          return data.songs[0];
        }

        console.warn('No songs in response, trying next proxy...');
      } catch (e: any) {
        console.warn(`Proxy failed: ${e.message}`);
        lastError = e;
      }
    }

    throw new Error(
      lastError?.message ||
      'Gagal mengambil detail lagu. Pastikan link Spotify valid dan publik, atau coba lagi dalam beberapa saat.'
    );
  },

  downloadSong: async (songUrl: string, fileName: string): Promise<void> => {
    const body = JSON.stringify({ url: songUrl });
    let lastError: Error | null = null;

    for (const proxyFn of DOWNLOAD_PROXIES) {
      try {
        const proxyUrl = proxyFn();
        console.log(`Trying download via: ${proxyUrl.substring(0, 50)}...`);

        const response = await fetchWithTimeout(proxyUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: body,
        }, 60000);

        if (!response.ok) {
          const errorText = await response.text().catch(() => 'Unknown error');
          console.warn(`Download proxy returned ${response.status}: ${errorText}`);
          continue;
        }

        const blob = await response.blob();

        if (blob.size < 10000) {
          console.warn(`File too small (${blob.size} bytes), might be an error response`);
          continue;
        }

        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        const safeFileName = fileName.replace(/[\\/:*?"<>|]/g, '_');
        a.download = `${safeFileName}.mp3`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(a);

        console.log('Download completed successfully');
        return;
      } catch (error: any) {
        console.error('Download attempt failed:', error);
        lastError = error;
      }
    }

    throw new Error(
      lastError?.message ||
      'Gagal mengunduh lagu. Server mungkin sedang sibuk atau ada pembatasan koneksi. Silakan coba lagi.'
    );
  }
};
