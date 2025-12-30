import React from 'react';
import { motion } from 'framer-motion';
import { Music, User, Disc, Download, CheckCircle2 } from 'lucide-react';
import { SongDetails, DownloadStatus } from '../types';

interface SongCardProps {
  song: SongDetails;
  status: DownloadStatus;
  onDownload: () => void;
}

const SongCard: React.FC<SongCardProps> = ({ song, status, onDownload }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-[2rem] p-6 md:p-8 w-full max-w-xl shadow-xl shadow-black/[0.08] border border-neutral-200/80 overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row gap-6 md:gap-8">
        <div className="relative rounded-2xl w-full sm:w-36 md:w-40 aspect-square flex-shrink-0 bg-neutral-100 overflow-hidden border border-neutral-200">
          {song.thumbnail ? (
            <img
              src={song.thumbnail}
              alt={song.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-neutral-100">
              <Music className="w-12 h-12 text-neutral-300" />
            </div>
          )}
          {status === DownloadStatus.DOWNLOADING && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-center py-1 text-left">
          <div className="mb-5">
            <h3 className="text-xl md:text-2xl font-bold text-neutral-900 leading-tight mb-2 line-clamp-2">
              {song.title}
            </h3>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-neutral-600">
                <User className="w-4 h-4" strokeWidth={2.5} />
                <span className="text-sm font-medium line-clamp-1">{song.artist}</span>
              </div>
              {song.album && (
                <div className="flex items-center gap-2 text-neutral-400">
                  <Disc className="w-4 h-4" />
                  <span className="text-xs font-medium line-clamp-1">{song.album}</span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={onDownload}
            disabled={status === DownloadStatus.DOWNLOADING || status === DownloadStatus.SUCCESS}
            className={`w-full py-3.5 px-5 rounded-xl flex items-center justify-center gap-2.5 font-bold text-sm transition-colors ${status === DownloadStatus.SUCCESS
                ? 'bg-emerald-500 text-white'
                : 'bg-neutral-900 text-white hover:bg-neutral-800 active:bg-black'
              } disabled:opacity-70`}
          >
            {status === DownloadStatus.DOWNLOADING ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="uppercase tracking-wider text-xs">Memproses...</span>
              </>
            ) : status === DownloadStatus.SUCCESS ? (
              <>
                <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} />
                <span className="uppercase tracking-wider text-xs">Tersimpan</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" strokeWidth={2.5} />
                <span className="uppercase tracking-wider text-xs">Unduh Sekarang</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SongCard;


