import React from 'react';
import { ORANGE } from './constants';

interface NodeProps {
    /** 지름(px) */
    size?: number;
    /** true면 orange 포인트 */
    active?: boolean;
    className?: string;
}

/**
 * 거미줄 컨셉의 노드 점. (장식 요소)
 */
const Node: React.FC<NodeProps> = ({ size = 6, active = false, className = '' }) => (
    <span
        aria-hidden="true"
        className={`inline-block rounded-full transition-colors duration-300 ${className}`}
        style={{
            width: size,
            height: size,
            backgroundColor: active ? ORANGE : 'rgba(0,0,0,0.7)',
        }}
    />
);

export default Node;
