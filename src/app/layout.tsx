import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "여태호 | AI · LLM Engineer",
  description: "LangGraph·RAG 기반 AI 서비스를 기획부터 배포까지 완성하는 AI·풀스택 엔지니어 여태호의 포트폴리오입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

