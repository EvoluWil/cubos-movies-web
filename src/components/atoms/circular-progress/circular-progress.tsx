'use client';

import { useWindowSize } from '@/hooks/size';
import React, { useEffect, useState } from 'react';

type CircularProgressProps = {
  percentage: number;
  size?: 'sm' | 'md';
};

export const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size = 'md',
}) => {
  const [started, setStarted] = useState(false);

  const { width } = useWindowSize();

  const isSmallerThanSm = size === 'sm' || width < 640;

  const radius = isSmallerThanSm ? 49 : 70;
  const stroke = isSmallerThanSm ? 6 : 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    setStarted(true);
  }, []);

  if (!started) {
    return null;
  }

  return (
    <div
      className={`relative ${
        isSmallerThanSm ? 'w-[98px] h-[98px]' : 'w-[140px] h-[140px]'
      } rounded-full overflow-hidden bg-[#00000080] backdrop-blur-[2px]`}
    >
      <svg height={radius * 2} width={radius * 2} className="absolute inset-0">
        <circle
          stroke="#FFFFFF45"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#FFE000"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="square"
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s' }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`text-[#FFE000] font-semibold ${
            isSmallerThanSm ? 'text-xl' : 'text-2xl'
          }`}
        >
          {percentage}
          <span
            className={`text-[#FFFFFF] ml-0.5 ${
              isSmallerThanSm ? 'text-xs' : 'text-sm'
            }`}
          >
            %
          </span>
        </span>
      </div>
    </div>
  );
};
