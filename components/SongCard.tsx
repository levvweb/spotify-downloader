
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="glass rounded-[2.5rem] p-6 md:p-8 w-full max-w-xl shadow-2xl shadow-black/[0.03] border border-white/50 overflow-hidden relative"
    >
      <div className="flex flex-col sm:flex-row gap-7 md:gap-9">
        <div className="relative group rounded-3xl w-full sm:w-36 md:w-44 aspect-square flex-shrink-0 bg-neutral-50 shadow-inner overflow-hidden border border-neutral-100">
          {song.thumbnail ? (
            <img 
              src={song.thumbnail} 
              alt={song.title} 
              className="w-full h-full object-cover transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100">
              <Music className="w-12 h-12 text-neutral-300" />
            </div>
          )}
          {status === DownloadStatus.DOWNLOADING && (
             <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                <div className="flex gap-1.5 items-center">
                   {[...Array(4)].map((_, i) => (
                     <motion.div 
                        key={i}
                        animate={{ height: [8, 20, 8] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                        className="w-1 bg-emerald-400 rounded-full"
                     />
                   ))}
                </div>
             </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-center py-2 text-left">
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-[900] text-neutral-900 leading-[1.2] mb-3 line-clamp-2 tracking-tight">
              {song.title}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-neutral-600">
                <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500">
                   <User className="w-3.5 h-3.5" strokeWidth={3} />
                </div>
                <span className="text-sm font-bold tracking-wide line-clamp-1">{song.artist}</span>
              </div>
              {song.album && (
                <div className="flex items-center gap-2.5 text-neutral-400">
                   <div className="w-6 h-6 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-300">
                    <Disc className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold tracking-wide line-clamp-1 italic">{song.album}</span>
                </div>
              )}
            </div>
          </div>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onDownload}
            disabled={status === DownloadStatus.DOWNLOADING || status === DownloadStatus.SUCCESS}
            className={`w-full py-4 px-6 rounded-2xl flex items-center justify-center gap-3 font-extrabold text-sm md:text-base transition-all duration-500 shadow-lg ${
              status === DownloadStatus.SUCCESS 
                ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                : 'bg-neutral-900 text-white hover:bg-black shadow-black/10'
            } disabled:opacity-80`}
          >
            {status === DownloadStatus.DOWNLOADING ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="uppercase tracking-widest text-xs">Sedang Memproses...</span>
              </>
            ) : status === DownloadStatus.SUCCESS ? (
              <>
                <CheckCircle2 className="w-5 h-5" strokeWidth={3} />
                <span className="uppercase tracking-widest text-xs">Tersimpan</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" strokeWidth={3} />
                <span className="uppercase tracking-widest text-xs">Unduh Sekarang</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
      
      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />
    </motion.div>
  );
};

export default SongCard;
