"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductLineup from '@/components/ProductLineup';
import StrengthSection from '@/components/StrengthSection';
import NewsSection from '@/components/NewsSection';
import IntroOverlay from '@/components/IntroOverlay';

/**
 * 메인 페이지 컴포넌트
 */
const HomePage: React.FC = () => {
    // SSR/첫 렌더 일치를 위해 false로 시작 → useEffect에서 활성화 (하이드레이션 안전)
    // 매 진입(새로고침)마다 인트로 재생
    const [showIntro, setShowIntro] = useState(false);

    useEffect(() => {
        setShowIntro(true);
    }, []);

    const handleComplete = () => {
        setShowIntro(false);
    };

    return (
        <div className="relative z-10 min-h-screen antialiased">
            {showIntro && <IntroOverlay onComplete={handleComplete} />}

            {/* 인트로 동안 본문 비활성화 */}
            <div
                aria-hidden={showIntro}
                className={showIntro ? 'pointer-events-none' : undefined}
            >
                <Header />
                <main>
                    <HeroSection introActive={showIntro} />
                    <ProductLineup />
                    <StrengthSection />
                    <NewsSection />
                </main>
            </div>
        </div>
    );
};

export default HomePage;
