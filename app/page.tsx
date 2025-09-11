"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import CustomVideoPlayer from "../components/video-player"
import { supabase } from "@/lib/supabaseClient";


export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [showWaitlistPopup, setShowWaitlistPopup] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [showImagePopup, setShowImagePopup] = useState(false)
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string; description: string } | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [clickedButton, setClickedButton] = useState<"prev" | "next" | null>(null);
  const [demoSrc] = useState("https://lqfncvigfsrmhownygra.supabase.co/storage/v1/object/public/SEO/29theta.mp4")
//("https://mqsongdeatils.blob.core.windows.net/seo/29theta.mp4")
  // https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4")

  const totalDuration = 82 // 1:22 in seconds


  const platformImages = [
    {
      src: "/robot1.png",
      title: "Dashboard",
      description: "Dedicated dashboard for multiple robot training",
    },
    {
      src: "/robot2.png",
      title: "Real Time Monitoring",
      description: "Real-time monitoring of AI model training progress",
    },
    {
      src: "/robot3.png",
      title: "USD Model for Robots and Environments",
      description: "Ready to use robots and environments",
    },
    {
      src: "/robot4.png",
      title: "Training Results",
      description: "Export Training model and policy with preview of training video recording",
    },
  ]

  // const nextImage = () => {
  //   setCurrentImageIndex((prev) => (prev + 1) % platformImages.length)
  // }

  // const prevImage = () => {
  //   setCurrentImageIndex((prev) => (prev - 1 + platformImages.length) % platformImages.length)
  // }
  const nextImage = () => {
    if (currentImageIndex < platformImages.length - 1) {
      setClickedButton("next");
      setCurrentImageIndex((prev) => (prev + 1) % platformImages.length);

      // Reset button animation after 300ms
      setTimeout(() => setClickedButton(null), 300);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setClickedButton("prev");
      setCurrentImageIndex((prev) => (prev - 1 + platformImages.length) % platformImages.length);

      // Reset button animation after 300ms
      setTimeout(() => setClickedButton(null), 300);
    }
  };


  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleImageClick = (image: { src: string; title: string; description: string }) => {
    setSelectedImage(image)
    setShowImagePopup(true)
  }

  const closeImagePopup = () => {
    setShowImagePopup(false)
    setSelectedImage(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const { error } = await supabase.from("waitlist").insert([
        {
          full_name: formData.name,
          email: formData.email,
        },
      ]);

      if (error) {
        if (error.code === "23505") {
          setErrorMessage("This email is already on the waitlist.");
        } else {
          setErrorMessage(error.message);
        }
        return;
      }

      setSuccessMessage("You have successfully joined the waitlist!");
      setFormData({ name: "", email: "" });
    } catch (err) {
      setErrorMessage("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


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
        {/* <header className="pt-4 pb-6 px-6 max-w-6xl mx-auto"> */}
        <header className="pt-4 pb-6 px-6 max-w-6xl mx-auto flex items-center justify-between">
          {/* <div className="flex items-center"> */}
          <div className="w-20 h-20">
            <Image
              src="/logo-290.png"
              alt="29θ Logo"
              width={80}
              height={80}
              className="w-full h-full object-contain"
            />
            {/* </div> */}
            {/* <h1 className="font-mono text-3xl font-bold text-foreground ml-4">29(θ)</h1> */}
          </div>
          {/* X / Twitter Button */}
          <a
            href="https://x.com/29theta" // Replace with actual Twitter handle
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on X"
            className="hover:opacity-80 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-foreground" // Reduced size here
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26L22.5 21.75h-6.563l-5.146-6.702-5.89 6.702H1.594l7.73-8.8L1.5 2.25h6.75l4.648 6.08 5.346-6.08zm-1.162 17.52h1.833L7.032 4.126H5.07l12.012 15.644z" />
            </svg>
          </a>
        </header>

        <main className="max-w-5xl mx-auto px-6">
          <div className="text-left mb-12">
            <p className="text-lg md:text-xl text-foreground mb-8 max-w-4xl text-pretty leading-relaxed">
              At 29θ, our mission is to accelerate the future of robotics by making Physical AI accessible and scalable. We provide a platform where teams can train, test, and deploy intelligent robots in hours, not months, through realistic simulation, synthetic data generation, and adaptive learning.</p>
            {/* <div className="mt-8">
              <Button
                size="lg"
                className="bg-foreground hover:bg-foreground/90 text-background px-8 py-3 text-lg font-mono shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transition-all"
                onClick={() => setShowWaitlistPopup(true)}
              >
                Join Waitlist
              </Button>
            </div> */}
            <div className="mt-8">
              <Button
                size="lg"
                className="px-8 py-3 text-lg font-mono transition-all"
                style={{
                  background: "linear-gradient(90deg, #ffde59 0%, #ff914d 100%)",
                  boxShadow: "0 2px 8px 0 rgba(255, 145, 77, 0.15)",
                  color: "#000",
                }}
                onClick={() => setShowWaitlistPopup(true)}
              >
                Join Waitlist
              </Button>
            </div>

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
              <CustomVideoPlayer src={demoSrc} poster="/video-thumbnail.png" />
            </div>
          </div>

          <div className="mb-16">
            <h2 className="font-mono text-2xl font-semibold mb-6 text-foreground">
              Platform Overview
            </h2>

            <div className="relative">
              <div className="flex gap-6 overflow-hidden rounded-2xl">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentImageIndex * 50}%)` }}
                >
                  {platformImages.map((image, index) => (
                    <div key={index} className="w-1/2 flex-shrink-0 px-3">
                      <div
                        className="relative aspect-[5/3] rounded-2xl overflow-hidden shadow-lg bg-gray-100 border border-gray-200 cursor-pointer hover:shadow-xl transition-shadow"
                        onClick={() => handleImageClick(image)}
                      >
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.title}
                          width={800}
                          height={800}
                          className="w-full h-full"
                        // style={{
                        //   background: "linear-gradient(90deg, #ffde59 0%, #ff914d 100%)", // gradient border
                        //   boxShadow: "0 2px 8px 0 rgba(255, 145, 77, 0.15)", // shadow effect
                        // }}
                        />
                        {/* Hover overlay to indicate clickability */}
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                          <div className="bg-white/90 rounded-full p-3 shadow-lg">
                            <svg
                              className="w-6 h-6 text-gray-700"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 px-2">
                        <h3 className="font-mono text-sm font-semibold text-gray-900 mb-1">{image.title}</h3>
                        <p className="text-xs text-gray-600 leading-relaxed">{image.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons - Below and Left Aligned */}
              {/* <div className="flex justify-start gap-4 mt-6">
                <button
                  onClick={prevImage}
                  className="w-10 h-10 bg-white/95 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105"
                >
                  <svg
                    className="w-4 h-4 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={nextImage}
                  className="w-10 h-10 bg-white/95 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105"
                >
                  <svg
                    className="w-4 h-4 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div> */}
              <div className="flex justify-start gap-4 mt-6">
                {/* Previous Button */}
                <button
                  onClick={prevImage}
                  disabled={currentImageIndex === 0}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300
      ${clickedButton === "prev"
                      ? "bg-black text-white scale-110"
                      : "bg-white/95 text-gray-700 hover:bg-white hover:scale-105"
                    }
      ${currentImageIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}
    `}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Next Button */}
                <button
                  onClick={nextImage}
                  disabled={currentImageIndex === platformImages.length - 1}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300
      ${clickedButton === "next"
                      ? "bg-black text-white scale-110"
                      : "bg-white/95 text-gray-700 hover:bg-white hover:scale-105"
                    }
      ${currentImageIndex === platformImages.length - 1
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                    }
    `}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
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
            {/* <Button
              size="lg"
              className="bg-foreground hover:bg-foreground/90 text-background px-8 py-3 text-lg font-mono"
            >
              Explore Platform
            </Button> */}
            <a
              href="https://cal.com/gaurgulshan"
              target="_blank"
              rel="noopener noreferrer"
              // className="inline-block bg-foreground hover:bg-foreground/90 text-background px-8 py-3 text-lg font-mono rounded-lg transition-colors"
              className="inline-block px-8 py-3 text-lg font-mono rounded-lg transition-colors text-background"
              style={{
                background: "linear-gradient(90deg, #ffde59 0%, #ff914d 100%)",
                boxShadow: "0 2px 8px 0 rgba(255, 145, 77, 0.15)",
                color: "#000",
              }}
            >
              Talk to Founder
            </a>
          </div>
        </main>

        <footer className="mt-16 pb-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 29θ. Advancing Physical AI through innovative research and development.
          </p>
        </footer>
      </div>

      {/* Image popup modal */}
      {showImagePopup && selectedImage && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/80 z-50 transition-opacity" onClick={closeImagePopup} />

          {/* Image Popup */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-5xl max-h-[90vh] w-full">
              {/* Close button */}
              <button
                onClick={closeImagePopup}
                className="absolute -top-12 right-0 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors shadow-lg z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image container */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-200">
                <div className="relative">
                  <Image
                    src={selectedImage.src || "/placeholder.svg"}
                    alt={selectedImage.title}
                    width={1200}
                    height={900}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                </div>

                {/* Image details */}
                <div className="p-6 bg-white">
                  <h3 className="font-mono text-xl font-bold text-gray-900 mb-2">{selectedImage.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedImage.description}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Waitlist Popup Modal */}
      {showWaitlistPopup && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 transition-opacity"
            onClick={() => setShowWaitlistPopup(false)}
          />

          {/* Popup */}
          <div
            className={`
        fixed z-50 transition-all duration-300 ease-out
        ${showWaitlistPopup ? "opacity-100 scale-100" : "opacity-0 scale-95"}

        /* Mobile - full width, bottom aligned */
        bottom-6 w-[90%] max-w-md mx-auto left-0 right-0
        bg-white border-t-2 border-gray-200
        rounded-t-2xl shadow-2xl
        mx-4

        /* Desktop - centered modal */
        md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
        md:w-[28rem] md:rounded-2xl md:border-2 md:border-gray-200 md:shadow-2xl md:bottom-auto md:mx-0
      `}
          >
            <div className="p-6 md:p-8 overflow-y-auto max-h-[80vh]">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl md:text-2xl font-mono font-bold text-gray-900">
                  Join Our Waitlist
                </h3>
                <button
                  onClick={() => setShowWaitlistPopup(false)}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Description */}
              <div className="mb-6">
                <p className="text-gray-700 mb-3 leading-relaxed text-sm md:text-base">
                  Get early access to our Physical AI platform and be among the first
                  to experience the future of embodied intelligence.
                </p>
                {/* <p className="text-gray-600 text-sm">
                  Enter your name and email below to secure your spot. We'll notify
                  you as soon as our platform is ready for early access.
                </p> */}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-mono font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg"
                  >
                    {loading ? "Joining..." : "Join Waitlist"}
                  </button>
                </div>

                {successMessage && (
                  <p className="text-green-600 text-sm text-center mt-3">{successMessage}</p>
                )}
                {errorMessage && (
                  <p className="text-red-600 text-sm text-center mt-3">{errorMessage}</p>
                )}
              </form>
            </div>
          </div>
        </>
      )}

    </div>
  )
}
