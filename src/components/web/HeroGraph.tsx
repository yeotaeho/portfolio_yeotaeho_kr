"use client";

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ORANGE } from './constants';

interface HeroGraphProps {
    /** 현재 활성 사진 인덱스 (Swiper와 동기화) */
    activeIndex: number;
    /** 사진 노드 클릭 시 해당 슬라이드로 이동 */
    onSelect?: (i: number) => void;
}

interface Pos {
    x: number;
    y: number;
}

const CENTER: Pos = { x: 50, y: 50 };

export const HERO_PHOTOS: { src: string; alt: string; pos: Pos }[] = [
    { src: '/images/award-sesac.jpg', alt: '2025 새싹 해커톤 장려상', pos: { x: 50, y: 13 } },
    { src: '/images/badge-esgseed.jpg', alt: 'ESGseed 참가 뱃지', pos: { x: 15, y: 60 } },
    { src: '/images/resume.png', alt: '여태호 이력서', pos: { x: 85, y: 60 } },
];
const PHOTOS = HERO_PHOTOS;

const SKILLS: { label: string; pos: Pos }[] = [
    { label: 'LangGraph', pos: { x: 80, y: 24 } },
    { label: 'AWS', pos: { x: 20, y: 24 } },
    { label: 'FastAPI', pos: { x: 33, y: 90 } },
    { label: 'RAG', pos: { x: 67, y: 90 } },
];

/**
 * 히어로 거미줄 노드 그래프.
 * - 중앙 이름 노드 ↔ 사진 3노드 + 스킬 4노드를 검은 실로 연결
 * - 활성 사진 노드는 orange 링 + 굵은 실 (Swiper 현재 슬라이드와 동기화)
 * - 사진 노드 클릭 시 해당 슬라이드로 이동
 */
const HeroGraph: React.FC<HeroGraphProps> = ({ activeIndex, onSelect }) => {
    const reduce = useReducedMotion();

    const float = (i: number) =>
        reduce
            ? {}
            : {
                  animate: { y: [0, -6, 0] },
                  transition: { duration: 4 + i * 0.6, repeat: Infinity, ease: 'easeInOut' as const },
              };

    return (
        <div className="relative w-full h-full" aria-hidden="true">
            {/* 실 (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {SKILLS.map((s) => (
                    <line
                        key={`l-skill-${s.label}`}
                        x1={`${CENTER.x}%`}
                        y1={`${CENTER.y}%`}
                        x2={`${s.pos.x}%`}
                        y2={`${s.pos.y}%`}
                        stroke="rgba(0,0,0,0.12)"
                        strokeWidth={1}
                    />
                ))}
                {PHOTOS.map((p, i) => {
                    const active = i === activeIndex;
                    return (
                        <line
                            key={`l-photo-${i}`}
                            x1={`${CENTER.x}%`}
                            y1={`${CENTER.y}%`}
                            x2={`${p.pos.x}%`}
                            y2={`${p.pos.y}%`}
                            stroke={active ? ORANGE : 'rgba(0,0,0,0.18)'}
                            strokeWidth={active ? 1.6 : 1}
                        />
                    );
                })}
            </svg>

            {/* 스킬 노드 */}
            {SKILLS.map((s, i) => (
                <motion.div
                    key={s.label}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${s.pos.x}%`, top: `${s.pos.y}%` }}
                    {...float(i)}
                >
                    <span className="whitespace-nowrap rounded-full border border-black/15 bg-white/80 px-3 py-1 text-xs font-medium text-gray-700">
                        {s.label}
                    </span>
                </motion.div>
            ))}

            {/* 중앙 이름 노드 */}
            <motion.div
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                style={{ left: `${CENTER.x}%`, top: `${CENTER.y}%` }}
                {...float(0)}
            >
                <span className="whitespace-nowrap rounded-full bg-gray-900 px-5 py-2 text-sm font-bold tracking-tight text-white shadow-sm">
                    여태호 · YEO TAEHO
                </span>
            </motion.div>

            {/* 사진 노드 */}
            {PHOTOS.map((p, i) => {
                const active = i === activeIndex;
                return (
                    <motion.button
                        key={p.src}
                        type="button"
                        aria-hidden="false"
                        aria-label={p.alt}
                        onClick={() => onSelect?.(i)}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden bg-white transition-all duration-300 ${
                            active
                                ? 'ring-2 ring-orange-600 scale-110 z-20'
                                : 'ring-1 ring-black/15 hover:ring-black/40 z-10'
                        }`}
                        style={{
                            left: `${p.pos.x}%`,
                            top: `${p.pos.y}%`,
                            width: 'clamp(72px, 7vw, 104px)',
                            height: 'clamp(72px, 7vw, 104px)',
                        }}
                        {...float(i + 1)}
                    >
                        <Image
                            src={p.src}
                            alt={p.alt}
                            fill
                            sizes="104px"
                            className="object-cover"
                        />
                    </motion.button>
                );
            })}
        </div>
    );
};

export default HeroGraph;
