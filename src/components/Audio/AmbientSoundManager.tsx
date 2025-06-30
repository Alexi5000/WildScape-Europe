import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface SoundTrack {
  id: string;
  name: string;
  url: string;
  volume: number;
  loop: boolean;
}

export const AmbientSoundManager: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Forest ambient sound tracks (using placeholder URLs - replace with actual audio files)
  const soundTracks: SoundTrack[] = [
    {
      id: 'forest-ambience',
      name: 'Forest Ambience',
      url: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
      volume: 0.3,
      loop: true
    },
    {
      id: 'birds-chirping',
      name: 'Birds Chirping',
      url: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
      volume: 0.2,
      loop: true
    },
    {
      id: 'wind-through-trees',
      name: 'Wind Through Trees',
      url: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
      volume: 0.4,
      loop: true
    }
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = soundTracks[currentTrack].loop;
      setIsLoaded(true);
    }
  }, [volume, currentTrack]);

  const togglePlayback = () => {
    if (!audioRef.current || !isLoaded) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Start playback only after user interaction
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const switchTrack = (trackIndex: number) => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
    }
    setCurrentTrack(trackIndex);
    setIsPlaying(false);
  };

  return (
    <>
      {/* Audio element */}
      <audio
        ref={audioRef}
        src={soundTracks[currentTrack].url}
        onLoadedData={() => setIsLoaded(true)}
        onEnded={() => setIsPlaying(false)}
        preload="metadata"
      />

      {/* Sound control panel */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 glass-forest p-4 rounded-2xl shadow-lg"
        initial={{ opacity: 0, scale: 0.8, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        <div className="flex items-center gap-4">
          {/* Play/Pause button */}
          <motion.button
            onClick={togglePlayback}
            className="w-12 h-12 rounded-full bg-forest-medium text-white flex items-center justify-center hover:bg-forest-primary transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            disabled={!isLoaded}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </motion.button>

          {/* Volume control */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleVolumeChange(volume > 0 ? 0 : 0.3)}
              className="text-forest-primary hover:text-forest-medium transition-colors"
            >
              {volume > 0 ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-20 h-2 bg-forest-light rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, var(--forest-medium) 0%, var(--forest-medium) ${volume * 100}%, var(--forest-light) ${volume * 100}%, var(--forest-light) 100%)`
              }}
            />
          </div>

          {/* Track selector */}
          <select
            value={currentTrack}
            onChange={(e) => switchTrack(parseInt(e.target.value))}
            className="bg-transparent text-forest-primary text-sm border border-forest-light rounded px-2 py-1 focus:outline-none focus:border-forest-medium"
          >
            {soundTracks.map((track, index) => (
              <option key={track.id} value={index} className="bg-white text-forest-primary">
                {track.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sound visualization */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              className="flex items-center justify-center gap-1 mt-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-forest-medium rounded-full"
                  animate={{
                    height: [4, 12, 4],
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-forest-deep text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            Forest Ambient Sounds
          </div>
        </div>
      </motion.div>
    </>
  );
};