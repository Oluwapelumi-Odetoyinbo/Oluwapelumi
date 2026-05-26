import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ITEMS = [
    'React', 'React Native', 'Angular', 'Node.js', 'Express', 'TypeScript',
    'MongoDB', 'Tailwind CSS', 'NgRx', 'REST APIs', 'JWT', 'Vite',
];

const Marquee = () => {
    const wrapRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(wrapRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: wrapRef.current,
                        start: 'top 90%',
                    },
                }
            );
        }, wrapRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={wrapRef} className="w-full border-y-2 border-black py-5 sm:py-6 overflow-hidden bg-white my-4 sm:my-8">
            <div className="marquee-track flex whitespace-nowrap">
                {[...ITEMS, ...ITEMS].map((item, i) => (
                    <span key={i} className="mx-4 sm:mx-8 text-[14px] sm:text-[16px] font-semibold text-black flex items-center gap-2 sm:gap-3 shrink-0">
                        <span className="w-2 h-2 bg-yellow rounded-full border border-black"></span>
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Marquee;
