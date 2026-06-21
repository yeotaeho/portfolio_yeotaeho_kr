"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// 타이핑될 인트로 문구 (한글 + 영문 혼합)
interface IntroLine {
    text: string;
    accent?: boolean; // true면 orange-600 강조
}

const LINES: IntroLine[] = [
    { text: '여태호 · YEO TAEHO' },
    { text: 'AI · LLM Engineer', accent: true },
    { text: 'LangGraph · RAG · Full-Stack' },
];

// 타이핑 속도 상수 (조정 용이)
const CHAR_DELAY = 60; // 글자당 ms
const LINE_PAUSE = 500; // 줄 사이 일시정지 ms
const END_HOLD = 900; // 마지막 줄 완료 후 유지 ms

interface IntroOverlayProps {
    onComplete: () => void;
}

/**
 * 진입 인트로 오버레이 (미니멀 엘레강스 / 한 글자씩 타이핑 후 위로 사라짐)
 */
const IntroOverlay: React.FC<IntroOverlayProps> = ({ onComplete }) => {
    const prefersReduced = useReducedMotion();

    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [done, setDone] = useState(false);
    const [visible, setVisible] = useState(true);

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const reducedHandledRef = useRef(false);

    // 타이핑 로직
    useEffect(() => {
        // 모션 최소화 선호 시 전체 즉시 표시 후 바로 종료
        if (prefersReduced) {
            if (reducedHandledRef.current) return;
            reducedHandledRef.current = true;
            setLineIndex(LINES.length - 1);
            setCharIndex(LINES[LINES.length - 1].text.length);
            setDone(true);
            return;
        }

        const currentLine = LINES[lineIndex].text;

        if (charIndex < currentLine.length) {
            timeoutRef.current = setTimeout(() => setCharIndex((c) => c + 1), CHAR_DELAY);
        } else if (lineIndex < LINES.length - 1) {
            timeoutRef.current = setTimeout(() => {
                setLineIndex((l) => l + 1);
                setCharIndex(0);
            }, LINE_PAUSE);
        } else {
            timeoutRef.current = setTimeout(() => setDone(true), END_HOLD);
        }

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [lineIndex, charIndex, prefersReduced]);

    // done이 되면 퇴장 애니메이션 시작
    useEffect(() => {
        if (done) setVisible(false);
    }, [done]);

    // 스크롤 잠금
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, []);

    // 스킵 (버튼 / Esc / Enter)
    const handleSkip = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setDone(true);
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' || e.key === 'Enter') handleSkip();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [handleSkip]);

    return (
        <AnimatePresence onExitComplete={onComplete}>
            {visible && (
                <motion.div
                    key="intro"
                    role="dialog"
                    aria-label="인트로 애니메이션"
                    aria-live="polite"
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white px-6 select-none"
                    initial={prefersReduced ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={prefersReduced ? { opacity: 0 } : { y: '-100%', opacity: 0 }}
                    transition={{ duration: prefersReduced ? 0 : 0.7, ease: [0.76, 0, 0.24, 1] }}
                >
                    {/* SKIP 버튼 */}
                    <button
                        onClick={handleSkip}
                        className="absolute top-6 right-6 text-xs tracking-[0.3em] text-gray-400 hover:text-orange-600 transition-colors"
                        aria-label="인트로 건너뛰기"
                    >
                        SKIP ▸
                    </button>

                    {/* 타이핑 라인 */}
                    <div className="w-full max-w-4xl text-center">
                        {LINES.map((line, i) => {
                            if (i > lineIndex) return null;
                            const text = i < lineIndex ? line.text : line.text.slice(0, charIndex);
                            const showCursor = i === lineIndex;
                            return (
                                <div
                                    key={i}
                                    className={`font-light tracking-tight leading-tight ${
                                        i === 0
                                            ? 'text-4xl sm:text-6xl lg:text-7xl mb-4'
                                            : 'text-xl sm:text-2xl lg:text-3xl mb-2'
                                    } ${line.accent ? 'text-orange-600' : 'text-gray-900'}`}
                                >
                                    <span className="whitespace-pre-wrap">{text}</span>
                                    {showCursor && (
                                        <span
                                            className="intro-cursor inline-block w-[2px] sm:w-[3px] bg-orange-600 align-middle ml-1"
                                            style={{ height: '0.9em' }}
                                            aria-hidden="true"
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IntroOverlay;
