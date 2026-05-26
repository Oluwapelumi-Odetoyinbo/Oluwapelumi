import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Footer = () => {
    const footerRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(contentRef.current.children,
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
                    scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
                }
            );
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} className="border-t-2 border-black py-16 sm:py-20 px-6 bg-white mt-10">
            <div ref={contentRef} className="max-w-[1200px] mx-auto flex flex-col items-center gap-5 sm:gap-6 text-center">
                <div className="flex items-center gap-3 mb-2">
                    <span className="w-3 h-3 bg-yellow border-2 border-black rounded-full pulse-dot"></span>
                    <p className="text-[20px] sm:text-[24px] font-bold text-black">Let's build something great.</p>
                </div>

                <p className="text-[15px] sm:text-[17px] text-[#4A4A4A] max-w-[400px]">
                    Full-Stack Engineer based in Lagos, Nigeria.<br />
                    Open to remote & hybrid opportunities.
                </p>

                <a href="mailto:odetoyinbopelumi42@gmail.com" className="btn btn-primary text-[15px] sm:text-[16px] px-6 py-3">
                    odetoyinbopelumi42@gmail.com
                </a>

                <div className="flex gap-3 sm:gap-4 mt-2">
                    <a href="https://linkedin.com/in/odetoyinbo-oluwapelumi" target="_blank" rel="noreferrer" className="btn btn-secondary text-[14px] sm:text-[15px] px-4 py-2">LinkedIn</a>
                    <a href="https://github.com/Oluwapelumi-Odetoyinbo" target="_blank" rel="noreferrer" className="btn btn-secondary text-[14px] sm:text-[15px] px-4 py-2">GitHub</a>
                </div>

                <div className="mt-8 pt-6 border-t border-[#EAE6DB] w-full">
                    <p className="text-[13px] text-[#999]">© {new Date().getFullYear()} Odetoyinbo Oluwapelumi. Built with React & Vite.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
