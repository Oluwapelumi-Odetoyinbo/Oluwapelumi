import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const MILESTONES = [
    {
        title: 'Core Banking Systems',
        domain: 'Financial Infrastructure',
        desc: 'Working across core banking platforms and business finance systems — building software that handles real money, real transactions, and real scale.',
        accent: '#00B4D8',
        active: true,
    },
    {
        title: 'Swift — Payment Gateway',
        domain: 'Fintech',
        desc: 'Built a unified payment and accounting infrastructure that embeds financial automation directly into the payment flow. Shipped to production.',
        accent: '#FFDF21',
    },
    {
        title: 'PocketCare AI',
        domain: 'HealthTech / AI',
        desc: 'Designed an AI-powered health assistant for medication tracking, first-aid guidance, and offline-first support. Human-centered problem solving with AI.',
        accent: '#10B981',
    },
    {
        title: 'Velox & HRS',
        domain: 'Business Platforms',
        desc: 'Architected inventory management and hotel reservation systems end-to-end. Backend parity, state management, analytics dashboards, role-based access.',
        accent: '#FF6B35',
    },
    {
        title: 'The Beginning',
        domain: 'Self-Taught Engineer',
        desc: 'Started the journey into software engineering. Aggressive self-learning across React, Node.js, Angular, React Native. Went from zero to shipping production apps.',
        accent: '#6C63FF',
    },
];

const Experience = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const lineRef = useRef(null);
    const timelineRef = useRef(null);
    const fillRef = useRef(null);
    const nodesRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading animation
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

            // Timeline line draw on scroll
            if (fillRef.current) {
                gsap.to(fillRef.current, {
                    scaleY: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: timelineRef.current,
                        start: 'top 70%',
                        end: 'bottom 40%',
                        scrub: 0.8,
                    },
                });
            }

            // Nodes animate in
            nodesRef.current.forEach((node, i) => {
                if (!node) return;
                const isEven = i % 2 === 1;
                gsap.fromTo(node,
                    {
                        opacity: 0,
                        x: window.innerWidth >= 768 ? (isEven ? -50 : 50) : 30,
                        y: 20,
                    },
                    {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        duration: 0.7,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: node,
                            start: 'top 85%',
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="experience" className="py-16 sm:py-20">
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-10 sm:mb-14">
                <h2 ref={headingRef} className="text-[26px] sm:text-[32px] whitespace-nowrap">Experience</h2>
                <div ref={lineRef} className="flex-1 h-[2px] bg-black line-reveal"></div>
            </div>

            {/* Timeline */}
            <div ref={timelineRef} className="relative">
                {/* Vertical line */}
                <div className="timeline-line">
                    <div ref={fillRef} className="timeline-line-fill" style={{ height: '100%' }}></div>
                </div>

                {/* Nodes */}
                {MILESTONES.map((m, i) => (
                    <div
                        key={i}
                        ref={el => nodesRef.current[i] = el}
                        className="timeline-node"
                    >
                        {/* Dot */}
                        <div className={`timeline-dot ${m.active ? 'timeline-dot-active pulse-dot' : ''}`}
                             style={!m.active ? { background: m.accent } : undefined}
                        ></div>

                        {/* Card */}
                        <div className="bg-white border-2 border-black rounded-lg p-5 sm:p-7 shadow-brutalist card-hover group">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                                <span
                                    className="w-fit text-[11px] sm:text-[12px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-black"
                                    style={{ backgroundColor: m.accent + '25', color: '#111' }}
                                >
                                    {m.domain}
                                </span>
                                {m.active && (
                                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-green-600 uppercase tracking-wider">
                                        <span className="w-2 h-2 bg-green-500 rounded-full pulse-dot"></span>
                                        Current
                                    </span>
                                )}
                            </div>
                            <h3 className="text-[20px] sm:text-[24px] font-bold mb-2 group-hover:text-olive transition-colors duration-300">
                                {m.title}
                            </h3>
                            <p className="text-[14px] sm:text-[16px] leading-[1.7] text-[#4A4A4A]">
                                {m.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
