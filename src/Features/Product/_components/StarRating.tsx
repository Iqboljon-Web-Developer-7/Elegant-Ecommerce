import { FC, useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
}

export const StarRating: FC<StarRatingProps> = ({ value, onChange }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => i + 1).map(i => (
        <Star
          key={i}
          className={`w-6 h-6 cursor-pointer ${i <= (hovered || value) ? 'text-yellow-400' : 'text-gray-300'}`}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(i)}
        />
      ))}
    </div>
  );
};