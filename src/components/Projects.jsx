import { motion } from 'framer-motion';
import { projects } from '../data';
import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative p-8 rounded-3xl bg-surface border border-white/5 hover:border-rose-500/30 transition-colors duration-500 overflow-hidden h-full flex flex-col"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col flex-1">
                <div className="flex-grow">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((t, i) => (
                            <span key={i} className="text-xs font-medium text-rose-400 uppercase tracking-wider">{t}</span>
                        ))}
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-rose-300 transition-colors">{project.title}</h3>
                    <p className="text-secondary leading-relaxed mb-6">{project.description}</p>
                </div>

                <a href={project.link} className="inline-flex items-center text-white font-medium hover:gap-2 transition-all group-hover:text-rose-400 mt-auto">
                    View Project
                    <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
            </div>
        </motion.div>
    )
}

const Projects = () => {
    return (
        <section id="projects" className="py-24 bg-background px-4 md:px-6">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Selected Works</h2>
                    <div className="h-1 w-20 bg-rose-500" />
                </motion.div>

                <div className="flex flex-wrap justify-start gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)] max-w-sm">
                            <ProjectCard project={project} index={index} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects;
