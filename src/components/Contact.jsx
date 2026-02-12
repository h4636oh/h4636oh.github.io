import { motion } from 'framer-motion';
import { Mail, Github, Code, Linkedin } from 'lucide-react';
import { CodeforcesIcon } from './Icons';
import { socialLinks } from '../data';

const Contact = () => {
    return (
        <section id="contact" className="py-24 bg-background px-4 md:px-6 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-900/20 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto max-w-4xl relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
                        Let's Work Together
                    </h2>
                    <p className="text-xl text-secondary mb-12 max-w-2xl mx-auto">
                        Interested in building something extraordinary? I'm currently open for new opportunities and collaborations.
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-6 border-t border-white/10 pt-16">
                    {socialLinks.map((link, index) => {
                        const Icon = link.icon === 'Github' ? Github : link.icon === 'LeetCode' ? Code : link.icon === 'Codeforces' ? CodeforcesIcon : link.icon === 'Linkedin' ? Linkedin : Mail;
                        return (
                            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-4 p-6 rounded-2xl hover:bg-white/5 transition-colors">
                                <div className="p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                                    <Icon className="w-6 h-6 text-white group-hover:text-rose-400 transition-colors" />
                                </div>
                                <span className="text-secondary text-sm group-hover:text-white transition-colors">{link.name}</span>
                            </a>
                        )
                    })}
                </div>

                <footer className="mt-24 text-secondary/50 text-sm">
                    <p>© {new Date().getFullYear()} Deepanshu Choudhary. All rights reserved.</p>
                </footer>
            </div>
        </section>
    )
}

export default Contact;
