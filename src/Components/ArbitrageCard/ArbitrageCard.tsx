import React from 'react';
import { TradeStep } from '../../Models/Arbitrage';

interface Props {
  profit: number;
  tradeSteps: TradeStep[];
}

const ArbitrageCard = ({ profit, tradeSteps }: Props) => {
const size = 300;
const radius = 100;
const center = size / 2;

const positions = [
    { x: center, y: center - radius }, // Top
    { x: center - radius * Math.sin(Math.PI / 3), y: center + radius / 2 },
    { x: center + radius * Math.sin(Math.PI / 3), y: center + radius / 2 }
];

const getCurvePath = (start: any, end: any) => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const mx = (start.x + end.x) / 2;
    const my = (start.y + end.y) / 2;
    const curveStrength = 50;
    const norm = Math.sqrt(dx * dx + dy * dy);
    const offsetX = -dy / norm * curveStrength;
    const offsetY = dx / norm * curveStrength;
    const cx = mx + offsetX;
    const cy = my + offsetY;
    return `M ${start.x} ${start.y} Q ${cx} ${cy}, ${end.x} ${end.y}`;
};


return (
    <div className="bg-stone-100 rounded-xl border-4 border-black w-fit mx-auto">
        <p className="text-2xl font-semibold text-gray-800 mt-4 text-center">
            Profit: <span className="text-green-500">{profit.toFixed(4)}%</span>
        </p>

        <div className="relative w-[300px] h-[300px] mx-auto">
            <svg className="absolute inset-0 w-full h-full">
            {positions.map((pos, i) => {
                const next = positions[(i + 1) % positions.length];
                return (
                <g key={i}>
                    <path
                        d={getCurvePath(pos, next)}
                        stroke="black"
                        strokeWidth="3"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                    />
                    <text
                        x={(pos.x + next.x) / 2}
                        y={(pos.y + next.y) / 2}
                        fontSize="13"
                        textAnchor="middle"
                        fill="#8000ff"
                        fontWeight="bold"
                        >
                        {tradeSteps[i]?.rate.toFixed(4)}
                    </text>
                </g>
                );
            })}
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="10"
                        refX="14.75"
                        refY="4"
                        orient="auto"
                        markerUnits="strokeWidth"
                    >
                        <polygon points="0 0, 5 3, 0 6" fill="black" />
                    </marker>
                </defs>
            </svg>

            {positions.map((pos, i) => (
                <div
                    key={i}
                    className="absolute w-16 h-16 rounded-full bg-white font-bold flex items-center justify-center shadow-lg group"
                    style={{
                        top: pos.y - 32,
                        left: pos.x - 32,
                    }}
                >
                    <img
                        src={tradeSteps[i]?.fromImg}
                        alt={tradeSteps[i]?.from.toUpperCase()}
                        className="w-full h-full rounded-full"
                    />
                    <span className="absolute bottom-full px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                        {tradeSteps[i]?.from.toUpperCase()}
                    </span>
                </div>
            ))}
        </div>
    </div>
    );
};

export default ArbitrageCard;
