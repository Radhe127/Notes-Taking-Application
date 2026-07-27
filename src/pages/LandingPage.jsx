import { useAuth } from '../contexts/AuthContext.jsx'
import Wordmark from '../components/Wordmark.jsx'

export default function LandingPage() {
    const { signInWithGithub } = useAuth()

    return (
        <>
            <div className="glass-bg" aria-hidden="true">
                <div className="orb"></div>
                <div className="orb"></div>
                <div className="orb"></div>
            </div>

            <div className="landing-main">
                {/* Navigation */}
                <nav className="landing-nav">
                    <div className="landing-nav-inner">
                        <Wordmark />
                        <button className="btn btn-primary btn-sm" onClick={signInWithGithub}>
                            Start Writing
                        </button>
                    </div>
                </nav>

                {/* Hero */}
                <section className="landing-hero">
                    <div className="landing-hero-badge">✨ Modern Note-Taking</div>
                    <h1 className="landing-title">
                        Capture Every Idea, <span className="highlight">Beautifully Noted</span>
                    </h1>
                    <p className="landing-subtitle">
                        A sleek, distraction-free note-taking app with live Markdown preview,
                        instant autosave, and secure cloud sync. Signed in with GitHub —
                        your notes stay yours.
                    </p>
                    <div className="landing-actions">
                        <button className="btn btn-lg btn-primary landing-cta-primary" onClick={signInWithGithub}>
                            Create Your Notes
                        </button>
                        <a href="#features" className="link-btn landing-cta-secondary">
                            Explore Features →
                        </a>
                    </div>
                    <div className="landing-hero-visual">
                        <div className="landing-mockup">
                            <div className="landing-mockup-header">
                                <span className="landing-dot red"></span>
                                <span className="landing-dot yellow"></span>
                                <span className="landing-dot green"></span>
                            </div>
                            <div className="landing-mockup-body">
                                <div className="landing-mockup-line short"></div>
                                <div className="landing-mockup-line"></div>
                                <div className="landing-mockup-line"></div>
                                <div className="landing-mockup-line medium"></div>
                                <div className="landing-mockup-line"></div>
                                <div className="landing-mockup-line short"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section id="features" className="landing-features">
                    <div className="landing-section-header">
                        <h2 className="landing-section-title">Powerful Features</h2>
                        <p className="landing-section-desc">
                            Designed for speed and simplicity, letting you focus on creativity rather than tools.
                        </p>
                    </div>
                    <div className="landing-grid">
                        <div className="landing-card">
                            <span className="landing-card-icon">📝</span>
                            <h3 className="landing-card-title">Markdown Editor</h3>
                            <p className="landing-card-desc">
                                Write naturally with a live preview. Format text, create lists,
                                add code blocks and tables with intuitive syntax.
                            </p>
                            <div className="swatch green"></div>
                        </div>

                        <div className="landing-card">
                            <span className="landing-card-icon">⏱️</span>
                            <h3 className="landing-card-title">Instant Autosave</h3>
                            <p className="landing-card-desc">
                                Never lose your work again. Notes save automatically as you type.
                            </p>
                            <div className="swatch blue"></div>
                        </div>

                        <div className="landing-card">
                            <span className="landing-card-icon">🔒</span>
                            <h3 className="landing-card-title">Private & Secure</h3>
                            <p className="landing-card-desc">
                                Sign in with GitHub and your notes are locked to your account.
                                Only you can access them.
                            </p>
                            <div className="swatch red"></div>
                        </div>

                        <div className="landing-card">
                            <span className="landing-card-icon">🎨</span>
                            <h3 className="landing-card-title">Glassmorphic UI</h3>
                            <p className="landing-card-desc">
                                A modern, frosted-glass interface with light and dark themes,
                                optimized for readability and focus.
                            </p>
                            <div className="swatch gold"></div>
                        </div>
                    </div>
                </section>

                {/* Steps */}
                <section className="landing-steps">
                    <div className="landing-section-header">
                        <h2 className="landing-section-title">Get Started in 3 Steps</h2>
                        <p className="landing-section-desc">
                            From authentication to your first note — takes just 60 seconds.
                        </p>
                    </div>
                    <div className="landing-steps-list">
                        <div className="landing-step">
                            <div className="landing-step-visual">
                                <span className="landing-step-number">1</span>
                            </div>
                            <div>
                                <h3 className="landing-step-title">Authenticate</h3>
                                <p className="landing-step-desc">
                                    One-click GitHub login with no password required.
                                </p>
                            </div>
                        </div>

                        <div className="landing-step">
                            <div className="landing-step-visual">
                                <span className="landing-step-number">2</span>
                            </div>
                            <div>
                                <h3 className="landing-step-title">Create Notes</h3>
                                <p className="landing-step-desc">
                                    Write instantly in Markdown — see formatted results in real-time.
                                </p>
                            </div>
                        </div>

                        <div className="landing-step">
                            <div className="landing-step-visual">
                                <span className="landing-step-number">3</span>
                            </div>
                            <div>
                                <h3 className="landing-step-title">Sync Anywhere</h3>
                                <p className="landing-step-desc">
                                    Access your notes on any device instantly. Always up-to-date.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="landing-stats">
                    <div className="landing-stat">
                        <span className="landing-stat-number">50K+</span>
                        <span className="landing-stat-label">Active Users</span>
                    </div>
                    <div className="landing-stat">
                        <span className="landing-stat-number">1.2M+</span>
                        <span className="landing-stat-label">Notes Stored</span>
                    </div>
                    <div className="landing-stat">
                        <span className="landing-stat-number">⭐</span>
                        <span className="landing-stat-label">Syncs Per Day</span>
                    </div>
                </section>

                {/* CTA */}
                <section className="landing-cta">
                    <h2 className="landing-cta-title">Ready to Start Your Note-Taking Journey?</h2>
                    <p className="landing-cta-desc">
                        Join thousands of creators who trusted Note for its simplicity and power.
                    </p>
                    <button className="btn btn-xl btn-primary landing-cta-btn" onClick={signInWithGithub}>
                        Start Free Today
                    </button>
                </section>

                {/* Footer */}
                <footer className="landing-footer">
                    <div className="landing-footer-inner">
                        <Wordmark />
                        <p className="landing-footer-text">
                            Built with React, Vite, and Supabase. All notes are private to your account.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    )
}