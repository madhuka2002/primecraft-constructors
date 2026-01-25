// Utility functions for GSAP animations
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Fade in elements on scroll
 */
export const fadeInOnScroll = (selector: string, options?: {
  start?: string
  duration?: number
  stagger?: number
}) => {
  const elements = document.querySelectorAll(selector)
  elements.forEach((element, index) => {
    gsap.fromTo(element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: options?.duration || 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: options?.start || 'top 80%',
          toggleActions: 'play none none reverse'
        },
        delay: options?.stagger ? index * (options.stagger) : 0
      }
    )
  })
}

/**
 * Scale in elements on scroll
 */
export const scaleInOnScroll = (selector: string, options?: {
  start?: string
  duration?: number
}) => {
  const elements = document.querySelectorAll(selector)
  elements.forEach((element) => {
    gsap.fromTo(element,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: options?.duration || 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: element,
          start: options?.start || 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  })
}

/**
 * Check for reduced motion preference
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

