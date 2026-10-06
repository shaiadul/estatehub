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

  const posterImage =
    image && activeClipId === "drone" ? image : activeClip.poster

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
    const clickRatio = Math.max(
      0,
      Math.min(1, (e.clientX - rect.left) / rect.width)
    )
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
      containerRef.current
        .requestFullscreen?.()
        .then(() => setIsFullscreen(true))
        .catch(() => {})
    } else {
      document
        .exitFullscreen?.()
        .then(() => setIsFullscreen(false))
        .catch(() => {})
    }
  }

  React.useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleFsChange)
    return () =>
      document.removeEventListener("fullscreenchange", handleFsChange)
  }, [])

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <section
      aria-label="3D scan and drone video preview"
      className={cn(
        "flex w-full flex-col gap-4 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs sm:p-6",
        className
      )}
    >
      {/* ── Section Header ── */}
      <div className="flex flex-col justify-between gap-2 border-b border-surface-container pb-2 sm:flex-row sm:items-center">
        <div>
          <span className="text-xs font-bold tracking-wider text-on-secondary-container uppercase">
            Confidential Video Tour
          </span>
          <h2 className="text-lg font-bold text-on-surface sm:text-xl">
            3D Scan &amp; 4K Drone Flight-Through
          </h2>
        </div>
        <span className="self-start rounded-full bg-surface-container px-2.5 py-1 font-mono text-xs font-semibold text-on-surface-variant sm:self-auto">
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
                "flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              )}
            >
              {clip.id === "drone" ? (
                <IconDrone className="h-3.5 w-3.5" />
              ) : (
                <Icon3dCubeSphere className="h-3.5 w-3.5" />
              )}
              <span>{clip.title}</span>
              <span className="font-mono text-[10px] opacity-75">
                ({clip.duration})
              </span>
            </button>
          )
        })}
      </div>

      {/* ── Video Player Window ── */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="group relative h-80 w-full overflow-hidden rounded-2xl border border-outline-variant/30 bg-slate-950 select-none sm:h-96 md:h-110"
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
          className="h-full w-full object-cover"
        />

        {/* Ambient Overlay Gradients */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-slate-950/40" />

        {/* Top Badges (REC / 4K) */}
        <div className="pointer-events-none absolute top-4 left-4 flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-md border border-white/10 bg-slate-950/70 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur-md">
            {isPlaying && (
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            )}
            <span>4K 60FPS HDR</span>
          </div>
          <span className="hidden rounded-md border border-white/10 bg-slate-950/70 px-2.5 py-1 font-mono text-[11px] text-white/80 backdrop-blur-md sm:inline">
            {activeClip.title}
          </span>
        </div>

        {/* Big Center Play / Pause Button */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className={cn(
            "absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-slate-950/70 text-white shadow-xl backdrop-blur-md transition-all duration-300 group-hover:scale-105 hover:bg-secondary hover:text-on-secondary sm:h-20 sm:w-20",
            isPlaying && !isHovering && "pointer-events-none scale-90 opacity-0"
          )}
        >
          {isPlaying ? (
            <IconPlayerPause className="h-7 w-7 sm:h-8 sm:w-8" />
          ) : (
            <IconPlayerPlay className="ml-1 h-7 w-7 sm:h-8 sm:w-8" />
          )}
        </button>

        {/* Bottom Video Controls Bar */}
        <div
          className={cn(
            "absolute right-0 bottom-0 left-0 flex flex-col gap-2 bg-linear-to-t from-slate-950/95 via-slate-950/70 to-transparent p-4 transition-opacity duration-300",
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
            className="relative h-1.5 w-full cursor-pointer rounded-full bg-white/20 transition-all hover:h-2.5 hover:bg-white/30"
          >
            <div
              className="relative h-full rounded-full bg-secondary"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute top-1/2 right-0 h-3 w-3 -translate-y-1/2 scale-0 rounded-full bg-white shadow-md transition-transform group-hover:scale-100" />
            </div>
          </div>

          {/* Control Icons & Time */}
          <div className="flex items-center justify-between pt-1 text-xs text-white">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                className="transition-colors hover:text-secondary"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <IconPlayerPause className="h-4 w-4" />
                ) : (
                  <IconPlayerPlay className="h-4 w-4" />
                )}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                className="transition-colors hover:text-secondary"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <IconVolumeOff className="h-4 w-4 text-white/70" />
                ) : (
                  <IconVolume className="h-4 w-4" />
                )}
              </button>

              <span className="font-mono text-[11px] text-white/80">
                {formatTime(currentTime)} /{" "}
                {formatTime(duration || activeClip.durationSec)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden font-mono text-[11px] text-white/60 sm:inline">
                Measured Accuracy: ±0.1%
              </span>
              <button
                type="button"
                onClick={toggleFullscreen}
                className="transition-colors hover:text-secondary"
                aria-label={
                  isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                }
              >
                {isFullscreen ? (
                  <IconMinimize className="h-4 w-4" />
                ) : (
                  <IconMaximize className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
