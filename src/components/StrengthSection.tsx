"use client";

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

/**
 * 회사 강점 섹션 컴포넌트
 */
const StrengthSection: React.FC = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const strengths = [
        {
            title: 'AI · LLM',
            subtitle: 'LangGraph · LangChain · RAG',
            description: '에이전트 오케스트레이션과 검색증강생성(RAG)으로 신뢰할 수 있는 AI 서비스를 설계합니다. (pgvector · bge-m3 · PyTorch)',
        },
        {
            title: 'Backend',
            subtitle: 'Python · FastAPI · PostgreSQL',
            description: '비동기 API, pgvector 임베딩, SQLAlchemy·Alembic 마이그레이션 기반의 안정적인 데이터 파이프라인을 구축합니다.',
        },
        {
            title: 'DevOps',
            subtitle: 'AWS · Docker · GitHub Actions',
            description: 'EC2(GPU)·Nginx·systemd 위에 CI/CD를 구성해 기획한 서비스를 실제 운영 환경까지 직접 배포합니다.',
        },
    ];

    return (
        <section id="about" className="py-20 lg:py-32 bg-gray-50">
            <div className="container mx-auto px-6 lg:px-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
                        ABOUT
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        아이디어를 실제 서비스로 끝까지 완성하는 AI·풀스택 엔지니어입니다.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {strengths.map((strength, index) => (
                        <motion.div
                            key={strength.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="text-center"
                        >
                            <h3 className="text-2xl lg:text-3xl font-bold text-orange-600 mb-4">
                                {strength.title}
                            </h3>
                            <p className="text-lg font-semibold text-gray-900 mb-2">
                                {strength.subtitle}
                            </p>
                            <p className="text-gray-600">
                                {strength.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* 추가 설명 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <h3 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-6">
                        BUILDING RELIABLE AI SERVICES
                    </h3>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        LLM·RAG를 활용해 ESG, 재생에너지, 마케팅 등 다양한 도메인의 문제를 해결하고,
                        FastAPI 백엔드부터 AWS 배포·운영까지 직접 책임지며 끝까지 동작하는 서비스를 만듭니다.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default StrengthSection;

