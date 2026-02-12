import { motion } from 'framer-motion';
import { experience } from '../data';

const Experience = () => {
    return (
        <section id="experience" className="py-20 px-4 md:px-6 bg-background relative overflow-hidden">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight flex items-center gap-3">
                        <span className="w-12 h-1 bg-rose-400 rounded-full"></span> Experience
                    </h2>
                    <p className="text-secondary max-w-2xl">
                        My professional journey and key roles encountered along the way.
                    </p>
                </motion.div>

                {/* Horizontal Timeline Container - Scrollable on mobile, Grid on desktop if few items, or Flex */}
                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[28px] left-0 w-full h-0.5 bg-white/10" />

                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 overflow-x-auto pb-8 md:pb-0 scrollbar-hide">
                        {experience.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="relative flex-shrink-0 md:w-1/2 lg:w-1/3"
                            >
                                {/* Dot */}
                                <div className="hidden md:block absolute top-[20px] left-0 w-4 h-4 rounded-full bg-rose-400 ring-4 ring-background z-10" />

                                <div className="md:pt-12 pl-6 md:pl-0 border-l-2 md:border-l-0 border-white/10 md:border-t-0 p-4">
                                    {/* Mobile Line Dot override */}
                                    <div className="md:hidden absolute left-[-5px] top-6 w-3 h-3 rounded-full bg-rose-400" />

                                    <span className="inline-block px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-semibold mb-3 border border-rose-500/20">
                                        {exp.period}
                                    </span>
                                    <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                                    <p className="text-secondary mb-4 font-medium">{exp.company}</p>
                                    <p className="text-secondary/80 text-sm leading-relaxed">
                                        {exp.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
