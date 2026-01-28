'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hero animations
    const heroTl = gsap.timeline()
    heroTl
      .from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      })
      .from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5')
      .from('.hero-cta', {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: 'back.out(1.7)'
      }, '-=0.4')

    // Services scroll animations
    gsap.utils.toArray('.service-card').forEach((card: any) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    // Stats counter animation
    gsap.utils.toArray('.stat-number').forEach((stat: any) => {
      const endValue = parseInt(stat.textContent.replace(/\D/g, ''))
      const obj = { value: 0 }
      gsap.to(obj, {
        value: endValue,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: stat,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        onUpdate: () => {
          stat.textContent = Math.floor(obj.value).toLocaleString() + stat.textContent.replace(/\d/g, '').replace(/[^\D]/g, '')
        }
      })
    })
  }, [])

  const services = [
    {
      title: 'Industrial Construction',
      description: 'Large-scale industrial facilities and manufacturing plants',
      icon: '🏭',
      color: 'yellow'
    },
    {
      title: 'Commercial Buildings',
      description: 'Modern commercial spaces and office complexes',
      icon: '🏢',
      color: 'blue'
    },
    {
      title: 'Infrastructure',
      description: 'Bridges, roads, and critical infrastructure projects',
      icon: '🌉',
      color: 'orange'
    },
    {
      title: 'Renovation & Restoration',
      description: 'Expert restoration and modernization services',
      icon: '🔧',
      color: 'yellow'
    }
  ]

  const stats = [
    { number: '500+', label: 'Projects Completed' },
    { number: '25+', label: 'Years Experience' },
    { number: '1000+', label: 'Team Members' },
    { number: '50+', label: 'Awards Won' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Elements - Technical Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(#0066CC 1px, transparent 1px), linear-gradient(90deg, #0066CC 1px, transparent 1px)`,
            backgroundSize: `50px 50px`
          }}></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="hero-title mb-6 text-5xl font-black uppercase tracking-wider md:text-7xl lg:text-8xl">
            <span className="text-yellow-400">BUILDING</span>{' '}
            <span className="text-blue-500">TOMORROW</span>
          </h1>
          <p className="hero-subtitle mx-auto mb-8 max-w-2xl text-xl text-gray-700 md:text-2xl">
            Industrial construction excellence with precision, quality, and innovation
          </p>
          <div className="hero-cta flex flex-wrap justify-center gap-4">
            <Link
              href="/projects"
              className="group relative overflow-hidden rounded-lg bg-primecraft-blue px-8 py-4 font-bold uppercase text-white shadow-lg transition-all hover:scale-105 hover:bg-blue-700"
            >
              <span className="relative z-10">View Projects</span>
            </Link>
            <Link
              href="/contact"
              className="group relative overflow-hidden rounded-lg border-2 border-primecraft-blue px-8 py-4 font-bold uppercase text-primecraft-blue transition-all hover:bg-primecraft-blue hover:text-white"
            >
              <span className="relative z-10">Get Started</span>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="h-8 w-0.5 bg-yellow-400"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-gray-200 bg-white/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`stat-number mb-2 text-4xl font-black md:text-5xl text-primecraft-black`}>
                  {stat.number}
                </div>
                <div className="text-sm uppercase tracking-wider text-gray-600 md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-4xl font-black uppercase tracking-wider md:text-5xl text-gray-800">
            <span className="text-yellow-500">OUR</span>{' '}
            <span className="text-blue-500">SERVICES</span>
          </h2>
          <p className="mb-16 text-center text-gray-600">
            Comprehensive construction solutions for every need
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg p-8 transition-all hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="mb-4 text-5xl">{service.icon}</div>
                <h3 className={`mb-3 text-xl font-bold ${service.color === 'yellow' ? 'text-yellow-600' :
                  service.color === 'blue' ? 'text-blue-600' :
                    'text-orange-600'
                  }`}>
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
                <div className={`absolute inset-0 opacity-0 transition-opacity group-hover:opacity-10 ${service.color === 'yellow' ? 'bg-yellow-400' :
                  service.color === 'blue' ? 'bg-blue-400' :
                    'bg-orange-400'
                  }`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden border-y border-gray-200 bg-gradient-to-r from-yellow-400/10 via-blue-400/10 to-orange-400/10 py-24">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="mb-6 text-4xl font-black uppercase tracking-wider md:text-5xl text-gray-900">
            Ready to Build Something{' '}
            <span className="text-yellow-500">Extraordinary?</span>
          </h2>
          <p className="mb-8 text-xl text-gray-700">
            Let's discuss your next construction project
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-lg bg-yellow-400 px-8 py-4 font-bold uppercase text-black transition-all hover:scale-105 hover:bg-yellow-300"
          >
            Start Your Project
          </Link>
        </div>
      </section>
    </div>
  )
}

