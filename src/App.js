import React, { useEffect, useRef, useState } from 'react';
import './App.css';

/* ─────────────────────────────────────────
   Floating particles for hero background
───────────────────────────────────────── */
function HeroParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 3 + 1}px`,
    duration: `${Math.random() * 15 + 10}s`,
    delay: `${Math.random() * 10}s`,
  }));

  return (
    <>
      {particles.map(p => (
        <span
          key={p.id}
          className="hero-particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </>
  );
}

/* ─────────────────────────────────────────
   Skill Card
───────────────────────────────────────── */
function SkillCard({ icon, title, desc, tags, delay }) {
  return (
    <div className={`skill-card reveal reveal-delay-${delay}`}>
      <div className="skill-icon">{icon}</div>
      <h3>{title}</h3>
      <p style={{ marginBottom: '1.2rem' }}>{desc}</p>
      <div>
        {tags.map(tag => (
          <span key={tag} className="tech-tag">{tag}</span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Project Card
───────────────────────────────────────── */
function ProjectCard({ number, img, alt, title, category, delay }) {
  return (
    <div className={`project-card reveal reveal-delay-${delay}`}>
      <div className="project-image-wrap">
        <img src={img} alt={alt} loading="lazy" />
        <span className="project-number">0{number}</span>
        <div className="project-overlay">
          <span className="project-cta">View Case Study</span>
        </div>
      </div>
      <div className="project-meta">
        <h4 className="project-title">{title}</h4>
        <p className="project-category">{category}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Contact Info Row
───────────────────────────────────────── */
function ContactRow({ icon, label, value, href }) {
  return (
    <a
      className="contact-info-card"
      href={href}
      target={href.startsWith('http') ? '_blank' : '_self'}
      rel="noreferrer"
      style={{ textDecoration: 'none' }}
    >
      <div className="contact-icon">{icon}</div>
      <div>
        <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6b7280', marginBottom: '2px' }}>{label}</div>
        <div style={{ fontSize: '0.85rem', color: '#d1d5db' }}>{value}</div>
      </div>
    </a>
  );
}

/* ─────────────────────────────────────────
   Main App
───────────────────────────────────────── */
function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cursorRef = useRef(null);

  /* ── Scroll observer ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Intersection Observer for reveal animations ── */
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* ── Cursor glow ── */
  useEffect(() => {
    const move = e => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top  = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  /* ── Smooth scroll for nav links ── */
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Cursor glow */}
      <div ref={cursorRef} className="cursor-glow" />

      {/* ── NAVBAR ── */}
      <nav className={`glass-nav${scrolled ? ' scrolled' : ''}`}
           style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', height: '76px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <span className="font-playfair gold-text-gradient" style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '0.1em' }}>
              AB
            </span>
          </button>

          {/* Desktop links */}
          <div style={{ display: 'flex', gap: '2.5rem' }} className="desktop-nav">
            {['hero', 'about', 'skills', 'projects', 'contact'].map((id, i) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="nav-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {['Home', 'About', 'Expertise', 'Portfolio', 'Contact'][i]}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none' }}
            className="hamburger-btn"
            aria-label="Menu"
          >
            <svg width="22" height="22" fill="none" stroke="#C9A227" viewBox="0 0 24 24">
              {mobileOpen
                ? <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeWidth="1.5"/>
                : <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeWidth="1.5"/>
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{ background: 'rgba(11,11,11,0.97)', borderTop: '1px solid rgba(201,162,39,0.1)', padding: '1rem 1.5rem' }}>
            {['hero', 'about', 'skills', 'projects', 'contact'].map((id, i) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{ display: 'block', background: 'none', border: 'none', color: '#9ca3af', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0.7rem 0', cursor: 'pointer', width: '100%', textAlign: 'left' }}
              >
                {['Home', 'About', 'Expertise', 'Portfolio', 'Contact'][i]}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="hero-section">
        <div className="hero-ambient-1" />
        <div className="hero-ambient-2" />
        <HeroParticles />

        <div style={{ textAlign: 'center', position: 'relative', zIndex: 10, maxWidth: '820px', padding: '0 24px' }}>
          <p className="hero-tagline" style={{ fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#4b5563', marginBottom: '1.5rem' }}>
            <span className="tagline-line" />
            Software Engineering Student &amp; Aspiring Architect · New York
            <span className="tagline-line" />
          </p>

          <h1 className="hero-title">
            Alexander<br />Black
          </h1>

          <p className="hero-subtitle" style={{ fontSize: '1rem', color: '#9ca3af', fontWeight: 300, lineHeight: 1.8, maxWidth: '560px', margin: '2rem auto' }}>
            Crafting bespoke digital experiences for those who demand excellence —
            where high-end design meets cutting-edge engineering.
          </p>

          <div className="hero-cta" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem' }}>
            <a className="btn-outline-light" href="/resume.pdf" download>
              <span>↓ Download Resume</span>
            </a>
            <button className="btn-gold" onClick={() => scrollTo('projects')} style={{ border: 'none', cursor: 'pointer' }}>
              <span>View Projects</span>
            </button>
            <button className="btn-outline-gold" onClick={() => scrollTo('contact')} style={{ cursor: 'pointer' }}>
              <span>Get in Touch</span>
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span>Scroll</span>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="about-section">
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <div className="section-header reveal">
            <span className="section-eyebrow">Who I Am</span>
            <h2 className="section-title">About Me</h2>
            <div className="section-divider" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '5rem', alignItems: 'center' }} className="about-grid">
            {/* Portrait */}
            <div className="portrait-wrapper reveal-left">
              <div className="portrait-decorator" />
              <div className="portrait-frame">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS6LOuHZSll8YC54oUM71XyFKuuB0FTfNS54JUs5lPilTxtqJThRzwJpGYIEXcFiFh8V8Phs4GwJ8FivC6ynHI1WPajqnHj8B5cUl8guBCpRqw7HWJnjRQxxrJRbVrlv4QG2_5DJdCsi_hWPGfhgzQ5HcFsGlTAOCYnZdvJdIqFRdde-429VS9FlueD798Hjz11F7zedGH5WVODht45U2VDSKBCWqk1C8dBqLuu9d8mdr5_OhEoO9rNt54b-vke4_sX9lgaAAUVCs0"
                  alt="Alexander Black — Portrait"
                />
              </div>
              <div className="portrait-badge">
                <strong>4.0</strong>
                <small>GPA</small>
              </div>
            </div>

            {/* Text */}
            <div className="reveal-right">
              <h2 className="font-playfair" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', marginBottom: '0.5rem' }}>
                Driven Academic
              </h2>
              <h2 className="font-playfair gold-text-gradient" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontStyle: 'italic', marginBottom: '0.4rem' }}>
                Excellence
              </h2>
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#4b5563', display: 'block', marginBottom: '2rem' }}>
                Top 5% of Software Engineering Class
              </span>

              <p style={{ color: '#9ca3af', lineHeight: 1.85, marginBottom: '1rem', fontSize: '0.9rem' }}>
                Currently pursuing a degree in Software Engineering, I am dedicated to mastering
                the complexities of distributed systems and modern web architecture. My academic
                journey is defined by a relentless pursuit of technical depth and elegant problem-solving.
              </p>
              <p style={{ color: '#9ca3af', lineHeight: 1.85, marginBottom: '2rem', fontSize: '0.9rem' }}>
                From leading university development teams to contributing to high-impact open-source
                projects, I apply a meticulous approach to every line of code — building scalable
                solutions that bridge theory and real-world application.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
                <div className="stat-card-gold">
                  <div className="stat-value">Fortune 500</div>
                  <div className="stat-label">Internship Experience</div>
                </div>
                <div className="stat-card-gold" style={{ paddingLeft: '1.5rem', borderLeft: '1px solid rgba(201, 162, 39, 0.12)' }}>
                  <div className="stat-value">Dean's List</div>
                  <div className="stat-label">Academic Excellence &amp; Open Source</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="skills-section">
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <div className="section-header reveal">
            <span className="section-eyebrow">My Capabilities</span>
            <h2 className="section-title">The Toolkit</h2>
            <div className="section-divider" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <SkillCard
              delay={1}
              icon={
                <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                </svg>
              }
              title="Frontend Mastery"
              desc="Architecting reactive interfaces with React, Vue, and high-performance CSS frameworks for fluid, pixel-perfect user interactions."
              tags={['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']}
            />
            <SkillCard
              delay={2}
              icon={
                <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                </svg>
              }
              title="Core Infrastructure"
              desc="Engineering robust server-side ecosystems with Node.js, Python, and Go — focusing on distributed systems, security, and cloud architecture."
              tags={['Node.js', 'Python', 'Go', 'PostgreSQL', 'AWS']}
            />
            <SkillCard
              delay={3}
              icon={
                <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                </svg>
              }
              title="UI / UX Design"
              desc="Bespoke visual narratives crafted with high-fidelity prototyping, emphasizing negative space, typographic hierarchy, and micro-animation."
              tags={['Figma', 'Adobe XD', 'Prototyping', 'Design Systems']}
            />
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="projects-section">
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '1rem' }} className="reveal">
            <div>
              <span className="section-eyebrow">My Work</span>
              <h2 className="section-title font-playfair">Selected Works</h2>
            </div>
            <button
              onClick={() => scrollTo('projects')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C9A227', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', borderBottom: '1px solid #C9A227', paddingBottom: '2px' }}
            >
              See all projects →
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
            <ProjectCard
              number={1}
              delay={1}
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuAoqdr6Ngpio6b-tNpNQw3wwOUBEtIhFcR4ox7uywlwCz-yeWGjqx3oQWxQXXU9yb_iBvKRBd-2yRLuDci5FSwO9NQ_tZhJ21jPgE7U1oN_8tU6_C71XfzU9hchCKGatbZDIFUbhJwRrMnywz-bA6dHU9CDa_wnuBBVOpY1Mlv4z97lkc6EjhLFFJOXS6OX9aKVC2pOxXVUukIJn5esds2BTNo6eR__QP_lcRRy1AWb8NcUekR9A-Laa6BB8wRwpyPctvvP3Sw3gQxP"
              alt="Aethelgard Watch Co. Project"
              title="Aethelgard Watch Co."
              category="E-Commerce Architecture"
            />
            <ProjectCard
              number={2}
              delay={2}
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuDsIGPaxfl-q_rjUP0KcByB2gwxUBASBffDCDf1ivxFH_1vy50_wb7k9xvKMODrZJtQbmK77RKAqnIMi8fqVKW5oSvzpUT6_tKc8Ea2C3DqDle7onBBZFmNNyP8P3UgrPCqFF1VruZNk7DpfCe55ykGRfHh2WrUT-PXH71VsYEUZmjxJmoDnGRDL-sYpx_hXj9mpe1G13Sc8uGWquVeo6rF1L0Gn282nOK1Ti5zj4RYJkfYhQXChEHNCqkmRICcQ_uNG8LTQsSql-68"
              alt="Lumière Estate Project"
              title="Lumière Estate"
              category="Immersive Real Estate Experience"
            />
            <ProjectCard
              number={3}
              delay={3}
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuArY93d23PgNIHBHl8f31iDYN0LB1PL2KwcwyJvOguiTyYN1P435m-TKc4uivVYftQZw6lvAo_BvEsoZkcgN1NKjym8AJYemzw_Xurkvvt5TqPzAbhccL6UqH6Fuzke_Xj4V78hPwh3zaeR-LDiYZd2KK9J0Vd7PZkRn9QsesV9Ax2xwgnBhqW8tvv3X66vLzUjXKUcMdOL0B4WH7xPZ8noYf9OcTSMV-Xqmub2Z3iey59yVwys6hIqwpLciMjVjw0npRcEqsCW9Sbv"
              alt="Vanta Modern Gallery Project"
              title="Vanta Modern Gallery"
              category="Web3 Curated Art Space"
            />
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="contact-section">
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
          <div className="section-header reveal">
            <span className="section-eyebrow">Let's Connect</span>
            <h2 className="section-title font-playfair">Get in Touch</h2>
            <div className="section-divider" />
            <p style={{ marginTop: '1.2rem', color: '#6b7280', fontSize: '0.85rem', lineHeight: 1.7 }}>
              Available for internship opportunities and collaborative research.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'start' }} className="contact-grid">
            {/* Info */}
            <div className="reveal-left">
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4b5563', marginBottom: '1.5rem' }}>
                Contact Details
              </p>

              <ContactRow
                icon={
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                  </svg>
                }
                label="Email"
                value="alexander.black@portfolio.com"
                href="mailto:alexander.black@portfolio.com"
              />

              <ContactRow
                icon={
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                  </svg>
                }
                label="Location"
                value="New York, USA"
                href="https://maps.google.com/?q=New+York"
              />

              <ContactRow
                icon={
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                    <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                }
                label="LinkedIn"
                value="linkedin.com/in/alexanderblack"
                href="https://linkedin.com/in/alexanderblack"
              />

              <ContactRow
                icon={
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                  </svg>
                }
                label="GitHub"
                value="github.com/alexanderblack"
                href="https://github.com/alexanderblack"
              />
            </div>

            {/* Form */}
            <div className="reveal-right">
              <form
                onSubmit={e => { e.preventDefault(); alert('Message sent! I will get back to you soon.'); }}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 2rem' }}>
                  <div className="field-wrap">
                    <input type="text" id="name" name="name" placeholder=" " required />
                    <label htmlFor="name">Full Name</label>
                    <div className="field-line" />
                  </div>
                  <div className="field-wrap">
                    <input type="email" id="email" name="email" placeholder=" " required />
                    <label htmlFor="email">Email Address</label>
                    <div className="field-line" />
                  </div>
                </div>

                <div className="field-wrap">
                  <input type="text" id="subject" name="subject" placeholder=" " />
                  <label htmlFor="subject">Subject</label>
                  <div className="field-line" />
                </div>

                <div className="field-wrap">
                  <textarea id="message" name="message" rows={5} placeholder=" " required />
                  <label htmlFor="message">Your Vision</label>
                  <div className="field-line" />
                </div>

                <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
                  <button type="submit" className="btn-gold" style={{ cursor: 'pointer', border: 'none' }}>
                    <span>Send Message →</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}>
            <div className="font-playfair gold-text-gradient" style={{ fontSize: '1.4rem', fontWeight: 700 }}>
              Alexander Black
            </div>

            <div className="footer-social" style={{ display: 'flex', gap: '0.6rem' }}>
              {[
                { label: 'LI', href: 'https://linkedin.com/in/alexanderblack', title: 'LinkedIn' },
                { label: 'GH', href: 'https://github.com/alexanderblack', title: 'GitHub' },
                { label: 'DR', href: 'https://dribbble.com/alexanderblack', title: 'Dribbble' },
                { label: 'IG', href: 'https://instagram.com/alexanderblack', title: 'Instagram' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" title={s.title}>
                  {s.label}
                </a>
              ))}
            </div>

            <p style={{ fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#374151' }}>
              © 2024 Alexander Black · All Rights Reserved
            </p>
          </div>
        </div>
      </footer>

      {/* ── Responsive Styles (injected) ── */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: block !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .portrait-wrapper { margin: 0 auto; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .cursor-glow { display: none; }
        }
      `}</style>
    </>
  );
}

export default App;
