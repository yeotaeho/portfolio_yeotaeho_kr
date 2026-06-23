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
    MAX_NODES: 120, // 캡(2560 이상 초고해상도 헤드룸)
    AREA_PER_NODE: 41000, // 화면 넓이 / 이 값 = 노드 수 (해상도 무관 동일 밀도: QHD≈90, FHD≈50)
    FPS_INTERVAL: 22, // ms (~45fps 게이트)
    DRIFT: 0.06, // 노드 드리프트 속도
    CURSOR_PULL: 0.015, // 커서 끌림 강도

    // 가장자리 강조 (가운데는 옅게, 가장자리·꼭짓점만 더 진하고 촘촘하게)
    EDGE_BAND_FRAC: 0.22, // 가장자리 띠 폭 = min(w,h) * 이 값
    EDGE_EXTRA_RATIO: 0.8, // 가장자리 추가 노드 비율 (기본 노드 수 대비)
    CENTER_MUL: 0.4, // 가운데 실/점 불투명도 배율 (<1: 가운데를 더 옅게)
    EDGE_ALPHA_MUL: 2.4, // 가장자리에서 실/점 불투명도 최대 배율
    EDGE_WIDTH_BOOST: 0.5, // 가장자리에서 실 굵기 가산
    MAX_TOTAL: 150, // 총 노드 상한 (성능 가드)
} as const;
