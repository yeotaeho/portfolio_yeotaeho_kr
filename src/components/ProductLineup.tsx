"use client";

import React from 'react';
import ProductCard, { ProductCardData } from './ProductCard';
import SectionHeading from './web/SectionHeading';

// 프로젝트 데이터
const products: ProductCardData[] = [
    {
        id: 'ifrsseed',
        title: 'IFRSseed',
        category: 'ESG · AI · 배포중',
        description: 'LangGraph 기반 RAG로 지속가능경영보고서를 자동 생성하는 ESG 플랫폼. IFRS·GRI·ESRS 기준 대응, GHG Protocol Scope 1/2/3 산정, CDP 응답, Smart Draft(AI 문단 생성)를 제공합니다. (bge-m3 임베딩 · pgvector · AWS EC2 GPU)',
        link: 'https://www.ifrsseed.site/',
    },
    {
        id: 'reseed',
        title: 'RE:SEED',
        category: 'Renewable Energy · AI',
        description: 'RE100·재생에너지 MRV를 위한 멀티 에이전트 AI 플랫폼. LangGraph(StateGraph·MemorySaver)와 Score Function, KEPCO·SMP API 연동, Redis(Upstash) 캐싱과 APScheduler 자동화로 구성했습니다.',
        link: 'https://github.com/yeotaeho/reseed',
    },
    {
        id: 'clickme',
        title: 'ClickMe',
        category: 'MarTech · AI',
        description: '가상 소비자 페르소나로 광고 성과(구매 의도)를 사전 예측하는 플랫폼. Next.js + FastAPI + LangGraph, GPT-4o Vision·Gemini 2.0 Flash, NeonDB(pgvector), AWS SQS/S3 기반으로 구현했습니다.',
        link: 'https://github.com/cclickstudio/click-me',
    },
    {
        id: 'roadmap',
        title: 'Roadmap',
        category: 'Career · AI',
        description: '글로벌 트렌드 분석으로 개인 역량 로드맵을 제시하는 AI 커리어 내비게이터. Llama-3.1-8B-Bllossom(QLoRA) 파인튜닝, 시계열 트랜스포머, pgvector, Flutter/Dart로 개발 중입니다.',
        link: 'https://github.com/yeotaeho/roadmap',
    },
    {
        id: 'web-portfolio',
        title: 'Web Portfolio',
        category: 'Frontend · Web',
        description: 'React·TypeScript·반응형 웹 등 프론트엔드 퍼블리싱 작업 모음(MLB, Taste.it, 교보문go 등). 웹 개발의 기초를 다진 초기 작업들을 정리했습니다.',
        link: 'https://blog.yeotaeho.kr/PORTFOLIO/',
    },
];

/**
 * 제품 라인업 섹션 컴포넌트
 */
const ProductLineup: React.FC = () => {
    return (
        <section id="projects" className="py-12 lg:py-20">
            <div className="container mx-auto px-6 lg:px-10">
                <SectionHeading
                    title="PROJECTS"
                    subtitle="직접 기획·개발하고 배포·운영까지 완성한 프로젝트들입니다."
                />

                {/* 제품 그리드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductLineup;

