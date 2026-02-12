import { motion } from 'framer-motion';
import { experience, skills, achievements } from '../data';

const About = () => {
    return (
        <section id="about" className="py-20 px-4 md:px-6 bg-background relative overflow-hidden">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white tracking-tight">
                        About Me
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >


                        <h3 className="text-2xl font-semibold text-white mb-6">About Me</h3>
                        <p className="text-secondary text-lg leading-relaxed mb-8">
                            I'm a B.Tech Computer Science student at IIIT Pune (2023-2027) with a strong foundation in systems and full-stack development.
                            My academic journey is complemented by practical experience in building scalable backends, cross-platform mobile apps, and optimizing AI models.
                        </p>

                        <h3 className="text-2xl font-semibold text-white mb-6">Achievements</h3>
                        <div className="grid grid-cols-1 gap-4">
                            {achievements.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-surface/50 border border-white/5 hover:border-rose-500/30 transition-colors">
                                    <div className="p-2 rounded-full bg-rose-500/10 text-rose-400">
                                        <span className="text-xl">🏆</span>
                                    </div>
                                    <span className="text-secondary font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h3 className="text-2xl font-semibold text-white mb-8">Skills & Tools</h3>
                        <div className="flex flex-wrap gap-3">
                            {skills.map((skill, index) => (
                                <motion.span
                                    key={index}
                                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                                    className="px-4 py-2 rounded-lg bg-surface border border-white/5 text-secondary text-sm cursor-default transition-colors hover:text-white hover:border-white/20"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>

                        <div className="mt-12 p-6 bg-surface/30 rounded-2xl border border-white/5 backdrop-blur-sm">
                            <h3 className="text-xl font-semibold text-white mb-4">Education</h3>
                            <div className="flex flex-col gap-1">
                                <h4 className="text-lg text-white">Indian Institute of Information Technology, Pune</h4>
                                <p className="text-rose-400">B.Tech in Computer Science & Engineering</p>
                                <div className="flex justify-between items-center mt-2 text-sm text-secondary">
                                    <span>CGPA: 7.99</span>
                                    <span className="border border-white/10 px-2 py-1 rounded">2023 - 2027</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
