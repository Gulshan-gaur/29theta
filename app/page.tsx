"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import CustomVideoPlayer from "../components/video-player"

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [demoSrc] = useState("https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4")

  const totalDuration = 198 // 3:18 in seconds

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-amber-50/80 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="currentColor" strokeWidth="0.8" className="text-foreground">
            {/* Robot sketches */}
            <g transform="translate(80, 120)">
              <rect x="0" y="0" width="20" height="25" fill="none" />
              <circle cx="10" cy="8" r="5" fill="none" />
              <line x1="5" y1="25" x2="5" y2="35" />
              <line x1="15" y1="25" x2="15" y2="35" />
              <line x1="0" y1="15" x2="-8" y2="15" />
              <line x1="20" y1="15" x2="28" y2="15" />
            </g>

            <g transform="translate(300, 300)">
              <rect x="0" y="0" width="15" height="20" fill="none" />
              <circle cx="7.5" cy="6" r="3" fill="none" />
              <line x1="3" y1="20" x2="3" y2="28" />
              <line x1="12" y1="20" x2="12" y2="28" />
            </g>

            <g transform="translate(800, 150)">
              <rect x="0" y="0" width="18" height="22" fill="none" />
              <circle cx="9" cy="7" r="4" fill="none" />
              <line x1="4" y1="22" x2="4" y2="30" />
              <line x1="14" y1="22" x2="14" y2="30" />
              <rect x="-3" y="10" width="6" height="8" fill="none" />
              <rect x="15" y="10" width="6" height="8" fill="none" />
            </g>

            <g transform="translate(200, 500)">
              <rect x="0" y="0" width="16" height="21" fill="none" />
              <circle cx="8" cy="6" r="3" fill="none" />
              <line x1="3" y1="21" x2="3" y2="29" />
              <line x1="13" y1="21" x2="13" y2="29" />
            </g>

            <g transform="translate(950, 400)">
              <rect x="0" y="0" width="19" height="24" fill="none" />
              <circle cx="9.5" cy="8" r="4" fill="none" />
              <line x1="4" y1="24" x2="4" y2="32" />
              <line x1="15" y1="24" x2="15" y2="32" />
            </g>

            <g transform="translate(500, 80)">
              <rect x="0" y="0" width="14" height="18" fill="none" />
              <circle cx="7" cy="5" r="2.5" fill="none" />
              <line x1="2" y1="18" x2="2" y2="25" />
              <line x1="12" y1="18" x2="12" y2="25" />
            </g>

            {/* Mechanical elements */}
            <g transform="translate(150, 250)">
              <circle cx="0" cy="0" r="12" fill="none" />
              <line x1="-12" y1="0" x2="12" y2="0" />
              <line x1="0" y1="-12" x2="0" y2="12" />
              <circle cx="0" cy="0" r="3" fill="none" />
            </g>

            <g transform="translate(600, 180)">
              <circle cx="0" cy="0" r="10" fill="none" />
              <line x1="-10" y1="0" x2="10" y2="0" />
              <line x1="0" y1="-10" x2="0" y2="10" />
            </g>

            <g transform="translate(400, 600)">
              <circle cx="0" cy="0" r="8" fill="none" />
              <line x1="-8" y1="0" x2="8" y2="0" />
              <line x1="0" y1="-8" x2="0" y2="8" />
            </g>

            {/* Gear elements */}
            <g transform="translate(700, 450)">
              <circle cx="0" cy="0" r="6" fill="none" />
              <rect x="-2" y="-8" width="4" height="2" fill="none" />
              <rect x="-2" y="6" width="4" height="2" fill="none" />
              <rect x="-8" y="-2" width="2" height="4" fill="none" />
              <rect x="6" y="-2" width="2" height="4" fill="none" />
            </g>

            {/* Circuit patterns */}
            <g transform="translate(100, 400)">
              <rect x="0" y="0" width="30" height="2" fill="none" />
              <rect x="10" y="-5" width="2" height="10" fill="none" />
              <rect x="20" y="-5" width="2" height="10" fill="none" />
              <circle cx="5" cy="1" r="1" fill="currentColor" />
              <circle cx="25" cy="1" r="1" fill="currentColor" />
            </g>

            {/* Subtle grid pattern */}
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" opacity="0.2" />
          </g>
        </svg>
      </div>

      <div className="relative z-10">
        <header className="pt-4 pb-6 px-6 max-w-6xl mx-auto">
          <div className="flex items-center">
            {/* <div className="w-24 h-24">
              <Image
                src="/logo-290.png"
                alt="29θ Logo"
                width={96}
                height={96}
                className="w-full h-full object-contain"
              />
            </div> */}
            <h1 className="font-mono text-3xl font-bold text-foreground ml-4">29(θ)</h1>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6">
          <div className="text-left mb-12">
            <p className="text-lg md:text-xl text-foreground mb-8 max-w-4xl text-pretty leading-relaxed">
              At 29θ, our mission is to advance Physical Intelligence — in that not only perceives the world but also acts within it. We explore the intersection of reinforcement learning, physics simulation, and real-world robotics, building systems that can reason, adapt, and learn in complex environments.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="font-mono text-2xl font-semibold mb-6 text-foreground">MISSION</h2>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
              {/* Video display area */}
              {/* <div className="relative aspect-video bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/20"></div> */}
                {/* Street scene placeholder */}
                {/* <div className="absolute inset-0 bg-gradient-to-b from-gray-400 via-gray-300 to-gray-500"></div> */}

                {/* Play button overlay */}
                {/* {!isPlaying && ( */}
                  {/* <button */}
                    {/* onClick={() => setIsPlaying(true)} */}
                    {/* className="relative z-10 w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg" */}
                  {/* > */}
                    {/* <div className="w-0 h-0 border-l-[16px] border-l-black border-y-[12px] border-y-transparent ml-1"></div> */}
                  {/* </button> */}
                {/* )} */}

                {/* Video content when playing */}
                {/* {isPlaying && ( */}
                  {/* <div className="absolute inset-0 bg-gray-600 flex items-center justify-center"> */}
                    {/* <p className="text-white text-lg">Demo video playing...</p> */}
                  {/* </div> */}
                {/* )} */}
              {/* </div> */}

              {/* Video controls */}
              {/* <div className="bg-white p-4 flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 bg-yellow-400 hover:bg-yellow-500 rounded flex items-center justify-center transition-colors"
                >
                  {isPlaying ? (
                    <div className="w-3 h-3 bg-black rounded-sm"></div>
                  ) : (
                    <div className="w-0 h-0 border-l-[8px] border-l-black border-y-[6px] border-y-transparent ml-0.5"></div>
                  )}
                </button> */}

                {/* <span className="text-sm font-mono text-gray-700 min-w-[3rem]">{formatTime(currentTime)}</span>

                <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 transition-all duration-300"
                    style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                  ></div>
                </div> */}

                {/* <span className="text-sm font-mono text-gray-700 min-w-[3rem]">{formatTime(totalDuration)}</span>

                <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M6.343 6.343A8 8 0 004.222 12a8.003 8.003 0 002.121 5.657"
                    />
                  </svg>
                </button>

                <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                </button>
              </div> */}
              <CustomVideoPlayer src={demoSrc} poster="/video-poster-dark-ui.png" />
            </div>
          </div>

          <div className="mb-16">
            <h2 className="font-mono text-2xl font-semibold mb-8 text-foreground">Focus Areas</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border-2 border-gray-800 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                        />
                      </svg>
                    </div>
                    <h3 className="font-mono text-lg font-bold text-gray-900">Synthetic Data Generation</h3>
                  </div>
                  <span className="text-sm text-gray-600 font-mono">01</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Creating diverse, high-quality training datasets for robust AI development. Our approach generates
                  realistic scenarios that enable models to learn complex behaviors in controlled environments.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-800 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-mono text-lg font-bold text-gray-900">Imitation & Reinforcement Learning</h3>
                  </div>
                  <span className="text-sm text-gray-600 font-mono">02</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Advanced learning algorithms that combine demonstration and exploration. We develop systems that learn
                  from expert demonstrations while discovering optimal strategies through trial and error.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-800 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-mono text-lg font-bold text-gray-900">Physics-aware Intelligence</h3>
                  </div>
                  <span className="text-sm text-gray-600 font-mono">03</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  AI systems that understand and leverage physical laws and constraints. Our models incorporate physics
                  principles to make more accurate predictions and decisions in real-world scenarios.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-800 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-mono text-lg font-bold text-gray-900">Embodied AI Navigation</h3>
                  </div>
                  <span className="text-sm text-gray-600 font-mono">04</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Intelligent navigation systems for complex, dynamic environments. We create AI that can move through
                  and interact with the physical world using spatial reasoning and adaptive planning.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mb-16">
            <Button
              size="lg"
              className="bg-foreground hover:bg-foreground/90 text-background px-8 py-3 text-lg font-mono"
            >
              Explore Platform
            </Button>
          </div>
        </main>

        <footer className="mt-16 pb-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 29θ. Advancing Physical AI through innovative research and development.
          </p>
        </footer>
      </div>
    </div>
  )
}
