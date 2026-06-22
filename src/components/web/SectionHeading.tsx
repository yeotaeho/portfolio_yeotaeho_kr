"use client";

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Node from './Node';

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
}

/**
 * 섹션 공통 헤더. h2 위에 "실 — 노드 — 실" 거미줄 모티프를 얹는다.
 */
const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
        >
            <div className="flex items-center justify-center gap-2 mb-4" aria-hidden="true">
                <span className="h-px w-8 bg-black/15" />
                <Node size={5} />
                <span className="h-px w-8 bg-black/15" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900">{title}</h2>
            {subtitle && (
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
            )}
        </motion.div>
    );
};

export default SectionHeading;
