import React from 'react';
import { motion } from 'motion/react';

interface Planet {
  name: string;
  house: number;
}

interface NorthIndianChartProps {
  rashiMap: number[]; // Rashi numbers for houses 1-12
  planets: Planet[];
  title?: string;
}

export function NorthIndianChart({ rashiMap, planets, title }: NorthIndianChartProps) {
  // Houses positions in SVG (X, Y center of each diamond/triangle)
  const housePositions = [
    { x: 200, y: 150 }, // 1st House (Center Diamond)
    { x: 100, y: 50 },  // 2nd House
    { x: 50, y: 100 },  // 3rd House
    { x: 150, y: 200 }, // 4th House (Bottom Diamond)
    { x: 50, y: 300 },  // 5th House
    { x: 100, y: 350 }, // 6th House
    { x: 200, y: 250 }, // 7th House (Center Diamond)
    { x: 300, y: 350 }, // 8th House
    { x: 350, y: 300 }, // 9th House
    { x: 250, y: 200 }, // 10th House (Top Diamond)
    { x: 350, y: 100 }, // 11th House
    { x: 300, y: 50 },  // 12th House
  ];

  // Correcting positions for a 400x400 SVG
  const actualPositions = [
    { x: 200, y: 130 }, // 1 (Top Center Diamond)
    { x: 100, y: 60 },  // 2
    { x: 55, y: 110 },  // 3
    { x: 130, y: 200 }, // 4 (Left Center Diamond)
    { x: 55, y: 290 },  // 5
    { x: 100, y: 340 }, // 6
    { x: 200, y: 270 }, // 7 (Bottom Center Diamond)
    { x: 300, y: 340 }, // 8
    { x: 345, y: 290 }, // 9
    { x: 270, y: 200 }, // 10 (Right Center Diamond)
    { x: 345, y: 110 }, // 11
    { x: 300, y: 60 },  // 12
  ];

  return (
    <div className="flex flex-col items-center">
      {title && <h3 className="text-lg font-bold text-gray-700 mb-4 font-hindi">{title}</h3>}
      <div className="relative w-full max-w-[400px] aspect-square bg-stone-50 rounded-2xl border border-border-soft p-4 shadow-sm">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          {/* Outer Frame */}
          <rect x="0" y="0" width="400" height="400" fill="none" stroke="#3C3633" strokeWidth="2" />
          
          {/* Diagonals */}
          <line x1="0" y1="0" x2="400" y2="400" stroke="#3C3633" strokeWidth="1.5" />
          <line x1="400" y1="0" x2="0" y2="400" stroke="#3C3633" strokeWidth="1.5" />
          
          {/* Inner Diamond */}
          <line x1="200" y1="0" x2="0" y2="200" stroke="#3C3633" strokeWidth="1.5" />
          <line x1="0" y1="200" x2="200" y2="400" stroke="#3C3633" strokeWidth="1.5" />
          <line x1="200" y1="400" x2="400" y2="200" stroke="#3C3633" strokeWidth="1.5" />
          <line x1="400" y1="200" x2="200" y2="0" stroke="#3C3633" strokeWidth="1.5" />

          {/* Rendering Rashi Numbers & Planets */}
          {actualPositions.map((pos, index) => {
            const rashi = rashiMap[index];
            const housePlanets = planets.filter(p => p.house === index + 1);
            
            return (
              <g key={index}>
                {/* Rashi Number */}
                <text 
                  x={pos.x} 
                  y={pos.y + 15} 
                  textAnchor="middle" 
                  className="fill-accent-orange font-bold text-base"
                >
                  {rashi}
                </text>
                
                {/* Planets List */}
                <foreignObject x={pos.x - 40} y={pos.y - 25} width="80" height="40">
                  <div className="flex flex-wrap justify-center gap-1">
                    {housePlanets.map((p, pi) => (
                      <span key={pi} className="text-[10px] font-bold text-earth-brown bg-stone-100 px-1 rounded leading-none">
                        {p.name.substring(0, 2)}
                      </span>
                    ))}
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
