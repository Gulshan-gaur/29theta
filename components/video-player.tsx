"use client"

import { useEffect, useRef, useState } from "react"

type Props = {
  src: string
  poster?: string
  className?: string
}

function formatTime(t: number) {
  if (!isFinite(t)) return "0:00"
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
    .toString()
    .padStart(2, "0")
  return `${m}:${s}`
}

export default function CustomVideoPlayer({ src, poster, className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const [fs, setFs] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onTime = () => setCurrent(v.currentTime)
    const onMeta = () => setDuration(v.duration || 0)
    v.addEventListener("timeupdate", onTime)
    v.addEventListener("loadedmetadata", onMeta)
    return () => {
      v.removeEventListener("timeupdate", onTime)
      v.removeEventListener("loadedmetadata", onMeta)
    }
  }, [])

  function toggle() {
    const v = videoRef.current!
    if (v.paused) {
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  function onScrub(val: number) {
    const v = videoRef.current!
    v.currentTime = val
    setCurrent(val)
  }

  function toggleMute() {
    const v = videoRef.current!
    v.muted = !v.muted
    setMuted(v.muted)
  }

  async function toggleFs() {
    const container = videoRef.current?.parentElement
    if (!container) return
    if (!document.fullscreenElement) {
      await container.requestFullscreen()
      setFs(true)
    } else {
      await document.exitFullscreen()
      setFs(false)
    }
  }

  return (
    <div className={`rounded-2xl border border-border bg-background text-foreground ${className || ""}`}>
      <div className="relative">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="aspect-video w-full rounded-t-2xl"
          preload="metadata"
          playsInline
        />
        {!playing && (
          <button
            aria-label="Play"
            onClick={toggle}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(0,0,0,0.6)] p-6 shadow-lg ring-1 ring-white/10"
          >
            <div className="h-10 w-10 rounded-full bg-foreground text-black grid place-items-center">
              <div className="ml-1 border-l-[14px] border-l-black border-y-[10px] border-y-transparent border-r-0" />
            </div>
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 rounded-b-2xl bg-card px-4 py-3">
        <button onClick={toggle} className="rounded-md bg-primary px-2 py-1 text-black text-sm">
          {playing ? "Pause" : "Play"}
        </button>
        <span className="text-xs tabular-nums">{formatTime(current)}</span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={current}
          onChange={(e) => onScrub(Number.parseFloat(e.target.value))}
          className="range w-24 xs:w-28 sm:w-44 md:w-56 lg:w-full" // wider on mobile
        />
        <span className="text-xs tabular-nums">{formatTime(duration)}</span>
        <button onClick={toggleMute} className="text-sm text-muted-foreground hover:text-foreground">
          {muted || volume === 0 ? "🔇" : "🔊"}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={muted ? 0 : volume}
          onChange={(e) => {
            const v = Number(e.target.value)
            const vid = videoRef.current!
            vid.volume = v
            setVolume(v)
            if (v > 0) {
              vid.muted = false
              setMuted(false)
            }
          }}
          className="range w-10 xs:w-12 sm:w-12 md:w-14"
          aria-label="Volume"
        />
        <button onClick={toggleFs} className="text-sm text-muted-foreground hover:text-foreground">
          {fs ? "⤡" : "⤢"}
        </button>
      </div>
    </div>
  )
}
