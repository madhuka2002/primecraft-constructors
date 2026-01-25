'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { gsap } from 'gsap'

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Animate navigation on mount
    gsap.fromTo('.nav-item', 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.5 }
    )
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === href) {
      e.preventDefault()
      setIsOpen(false)
      return
    }
    
    e.preventDefault()
    setIsOpen(false)
    
    const tl = gsap.timeline({
      onComplete: () => {
        router.push(href)
        // Reset transition after navigation
        setTimeout(() => {
          gsap.set('.page-transition', { scaleY: 0 })
        }, 100)
      }
    })

    // Block animation
    tl.to('.page-transition', {
      scaleY: 1,
      duration: 0.4,
      ease: 'power2.inOut',
      transformOrigin: 'top'
    })
    .to('.page-transition', {
      scaleY: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      transformOrigin: 'bottom',
      delay: 0.2
    })
  }

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <nav className="fixed top-0 z-40 w-full bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="nav-item">
              <span className="text-2xl font-black uppercase tracking-wider text-yellow-400">
                PRIMECRAFT
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`nav-item relative text-sm font-semibold uppercase tracking-wider transition-colors ${
                    pathname === item.href
                      ? 'text-yellow-400'
                      : 'text-white hover:text-blue-400'
                  }`}
                >
                  {item.label}
                  {pathname === item.href && (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-yellow-400"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="nav-item z-50 flex flex-col gap-1.5 md:hidden"
              aria-label="Toggle menu"
            >
              <span className={`h-0.5 w-6 bg-yellow-400 transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`h-0.5 w-6 bg-yellow-400 transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`h-0.5 w-6 bg-yellow-400 transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`absolute top-20 left-0 w-full bg-black/95 backdrop-blur-md transition-all duration-300 md:hidden ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="container mx-auto px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  handleLinkClick(e, item.href)
                  setIsOpen(false)
                }}
                className={`block py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${
                  pathname === item.href
                    ? 'text-yellow-400'
                    : 'text-white hover:text-blue-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Page Transition Overlay */}
      <div className="page-transition fixed inset-0 z-50 scale-y-0 bg-black"></div>
    </>
  )
}

