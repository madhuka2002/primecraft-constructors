'use client'

import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// Note: Lottie integration ready - replace SVG worker with Lottie component when animation file is available
// import Lottie from 'lottie-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function IntroAnimation() {
  const [hasSeenIntro, setHasSeenIntro] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    // Check localStorage and mobile
    if (typeof window === 'undefined') return

    const isMobile = window.innerWidth < 768
    const introSeen = localStorage.getItem('primecraft-intro-seen')

    // On mobile, skip intro or use shorter version
    if (isMobile) {
      // Option: Skip intro on mobile for better performance
      // localStorage.setItem('primecraft-intro-seen', 'true')
      // return
    }

    // Always play animation for now
    startIntroAnimation()
  }, [])

  const startIntroAnimation = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const tl = gsap.timeline({
      onComplete: () => {
        // localStorage.setItem('primecraft-intro-seen', 'true')
        setIsAnimating(false)
        setHasSeenIntro(true)
      }
    })

    // Initial state - everything dark
    gsap.set('.intro-overlay', { display: 'block', opacity: 1 })
    gsap.set('.light-reveal-overlay', { opacity: 1 })
    gsap.set('.construction-silhouette', { opacity: 0.05 })
    gsap.set('.worker-character', { opacity: 0 })
    gsap.set('.light-bulb-mask', { scale: 0 })
    gsap.set('.led-strip-mask', { scaleX: 0 })
    gsap.set('.blueprint-mask', { scale: 0 })
    gsap.set('.spotlight-mask', { scale: 0 })

    if (prefersReducedMotion) {
      // Skip animations for reduced motion
      tl.set('.light-reveal-overlay', { opacity: 0 })
        .set('.brand-logo', { opacity: 1 })
        .set('.brand-tagline', { opacity: 1, y: 0 })
        .to('.intro-overlay', { opacity: 0, duration: 0.5 })
        .set('.intro-overlay', { display: 'none' })
      return
    }

    // Worker appears and walks
    tl.to('.worker-character', {
      opacity: 1,
      x: -200,
      duration: 2,
      ease: 'power2.inOut'
    })
      // Worker climbs ladder
      .to('.worker-character', {
        y: -150,
        duration: 1.5,
        ease: 'power2.inOut'
      })
      // Switch flip
      .to('.wall-switch', {
        rotation: 15,
        duration: 0.3,
        ease: 'back.out(2)'
      })
      // Electric pulse through cables
      .to('.electric-pulse', {
        scaleX: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
      })
      // Light 1: Industrial bulb - reveal with radial gradient mask
      .to('.light-bulb', {
        opacity: 1,
        scale: 1.2,
        duration: 0.3,
        ease: 'power2.out'
      })
      .to('.light-bulb-mask', {
        scale: 3,
        duration: 1.2,
        ease: 'power2.out'
      }, '-=0.3')
      .to('.light-bulb', {
        opacity: 0.8,
        scale: 1,
        duration: 0.1,
        repeat: 2,
        yoyo: true
      })
      // Light 2: LED strip lights - expanding light radius
      .to('.led-strip-light', {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
      .to('.led-strip-mask', {
        scaleX: 1,
        scaleY: 2,
        duration: 1,
        ease: 'power2.out'
      }, '-=0.3')
      // Light 3: Blueprint walls - transition from wireframe to concrete
      .to('.blueprint-wall', {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
      })
      .to('.blueprint-mask', {
        scale: 1.5,
        duration: 1.5,
        ease: 'power2.out'
      }, '-=0.5')
      .to('.blueprint-concrete', {
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
      }, '-=1')
      // Light 4: Spotlights - cone-shaped light with sway
      .to('.spotlight', {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
        stagger: 0.2
      })
      .to('.spotlight-mask', {
        scale: 1.2,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2
      }, '-=0.3')
      .to('.spotlight', {
        rotation: 2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      }, '-=0.5')
      // Light 5: Floor reflections
      .to('.floor-reflection', {
        opacity: 0.3,
        duration: 0.8,
        ease: 'power2.out'
      })
      // Brand reveal
      .to('.brand-logo', {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'back.out(1.7)'
      })
      .to('.brand-tagline', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.5')
      // Fade out light reveal overlay
      .to('.light-reveal-overlay', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.3')
      // Fade out intro
      .to('.intro-overlay', {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut'
      })
      .set('.intro-overlay', { display: 'none' })
  }

  const handleClose = () => {
    // Kill all GSAP animations
    gsap.globalTimeline.clear()
    setIsAnimating(false)
    setHasSeenIntro(true)
  }

  if (hasSeenIntro && !isAnimating) {
    return null
  }

  return (
    <div className="intro-overlay fixed inset-0 z-50 bg-[#0066CC]">
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute right-8 top-8 z-[60] rounded-full bg-white/20 p-2 text-white transition-colors hover:bg-white/40"
        aria-label="Close animation"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Light Reveal Overlay - Uses mask-image to progressively reveal content */}
      <div
        className="light-reveal-overlay absolute inset-0 z-30 bg-[#0066CC]"
        style={{
          maskImage: 'radial-gradient(circle at var(--light-x, 25%) var(--light-y, 25%), transparent 0%, transparent 30%, black 50%)',
          WebkitMaskImage: 'radial-gradient(circle at var(--light-x, 25%) var(--light-y, 25%), transparent 0%, transparent 30%, black 50%)',
        }}
      ></div>

      <div className="relative h-full w-full overflow-hidden">
        {/* Construction Site Silhouettes */}
        <div className="construction-silhouette absolute inset-0">
          {/* Concrete Walls */}
          <div className="absolute left-0 top-0 h-full w-1/3 bg-gray-900 opacity-5"></div>
          <div className="absolute right-1/4 top-0 h-3/4 w-1/4 bg-gray-900 opacity-5"></div>

          {/* Steel Beams */}
          <div className="absolute left-1/4 top-1/4 h-1 w-1/2 bg-gray-800 opacity-5"></div>
          <div className="absolute left-1/3 top-1/2 h-1 w-1/3 bg-gray-800 opacity-5"></div>

          {/* Ladder */}
          <div className="absolute right-1/3 top-1/2 h-1/2 w-1 bg-gray-800 opacity-5"></div>
          <div className="absolute right-1/3 top-1/2 h-1/2 w-8 opacity-5">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="absolute left-0 top-0 h-1 w-full bg-gray-700" style={{ top: `${i * 10}%` }}></div>
            ))}
          </div>

          {/* Floor */}
          <div className="absolute bottom-0 left-0 h-1/4 w-full bg-gray-900 opacity-5"></div>
        </div>

        {/* Worker Character - Using SVG placeholder for now */}
        <div className="worker-character absolute bottom-1/4 right-1/3 z-20">
          <svg width="80" height="120" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Body */}
            <rect x="25" y="50" width="30" height="50" fill="#0066CC" />
            {/* Head */}
            <circle cx="40" cy="30" r="20" fill="#FFD700" />
            {/* Helmet */}
            <path d="M 20 25 Q 40 15 60 25 L 60 35 Q 40 30 20 35 Z" fill="#FFD700" />
            {/* Arms */}
            <rect x="15" y="55" width="10" height="30" fill="#0066CC" />
            <rect x="55" y="55" width="10" height="30" fill="#0066CC" />
            {/* Gloves */}
            <rect x="15" y="80" width="10" height="10" fill="#FF6600" />
            <rect x="55" y="80" width="10" height="10" fill="#FF6600" />
            {/* Legs */}
            <rect x="28" y="100" width="8" height="20" fill="#000" />
            <rect x="44" y="100" width="8" height="20" fill="#000" />
          </svg>
        </div>

        {/* Wall Switch */}
        <div className="wall-switch absolute right-1/3 top-1/3 z-10">
          <div className="h-12 w-8 rounded bg-gray-700"></div>
          <div className="mt-2 h-2 w-2 rounded-full bg-yellow-400"></div>
        </div>

        {/* Electric Pulse/Cables */}
        <div className="electric-pulse absolute right-1/3 top-1/3 h-1 w-0 origin-left bg-yellow-400 opacity-0" style={{ transform: 'scaleX(0)' }}>
          <div className="h-full w-full bg-gradient-to-r from-yellow-400 via-blue-400 to-yellow-400"></div>
        </div>

        {/* Lighting System */}
        {/* Light 1: Industrial Bulb with radial gradient mask */}
        <div className="absolute left-1/4 top-1/4 z-30">
          <div
            className="light-bulb-mask absolute h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400 opacity-0"
            style={{
              maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0) 70%)',
              WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0) 70%)',
              boxShadow: '0 0 60px 30px rgba(255, 215, 0, 0.6)',
            }}
          ></div>
          <div
            className="light-bulb absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400 opacity-0 shadow-[0_0_40px_20px_rgba(255,215,0,0.5)]"
          ></div>
        </div>

        {/* Light 2: LED Strip Lights with expanding radial mask */}
        <div className="absolute left-0 top-1/3 z-30">
          <div
            className="led-strip-light absolute h-2 w-1/2 bg-blue-400 opacity-0 shadow-[0_0_30px_10px_rgba(0,102,204,0.6)]"
          ></div>
          <div
            className="led-strip-mask absolute left-0 top-0 h-32 w-1/2 origin-left bg-blue-400 opacity-30"
            style={{
              maskImage: 'radial-gradient(ellipse 150% 100% at left center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 150% 100% at left center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 100%)',
            }}
          ></div>
        </div>

        {/* Light 3: Blueprint Walls - wireframe to concrete transition */}
        <div className="blueprint-wall absolute left-0 top-0 z-20 h-full w-1/3">
          {/* Blueprint wireframe */}
          <div className="absolute inset-0 h-full w-full opacity-0">
            <svg className="h-full w-full" viewBox="0 0 400 800">
              <rect x="0" y="0" width="400" height="800" fill="none" stroke="#0066CC" strokeWidth="2" opacity="0.5" />
              <line x1="0" y1="200" x2="400" y2="200" stroke="#0066CC" strokeWidth="1" opacity="0.3" />
              <line x1="0" y1="400" x2="400" y2="400" stroke="#0066CC" strokeWidth="1" opacity="0.3" />
              <line x1="0" y1="600" x2="400" y2="600" stroke="#0066CC" strokeWidth="1" opacity="0.3" />
              <line x1="100" y1="0" x2="100" y2="800" stroke="#0066CC" strokeWidth="1" opacity="0.3" />
              <line x1="200" y1="0" x2="200" y2="800" stroke="#0066CC" strokeWidth="1" opacity="0.3" />
              <line x1="300" y1="0" x2="300" y2="800" stroke="#0066CC" strokeWidth="1" opacity="0.3" />
            </svg>
          </div>
          {/* Mask for blueprint reveal */}
          <div
            className="blueprint-mask absolute inset-0 origin-left bg-blue-400/20"
            style={{
              maskImage: 'radial-gradient(ellipse 100% 150% at left center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse 100% 150% at left center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
            }}
          ></div>
          {/* Concrete texture overlay */}
          <div
            className="blueprint-concrete absolute inset-0 h-full w-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 opacity-0"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
            }}
          ></div>
        </div>

        {/* Light 4: Spotlights with cone-shaped light and mask */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="spotlight absolute top-0 z-30"
            style={{
              left: `${20 + i * 30}%`,
            }}
          >
            {/* Spotlight cone with mask */}
            <div
              className="spotlight-mask absolute h-48 w-32 origin-top bg-gradient-to-b from-yellow-200 via-yellow-400 to-transparent"
              style={{
                maskImage: 'radial-gradient(ellipse 60% 100% at center top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 60% 100% at center top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
                boxShadow: '0 0 60px 40px rgba(255, 215, 0, 0.3)',
                opacity: 0,
              }}
            ></div>
            {/* Dust particles */}
            <div className="spotlight absolute inset-0 opacity-0">
              {[...Array(5)].map((_, j) => (
                <div
                  key={j}
                  className="absolute h-1 w-1 rounded-full bg-yellow-300 opacity-60"
                  style={{
                    left: `${20 + j * 15}%`,
                    top: `${30 + j * 10}%`,
                    animation: `float ${2 + j * 0.3}s ease-in-out infinite`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        ))}

        {/* Light 5: Floor Reflections */}
        <div className="floor-reflection absolute bottom-0 left-0 h-1/4 w-full opacity-0">
          <div className="h-full w-full bg-gradient-to-t from-yellow-900/20 via-transparent to-transparent"></div>
        </div>

        {/* Brand Logo Carved into Wall */}
        <div className="brand-logo absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 opacity-0">
          <div className="relative">
            <h1
              className="text-6xl font-black uppercase tracking-wider text-yellow-400 md:text-8xl"
              style={{
                textShadow: `
                  0 0 20px rgba(255, 215, 0, 0.8),
                  0 0 40px rgba(255, 215, 0, 0.6),
                  0 0 60px rgba(255, 215, 0, 0.4),
                  inset 0 0 20px rgba(0, 0, 0, 0.5)
                `,
                WebkitTextStroke: '2px rgba(0, 0, 0, 0.3)',
              }}
            >
              PRIMECRAFT
            </h1>
            <h2
              className="mt-2 text-3xl font-bold uppercase tracking-widest text-blue-400 md:text-5xl"
              style={{
                textShadow: `
                  0 0 15px rgba(0, 102, 204, 0.8),
                  0 0 30px rgba(0, 102, 204, 0.6)
                `,
              }}
            >
              CONSTRUCTORS
            </h2>
            {/* Light leak effect */}
            <div className="absolute inset-0 -z-10 blur-xl">
              <div className="h-full w-full bg-gradient-radial from-yellow-400/50 via-blue-400/30 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="brand-tagline absolute bottom-1/4 left-1/2 z-40 -translate-x-1/2 translate-y-10 opacity-0">
          <p className="text-xl font-light text-white md:text-2xl">
            Building Excellence, One Project at a Time
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(5px); }
        }
      `}</style>
    </div>
  )
}

