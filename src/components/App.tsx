import { useEffect, useRef, useState } from 'react'
import '../css/App.css'
import SnowFall from 'react-snowfall'
import profileImage from '../assets/profile.jpeg'
import { SkillsSection } from './Skills'
import { ShowcasesSection } from './Showcases'


type SocialName = 'linkedin' | 'github' | 'instagram' | 'mail'

const socials: { label: string; href: string; icon: SocialName }[] = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/khaled-sharafeddin', icon: 'linkedin' },
  { label: 'GitHub', href: 'https://github.com/ksharaff', icon: 'github' },
  { label: 'Instagram', href: 'https://www.instagram.com/khaledsharaff/', icon: 'instagram' },
  { label: 'Email', href: 'mailto:khaled.sharafeddin@outlook.com', icon: 'mail' },
]

const SocialIcon = ({ name }: { name: SocialName }) => {
  switch (name) {
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" aria-hidden focusable="false">
          <path d="M5.2 8.6H2.5v12.8h2.7zM3.8 3.6a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2zM12.9 13c0-1.1.6-1.9 1.7-1.9.9 0 1.3.6 1.5 1.2.1.2.1.5.1.7v8.4h2.7v-8.9c0-2.4-1.3-3.6-3.1-3.6-1.5 0-2.2.8-2.6 1.4v-1.1h-2.7v12.2h2.7z" />
        </svg>
      )
    case 'github':
      return (
        <svg viewBox="0 0 24 24" aria-hidden focusable="false">
          <path d="M12 2.4a9.6 9.6 0 0 0-3 18.7c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.4-1-.9-1.3-.9-1.3-.8-.6 0-.6 0-.6.9.1 1.4 1 1.4 1 .8 1.4 2.2 1 2.8.8.1-.6.3-1 .6-1.3-2.2-.3-4.6-1.1-4.6-5a3.8 3.8 0 0 1 1-2.6 3.4 3.4 0 0 1 .1-2.6s.8-.3 2.7 1a9.2 9.2 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1a3.4 3.4 0 0 1 .1 2.6 3.8 3.8 0 0 1 1 2.6c0 3.9-2.4 4.7-4.6 5 .3.2.7.8.7 1.7v2.5c0 .3.2.6.7.5A9.6 9.6 0 0 0 12 2.4z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" aria-hidden focusable="false">
          <path d="M7.8 3.6h8.4a3.8 3.8 0 0 1 3.8 3.8v8.4a3.8 3.8 0 0 1-3.8 3.8H7.8a3.8 3.8 0 0 1-3.8-3.8V7.4a3.8 3.8 0 0 1 3.8-3.8zm0 2.2A1.6 1.6 0 0 0 6.2 7.4v8.4c0 .9.7 1.6 1.6 1.6h8.4c.9 0 1.6-.7 1.6-1.6V7.4c0-.9-.7-1.6-1.6-1.6H7.8zm9.2-.2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-5 2a4.1 4.1 0 1 1 0 8.2 4.1 4.1 0 0 1 0-8.2zm0 2.2a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8z" />
        </svg>
      )
    case 'mail':
      return (
        <svg viewBox="0 0 24 24" aria-hidden focusable="false">
          <path d="M4 6.2h16c.6 0 1 .5 1 1v9.6c0 .5-.4 1-1 1H4c-.6 0-1-.5-1-1V7.2c0-.5.4-1 1-1zm0 2.1v7.5h16V8.3l-7.4 4.3a1.8 1.8 0 0 1-1.7 0z" />
        </svg>
      )
    default:
      return null
  }
}

// Data and components are now in separate files for code-splitting

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [snowCount, setSnowCount] = useState(200)
  const containerRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  // Cursor follower effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    if (!cursorRef.current) return
    const cursor = cursorRef.current
    let x = cursorPos.x
    let y = cursorPos.y

    const animate = () => {
      x += (cursorPos.x - x) * 0.2
      y += (cursorPos.y - y) * 0.2
      cursor.style.left = x - 12 + 'px'
      cursor.style.top = y - 12 + 'px'
      requestAnimationFrame(animate)
    }

    const id = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(id)
  }, [cursorPos])

  // Scroll-triggered animations for cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const cards = document.querySelectorAll('.showcase-card, .skill-card')
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  // Hero parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const hero = containerRef.current?.querySelector('.hero')
      if (!hero) return
      const scrollY = containerRef.current?.scrollTop || 0
      const parallaxEl = hero.querySelector('.parallax-bg')
      if (parallaxEl) {
        ;(parallaxEl as HTMLElement).style.transform = `translateY(${scrollY * 0.5}px)`
      }
    }

    const el = containerRef.current
    if (el) el.addEventListener('scroll', handleScroll)
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Update scroll progress bar
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleScroll = () => {
      const scrollTop = el.scrollTop
      const scrollHeight = el.scrollHeight - el.clientHeight
      const scrollPercent = (scrollTop / scrollHeight) * 100

      const progressBar = document.querySelector('.nav-progress')
      if (progressBar) {
        ;(progressBar as HTMLElement).style.width = `${scrollPercent}%`
      }
    }

    el.addEventListener('scroll', handleScroll)
    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  // Adaptive snowfall for mobile and reduced motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const updateSnow = () => {
      const w = window.innerWidth
      const isSmall = w < 768
      setSnowCount(prefersReducedMotion ? 0 : isSmall ? 80 : 200)
    }
    updateSnow()
    window.addEventListener('resize', updateSnow)
    return () => window.removeEventListener('resize', updateSnow)
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  // Track active section on scroll
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleScroll = () => {
      const sections = Array.from(
        el.querySelectorAll<HTMLElement>('.snap-section[id]'),
      )
      
      let current = 'profile'
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= window.innerHeight / 2) {
          current = section.id
        }
      })
      
      // Update active nav links
      const navLinks = el.querySelectorAll('.nav a')
      navLinks.forEach((link) => {
        link.classList.remove('active')
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active')
        }
      })
    }

    el.addEventListener('scroll', handleScroll)
    return () => {
      el.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Smooth, section-per-scroll behavior for mouse wheels
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let currentIndex = 0
    let animating = false
    let timer: number | undefined

    const clamp = (n: number, min: number, max: number) =>
      Math.max(min, Math.min(max, n))

    const getSections = () =>
      Array.from(el.querySelectorAll<HTMLElement>('.snap-section'))

    const settle = (targetIndex: number) => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        const sections = getSections()
        const target = sections[targetIndex]
        if (target) {
          el.scrollTo({ top: target.offsetTop })
        }
        currentIndex = targetIndex
        animating = false
      }, 600)
    }

    const onWheel = (e: WheelEvent) => {
      // Prevent the default incremental wheel to avoid jitter
      e.preventDefault()
      const sections = getSections()
      if (animating || sections.length === 0) return
      const dir = Math.sign(e.deltaY)
      if (dir === 0) return
      const targetIndex = clamp(currentIndex + dir, 0, sections.length - 1)
      if (targetIndex === currentIndex) return
      animating = true
      sections[targetIndex].scrollIntoView({ behavior: 'smooth', block: 'start' })
      settle(targetIndex)
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el.removeEventListener('wheel', onWheel as EventListener)
      window.clearTimeout(timer)
    }
  }, [])

  // Configuration 
  return (
    <div className="page" ref={containerRef}>
      <SnowFall color="white" snowflakeCount={snowCount} />
      <header className="top-bar">
        <div className="brand">
          <div>Khaled</div>
          <div>Sharafeddin.</div>
        </div>
        <nav className="nav">
          <a className="active" href="#profile">
            Profile
          </a>
          <a href="#skills">Skills</a>
          <a href="#showcases">Showcases</a>
        </nav>
        <button
          className="theme-toggle"
          aria-label="Toggle theme"
          data-theme={theme}
          onClick={toggleTheme}
        >
          <span className="toggle-dot" />
        </button>
        <div className="nav-progress" aria-hidden />
      </header>
      <main className="snap-section hero" id="profile">
        <div className="parallax-bg" aria-hidden />
        <div className="left-rail" aria-hidden>
          <span />
          <span />
          <span />
          <span />
        </div>

        <section className="intro">
          <p className="eyebrow">Hello,</p>
          <h1>
            My name is <span className="highlight">Khaled</span>
          </h1>
          <p className="body-text">
            My areas of interest include problem-solving, cloud infrastructure,
            machine learning, and IoT.
          </p>
          <p className="body-text">
            With a detail oriented-focus, I enjoy creating simple but effective
            solutions to improve application performance, ease of maintenance,
            and user experience.
          </p>
          <a className="resume" href="#resume">
            My resume
          </a>
        </section>

        <section className="portrait" aria-label="Profile photo">
          <div className="photo-frame">
            <img
              src={profileImage}
              alt="Portrait"
            />
          </div>
          <div className="photo-shadow" />
          <div className="cursor-follower" ref={cursorRef} />
          <div className="portrait-socials" aria-label="Social links">
            {socials.map((item) => (
              <a
                key={item.label}
                className="social-chip"
                href={item.href}
                aria-label={item.label}
              >
                <SocialIcon name={item.icon} />
              </a>
            ))}
          </div>
        </section>

        <div className="scroll-cue" aria-hidden>
          <span>Scroll Down</span>
          <div className="cue-line" />
        </div>
      </main>

      {/* Skills section */}
      <SkillsSection />

      <ShowcasesSection />

      {/* Contact section removed as requested */}
    </div>
  )
}

export default App
