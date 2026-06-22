"use client";

import React, { useEffect, useRef } from 'react';
import { ReactLenis, type LenisRef } from 'lenis/react';
import 'lenis/dist/lenis.css';

interface SmoothScrollProps {
    children: React.ReactNode;
}

const HEADER_OFFSET = 80; // sticky 헤더 높이(h-20)

/**
 * 전역 관성 스무스 스크롤 (Lenis).
 * - 휠/트랙패드 스크롤을 감속·관성으로 부드럽게 처리
 * - 헤더의 #앵커 링크 클릭 시에도 부드럽게 이동
 * - prefers-reduced-motion 사용자는 기본(네이티브) 스크롤로 폴백
 */
const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
    const lenisRef = useRef<LenisRef>(null);

    // 해시 앵커 링크(#projects, #about, #blog ...) 부드럽게 스크롤
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const anchor = (e.target as HTMLElement | null)?.closest(
                'a[href^="#"]'
            ) as HTMLAnchorElement | null;
            if (!anchor) return;

            const hash = anchor.getAttribute('href');
            if (!hash || hash === '#') return;

            const target = document.querySelector(hash);
            if (!target) return;

            e.preventDefault();
            lenisRef.current?.lenis?.scrollTo(target as HTMLElement, {
                offset: -HEADER_OFFSET,
            });
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return (
        <ReactLenis
            root
            ref={lenisRef}
            options={{
                lerp: 0.1, // 감속 강도 (0~1, 작을수록 더 부드럽고 길게 흐름)
                duration: 1.2, // scrollTo 애니메이션 길이(초)
                smoothWheel: !prefersReduced,
            }}
        >
            {children}
        </ReactLenis>
    );
};

export default SmoothScroll;
