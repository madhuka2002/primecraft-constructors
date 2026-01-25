'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function About() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const blueprintRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Timeline animations
    gsap.utils.toArray('.timeline-item').forEach((item: any, index: number) => {
      gsap.fromTo(item,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          delay: index * 0.2
        }
      )
    })

    // Blueprint to building effect
    const blueprintTl = gsap.timeline({
      scrollTrigger: {
        trigger: blueprintRef.current,
        start: 'top 60%',
        toggleActions: 'play none none reverse'
      }
    })

    blueprintTl
      .fromTo('.blueprint-overlay',
        { opacity: 1 },
        { opacity: 0, duration: 1.5, ease: 'power2.inOut' }
      )
      .fromTo('.building-reveal',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
        '-=0.5'
      )
  }, [])

  const timeline = [
    {
      year: '1998',
      title: 'Foundation',
      description: 'PRIMECRAFT CONSTRUCTORS was founded with a vision to revolutionize industrial construction.',
      color: 'yellow'
    },
    {
      year: '2005',
      title: 'Expansion',
      description: 'Expanded operations nationwide, completing over 100 major industrial projects.',
      color: 'blue'
    },
    {
      year: '2012',
      title: 'Innovation',
      description: 'Introduced cutting-edge construction technologies and sustainable building practices.',
      color: 'orange'
    },
    {
      year: '2020',
      title: 'Excellence',
      description: 'Reached milestone of 500+ completed projects with industry-leading safety records.',
      color: 'yellow'
    },
    {
      year: '2024',
      title: 'Future',
      description: 'Continuing to build tomorrow with innovative solutions and unwavering commitment.',
      color: 'blue'
    }
  ]

  const values = [
    {
      title: 'Quality',
      description: 'Uncompromising standards in every project',
      icon: '⭐'
    },
    {
      title: 'Safety',
      description: 'Zero-tolerance safety-first approach',
      icon: '🛡️'
    },
    {
      title: 'Innovation',
      description: 'Embracing cutting-edge technologies',
      icon: '💡'
    },
    {
      title: 'Integrity',
      description: 'Honest, transparent, and reliable',
      icon: '🤝'
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-800 bg-gradient-to-b from-gray-900 to-black py-24">
        <div className="container mx-auto px-4">
          <h1 className="mb-6 text-5xl font-black uppercase tracking-wider md:text-7xl">
            <span className="text-yellow-400">ABOUT</span>{' '}
            <span className="text-blue-400">PRIMECRAFT</span>
          </h1>
          <p className="max-w-3xl text-xl text-gray-300 md:text-2xl">
            Building excellence for over 25 years, PRIMECRAFT CONSTRUCTORS has established itself as a leader in industrial construction, delivering innovative solutions and unmatched quality.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center text-4xl font-black uppercase tracking-wider md:text-5xl">
            <span className="text-yellow-400">OUR</span>{' '}
            <span className="text-blue-400">JOURNEY</span>
          </h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-yellow-400 via-blue-400 to-orange-400 md:left-1/2"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`timeline-item relative flex items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-8 h-4 w-4 rounded-full border-4 border-black ${
                    item.color === 'yellow' ? 'bg-yellow-400' :
                    item.color === 'blue' ? 'bg-blue-400' :
                    'bg-orange-400'
                  } md:left-1/2 md:-translate-x-1/2`}></div>

                  {/* Content */}
                  <div className={`ml-20 flex-1 rounded-lg border border-gray-800 bg-gray-900/50 p-6 md:ml-0 ${
                    index % 2 === 0 ? 'md:mr-auto md:w-5/12' : 'md:ml-auto md:w-5/12'
                  }`}>
                    <div className={`mb-2 text-2xl font-black ${
                      item.color === 'yellow' ? 'text-yellow-400' :
                      item.color === 'blue' ? 'text-blue-400' :
                      'text-orange-400'
                    }`}>
                      {item.year}
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blueprint to Building Section */}
      <section ref={blueprintRef} className="relative overflow-hidden border-y border-gray-800 py-24">
        <div className="container relative z-10 mx-auto px-4">
          <h2 className="mb-16 text-center text-4xl font-black uppercase tracking-wider md:text-5xl">
            <span className="text-yellow-400">FROM</span>{' '}
            <span className="text-blue-400">BLUEPRINT</span>{' '}
            <span className="text-orange-400">TO BUILDING</span>
          </h2>

          <div className="relative mx-auto max-w-4xl">
            {/* Blueprint Overlay */}
            <div className="blueprint-overlay absolute inset-0 z-20">
              <svg className="h-full w-full" viewBox="0 0 800 600">
                <rect x="0" y="0" width="800" height="600" fill="none" stroke="#0066CC" strokeWidth="2" opacity="0.3" />
                {/* Grid lines */}
                {[...Array(10)].map((_, i) => (
                  <line
                    key={`h-${i}`}
                    x1="0"
                    y1={i * 60}
                    x2="800"
                    y2={i * 60}
                    stroke="#0066CC"
                    strokeWidth="1"
                    opacity="0.2"
                  />
                ))}
                {[...Array(14)].map((_, i) => (
                  <line
                    key={`v-${i}`}
                    x1={i * 60}
                    y1="0"
                    x2={i * 60}
                    y2="600"
                    stroke="#0066CC"
                    strokeWidth="1"
                    opacity="0.2"
                  />
                ))}
                {/* Building outline */}
                <rect x="200" y="150" width="400" height="300" fill="none" stroke="#0066CC" strokeWidth="3" />
                <line x1="300" y1="150" x2="300" y2="450" stroke="#0066CC" strokeWidth="2" />
                <line x1="500" y1="150" x2="500" y2="450" stroke="#0066CC" strokeWidth="2" />
                <line x1="200" y1="250" x2="600" y2="250" stroke="#0066CC" strokeWidth="2" />
                <line x1="200" y1="350" x2="600" y2="350" stroke="#0066CC" strokeWidth="2" />
              </svg>
            </div>

            {/* Building Reveal */}
            <div className="building-reveal relative z-10 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 p-12">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-2xl font-bold text-yellow-400">Our Process</h3>
                  <p className="mb-6 text-gray-300">
                    Every project begins with meticulous planning and detailed blueprints. Our team transforms these designs into reality through precision execution and quality craftsmanship.
                  </p>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-400">✓</span> Comprehensive Planning
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-400">✓</span> Expert Execution
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-400">✓</span> Quality Assurance
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-400">✓</span> Timely Delivery
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative h-64 w-full rounded-lg bg-gradient-to-br from-yellow-400/20 via-blue-400/20 to-orange-400/20">
                    <div className="absolute inset-0 flex items-center justify-center text-6xl">
                      🏗️
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center text-4xl font-black uppercase tracking-wider md:text-5xl">
            <span className="text-yellow-400">OUR</span>{' '}
            <span className="text-blue-400">VALUES</span>
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="group rounded-lg border border-gray-800 bg-gray-900/50 p-8 text-center transition-all hover:border-yellow-400 hover:bg-gray-900"
              >
                <div className="mb-4 text-5xl">{value.icon}</div>
                <h3 className="mb-2 text-xl font-bold text-yellow-400">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

