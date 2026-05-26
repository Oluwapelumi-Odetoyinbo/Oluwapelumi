import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);

        // Initial nav animation
        gsap.fromTo(navRef.current,
            { y: -30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
        );

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (menuOpen && menuRef.current) {
            gsap.fromTo(menuRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
            );
            gsap.fromTo(menuRef.current.querySelectorAll('.menu-item'),
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
            );
        }
    }, [menuOpen]);

    return (
        <>
            <nav
                ref={navRef}
                className={`fixed top-0 left-0 right-0 z-50 py-4 sm:py-6 transition-all duration-300 ${
                    scrolled ? 'bg-cream/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
                }`}
            >
                <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 flex justify-between items-center">
                    <div className="font-bold text-[18px] sm:text-[20px] flex items-center gap-2">
                        Pelumi <span className="w-2.5 h-2.5 bg-yellow border-2 border-black rounded-full inline-block pulse-dot"></span>
                    </div>

                    <div className="hidden lg:flex gap-10">
                        <a href="#" className="text-black font-medium text-[15px] relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-olive after:scale-x-100 after:origin-left after:transition-transform">Home</a>
                        <a href="#about" className="text-[#4A4A4A] font-medium text-[15px] relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-olive after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100 hover:text-black transition-colors">About</a>
                        <a href="#experience" className="text-[#4A4A4A] font-medium text-[15px] relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-olive after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100 hover:text-black transition-colors">Experience</a>
                        <a href="#philosophy" className="text-[#4A4A4A] font-medium text-[15px] relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-olive after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100 hover:text-black transition-colors">Philosophy</a>
                        <a href="#projects" className="text-[#4A4A4A] font-medium text-[15px] relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-olive after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100 hover:text-black transition-colors">Projects</a>
                    </div>

                    <a href="mailto:odetoyinbopelumi42@gmail.com" className="hidden sm:inline-block btn btn-primary text-[13px] px-5 py-2.5">Let's talk &rarr;</a>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="lg:hidden flex flex-col gap-[5px] p-2 z-[60]"
                        aria-label="Toggle menu"
                    >
                        <span className={`w-6 h-[2.5px] bg-black rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7.5px]' : ''}`}></span>
                        <span className={`w-6 h-[2.5px] bg-black rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-0' : ''}`}></span>
                        <span className={`w-6 h-[2.5px] bg-black rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7.5px]' : ''}`}></span>
                    </button>
                </div>
            </nav>

            {/* Mobile menu overlay */}
            {menuOpen && (
                <div
                    ref={menuRef}
                    className="fixed inset-0 z-40 bg-cream/95 mobile-menu flex flex-col items-center justify-center gap-8"
                >
                    <a href="#" onClick={() => setMenuOpen(false)} className="menu-item text-[32px] font-bold text-black hover:text-olive transition-colors">Home</a>
                    <a href="#about" onClick={() => setMenuOpen(false)} className="menu-item text-[32px] font-bold text-black hover:text-olive transition-colors">About</a>
                    <a href="#experience" onClick={() => setMenuOpen(false)} className="menu-item text-[32px] font-bold text-black hover:text-olive transition-colors">Experience</a>
                    <a href="#philosophy" onClick={() => setMenuOpen(false)} className="menu-item text-[32px] font-bold text-black hover:text-olive transition-colors">Philosophy</a>
                    <a href="#projects" onClick={() => setMenuOpen(false)} className="menu-item text-[32px] font-bold text-black hover:text-olive transition-colors">Projects</a>
                    <a href="mailto:odetoyinbopelumi42@gmail.com" onClick={() => setMenuOpen(false)} className="menu-item btn btn-primary text-[18px] mt-4">Let's talk &rarr;</a>
                </div>
            )}

            {/* Spacer for fixed nav */}
            <div className="h-[72px] sm:h-[88px]"></div>
        </>
    );
};

export default Navigation;
