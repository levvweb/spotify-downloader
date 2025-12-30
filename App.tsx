
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { 
  Search, 
  AlertCircle, 
  ChevronRight, 
  Zap,
  ClipboardList,
  AudioLines,
  Image as ImageIcon,
  ShieldCheck,
  Github,
  Instagram
} from 'lucide-react';
import { spotifyService } from './services/spotifyService';
import { SongDetails, DownloadStatus } from './types';
import SongCard from './components/SongCard';

const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const App: React.FC = () => {
  const [url, setUrl] = useState('');
  const [song, setSong] = useState<SongDetails | null>(null);
  const [status, setStatus] = useState<DownloadStatus>(DownloadStatus.IDLE);
  const [error, setError] = useState<string | null>(null);
  
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.from('nav', {
        y: -100,
        opacity: 0,
        duration: 1.2
      })
      .from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.5
      }, '-=0.8')
      .from('.hero-stagger', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.12
      }, '-=1');

      if (underlineRef.current) {
        const length = underlineRef.current.getTotalLength();
        tl.fromTo(underlineRef.current, 
          { strokeDasharray: length, strokeDashoffset: length },
          { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' },
          '-=1.2'
        );
      }

      tl.from('.feature-card', {
        scale: 0.9,
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15
      }, '-=0.8')
      .from('footer', {
        y: 20,
        opacity: 0,
        duration: 1
      }, '-=0.5');

      gsap.to('.bg-glow-1', {
        scale: 1.2,
        opacity: 0.4,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!url.trim()) return;

    const spotifyRegex = /open\.spotify\.com\/(?:[a-zA-Z-]+\/)?(track|album|playlist)\/([a-zA-Z0-9]+)/;
    
    if (!spotifyRegex.test(url)) {
      setError('Harap masukkan URL Spotify yang valid.');
      return;
    }

    try {
      setError(null);
      setSong(null);
      setStatus(DownloadStatus.FETCHING_DETAILS);
      
      const details = await spotifyService.fetchSongDetails(url);
      setSong(details);
      setStatus(DownloadStatus.IDLE);
    } catch (err: any) {
      console.error('App error:', err);
      setError(err.message || 'Terjadi kesalahan saat mengambil data.');
      setStatus(DownloadStatus.ERROR);
    }
  };

  const handleDownload = async () => {
    if (!song) return;
    
    try {
      setStatus(DownloadStatus.DOWNLOADING);
      await spotifyService.downloadSong(song.url, `${song.artist} - ${song.title}`);
      setStatus(DownloadStatus.SUCCESS);
      
      setTimeout(() => setStatus(DownloadStatus.IDLE), 5000);
    } catch (err: any) {
      setError(err.message || 'Unduhan gagal.');
      setStatus(DownloadStatus.ERROR);
    }
  };

  const handlePaste = async () => {
    try {
      if (!navigator.clipboard) {
        throw new Error('Clipboard API tidak didukung');
      }
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.warn('Gagal mengakses clipboard:', err);
      setError('Gagal menempel otomatis. Silakan tempel link secara manual (Ctrl+V).');
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen relative flex flex-col items-center px-4 pt-28 md:pt-44 pb-16 bg-[#fafafa] selection:bg-green-100 selection:text-green-900 overflow-x-hidden">
      <div className="bg-glow-1 absolute top-[-5%] left-[-5%] w-[50%] md:w-[40%] h-[40%] bg-emerald-100/30 blur-[100px] md:blur-[140px] rounded-full pointer-events-none" />
      <div className="bg-glow-2 absolute top-[20%] right-[-10%] w-[40%] md:w-[30%] h-[30%] bg-blue-50/40 blur-[100px] md:blur-[120px] rounded-full pointer-events-none" />

      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl z-50 px-5 py-3.5 glass rounded-2xl border border-neutral-200/60 shadow-lg shadow-black/5 flex justify-between items-center">
        <div className="flex items-center gap-2.5 group cursor-pointer">
          <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
            <img 
              src="https://api.deline.web.id/qLNaaVyPKM.png" 
              alt="SpotDown Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-extrabold text-xl tracking-tight gradient-text">SpotDown</span>
        </div>
        <div className="flex items-center gap-5">
           <a href="https://github.com" target="_blank" className="text-neutral-500 hover:text-neutral-900 transition-colors p-2 hover:scale-110 active:scale-95 transition-transform">
             <Github size={20} />
           </a>
        </div>
      </nav>

      <div className="w-full max-w-4xl text-center z-10 px-2">
        <h1 ref={titleRef} className="text-[2.6rem] sm:text-6xl md:text-[5.5rem] font-[900] mb-8 md:mb-10 tracking-tight text-neutral-900 leading-[1.05]">
          Simpan musikmu, <br className="hidden sm:block" />
          <span className="relative inline-block mt-1 sm:mt-0">
            <span className="gradient-text">tanpa ribet.</span>
            <svg 
              className="absolute -bottom-4 md:-bottom-6 left-0 w-full h-4 md:h-6 text-emerald-500/30" 
              viewBox="0 0 200 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path 
                ref={underlineRef}
                d="M4 15c30-2 70-5 110-5s60 2 82 5" 
                stroke="currentColor" 
                strokeWidth="6" 
                strokeLinecap="round" 
              />
            </svg>
          </span>
        </h1>
        
        <p className="hero-stagger text-[1.05rem] md:text-xl text-neutral-500 mb-12 md:mb-16 max-w-2xl mx-auto font-medium leading-relaxed opacity-80">
          Unduh trek favoritmu langsung ke perangkat dalam kualitas tinggi. 
          Alat yang dirancang untuk kesederhanaan dan kecepatan.
        </p>

        <form onSubmit={handleSearch} className="hero-stagger relative group max-w-2xl mx-auto mb-14 md:mb-20">
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/20 to-green-500/20 rounded-[2rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
          <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-3xl p-2 shadow-2xl shadow-black/[0.04] ring-1 ring-neutral-200 transition-all duration-300 group-focus-within:ring-emerald-500/30 gap-2 sm:gap-0">
            <div className="flex items-center flex-1">
              <div className="pl-5 text-neutral-400 flex-shrink-0">
                <Search size={22} strokeWidth={2.5} />
              </div>
              <input 
                type="text" 
                placeholder="Tempel link lagu Spotify..." 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 px-4 py-4 bg-transparent outline-none text-neutral-800 placeholder:text-neutral-300 font-semibold text-base md:text-lg min-w-0"
              />
              
              <button
                type="button"
                onClick={handlePaste}
                className="p-3 mr-1 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 rounded-2xl transition-all flex-shrink-0 active:scale-90"
              >
                <ClipboardList size={22} />
              </button>
            </div>

            <button 
              type="submit"
              disabled={status === DownloadStatus.FETCHING_DETAILS}
              className="w-full sm:w-auto px-8 py-4 bg-neutral-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2.5 transition-all hover:bg-black hover:shadow-xl hover:shadow-black/10 active:scale-95 disabled:opacity-50"
            >
              {status === DownloadStatus.FETCHING_DETAILS ? (
                <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="text-base">Mulai</span>
                  <ChevronRight size={20} strokeWidth={3} />
                </>
              )}
            </button>
          </div>
          <div className="flex flex-col items-center justify-center mt-5 gap-1.5 opacity-60">
             <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-1.5">
               <ShieldCheck size={12} strokeWidth={3} className="text-emerald-500" />
               Dukung: Track, Album, atau Playlist
             </span>
          </div>
        </form>

        <div className="min-h-[200px] flex flex-col items-center w-full mb-16">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                key="error-box"
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="w-full max-w-md mx-auto p-4.5 bg-red-50/50 border border-red-100 rounded-2xl flex items-center gap-4 text-red-600 mb-8 backdrop-blur-sm"
              >
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle size={20} strokeWidth={2.5} />
                </div>
                <p className="text-sm font-bold text-left leading-tight">{error}</p>
              </motion.div>
            )}

            {song && (
              <motion.div 
                key="song-card"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="flex justify-center w-full px-2"
              >
                <SongCard 
                  song={song} 
                  status={status} 
                  onDownload={handleDownload} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-14 mt-12 md:mt-24 px-4">
          <div className="feature-card flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-neutral-100 flex items-center justify-center text-emerald-600 mb-6 transition-transform hover:rotate-6">
              <AudioLines size={28} strokeWidth={2.2} />
            </div>
            <h3 className="text-[1.05rem] font-extrabold text-neutral-900 mb-2">Kualitas Studio</h3>
            <p className="text-sm font-medium text-neutral-400 leading-relaxed max-w-[200px]">Nikmati audio jernih 320kbps tanpa kompresi berlebih.</p>
          </div>
          
          <div className="feature-card flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-neutral-100 flex items-center justify-center text-blue-600 mb-6 transition-transform hover:-rotate-6">
              <ImageIcon size={28} strokeWidth={2.2} />
            </div>
            <h3 className="text-[1.05rem] font-extrabold text-neutral-900 mb-2">Metadata Lengkap</h3>
            <p className="text-sm font-medium text-neutral-400 leading-relaxed max-w-[200px]">Setiap unduhan mencakup album art dan detail artis yang pas.</p>
          </div>
          
          <div className="feature-card flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-neutral-100 flex items-center justify-center text-amber-500 mb-6 transition-transform hover:scale-110">
              <Zap size={28} strokeWidth={2.2} />
            </div>
            <h3 className="text-[1.05rem] font-extrabold text-neutral-900 mb-2">Instan & Gratis</h3>
            <p className="text-sm font-medium text-neutral-400 leading-relaxed max-w-[200px]">Tanpa pendaftaran, tanpa biaya. Satu klik untuk mengunduh.</p>
          </div>
        </div>
      </div>

      <footer className="mt-28 md:mt-36 w-full max-w-5xl border-t border-neutral-100 pt-16 px-4 flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2.5">
            <div className="w-12 h-12 flex items-center justify-center overflow-hidden transition-transform duration-500 hover:rotate-12">
              <img 
                src="https://api.deline.web.id/qLNaaVyPKM.png" 
                alt="SpotDown Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-black text-2xl tracking-tight gradient-text">SpotDown</span>
          </div>
          
          <div className="flex items-center gap-7">
             <a 
               href="https://instagram.com/unzipyourlevi.s" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-neutral-400 hover:text-pink-500 transition-all duration-300 hover:scale-110 p-2"
               aria-label="Instagram"
             >
               <Instagram size={22} />
             </a>
             <a 
               href="https://www.tiktok.com/@levvdev" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-neutral-400 hover:text-neutral-900 transition-all duration-300 hover:scale-110 p-2"
               aria-label="TikTok"
             >
               <TikTokIcon size={22} />
             </a>
             <a 
               href="https://github.com/levvweb" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-neutral-400 hover:text-neutral-900 transition-all duration-300 hover:scale-110 p-2"
               aria-label="GitHub"
             >
               <Github size={22} />
             </a>
          </div>
        </div>

        <div className="text-neutral-400 text-[13px] font-bold tracking-tight text-center opacity-60 mt-4">
          <p>
            Source code tersedia secara terbuka <a href="https://github.com" target="_blank" className="underline text-emerald-500 hover:text-emerald-600 transition-colors">disini</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
