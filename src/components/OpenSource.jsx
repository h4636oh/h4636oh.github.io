import { motion } from 'framer-motion';
import { openSource } from '../data';

const OpenSource = () => {
    return (
        <section id="opensource" className="py-20 px-4 md:px-6 bg-surface/50 relative overflow-hidden">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight flex items-center gap-3">
                        <span className="w-12 h-1 bg-green-400 rounded-full"></span> Open Source
                    </h2>
                    <p className="text-secondary max-w-2xl">
                        Contributions to the open source community and public projects.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {openSource.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="bg-background border border-white/5 p-8 rounded-3xl hover:border-green-500/30 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                                        {item.project}
                                    </h3>
                                    <p className="text-green-400 font-medium text-sm mb-1">{item.role}</p>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold border border-green-500/20">
                                    {item.period}
                                </span>
                            </div>

                            <p className="text-secondary leading-relaxed whitespace-pre-line">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OpenSource;
