'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Projects() {
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate project cards on scroll
    gsap.utils.toArray('.project-card').forEach((card: any) => {
      gsap.fromTo(card,
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    // Hover animations
    const cards = document.querySelectorAll('.project-card')
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        })
      })
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
      })
    })
  }, [])

  const projects = [
    {
      id: 1,
      title: 'Industrial Manufacturing Complex',
      category: 'Industrial',
      description: 'State-of-the-art 500,000 sq ft manufacturing facility',
      year: '2023',
      color: 'yellow',
      image: '🏭'
    },
    {
      id: 2,
      title: 'Corporate Headquarters Tower',
      category: 'Commercial',
      description: '45-story modern office building with sustainable design',
      year: '2022',
      color: 'blue',
      image: '🏢'
    },
    {
      id: 3,
      title: 'Highway Bridge Infrastructure',
      category: 'Infrastructure',
      description: 'Major bridge construction spanning 2.5 miles',
      year: '2023',
      color: 'orange',
      image: '🌉'
    },
    {
      id: 4,
      title: 'Warehouse Distribution Center',
      category: 'Industrial',
      description: 'Massive 750,000 sq ft logistics and distribution hub',
      year: '2022',
      color: 'yellow',
      image: '📦'
    },
    {
      id: 5,
      title: 'Shopping Mall Complex',
      category: 'Commercial',
      description: 'Multi-level retail space with entertainment facilities',
      year: '2021',
      color: 'blue',
      image: '🛍️'
    },
    {
      id: 6,
      title: 'Renovation Project',
      category: 'Restoration',
      description: 'Historic building restoration and modernization',
      year: '2023',
      color: 'orange',
      image: '🔧'
    },
    {
      id: 7,
      title: 'Data Center Facility',
      category: 'Industrial',
      description: 'High-tech data center with advanced security systems',
      year: '2024',
      color: 'yellow',
      image: '💻'
    },
    {
      id: 8,
      title: 'Residential Complex',
      category: 'Commercial',
      description: 'Modern residential towers with luxury amenities',
      year: '2023',
      color: 'blue',
      image: '🏘️'
    }
  ]

  const categories = ['All', 'Industrial', 'Commercial', 'Infrastructure', 'Restoration']

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-800 bg-gradient-to-b from-gray-900 to-black py-24">
        <div className="container mx-auto px-4">
          <h1 className="mb-6 text-5xl font-black uppercase tracking-wider md:text-7xl">
            <span className="text-yellow-400">OUR</span>{' '}
            <span className="text-blue-400">PROJECTS</span>
          </h1>
          <p className="max-w-3xl text-xl text-gray-300 md:text-2xl">
            Explore our portfolio of successful construction projects, each representing our commitment to excellence and innovation.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={projectsRef} className="py-24">
        <div className="container mx-auto px-4">
          {/* Filter Categories */}
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className="rounded-lg border border-gray-800 bg-gray-900/50 px-6 py-2 font-semibold uppercase tracking-wider text-gray-400 transition-all hover:border-yellow-400 hover:text-yellow-400"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="project-card group relative overflow-hidden rounded-lg border border-gray-800 bg-gray-900/50 transition-all"
              >
                {/* Project Image Placeholder */}
                <div className={`relative h-64 overflow-hidden ${
                  project.color === 'yellow' ? 'bg-gradient-to-br from-yellow-400/20 to-yellow-600/10' :
                  project.color === 'blue' ? 'bg-gradient-to-br from-blue-400/20 to-blue-600/10' :
                  'bg-gradient-to-br from-orange-400/20 to-orange-600/10'
                }`}>
                  <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-50">
                    {project.image}
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"></div>
                  {/* Category Badge */}
                  <div className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-bold uppercase ${
                    project.color === 'yellow' ? 'bg-yellow-400 text-black' :
                    project.color === 'blue' ? 'bg-blue-400 text-white' :
                    'bg-orange-400 text-white'
                  }`}>
                    {project.category}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className={`text-sm font-bold ${
                      project.color === 'yellow' ? 'text-yellow-400' :
                      project.color === 'blue' ? 'text-blue-400' :
                      'text-orange-400'
                    }`}>
                      {project.year}
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                  <p className="mb-4 text-gray-400">{project.description}</p>
                  <Link
                    href={`/projects/${project.id}`}
                    className={`inline-block font-semibold uppercase tracking-wider transition-colors ${
                      project.color === 'yellow' ? 'text-yellow-400 hover:text-yellow-300' :
                      project.color === 'blue' ? 'text-blue-400 hover:text-blue-300' :
                      'text-orange-400 hover:text-orange-300'
                    }`}
                  >
                    View Details →
                  </Link>
                </div>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-lg border-2 opacity-0 transition-opacity group-hover:opacity-100 ${
                  project.color === 'yellow' ? 'border-yellow-400' :
                  project.color === 'blue' ? 'border-blue-400' :
                  'border-orange-400'
                }`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-gray-800 bg-gradient-to-r from-yellow-400/10 via-blue-400/10 to-orange-400/10 py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-4xl font-black uppercase tracking-wider md:text-5xl">
            Ready to Start Your{' '}
            <span className="text-yellow-400">Next Project?</span>
          </h2>
          <p className="mb-8 text-xl text-gray-300">
            Let's bring your vision to life
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-lg bg-yellow-400 px-8 py-4 font-bold uppercase text-black transition-all hover:scale-105 hover:bg-yellow-300"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}

