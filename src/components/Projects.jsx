import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const PROJECTS = [
    {
        name: 'Swift',
        tech: 'React',
        title: 'Unified Payment & Accounting Infrastructure.',
        desc: 'Built a payment gateway that embeds an accounting layer directly within the infrastructure — automatically categorizing transactions, reconciling payments, and generating ledger-ready records in real time. Eliminates manual bookkeeping, reduces reconciliation errors, and removes the need for costly third-party integrations across ecommerce, marketplaces, subscriptions, and POS environments.',
        accent: 'bg-[#00B4D8]',
        link: 'https://swift-peach-two.vercel.app/',
    },
    {
        name: 'PocketCare AI',
        tech: 'React',
        title: 'AI-Powered Lightweight Health Assistant.',
        desc: 'Designed and built an accessible health assistant that helps users track medication, receive health guidance, access first-aid support, and get reminders — even in low-connectivity environments. Focused on making basic health support more accessible for people without quick access to medical help, exploring how AI can solve real everyday problems in a practical, human-centered way.',
        accent: 'bg-[#10B981]',
        link: 'https://pocketcare-ai.vercel.app/',
    },
    {
        name: 'Velox',
        tech: 'React Native, Node.js, MongoDB, JWT',
        title: 'Inventory & Sales Management Platform.',
        desc: 'Architected an admin-first platform establishing backend and mobile parity. Executed multi-unit inventory intake, role-based access control, and robust profit tracking analytics.',
        accent: 'bg-yellow',
    },
    {
        name: 'HRS',
        tech: 'Angular, Node.js, NgRx, Tailwind CSS',
        title: 'Comprehensive Hotel Reservation System.',
        desc: 'Delivered a production-ready management platform securing dashboard analytics, booking workflows, and room states. Utilized NgRx for reactive state management.',
        accent: 'bg-olive',
    },
    {
        name: 'TimeCapsule',
        tech: 'React Native',
        title: 'Emotional Context Mobile Application.',
        desc: 'Building a mobile application allowing parents to curate and store milestone messages for the future, heavily prioritizing intuitive UX and scalable architecture.',
        accent: 'bg-[#FF6B35]',
    },
    {
        name: 'Abacus',
        tech: 'Bubble.io',
        title: 'Property Management MVP.',
        desc: 'Rapidly prototyped logic and interaction flows for property owners, delivering extreme usability bounds within no-code constraints.',
        accent: 'bg-[#6C63FF]',
    },
];

const Projects = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const lineRef = useRef(null);
    const cardsRef = useRef([]);

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

            cardsRef.current.forEach((card) => {
                gsap.fromTo(card,
                    { opacity: 0, y: 60, rotateX: -5 },
                    {
                        opacity: 1, y: 0, rotateX: 0,
                        duration: 0.7, ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="projects" className="py-16 sm:py-20">
            <div className="flex items-center gap-4 mb-10 sm:mb-12">
                <h2 ref={headingRef} className="text-[26px] sm:text-[32px] whitespace-nowrap">Selected Projects</h2>
                <div ref={lineRef} className="flex-1 h-[2px] bg-black line-reveal"></div>
            </div>
            <div className="flex flex-col gap-8 sm:gap-12">
                {PROJECTS.map((project, i) => (
                    <div
                        key={i}
                        ref={el => cardsRef.current[i] = el}
                        className="bg-white border-2 border-black p-6 sm:p-10 rounded-lg shadow-brutalist card-hover group"
                        style={{ perspective: '800px' }}
                    >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 pb-4 border-b border-[#EAE6DB] gap-3">
                            <div className="flex items-center gap-3">
                                <span className={`w-3 h-3 rounded-full ${project.accent} border-2 border-black`}></span>
                                <span className="text-[18px] sm:text-[20px] font-bold">{project.name}</span>
                            </div>
                            <span className="text-[12px] sm:text-[13px] bg-cream px-3 sm:px-4 py-1.5 rounded-full border border-black font-semibold self-start sm:self-auto">
                                {project.tech}
                            </span>
                        </div>
                        <h3 className="text-[22px] sm:text-[28px] mb-3 sm:mb-4 group-hover:text-olive transition-colors duration-300">{project.title}</h3>
                        <p className="text-[15px] sm:text-[17px]">{project.desc}</p>
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 mt-5 sm:mt-6 text-[14px] sm:text-[15px] font-bold bg-black text-white px-5 py-2.5 rounded border-2 border-black hover:bg-yellow hover:text-black transition-all duration-300 group/link"
                            >
                                View Project
                                <svg className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
