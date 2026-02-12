import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { socialLinks } from '../data';
import { Github, Mail, Code, Linkedin } from 'lucide-react';
import { CodeforcesIcon } from './Icons';
import ParticleBackground from './ParticleBackground';

const Hero = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={targetRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-background text-primary">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10" />
                <ParticleBackground />
                <motion.div
                    style={{ y, opacity }}
                    className="w-full h-full opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-900 via-background to-background"
                />
            </div>

            <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-surface/50 border border-white/10 text-sm md:text-base text-secondary mb-6 backdrop-blur-sm">
                        Software Engineer based in India
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50"
                >
                    DEEPANSHU <br className="hidden md:block" /> CHOUDHARY
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="max-w-xl text-lg md:text-xl text-secondary mb-10 leading-relaxed"
                >
                    Building innovative digital solutions with modern technologies.
                    Passionate about AI, System Architecture, and crafting immersive user experiences.
                </motion.p>

                {/* Buttons removed as per request */}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                    className="flex items-center gap-6 mt-12"
                >
                    {socialLinks.map((link, index) => {
                        const Icon = link.icon === 'Github' ? Github : link.icon === 'LeetCode' ? Code : link.icon === 'Codeforces' ? CodeforcesIcon : link.icon === 'Linkedin' ? Linkedin : Mail;
                        if (link.name === 'Email') return null; // Skip email in Hero based on request to just shift buttons (usually just socials)
                        return (
                            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-rose-400/50 hover:text-rose-400 transition-all">
                                <Icon className="w-5 h-5" />
                            </a>
                        )
                    })}
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-secondary"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                </svg>
            </motion.div>
        </section>
    );
};

export default Hero;
