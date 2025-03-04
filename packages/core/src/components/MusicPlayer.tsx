import React from 'react';
// import { useAudio } from '../hooks/useAudio';
// import { Button } from './Button';
import type { MusicTrack } from '../types';

export interface MusicPlayerProps {
  /**
   * The track to play
   */
  track: MusicTrack;

  /**
   * Whether to autoplay the track
   * @default false
   */
  autoPlay?: boolean;

  /**
   * Whether to show the track info
   * @default true
   */
  showTrackInfo?: boolean;

  /**
   * Whether to show the volume control
   * @default true
   */
  showVolumeControl?: boolean;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Callback when the track ends
   */
  onEnded?: () => void;
}

/**
 * A component for playing music tracks
 */
export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  track,
  // autoPlay = false,
  showTrackInfo = true,
  showVolumeControl = true,
  className = '',
  // onEnded,
}) => {
  // const {
  //   audioRef,
  //   isPlaying,
  //   currentTime,
  //   duration,
  //   volume,
  //   muted,
  //   play,
  //   // pause,
  //   toggle,
  //   seek,
  //   setVolume,
  //   toggleMute,
  // } = useAudio(track);

  // Format time in MM:SS format
  // const formatTime = (time: number): string => {
  //   const minutes = Math.floor(time / 60);
  //   const seconds = Math.floor(time % 60);
  //   return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  // };

  // Handle track end
  // React.useEffect(() => {
  //   const audio = audioRef.current;
  //   if (!audio) return;

  //   const handleEnded = () => {
  //     if (onEnded) {
  //       onEnded();
  //     }
  //   };

  //   audio.addEventListener('ended', handleEnded);

  //   return () => {
  //     audio.removeEventListener('ended', handleEnded);
  //   };
  // }, [audioRef, onEnded]);

  // // Autoplay if enabled
  // React.useEffect(() => {
  //   if (autoPlay) {
  //     play();
  //   }
  // }, [autoPlay, play]);

  return (
    <div className={`music-player ${className}`}>
      {/* Hidden audio element */}
      {/* <audio ref={audioRef} /> */}

      {/* Track info */}
      {showTrackInfo && (
        <div className="track-info">
          {track.coverArt && (
            <img
              src={track.coverArt}
              alt={`${track.title} by ${track.artist}`}
              className="cover-art"
            />
          )}
          <div className="track-details">
            <h3 className="track-title">{track.title}</h3>
            <p className="track-artist">{track.artist}</p>
            {track.album && <p className="track-album">{track.album}</p>}
          </div>
        </div>
      )}

      {/* Playback controls */}
      <div className="playback-controls">
        {/* <Button variant="primary" onClick={toggle} aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? '⏸️' : '▶️'}
        </Button> */}

        <div className="time-display">
          {/* <span>{formatTime(currentTime)}</span> */}
          {/* <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={e => seek(Number(e.target.value))}
            className="time-slider"
          />
          <span>{formatTime(duration || 0)}</span> */}
        </div>
      </div>

      {/* Volume control */}
      {showVolumeControl && (
        <div className="volume-control">
          {/* <Button variant="ghost" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
            {muted ? '🔇' : volume > 0.5 ? '🔊' : '🔉'}
          </Button> */}
          {/* <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={e => setVolume(Number(e.target.value))}
            className="volume-slider"
          /> */}
        </div>
      )}
    </div>
  );
};
