import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const subtextRef = useRef(null);
    const ctaRef = useRef(null);
    const badgeRef = useRef(null);
    const visualRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.fromTo(badgeRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, delay: 0.4 }
            )
            .fromTo(headingRef.current.querySelectorAll('.word'),
                { opacity: 0, y: 60, rotateX: -15 },
                { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.06 },
                '-=0.3'
            )
            .fromTo(subtextRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.7 },
                '-=0.4'
            )
            .fromTo(ctaRef.current,
                { opacity: 0, y: 20, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5 },
                '-=0.3'
            )
            .fromTo(visualRef.current,
                { opacity: 0, x: 60, scale: 0.95 },
                { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power2.out' },
                '-=0.8'
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const headingText = "Systems architecture that scale, not just clean code";
    const words = headingText.split(' ');

    return (
        <section ref={sectionRef} className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-[60px] min-h-[60vh] lg:min-h-[75vh] w-full mt-4 lg:mt-0">
            <div className="flex-1 max-w-[560px] flex flex-col items-center text-center lg:items-start lg:text-left">
                <div ref={badgeRef} className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.15em] text-[#4A4A4A] mb-5 sm:mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full pulse-dot"></span>
                    AVAILABLE FOR WORK — FULL-STACK ENGINEER
                </div>

                <h1 ref={headingRef} className="text-[36px] sm:text-[48px] lg:text-[clamp(48px,5vw,62px)] leading-[1.08] mb-5 sm:mb-6 font-bold" style={{ perspective: '600px' }}>
                    {words.map((word, i) => {
                        const isHighlight = word === 'scale,' || word === 'clean' || word === 'code';
                        return (
                            <span key={i} className={`word inline-block mr-[0.3em] ${isHighlight ? 'text-olive font-extrabold' : ''}`}>
                                {word}
                            </span>
                        );
                    })}
                </h1>

                <p ref={subtextRef} className="text-[16px] sm:text-[19px] leading-[1.6] mb-8 sm:mb-10 text-[#4A4A4A] max-w-[480px]">
                    I combine solid engineering principles and thoughtful system design to help businesses run flawlessly and efficiently.
                </p>

                <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 items-center">
                    <a href="#projects" className="btn btn-primary text-[16px] sm:text-[17px] px-7 py-3.5">
                        See what I've built
                    </a>
                    <a href="#philosophy" className="btn btn-secondary text-[15px] px-5 py-3">
                        My approach
                    </a>
                </div>
            </div>

            <div ref={visualRef} className="flex-1 relative h-[400px] sm:h-[500px] lg:h-[560px] w-full max-w-[560px] hidden sm:block">
                {/* Main Pill */}
                <div className="absolute border-[3px] border-black rounded-full overflow-hidden w-[200px] sm:w-[250px] lg:w-[280px] h-[360px] sm:h-[440px] lg:h-[500px] left-0 sm:left-[5%] top-[20px] z-[2] bg-[#F2EAD8]">
                    <img src="./asset/img/me-removebg-preview.png" alt="Odetoyinbo Oluwapelumi" className="w-full h-full object-cover object-top" />
                </div>

                {/* Secondary Pill */}
                <div className="absolute border-[3px] border-black rounded-full overflow-hidden w-[180px] sm:w-[220px] lg:w-[250px] h-[330px] sm:h-[400px] lg:h-[460px] right-0 sm:right-[5%] top-[60px] sm:top-[80px] z-[1] bg-yellow">
                    <img src="./asset/img/phone_onboarding.png" alt="Mobile App UI" className="w-full h-full object-cover object-center" />
                </div>

                {/* Floating Badges */}
                <div className="absolute bg-white rounded-full py-2.5 sm:py-3 px-4 sm:px-6 text-[12px] sm:text-[14px] font-semibold shadow-elevated whitespace-nowrap z-10 top-[40px] sm:top-[60px] left-[30%] sm:left-[25%] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-yellow rounded-full inline-block"></span> Full-Stack Engineer
                </div>

                <div className="absolute bg-white rounded-[24px_24px_24px_8px] py-4 sm:py-6 px-5 sm:px-8 text-[#4A4A4A] leading-[1.5] font-medium text-[14px] sm:text-[15px] shadow-elevated z-10 bottom-[10px] sm:bottom-[20px] left-[-10px] sm:left-[-40px] max-w-[220px] sm:max-w-none">
                    Designing systems that help<br />
                    <strong className="text-black font-bold">businesses scale efficiently</strong>
                </div>

                <div className="absolute w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center shadow-soft border-[3px] border-black z-10 left-[45%] sm:left-[42%] top-[200px] sm:top-[240px] bg-white p-0">
                    <span className="w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-yellow border-2 border-black"></span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
