// 거미줄(web) 네트워크 컨셉 공용 상수

/** 단일 포인트 컬러 (활성 노드 · hover · 현재 슬라이드) */
export const ORANGE = '#ea580c'; // tailwind orange-600

/** 배경 거미줄 캔버스 튜닝 값 (CSS px 기준) */
export const WEB = {
    LINK_R: 130, // 노드 간 실이 연결되는 최대 거리
    CURSOR_R: 160, // 커서가 노드를 끌어당기는 반경
    CURSOR_LINK_R: 180, // 노드→커서 실이 그려지는 반경
    BASE_ALPHA: 0.12, // 노드 간 실 최대 불투명도 (≤0.15: 흰색 지배)
    CURSOR_ALPHA: 0.18, // 커서 실 최대 불투명도
    DOT_ALPHA: 0.55, // 노드 점 불투명도
    MIN_NODES: 28,
    MAX_NODES: 90,
    AREA_PER_NODE: 22000, // 화면 넓이 / 이 값 = 노드 수
    FPS_INTERVAL: 22, // ms (~45fps 게이트)
    DRIFT: 0.06, // 노드 드리프트 속도
    CURSOR_PULL: 0.015, // 커서 끌림 강도
} as const;
