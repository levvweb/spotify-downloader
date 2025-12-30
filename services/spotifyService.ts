
import { SongDetails, SpotifyAPIResponse } from '../types';

export const spotifyService = {
  fetchSongDetails: async (url: string): Promise<SongDetails> => {
    const targetUrl = `https://spotdown.org/api/song-details?url=${encodeURIComponent(url)}`;
    
    try {
      const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`);
      if (response.ok) {
        const data: SpotifyAPIResponse = await response.json();
        if (data.songs && data.songs.length > 0) return data.songs[0];
      }
    } catch (e) {
      console.warn('AllOrigins failed, trying fallback...', e);
    }

    try {
      const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(targetUrl)}`);
      if (response.ok) {
        const data: SpotifyAPIResponse = await response.json();
        if (data.songs && data.songs.length > 0) return data.songs[0];
      }
    } catch (e) {
      console.error('Fallback proxy failed as well', e);
    }

    throw new Error('Gagal mengambil detail lagu. Pastikan link Spotify valid, publik, atau coba lagi nanti.');
  },

  downloadSong: async (songUrl: string, fileName: string): Promise<void> => {
    const targetUrl = 'https://spotdown.org/api/download';
    const body = JSON.stringify({ url: songUrl });

    try {
      const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(targetUrl)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      if (!response.ok) throw new Error('Server download tidak merespon dengan benar.');

      const blob = await response.blob();
      
      if (blob.size < 2000) {
        throw new Error('File yang diunduh terlalu kecil, kemungkinan terjadi kesalahan pada server.');
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const safeFileName = fileName.replace(/[\\/:*?"<>|]/g, '_');
      a.download = `${safeFileName}.mp3`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error: any) {
      console.error('Download error:', error);
      throw new Error(error.message || 'Gagal mengunduh lagu karena pembatasan koneksi browser atau server sedang sibuk.');
    }
  }
};
