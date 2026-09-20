import { Heart } from 'lucide-react';

export default function FloatingHeart({ show }) {
  if (!show) return null;

  return (
    <div className="floating-heart">
      <Heart size={88} fill="#ec4899" color="#ec4899" />
    </div>
  );
}
