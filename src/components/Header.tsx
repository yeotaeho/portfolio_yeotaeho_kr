"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';

// 메뉴 항목 정의
const menuItems: string[] = ["ABOUT", "PROJECTS", "BLOG", "CONTACT"];

// 메뉴 항목과 경로 매핑
const menuItemPaths: Record<string, string> = {
    "ABOUT": "#about",
    "PROJECTS": "#projects",
    "BLOG": "#blog",
    "CONTACT": "#contact"
};

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white z-50 lg:hidden">
            <div className="flex flex-col h-full">
                {/* 헤더 */}
                <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
                    <div className="text-xl font-bold tracking-tight">
                        YEO<span className="text-orange-600">TAEHO</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-md transition"
                        aria-label="메뉴 닫기"
                    >
                        <HiX className="w-6 h-6" />
                    </button>
                </div>

                {/* 메뉴 항목 */}
                <nav className="flex-1 px-6 py-8">
                    <ul className="space-y-6">
                        {menuItems.map((item) => {
                            const path = menuItemPaths[item] || "#";
                            return (
                                <li key={item}>
                                    <a
                                        href={path}
                                        onClick={onClose}
                                        className="text-xl text-gray-800 hover:text-orange-600 transition duration-150 font-medium block"
                                    >
                                        {item}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* 하단 버튼들 */}
                <div className="px-6 py-6 border-t border-gray-100 space-y-4">
                    <a
                        href="mailto:tkakrrl1234@gmail.com"
                        onClick={onClose}
                        className="block w-full px-4 py-3 text-center text-sm border border-gray-900 rounded-md hover:bg-gray-100 transition duration-150 font-medium"
                    >
                        이메일 보내기
                    </a>
                    <div className="flex justify-center space-x-4 text-sm font-medium">
                        <a href="https://github.com/yeotaeho" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">GitHub</a>
                        <span className="text-gray-300">·</span>
                        <a href="https://velog.io/@wp187133/posts" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">Velog</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * 상단 헤더 컴포넌트
 */
const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <header className="flex justify-between items-center px-6 lg:px-10 py-5 h-20 border-b border-gray-100 shadow-sm sticky top-0 bg-white z-50">
                {/* 로고 */}
                <Link href="/" className="text-xl font-bold tracking-tight">
                    YEO<span className="text-orange-600">TAEHO</span>
                </Link>

                {/* 메인 메뉴 (데스크톱) */}
                <nav className="hidden lg:block">
                    <ul className="flex space-x-8">
                        {menuItems.map((item) => {
                            const path = menuItemPaths[item] || "#";
                            return (
                                <li key={item}>
                                    <a
                                        href={path}
                                        className="text-sm text-gray-800 hover:text-orange-600 transition duration-150 font-medium"
                                    >
                                        {item}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* 오른쪽 섹션 (문의 버튼 및 언어 스위치) */}
                <div className="flex items-center space-x-4 lg:space-x-5">
                    <a
                        href="mailto:tkakrrl1234@gmail.com"
                        className="hidden md:block px-4 py-2 text-xs border border-gray-900 rounded-md hover:bg-gray-100 transition duration-150 font-medium shadow-sm"
                    >
                        이메일 보내기
                    </a>
                    <div className="hidden lg:flex space-x-3 text-sm font-medium">
                        <a href="https://github.com/yeotaeho" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">GitHub</a>
                        <span className="text-gray-300">·</span>
                        <a href="https://velog.io/@wp187133/posts" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">Velog</a>
                    </div>
                    {/* 모바일 메뉴 버튼 */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition"
                        aria-label="메뉴 열기"
                    >
                        <HiMenu className="w-6 h-6" />
                    </button>
                </div>
            </header>

            {/* 모바일 메뉴 */}
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
};

export default Header;

