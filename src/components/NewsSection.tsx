"use client";

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

export interface NewsArticle {
    id: string;
    date: string;
    title: string;
    description?: string;
    link?: string;
}

interface NewsSectionProps {
    news?: NewsArticle[];
}

// 블로그 주제 (Velog로 연결)
const VELOG_URL = 'https://velog.io/@wp187133/posts';

const defaultNews: NewsArticle[] = [
    {
        id: '1',
        date: 'LangGraph',
        title: 'LangGraph로 멀티 에이전트 오케스트레이션 설계하기',
        description: 'StateGraph·MemorySaver, 조건 분기와 Score Function 기반 의사결정 등 에이전트 워크플로 구현 경험을 정리합니다.',
        link: VELOG_URL,
    },
    {
        id: '2',
        date: 'RAG',
        title: 'RAG 파이프라인 구축과 환각(Hallucination) 줄이기',
        description: 'bge-m3 임베딩과 pgvector 하이브리드 검색, 검증 단계 추가 등 신뢰할 수 있는 RAG를 만드는 과정을 기록합니다.',
        link: VELOG_URL,
    },
    {
        id: '3',
        date: 'Backend',
        title: 'FastAPI · PostgreSQL 비동기 백엔드 트러블슈팅',
        description: '비동기 DB 연결, 타임아웃·캐싱(Redis) 최적화, Alembic 마이그레이션에서 마주친 문제와 해결 과정을 다룹니다.',
        link: VELOG_URL,
    },
    {
        id: '4',
        date: 'DevOps',
        title: 'AWS EC2(GPU)에 CI/CD로 AI 서비스 배포하기',
        description: 'GitHub Actions·systemd·Nginx·Certbot으로 AI 서비스를 실제 운영 환경에 배포하고 운영한 경험을 공유합니다.',
        link: VELOG_URL,
    },
];

/**
 * 뉴스 섹션 컴포넌트
 */
const NewsSection: React.FC<NewsSectionProps> = ({ news = defaultNews }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section id="blog" className="py-20 lg:py-32 bg-white">
            <div className="container mx-auto px-6 lg:px-10">
                {/* 섹션 헤더 */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
                        BLOG
                    </h2>
                    <p className="text-lg text-gray-600">
                        개발하며 배우고 정리한 기록들을 Velog에 남깁니다.
                    </p>
                </motion.div>

                {/* 뉴스 목록 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {news.map((article, index) => (
                        <motion.article
                            key={article.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="border-b border-gray-200 pb-8 hover:border-orange-600 transition-colors"
                        >
                            {article.link ? (
                                <a href={article.link} target="_blank" rel="noopener noreferrer" className="block group">
                                    <div className="text-sm text-gray-500 mb-2">{article.date}</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                                        {article.title}
                                    </h3>
                                    {article.description && (
                                        <p className="text-gray-600 leading-relaxed">
                                            {article.description}
                                        </p>
                                    )}
                                </a>
                            ) : (
                                <div>
                                    <div className="text-sm text-gray-500 mb-2">{article.date}</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {article.title}
                                    </h3>
                                    {article.description && (
                                        <p className="text-gray-600 leading-relaxed">
                                            {article.description}
                                        </p>
                                    )}
                                </div>
                            )}
                        </motion.article>
                    ))}
                </div>

                {/* 더보기 버튼 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <a
                        href={VELOG_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-3 border border-gray-900 rounded-md hover:bg-gray-100 transition duration-150 font-medium"
                    >
                        Velog에서 더보기
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default NewsSection;

