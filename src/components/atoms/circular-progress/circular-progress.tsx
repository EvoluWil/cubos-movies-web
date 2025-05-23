import React from 'react';

type CircularProgressProps = {
  percentage: number;
};

export const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
}) => {
  const radius = 70;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-[140px] h-[140px] rounded-full overflow-hidden bg-[#00000080] backdrop-blur-[2px]">
      <svg height="140" width="140" className="absolute inset-0">
        <circle
          stroke="#FFFFFF45"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx="70"
          cy="70"
        />
        <circle
          stroke="#FFE000"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="square"
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s' }}
          r={normalizedRadius}
          cx="70"
          cy="70"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[#FFE000] text-2xl font-semibold">
          {percentage}
          <span className="text-[#FFFFFF] !text-sm">%</span>
        </span>
      </div>
    </div>
  );
};
