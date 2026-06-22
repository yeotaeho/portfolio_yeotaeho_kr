"use client";

import React, { useEffect, useRef } from 'react';
import { ORANGE, WEB } from './constants';

interface WebNode {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
}

/**
 * 전역 거미줄 배경 (캔버스).
 * - 노드가 은은하게 드리프트하고, 커서 근처에서 검은 실이 연결·반응
 * - 커서 최근접 노드 1개만 orange 포인트
 * - prefers-reduced-motion 시 정적 1프레임
 * - pointer-events-none + aria-hidden 으로 본문 상호작용을 절대 막지 않음
 */
const WebBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let nodes: WebNode[] = [];
        let raf = 0;
        let last = 0;
        let w = 0;
        let h = 0;
        let running = true;
        const mouse = { x: -9999, y: -9999, active: false };

        const reducedMQ = window.matchMedia('(prefers-reduced-motion: reduce)');

        // 가장자리 가중치: 가운데=0, 가장자리 띠 안=1 (꼭짓점은 두 변 겹쳐 자동 최강)
        const band = () => Math.min(w, h) * WEB.EDGE_BAND_FRAC;
        const edgeWeight = (x: number, y: number) => {
            const d = Math.min(x, w - x, y, h - y);
            return 1 - Math.min(d / band(), 1);
        };
        // 가운데 CENTER_MUL(옅게) → 가장자리 EDGE_ALPHA_MUL 배
        const edgeMul = (x: number, y: number) =>
            WEB.CENTER_MUL + (WEB.EDGE_ALPHA_MUL - WEB.CENTER_MUL) * edgeWeight(x, y);

        const makeNode = (x: number, y: number): WebNode => ({
            x,
            y,
            vx: (Math.random() * 2 - 1) * WEB.DRIFT,
            vy: (Math.random() * 2 - 1) * WEB.DRIFT,
            r: 1 + Math.random() * 0.6,
        });

        const seed = () => {
            const base = Math.max(
                WEB.MIN_NODES,
                Math.min(WEB.MAX_NODES, Math.round((w * h) / WEB.AREA_PER_NODE))
            );
            // 가운데 밀도 유지용 균일 노드
            const next: WebNode[] = Array.from({ length: base }, () =>
                makeNode(Math.random() * w, Math.random() * h)
            );

            // 가장자리 띠 안에만 추가 노드 (꼭짓점은 두 변에 걸쳐 자동으로 더 촘촘)
            const extra = Math.min(
                Math.round(base * WEB.EDGE_EXTRA_RATIO),
                WEB.MAX_TOTAL - next.length
            );
            const b = band();
            for (let i = 0; i < extra; i++) {
                const side = Math.floor(Math.random() * 4);
                if (side === 0) next.push(makeNode(Math.random() * w, Math.random() * b)); // 상
                else if (side === 1) next.push(makeNode(Math.random() * w, h - Math.random() * b)); // 하
                else if (side === 2) next.push(makeNode(Math.random() * b, Math.random() * h)); // 좌
                else next.push(makeNode(w - Math.random() * b, Math.random() * h)); // 우
            }

            nodes = next;
        };

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            seed();
        };

        const draw = () => {
            ctx.clearRect(0, 0, w, h);

            // 1) 근접 노드 간 실
            for (let i = 0; i < nodes.length; i++) {
                const a = nodes[i];
                for (let j = i + 1; j < nodes.length; j++) {
                    const b = nodes[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const d = Math.hypot(dx, dy);
                    if (d < WEB.LINK_R) {
                        // 실의 중점 기준 가장자리 가중치 적용
                        const ew = edgeWeight((a.x + b.x) / 2, (a.y + b.y) / 2);
                        const mul = WEB.CENTER_MUL + (WEB.EDGE_ALPHA_MUL - WEB.CENTER_MUL) * ew;
                        ctx.strokeStyle = `rgba(0,0,0,${(1 - d / WEB.LINK_R) * WEB.BASE_ALPHA * mul})`;
                        ctx.lineWidth = 1 + WEB.EDGE_WIDTH_BOOST * ew;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }

            // 2) 노드→커서 실 + 최근접 노드 탐색
            let nearest = -1;
            let nearestD = Infinity;
            if (mouse.active) {
                for (let i = 0; i < nodes.length; i++) {
                    const a = nodes[i];
                    const dx = a.x - mouse.x;
                    const dy = a.y - mouse.y;
                    const d = Math.hypot(dx, dy);
                    if (d < WEB.CURSOR_LINK_R) {
                        ctx.strokeStyle = `rgba(0,0,0,${(1 - d / WEB.CURSOR_LINK_R) * WEB.CURSOR_ALPHA})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                    if (d < nearestD) {
                        nearestD = d;
                        nearest = i;
                    }
                }
            }

            // 3) 노드 점 (커서 최근접 1개만 orange)
            for (let i = 0; i < nodes.length; i++) {
                const a = nodes[i];
                if (i === nearest && nearestD < WEB.CURSOR_R) {
                    ctx.fillStyle = ORANGE;
                    ctx.beginPath();
                    ctx.arc(a.x, a.y, a.r + 1.2, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    const dotAlpha = Math.min(WEB.DOT_ALPHA * edgeMul(a.x, a.y), 1);
                    ctx.fillStyle = `rgba(0,0,0,${dotAlpha})`;
                    ctx.beginPath();
                    ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        };

        const step = (t: number) => {
            raf = requestAnimationFrame(step);
            if (!running) return;
            if (t - last < WEB.FPS_INTERVAL) return;
            last = t;

            for (const a of nodes) {
                a.x += a.vx;
                a.y += a.vy;
                if (a.x < 0 || a.x > w) a.vx *= -1;
                if (a.y < 0 || a.y > h) a.vy *= -1;
                if (mouse.active) {
                    const dx = mouse.x - a.x;
                    const dy = mouse.y - a.y;
                    const d = Math.hypot(dx, dy);
                    if (d < WEB.CURSOR_R && d > 0.01) {
                        const f = (1 - d / WEB.CURSOR_R) * WEB.CURSOR_PULL;
                        a.x += dx * f;
                        a.y += dy * f;
                    }
                }
            }
            draw();
        };

        const onMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouse.active = true;
        };
        const onLeave = () => {
            mouse.active = false;
        };
        const onVis = () => {
            running = !document.hidden;
        };
        const onResize = () => resize();

        const teardownLive = () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('pointerleave', onLeave);
            document.removeEventListener('visibilitychange', onVis);
        };

        const startStatic = () => {
            resize();
            mouse.active = false;
            draw();
        };

        const startAnimated = () => {
            resize();
            window.addEventListener('mousemove', onMove);
            window.addEventListener('pointerleave', onLeave);
            document.addEventListener('visibilitychange', onVis);
            raf = requestAnimationFrame(step);
        };

        const onReduceChange = () => {
            teardownLive();
            if (reducedMQ.matches) startStatic();
            else startAnimated();
        };

        if (reducedMQ.matches) startStatic();
        else startAnimated();

        window.addEventListener('resize', onResize);
        reducedMQ.addEventListener('change', onReduceChange);

        return () => {
            teardownLive();
            window.removeEventListener('resize', onResize);
            reducedMQ.removeEventListener('change', onReduceChange);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="fixed inset-0 z-0 pointer-events-none"
        />
    );
};

export default WebBackground;
