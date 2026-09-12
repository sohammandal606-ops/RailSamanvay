import React from 'react';

interface GovEmblemProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'gold' | 'navy' | 'white' | 'tricolor';
  className?: string;
  showText?: boolean;
}

export const GovEmblem: React.FC<GovEmblemProps> = ({
  size = 'md',
  variant = 'gold',
  className = '',
  showText = false
}) => {
  const sizeMap = {
    sm: { dimension: 24, textClass: 'text-[9px]' },
    md: { dimension: 36, textClass: 'text-[11px]' },
    lg: { dimension: 48, textClass: 'text-xs' },
    xl: { dimension: 64, textClass: 'text-sm' },
  };

  const { dimension, textClass } = sizeMap[size];

  const getColors = () => {
    switch (variant) {
      case 'white':
        return {
          primary: '#FFFFFF',
          secondary: '#E2E8F0',
          accent: '#93C5FD',
        };
      case 'navy':
        return {
          primary: '#071A2E',
          secondary: '#1E3E62',
          accent: '#C2850A',
        };
      case 'tricolor':
        return {
          primary: '#FF671F',
          secondary: '#046A38',
          accent: '#000080',
        };
      case 'gold':
      default:
        return {
          primary: '#C2850A',
          secondary: '#071A2E',
          accent: '#D97706',
        };
    }
  };

  const colors = getColors();

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      <svg
        width={dimension}
        height={dimension}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform hover:scale-105"
        role="img"
        aria-label="Indian Railways Official Crest"
      >
        {/* Outer Circular Ring with Railway Track Ties */}
        <circle cx="50" cy="50" r="46" stroke={colors.primary} strokeWidth="3.5" fill="none" />
        <circle cx="50" cy="50" r="41" stroke={colors.primary} strokeWidth="1.5" strokeDasharray="3 3" fill="none" />

        {/* Ashoka Lion / Star Crest Peak */}
        <polygon points="50,9 53,16 60,16 54,20 56,27 50,23 44,27 46,20 40,16 47,16" fill={colors.primary} />

        {/* Central Ashoka Chakra */}
        <circle cx="50" cy="50" r="22" stroke={colors.primary} strokeWidth="2.5" fill="none" />
        <circle cx="50" cy="50" r="6" fill={colors.primary} />
        
        {/* Chakra 24 Spokes */}
        {[...Array(12)].map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="28"
            x2="50"
            y2="72"
            stroke={colors.primary}
            strokeWidth="1.2"
            transform={`rotate(${i * 15} 50 50)`}
          />
        ))}

        {/* Dynamic Railway Track Base Curve */}
        <path
          d="M 22 75 Q 50 86 78 75"
          stroke={colors.primary}
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 26 80 Q 50 91 74 80"
          stroke={colors.primary}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Cross Sleepers */}
        <line x1="33" y1="76" x2="31" y2="82" stroke={colors.primary} strokeWidth="2.5" />
        <line x1="41" y1="77" x2="41" y2="84" stroke={colors.primary} strokeWidth="2.5" />
        <line x1="50" y1="78" x2="50" y2="85" stroke={colors.primary} strokeWidth="2.5" />
        <line x1="59" y1="77" x2="59" y2="84" stroke={colors.primary} strokeWidth="2.5" />
        <line x1="67" y1="76" x2="69" y2="82" stroke={colors.primary} strokeWidth="2.5" />

        {/* Star Accents */}
        <circle cx="20" cy="48" r="2.5" fill={colors.primary} />
        <circle cx="80" cy="48" r="2.5" fill={colors.primary} />
      </svg>

      {showText && (
        <div className="leading-tight">
          <span className={`font-bold block tracking-wide text-slate-900 ${textClass}`}>
            भारतीय रेल • INDIAN RAILWAYS
          </span>
          <span className="text-[10px] text-slate-500 font-medium block">
            Government of India • Ministry of Railways
          </span>
        </div>
      )}
    </div>
  );
};
