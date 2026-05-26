import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ITEMS = [
    {
        title: 'End-to-End Ownership.',
        desc: 'I assume full responsibility for feature delivery across the entire stack, ensuring seamless integration from database to client.',
        icon: '⚡',
    },
    {
        title: 'Clean Architecture',
        desc: 'An advocate for clean code. I prioritize modular, scalable systems with clean separation of concerns and structured API designs.',
        icon: '🧱',
    },
    {
        title: 'Rapid Adaptation',
        desc: 'A fast learner capable of aggressively adopting and mastering new frameworks to meet product demands.',
        icon: '🚀',
    },
    {
        title: 'Product Focus',
        desc: 'I build for the user. I apply product-focused thinking to bridge the gap between technical execution and business value.',
        icon: '🎯',
    },
];

const Philosophy = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const lineRef = useRef(null);
    const cardsRef = useRef([]);

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

            // Line reveal
            gsap.fromTo(lineRef.current,
                { scaleX: 0 },
                {
                    scaleX: 1, duration: 0.8, ease: 'power2.inOut',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
                }
            );

            // Cards stagger
            gsap.fromTo(cardsRef.current,
                { opacity: 0, y: 50, scale: 0.96 },
                {
                    opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="philosophy" className="py-16 sm:py-20">
            <div className="flex items-center gap-4 mb-10 sm:mb-12">
                <h2 ref={headingRef} className="text-[26px] sm:text-[32px] whitespace-nowrap">Philosophy & Strengths</h2>
                <div ref={lineRef} className="flex-1 h-[2px] bg-black line-reveal"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
                {ITEMS.map((item, i) => (
                    <div
                        key={i}
                        ref={el => cardsRef.current[i] = el}
                        className="bg-white border-2 border-black p-7 sm:p-10 rounded-lg shadow-brutalist card-hover"
                    >
                        <div className="text-[28px] mb-3">{item.icon}</div>
                        <h3 className="text-[20px] sm:text-[24px] mb-3">{item.title}</h3>
                        <p className="text-[15px] sm:text-[17px]">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Philosophy;
