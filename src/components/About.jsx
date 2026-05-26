import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ── Vinyl Record SVG ── */
const VinylRecord = () => {
    const [paused, setPaused] = useState(false);
    return (
        <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => setPaused(!paused)}
            title={paused ? 'Click to play' : 'Click to pause'}
        >
            <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                className={`vinyl ${paused ? 'vinyl-paused' : ''}`}
            >
                {/* Outer ring */}
                <circle cx="60" cy="60" r="58" fill="#111" stroke="#222" strokeWidth="2" />
                {/* Grooves */}
                <circle cx="60" cy="60" r="48" fill="none" stroke="#1a1a1a" strokeWidth="0.5" />
                <circle cx="60" cy="60" r="42" fill="none" stroke="#1a1a1a" strokeWidth="0.5" />
                <circle cx="60" cy="60" r="36" fill="none" stroke="#1a1a1a" strokeWidth="0.5" />
                <circle cx="60" cy="60" r="30" fill="none" stroke="#1a1a1a" strokeWidth="0.5" />
                <circle cx="60" cy="60" r="24" fill="none" stroke="#1a1a1a" strokeWidth="0.5" />
                {/* Label */}
                <circle cx="60" cy="60" r="18" fill="#FFDF21" stroke="#111" strokeWidth="2" />
                <circle cx="60" cy="60" r="4" fill="#111" />
                {/* Shine reflection */}
                <ellipse cx="45" cy="45" rx="20" ry="10" fill="white" opacity="0.04" transform="rotate(-30 45 45)" />
            </svg>
        </div>
    );
};

/* ── Neural Network SVG ── */
const NeuralNetwork = () => {
    const nodes = [
        { x: 20, y: 25 }, { x: 55, y: 12 }, { x: 90, y: 28 },
        { x: 15, y: 60 }, { x: 50, y: 50 }, { x: 85, y: 55 },
        { x: 25, y: 88 }, { x: 60, y: 85 }, { x: 92, y: 80 },
    ];

    const connections = [
        [0, 1], [0, 3], [0, 4], [1, 2], [1, 4], [1, 5],
        [2, 5], [3, 4], [3, 6], [3, 7], [4, 5], [4, 7],
        [5, 8], [6, 7], [7, 8],
    ];

    return (
        <svg viewBox="0 0 110 100" className="w-full h-full" style={{ minHeight: '80px' }}>
            {connections.map(([a, b], i) => (
                <line
                    key={`l-${i}`}
                    x1={nodes[a].x} y1={nodes[a].y}
                    x2={nodes[b].x} y2={nodes[b].y}
                    stroke="#929559"
                    strokeWidth="1"
                    className="neural-line"
                    style={{ animationDelay: `${i * 0.15}s` }}
                />
            ))}
            {nodes.map((n, i) => (
                <circle
                    key={`n-${i}`}
                    cx={n.x} cy={n.y} r="4"
                    fill="#FFDF21"
                    stroke="#111"
                    strokeWidth="1.5"
                    className="neural-dot"
                    style={{ animationDelay: `${i * 0.3}s` }}
                />
            ))}
        </svg>
    );
};

/* ── Stat Counter ── */
const StatCounter = ({ end, suffix = '', label }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const triggered = useRef(false);

    useEffect(() => {
        const el = ref.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !triggered.current) {
                    triggered.current = true;
                    let start = 0;
                    const duration = 1500;
                    const startTime = performance.now();

                    const animate = (now) => {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease out cubic
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(eased * end));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );
        if (el) observer.observe(el);
        return () => { if (el) observer.unobserve(el); };
    }, [end]);

    return (
        <div ref={ref} className="text-center">
            <span className="text-[32px] sm:text-[40px] font-extrabold text-black leading-none">
                {count}{suffix}
            </span>
            <p className="text-[12px] sm:text-[13px] text-[#4A4A4A] font-semibold mt-1 uppercase tracking-wider">{label}</p>
        </div>
    );
};

/* ── About Section ── */
const About = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const lineRef = useRef(null);
    const tilesRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headingRef.current,
                { opacity: 0, x: -40 },
                {
                    opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
                }
            );

            gsap.fromTo(lineRef.current,
                { scaleX: 0 },
                {
                    scaleX: 1, duration: 0.8, ease: 'power2.inOut',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
                }
            );

            tilesRef.current.forEach((tile, i) => {
                if (!tile) return;
                gsap.fromTo(tile,
                    { opacity: 0, y: 40, scale: 0.95 },
                    {
                        opacity: 1, y: 0, scale: 1,
                        duration: 0.6,
                        delay: i * 0.08,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: tile,
                            start: 'top 88%',
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="about" className="py-16 sm:py-20">
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-10 sm:mb-12">
                <h2 ref={headingRef} className="text-[26px] sm:text-[32px] whitespace-nowrap">About Me</h2>
                <div ref={lineRef} className="flex-1 h-[2px] bg-black line-reveal"></div>
            </div>

            {/* Bento Grid */}
            <div className="bento-grid">
                {/* ── Tile 1: Bio (spans 2 cols on mobile, full left column on desktop) ── */}
                <div
                    ref={el => tilesRef.current[0] = el}
                    className="bento-tile col-span-2 md:col-span-1 md:row-span-2 flex flex-col justify-between"
                    style={{ background: 'linear-gradient(135deg, #fff 0%, #F8F5EE 100%)' }}
                >
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-2.5 h-2.5 bg-green-500 rounded-full pulse-dot"></span>
                            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#4A4A4A]">Who I am</span>
                        </div>
                        <h3 className="text-[24px] sm:text-[32px] font-extrabold leading-[1.15] mb-4">
                            I don't just write code.<br />
                            <span className="text-olive">I build systems</span> that
                            make businesses run.
                        </h3>
                        <p className="text-[15px] sm:text-[17px] leading-[1.7] text-[#4A4A4A]">
                            Full-stack engineer obsessed with clean architecture, scalable infrastructure, and
                            turning complex business logic into software that just works. I own features end-to-end — from
                            database design to the pixels on screen.
                        </p>
                    </div>
                    <div className="mt-6 flex items-center gap-3">
                        <span className="text-[13px] font-semibold bg-yellow px-3 py-1.5 rounded-full border border-black">React</span>
                        <span className="text-[13px] font-semibold bg-cream px-3 py-1.5 rounded-full border border-black">Node.js</span>
                        <span className="text-[13px] font-semibold bg-cream px-3 py-1.5 rounded-full border border-black">Angular</span>
                    </div>
                </div>

                {/* ── Tile 2: Location ── */}
                <div
                    ref={el => tilesRef.current[1] = el}
                    className="bento-tile flex flex-col justify-between bg-black !text-white"
                >
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#999]">Based in</span>
                    <div className="my-4 relative flex items-center justify-center">
                        {/* Dot grid background */}
                        <div className="absolute inset-0 opacity-20" style={{
                            backgroundImage: 'radial-gradient(circle, #555 1px, transparent 1px)',
                            backgroundSize: '12px 12px',
                        }}></div>
                        {/* Lagos dot */}
                        <div className="relative">
                            <span className="absolute w-4 h-4 bg-yellow rounded-full location-ping"></span>
                            <span className="relative w-4 h-4 bg-yellow rounded-full block border-2 border-black"></span>
                        </div>
                    </div>
                    <div>
                        <p className="text-[20px] sm:text-[22px] font-bold text-white">Lagos, Nigeria</p>
                        <p className="text-[13px] text-[#888]">Open to remote & hybrid</p>
                    </div>
                </div>

                {/* ── Tile 3: Now Playing (Music) ── */}
                <div
                    ref={el => tilesRef.current[2] = el}
                    className="bento-tile flex flex-col items-center justify-center gap-3"
                    style={{ background: '#111', color: '#fff' }}
                >
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#888] self-start">Vibes</span>
                    <VinylRecord />
                    <div className="text-center">
                        <p className="text-[14px] font-bold text-white">Always playing something</p>
                        <p className="text-[12px] text-[#888]">Music fuels the code</p>
                    </div>
                </div>

                {/* ── Tile 4: Stats ── */}
                <div
                    ref={el => tilesRef.current[3] = el}
                    className="bento-tile flex flex-col justify-center gap-4"
                    style={{ background: 'var(--color-yellow)', borderColor: '#111' }}
                >
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#4A4A4A]">Numbers</span>
                    <div className="flex flex-wrap justify-around gap-3">
                        <StatCounter end={6} suffix="+" label="Projects" />
                        <StatCounter end={5} suffix="+" label="Stacks" />
                    </div>
                </div>

                {/* ── Tile 5: Current Obsession (AI Agents) ── */}
                <div
                    ref={el => tilesRef.current[4] = el}
                    className="bento-tile flex flex-col justify-between"
                    style={{ background: 'linear-gradient(135deg, #F8F5EE 0%, #E8E4D9 100%)' }}
                >
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#4A4A4A]">Current Obsession</span>
                    <div className="my-3 flex-1 flex items-center justify-center">
                        <NeuralNetwork />
                    </div>
                    <div>
                        <p className="text-[18px] sm:text-[20px] font-bold">AI Agents</p>
                        <p className="text-[13px] text-[#4A4A4A]">Because they're just cool</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
