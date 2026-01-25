'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  useEffect(() => {
    // Animate contact icons
    gsap.utils.toArray('.contact-icon').forEach((icon: any, index: number) => {
      gsap.fromTo(icon,
        { opacity: 0, scale: 0, rotation: -180 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: icon,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: index * 0.1
        }
      )
    })

    // Map pin drop animation
    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: mapRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    })

    pinTl
      .fromTo('.map-pin',
        { opacity: 0, y: -50, scale: 0 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(2)'
        }
      )
      .fromTo('.map-pulse',
        { opacity: 0, scale: 0 },
        {
          opacity: 0.6,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out'
        },
        '-=0.4'
      )

    // Form field animations
    gsap.utils.toArray('.form-field').forEach((field: any, index: number) => {
      gsap.fromTo(field,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: field,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: index * 0.1
        }
      )
    })
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: 'contact@primecraft.com',
      link: 'mailto:contact@primecraft.com',
      color: 'yellow'
    },
    {
      icon: '📞',
      label: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      color: 'blue'
    },
    {
      icon: '📍',
      label: 'Address',
      value: '123 Construction Ave, Building City, BC 12345',
      link: '#',
      color: 'orange'
    },
    {
      icon: '🕒',
      label: 'Hours',
      value: 'Mon-Fri: 8AM-6PM',
      link: '#',
      color: 'yellow'
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-800 bg-gradient-to-b from-gray-900 to-black py-24">
        <div className="container mx-auto px-4">
          <h1 className="mb-6 text-5xl font-black uppercase tracking-wider md:text-7xl">
            <span className="text-yellow-400">GET</span>{' '}
            <span className="text-blue-400">IN TOUCH</span>
          </h1>
          <p className="max-w-3xl text-xl text-gray-300 md:text-2xl">
            Ready to start your next construction project? Let's discuss how we can bring your vision to life.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                className="contact-icon group relative overflow-hidden rounded-lg border border-gray-800 bg-gray-900/50 p-6 text-center transition-all hover:border-yellow-400 hover:bg-gray-900"
              >
                <div className="mb-4 text-5xl">{info.icon}</div>
                <h3 className={`mb-2 text-sm font-bold uppercase tracking-wider ${
                  info.color === 'yellow' ? 'text-yellow-400' :
                  info.color === 'blue' ? 'text-blue-400' :
                  'text-orange-400'
                }`}>
                  {info.label}
                </h3>
                <p className="text-sm text-gray-400 group-hover:text-white">
                  {info.value}
                </p>
                <div className={`absolute inset-0 opacity-0 transition-opacity group-hover:opacity-10 ${
                  info.color === 'yellow' ? 'bg-yellow-400' :
                  info.color === 'blue' ? 'bg-blue-400' :
                  'bg-orange-400'
                }`}></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="mb-8 text-3xl font-black uppercase tracking-wider md:text-4xl">
                <span className="text-yellow-400">SEND</span>{' '}
                <span className="text-blue-400">US A MESSAGE</span>
              </h2>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="form-field">
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                    placeholder="Your Name"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="phone" className="mb-2 block text-sm font-semibold uppercase tracking-wider">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="message" className="mb-2 block text-sm font-semibold uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-yellow-400 px-8 py-4 font-bold uppercase text-black transition-all hover:scale-105 hover:bg-yellow-300"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Map */}
            <div ref={mapRef} className="relative">
              <h2 className="mb-8 text-3xl font-black uppercase tracking-wider md:text-4xl">
                <span className="text-yellow-400">FIND</span>{' '}
                <span className="text-blue-400">US</span>
              </h2>

              <div className="relative h-96 overflow-hidden rounded-lg border border-gray-800 bg-gray-900/50">
                {/* Map Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
                  {/* Grid pattern */}
                  <svg className="h-full w-full opacity-20" viewBox="0 0 400 400">
                    {[...Array(10)].map((_, i) => (
                      <line
                        key={`h-${i}`}
                        x1="0"
                        y1={i * 40}
                        x2="400"
                        y2={i * 40}
                        stroke="#0066CC"
                        strokeWidth="1"
                      />
                    ))}
                    {[...Array(10)].map((_, i) => (
                      <line
                        key={`v-${i}`}
                        x1={i * 40}
                        y1="0"
                        x2={i * 40}
                        y2="400"
                        stroke="#0066CC"
                        strokeWidth="1"
                      />
                    ))}
                  </svg>
                </div>

                {/* Map Pin */}
                <div className="map-pin absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    {/* Pin Icon */}
                    <div className="relative z-10 text-5xl">📍</div>
                    {/* Pulse Effect */}
                    <div className="map-pulse absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400 opacity-60"></div>
                    <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-yellow-400 opacity-20"></div>
                  </div>
                </div>

                {/* Address Overlay */}
                <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-black/80 p-4 backdrop-blur-sm">
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold text-yellow-400">PRIMECRAFT CONSTRUCTORS</span>
                    <br />
                    123 Construction Ave, Building City, BC 12345
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strong CTA Section */}
      <section className="border-t border-gray-800 bg-gradient-to-r from-yellow-400/20 via-blue-400/20 to-orange-400/20 py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-4xl font-black uppercase tracking-wider md:text-5xl">
            Let's Build Something{' '}
            <span className="text-yellow-400">Extraordinary Together</span>
          </h2>
          <p className="mb-8 text-xl text-gray-300">
            Contact us today for a free consultation and project estimate
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+15551234567"
              className="rounded-lg bg-blue-400 px-8 py-4 font-bold uppercase text-white transition-all hover:scale-105 hover:bg-blue-300"
            >
              Call Now
            </a>
            <a
              href="mailto:contact@primecraft.com"
              className="rounded-lg border-2 border-yellow-400 bg-transparent px-8 py-4 font-bold uppercase text-yellow-400 transition-all hover:bg-yellow-400 hover:text-black"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

