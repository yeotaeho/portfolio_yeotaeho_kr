"use client";

import React from 'react';
import Image from 'next/image';

export interface HeroSlideData {
    id: number;
    koreanText: string | React.ReactNode;
    englishTitle: string;
    subtitle: string;
    image?: string;
    imageAlt?: string;
}

interface HeroSlideProps {
    slide: HeroSlideData;
}

/**
 * 개별 히어로 슬라이드 컴포넌트
 */
const HeroSlide: React.FC<HeroSlideProps> = ({ slide }) => {
    return (
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] w-full">
            {/* 왼쪽 텍스트 섹션 */}
            <div className="flex flex-col w-full lg:w-1/2 px-6 sm:px-8 lg:px-16 py-8 sm:py-10 lg:py-24 justify-between bg-white">
                {/* 상단 여백 및 한글 메시지 */}
                <div className="flex-grow pt-10">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-light leading-relaxed tracking-tight">
                        {typeof slide.koreanText === 'string'
                            ? slide.koreanText.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {index > 0 && <br />}
                                    {line}
                                </React.Fragment>
                            ))
                            : slide.koreanText
                        }
                    </div>
                </div>

                {/* 하단 콘텐츠 (서브타이틀 및 영문 헤드라인) */}
                <div className="mt-16 lg:mt-auto pt-16">
                    {/* 서브타이틀 */}
                    {slide.subtitle && (
                        <p className="text-xs font-semibold tracking-[0.3em] mb-4 text-gray-700 uppercase">
                            {slide.subtitle}
                        </p>
                    )}

                    {/* 영문 헤드라인 */}
                    <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold leading-none tracking-tighter">
                        {slide.englishTitle.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && <br />}
                                {line}
                            </React.Fragment>
                        ))}
                    </h1>
                </div>
            </div>

            {/* 오른쪽 이미지 섹션 */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center bg-white min-h-[calc(100vh-80px)]">
                {slide.image ? (
                    <>
                        <Image
                            src={slide.image}
                            alt={slide.imageAlt || slide.englishTitle}
                            fill
                            className="object-contain"
                            priority
                            sizes="50vw"
                        />
                        {/* 오버레이 */}
                        <div className="absolute inset-0 bg-white/5 z-20"></div>
                    </>
                ) : (
                    <div className="absolute inset-0 bg-white p-20 flex flex-col space-y-4">
                        {/* 플레이스홀더 디자인 */}
                        <div className="flex justify-around opacity-30 pt-10">
                            <div className="w-1/4 h-8 bg-gray-300 rounded-full filter blur-md"></div>
                            <div className="w-1/4 h-8 bg-gray-300 rounded-full filter blur-md"></div>
                            <div className="w-1/4 h-8 bg-gray-300 rounded-full filter blur-md"></div>
                        </div>
                        <div className="flex justify-center items-center h-full">
                            <div className="text-5xl text-gray-400 opacity-20 filter blur-sm">👋☕️🤝</div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-white/70 to-white/10"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeroSlide;

