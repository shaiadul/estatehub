"use client"

import * as React from "react"
import {
  IconPlayerPlay,
  IconPlayerPause,
  IconVolume,
  IconVolumeOff,
  IconMaximize,
  IconMinimize,
  Icon3dCubeSphere,
  IconDrone,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { cn } from "cn"

export interface VideoClip {
  id: string
  title: string
  duration: string
  durationSec: number
  poster: string
  src: string
}

const VIDEO_CLIPS: VideoClip[] = [
  {
    id: "drone",
    title: "4K Drone Perimeter Flight",
    duration: "3:40",
    durationSec: 220,
    poster:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  {
    id: "interior",
    title: "Interior 3D Spatial Walkthrough",
    duration: "4:15",
    durationSec: 255,
    poster:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  {
    id: "sunset",
    title: "Twilight Canyon Vistas",
    duration: "2:30",
    durationSec: 150,
    poster:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
]

export interface LidarPreviewProps {
  image?: string
  onLaunchDollhouse?: () => void
  onPlayDrone?: () => void
  className?: string
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}

export function LidarPreview({
  image,
  onLaunchDollhouse,
  onPlayDrone,
  className,
}: LidarPreviewProps) {
  const [activeClipId, setActiveClipId] = React.useState<string>("drone")
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false)
  const [isMuted, setIsMuted] = React.useState<boolean>(true)
  const [currentTime, setCurrentTime] = React.useState<number>(0)
  const [duration, setDuration] = React.useState<number>(220)
  const [isFullscreen, setIsFullscreen] = React.useState<boolean>(false)
  const [isHovering, setIsHovering] = React.useState<boolean>(false)

  const videoRef = React.useRef<HTMLVideoElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const activeClip = React.useMemo(() => {
    return VIDEO_CLIPS.find((c) => c.id === activeClipId) || VIDEO_CLIPS[0]
  }, [activeClipId])

  const posterImage = image && activeClipId === "drone" ? image : activeClip.poster

  const togglePlay = React.useCallback(() => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
          if (activeClipId === "drone") {
            onPlayDrone?.()
          }
        })
        .catch(() => {
          // Fallback if browser autoplay blocks
          setIsPlaying(true)
        })
    }
  }, [isPlaying, activeClipId, onPlayDrone])

  const toggleMute = () => {
    if (!videoRef.current) return
    const nextMuted = !isMuted
    videoRef.current.muted = nextMuted
    setIsMuted(nextMuted)
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const newTime = clickRatio * (duration || activeClip.durationSec)
    videoRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleClipChange = (clip: VideoClip) => {
    setActiveClipId(clip.id)
    setCurrentTime(0)
    setDuration(clip.durationSec)
    setIsPlaying(false)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.pause()
    }
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {})
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {})
    }
  }

  React.useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleFsChange)
    return () => document.removeEventListener("fullscreenchange", handleFsChange)
  }, [])

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <section
      aria-label="3D scan and drone video preview"
      className={cn(
        "w-full bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-5 sm:p-6 flex flex-col gap-4",
        className
      )}
    >
      {/* ── Section Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-surface-container">
        <div>
          <span className="text-xs uppercase tracking-wider text-on-secondary-container font-bold">
            Confidential Video Tour
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-on-surface">
            3D Scan &amp; 4K Drone Flight-Through
          </h2>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-mono text-xs font-semibold self-start sm:self-auto">
          Matterport Pro3 • 4K HDR
        </span>
      </div>

      {/* ── Video Clip Selector Pills ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {VIDEO_CLIPS.map((clip) => {
          const isActive = clip.id === activeClipId
          return (
            <button
              key={clip.id}
              type="button"
              onClick={() => handleClipChange(clip)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0",
                isActive
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              )}
            >
              {clip.id === "drone" ? (
                <IconDrone className="w-3.5 h-3.5" />
              ) : (
                <Icon3dCubeSphere className="w-3.5 h-3.5" />
              )}
              <span>{clip.title}</span>
              <span className="text-[10px] opacity-75 font-mono">({clip.duration})</span>
            </button>
          )
        })}
      </div>

      {/* ── Video Player Window ── */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="relative w-full h-80 sm:h-96 md:h-[440px] rounded-2xl overflow-hidden group border border-outline-variant/30 bg-slate-950 select-none"
      >
        <video
          ref={videoRef}
          src={activeClip.src}
          poster={posterImage}
          playsInline
          muted={isMuted}
          loop
          onTimeUpdate={() => {
            if (videoRef.current) {
              setCurrentTime(videoRef.current.currentTime)
            }
          }}
          onLoadedMetadata={() => {
            if (videoRef.current && videoRef.current.duration) {
              setDuration(videoRef.current.duration)
            }
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full object-cover"
        />

        {/* Ambient Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

        {/* Top Badges (REC / 4K) */}
        <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/70 border border-white/10 text-white font-mono text-[11px] backdrop-blur-md">
            {isPlaying && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
            <span>4K 60FPS HDR</span>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-slate-950/70 border border-white/10 text-white/80 font-mono text-[11px] backdrop-blur-md hidden sm:inline">
            {activeClip.title}
          </span>
        </div>

        {/* Big Center Play / Pause Button */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className={cn(
            "absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-950/70 hover:bg-secondary text-white hover:text-on-secondary backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 shadow-xl group-hover:scale-105",
            isPlaying && !isHovering && "opacity-0 scale-90 pointer-events-none"
          )}
        >
          {isPlaying ? (
            <IconPlayerPause className="w-7 h-7 sm:w-8 sm:h-8" />
          ) : (
            <IconPlayerPlay className="w-7 h-7 sm:w-8 sm:h-8 ml-1" />
          )}
        </button>

        {/* Bottom Video Controls Bar */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent flex flex-col gap-2 transition-opacity duration-300",
            !isPlaying || isHovering ? "opacity-100" : "opacity-0"
          )}
        >
          {/* Progress / Seek Bar */}
          <div
            onClick={handleSeek}
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            className="w-full h-1.5 hover:h-2.5 bg-white/20 hover:bg-white/30 rounded-full cursor-pointer relative transition-all"
          >
            <div
              className="h-full bg-secondary rounded-full relative"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform" />
            </div>
          </div>

          {/* Control Icons & Time */}
          <div className="flex items-center justify-between text-white text-xs pt-1">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                className="hover:text-secondary transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <IconPlayerPause className="w-4 h-4" />
                ) : (
                  <IconPlayerPlay className="w-4 h-4" />
                )}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                className="hover:text-secondary transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <IconVolumeOff className="w-4 h-4 text-white/70" />
                ) : (
                  <IconVolume className="w-4 h-4" />
                )}
              </button>

              <span className="font-mono text-[11px] text-white/80">
                {formatTime(currentTime)} / {formatTime(duration || activeClip.durationSec)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline font-mono text-[11px] text-white/60">
                Measured Accuracy: ±0.1%
              </span>
              <button
                type="button"
                onClick={toggleFullscreen}
                className="hover:text-secondary transition-colors"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? (
                  <IconMinimize className="w-4 h-4" />
                ) : (
                  <IconMaximize className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Actions Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <Button
            size="sm"
            onClick={onLaunchDollhouse}
            className="bg-secondary text-on-secondary font-bold text-xs rounded-lg px-3 py-1.5 hover:bg-secondary/90 transition-all"
          >
            <Icon3dCubeSphere className="w-3.5 h-3.5 mr-1" />
            Launch Interactive Dollhouse
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setActiveClipId("drone")
              togglePlay()
            }}
            className="border-outline-variant text-on-surface text-xs rounded-lg px-3 py-1.5 bg-surface-container-low hover:bg-surface-container"
          >
            <IconDrone className="w-3.5 h-3.5 mr-1" />
            Play 4K Drone Flight (3m 40s)
          </Button>
        </div>

        <span className="text-xs text-muted-foreground font-mono">
          Spatial Resolution: 4K HDR • ±1.0mm
        </span>
      </div>
    </section>
  )
}
