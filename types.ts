
export interface SongDetails {
  title: string;
  artist: string;
  album?: string;
  url: string;
  thumbnail?: string;
}

export interface SpotifyAPIResponse {
  songs: SongDetails[];
}

export enum DownloadStatus {
  IDLE = 'IDLE',
  FETCHING_DETAILS = 'FETCHING_DETAILS',
  DOWNLOADING = 'DOWNLOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
