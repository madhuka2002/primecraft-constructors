'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Blog() {
  const postsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate blog posts on scroll
    gsap.utils.toArray('.blog-post').forEach((post: any) => {
      gsap.fromTo(post,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: post,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })
  }, [])

  const posts = [
    {
      id: 1,
      title: 'The Future of Sustainable Construction',
      excerpt: 'Exploring innovative materials and practices that are shaping the future of eco-friendly construction.',
      date: 'March 15, 2024',
      category: 'Sustainability',
      color: 'yellow'
    },
    {
      id: 2,
      title: 'Safety First: Best Practices on Construction Sites',
      excerpt: 'A comprehensive guide to maintaining the highest safety standards in industrial construction projects.',
      date: 'March 10, 2024',
      category: 'Safety',
      color: 'blue'
    },
    {
      id: 3,
      title: 'Technology Integration in Modern Construction',
      excerpt: 'How AI, IoT, and automation are revolutionizing the construction industry.',
      date: 'March 5, 2024',
      category: 'Technology',
      color: 'orange'
    },
    {
      id: 4,
      title: 'Project Management Excellence',
      excerpt: 'Key strategies for delivering large-scale construction projects on time and within budget.',
      date: 'February 28, 2024',
      category: 'Management',
      color: 'yellow'
    },
    {
      id: 5,
      title: 'Industrial Construction Trends 2024',
      excerpt: 'An overview of the latest trends and innovations shaping industrial construction this year.',
      date: 'February 20, 2024',
      category: 'Industry',
      color: 'blue'
    },
    {
      id: 6,
      title: 'Quality Assurance in Construction',
      excerpt: 'The importance of rigorous quality control processes in ensuring project success.',
      date: 'February 15, 2024',
      category: 'Quality',
      color: 'orange'
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-800 bg-gradient-to-b from-gray-900 to-black py-24">
        <div className="container mx-auto px-4">
          <h1 className="mb-6 text-5xl font-black uppercase tracking-wider md:text-7xl">
            <span className="text-yellow-400">BLOG</span>{' '}
            <span className="text-blue-400">& INSIGHTS</span>
          </h1>
          <p className="max-w-3xl text-xl text-gray-300 md:text-2xl">
            Stay updated with the latest news, insights, and trends in the construction industry.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section ref={postsRef} className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="blog-post group relative overflow-hidden rounded-lg border border-gray-800 bg-gray-900/50 p-8 transition-all hover:border-yellow-400 hover:bg-gray-900"
              >
                <div className="mb-4 flex items-center gap-4">
                  <span className={`rounded-full px-4 py-1 text-xs font-bold uppercase ${
                    post.color === 'yellow' ? 'bg-yellow-400 text-black' :
                    post.color === 'blue' ? 'bg-blue-400 text-white' :
                    'bg-orange-400 text-white'
                  }`}>
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>

                <h2 className="mb-3 text-2xl font-bold transition-colors group-hover:text-yellow-400">
                  {post.title}
                </h2>

                <p className="mb-4 text-gray-400">{post.excerpt}</p>

                <Link
                  href={`/blog/${post.id}`}
                  className={`inline-flex items-center gap-2 font-semibold uppercase tracking-wider transition-colors ${
                    post.color === 'yellow' ? 'text-yellow-400 hover:text-yellow-300' :
                    post.color === 'blue' ? 'text-blue-400 hover:text-blue-300' :
                    'text-orange-400 hover:text-orange-300'
                  }`}
                >
                  Read More
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>

                {/* Hover Effect */}
                <div className={`absolute inset-0 rounded-lg border-2 opacity-0 transition-opacity group-hover:opacity-100 ${
                  post.color === 'yellow' ? 'border-yellow-400' :
                  post.color === 'blue' ? 'border-blue-400' :
                  'border-orange-400'
                }`}></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="border-t border-gray-800 bg-gradient-to-r from-yellow-400/10 via-blue-400/10 to-orange-400/10 py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-4xl font-black uppercase tracking-wider md:text-5xl">
            Stay <span className="text-yellow-400">Updated</span>
          </h2>
          <p className="mb-8 text-xl text-gray-300">
            Subscribe to our newsletter for the latest construction insights
          </p>
          <form className="mx-auto flex max-w-md flex-col gap-4 md:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-gray-800 bg-gray-900/50 px-6 py-4 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-yellow-400 px-8 py-4 font-bold uppercase text-black transition-all hover:scale-105 hover:bg-yellow-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

