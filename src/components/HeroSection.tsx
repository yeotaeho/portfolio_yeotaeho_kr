"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';

// 3개의 히어로 슬라이드 데이터
const heroSlides = [
    {
        id: 1,
        koreanText: (
            <>
                아이디어를 <span className="font-semibold text-orange-600">실제 서비스</span>로, <br />
                도전과 경험으로 <span className="font-semibold text-orange-600">성장</span>하는 <br />
                <span className="font-semibold text-orange-600">AI 엔지니어</span> 여태호입니다
            </>
        ),
        englishTitle: "BUILD\n& DEPLOY",
        subtitle: "AI · LLM ENGINEER",
        image: "/images/award-sesac.jpg",
        imageAlt: "2025 새싹(SeSAC) 해커톤 장려상 수상 - 여태호",
    },
    {
        id: 2,
        koreanText: (
            <>
                LangGraph 기반 <span className="font-semibold text-orange-600">RAG</span>로 <br />
                ESG·에너지 도메인의 <br />
                <span className="font-semibold text-orange-600">복잡한 문제</span>를 풀어냅니다
            </>
        ),
        englishTitle: "AI THAT\nSOLVES",
        subtitle: "LANGGRAPH · RAG",
        image: "/images/badge-esgseed.jpg",
        imageAlt: "2025 AI 인재 페스티벌 ESGseed 팀 참가 뱃지",
    },
    {
        id: 3,
        koreanText: (
            <>
                기획부터 배포·운영까지 <br />
                <span className="font-semibold text-orange-600">풀스택</span>으로 <br />
                끝까지 <span className="font-semibold text-orange-600">완성</span>합니다
            </>
        ),
        englishTitle: "END\nTO END",
        subtitle: "FULL STACK DEVELOPER",
        image: "/images/resume.png",
        imageAlt: "여태호 이력서",
    },
];

// 사진 가장자리·꼭짓점을 흰 배경으로 부드럽게 페이드아웃시키는 방사형 마스크
// (가운데가 가장 진하고 모서리·꼭짓점으로 갈수록 투명)
const IMAGE_FADE =
    'radial-gradient(ellipse 58% 62% at 50% 50%, #000 20%, rgba(0,0,0,0.5) 55%, transparent 100%)';

interface HeroSectionProps {
    /** 인트로 오버레이가 떠 있는 동안 true. 인트로가 끝나면 false가 되며 autoplay를 깨끗하게 재시작한다. */
    introActive?: boolean;
}

/**
 * 히어로 섹션 컴포넌트 (각 섹션이 독립적으로 움직이는 3개의 Swiper)
 */
const HeroSection: React.FC<HeroSectionProps> = ({ introActive = false }) => {
    const [koreanSwiper, setKoreanSwiper] = useState<SwiperType | null>(null);
    const [englishSwiper, setEnglishSwiper] = useState<SwiperType | null>(null);
    const [imageSwiper, setImageSwiper] = useState<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const progressIntervalRef = useRef<number | null>(null);
    const progressStartTimeRef = useRef<number>(0);

    const AUTOPLAY_DELAY = 4300;
    const TRANSITION_SPEED = 800;
    const TOTAL_DURATION = AUTOPLAY_DELAY + TRANSITION_SPEED;

    const handleKoreanSlideChange = (swiper: SwiperType) => {
        setActiveIndex(swiper.realIndex);
        resetProgress();
    };

    const handleEnglishSlideChange = (swiper: SwiperType) => {
        setActiveIndex(swiper.realIndex);
        resetProgress();
    };

    const handleImageSlideChange = (swiper: SwiperType) => {
        setActiveIndex(swiper.realIndex);
        resetProgress();
    };

    const resetProgress = () => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
        }
        setProgress(0);
        progressStartTimeRef.current = Date.now();

        progressIntervalRef.current = window.setInterval(() => {
            const elapsed = Date.now() - progressStartTimeRef.current;
            const newProgress = Math.min((elapsed / TOTAL_DURATION) * 100, 100);
            setProgress(newProgress);

            if (newProgress >= 100) {
                if (progressIntervalRef.current) {
                    clearInterval(progressIntervalRef.current);
                }
            }
        }, 16); // 약 60fps
    };

    useEffect(() => {
        resetProgress();
        return () => {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
        };
    }, [activeIndex]);

    // 인트로가 히어로 위를 덮는 동안 autoplay가 stuck/desync 상태에 빠지므로,
    // 인트로 동안에는 autoplay를 멈추고, 인트로가 끝나면 3개 Swiper를 0번 슬라이드로
    // 재동기화한 뒤 autoplay를 깨끗하게 재시작한다.
    useEffect(() => {
        const swipers = [koreanSwiper, englishSwiper, imageSwiper].filter(
            (s): s is SwiperType => !!s && !s.destroyed
        );
        if (swipers.length < 3) return;

        if (introActive) {
            swipers.forEach((sw) => sw.autoplay?.stop());
        } else {
            swipers.forEach((sw) => {
                sw.slideToLoop?.(0, 0);
                sw.autoplay?.stop();
                sw.autoplay?.start();
            });
            setActiveIndex(0);
            resetProgress();
        }
    }, [introActive, koreanSwiper, englishSwiper, imageSwiper]);

    const goPrev = () => {
        if (koreanSwiper) koreanSwiper.slidePrev();
        if (englishSwiper) englishSwiper.slidePrev();
        if (imageSwiper) imageSwiper.slidePrev();
    };

    const goNext = () => {
        if (koreanSwiper) koreanSwiper.slideNext();
        if (englishSwiper) englishSwiper.slideNext();
        if (imageSwiper) imageSwiper.slideNext();
    };

    return (
        <section className="relative w-full">
            <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] w-full">
                {/* 왼쪽 텍스트 섹션 */}
                <div className="flex flex-col w-full lg:w-1/2 px-6 sm:px-8 lg:px-16 py-6 sm:py-8 lg:py-16 justify-between relative">
                    {/* 한글 텍스트 Swiper */}
                    <div className="flex-grow pt-6 relative overflow-hidden">
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={0}
                            slidesPerView={1}
                            onSwiper={setKoreanSwiper}
                            onSlideChange={handleKoreanSlideChange}
                            autoplay={{
                                delay: AUTOPLAY_DELAY,
                                disableOnInteraction: false,
                            }}
                            speed={800}
                            loop={true}
                            className="korean-text-swiper h-full"
                            allowTouchMove={true}
                        >
                            {heroSlides.map((slide) => (
                                <SwiperSlide key={`korean-${slide.id}`}>
                                    <div className="text-2xl sm:text-3xl lg:text-[48px]/[64px] font-light leading-relaxed tracking-tight">
                                        {typeof slide.koreanText === 'string'
                                            ? (slide.koreanText as string).split('\n').map((line: string, index: number) => (
                                                <React.Fragment key={index}>
                                                    {index > 0 && <br />}
                                                    {line}
                                                </React.Fragment>
                                            ))
                                            : slide.koreanText
                                        }
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* 영문 헤드라인 Swiper */}
                    <div className="mt-10 lg:mt-auto pt-8 relative overflow-hidden">
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={0}
                            slidesPerView={1}
                            onSwiper={setEnglishSwiper}
                            onSlideChange={handleEnglishSlideChange}
                            autoplay={{
                                delay: AUTOPLAY_DELAY,
                                disableOnInteraction: false,
                            }}
                            speed={800}
                            loop={true}
                            className="english-title-swiper"
                            allowTouchMove={true}
                        >
                            {heroSlides.map((slide) => (
                                <SwiperSlide key={`english-${slide.id}`}>
                                    <div>
                                        {/* 서브타이틀 */}
                                        {slide.subtitle && (
                                            <p className="text-xs font-semibold tracking-[0.3em] mb-4 text-gray-700 uppercase">
                                                {slide.subtitle}
                                            </p>
                                        )}
                                        {/* 영문 헤드라인 */}
                                        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[178px] font-extrabold leading-none tracking-tighter">
                                            {slide.englishTitle.split('\n').map((line: string, index: number) => (
                                                <React.Fragment key={index}>
                                                    {index > 0 && <br />}
                                                    {line}
                                                </React.Fragment>
                                            ))}
                                        </h1>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                </div>

                {/* 오른쪽 이미지 섹션 */}
                <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center bg-white min-h-[calc(100vh-80px)]">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={0}
                        slidesPerView={1}
                        onSwiper={setImageSwiper}
                        onSlideChange={handleImageSlideChange}
                        autoplay={{
                            delay: AUTOPLAY_DELAY,
                            disableOnInteraction: false,
                        }}
                        speed={800}
                        loop={true}
                        className="image-swiper w-full h-full"
                        allowTouchMove={true}
                    >
                        {heroSlides.map((slide) => (
                            <SwiperSlide key={`image-${slide.id}`}>
                                {slide.image ? (
                                    <Image
                                        src={slide.image}
                                        alt={slide.imageAlt || slide.englishTitle}
                                        fill
                                        className="object-contain"
                                        priority
                                        sizes="50vw"
                                        style={{
                                            WebkitMaskImage: IMAGE_FADE,
                                            maskImage: IMAGE_FADE,
                                        }}
                                    />
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
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* 커스텀 페이지네이션 (왼쪽 텍스트 섹션 내부) */}
            <div className="absolute bottom-6 lg:bottom-8 left-6 lg:left-16 z-30 flex flex-col space-y-3">
                <div className="flex items-center space-x-2 text-lg font-bold text-gray-400">
                    <button
                        onClick={goPrev}
                        className="cursor-pointer text-xl hover:text-black transition-colors"
                        aria-label="이전 슬라이드"
                    >
                        &lt;
                    </button>
                    <span className="text-base lg:text-lg text-black font-extrabold w-8 text-center">
                        {String(activeIndex + 1).padStart(2, '0')}
                    </span>
                    <button
                        onClick={goNext}
                        className="cursor-pointer text-xl hover:text-black transition-colors"
                        aria-label="다음 슬라이드"
                    >
                        &gt;
                    </button>
                </div>
                {/* 프로그레스 바 */}
                <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-black transition-all duration-75 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* 스타일 추가 */}
            <style jsx global>{`
                .korean-text-swiper .swiper-pagination,
                .english-title-swiper .swiper-pagination,
                .image-swiper .swiper-pagination {
                    display: none;
                }
                .korean-text-swiper .swiper-button-next,
                .korean-text-swiper .swiper-button-prev,
                .english-title-swiper .swiper-button-next,
                .english-title-swiper .swiper-button-prev,
                .image-swiper .swiper-button-next,
                .image-swiper .swiper-button-prev {
                    display: none;
                }
            `}</style>
        </section>
    );
};

export default HeroSection;

