import { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Send, Heart } from 'lucide-react';
import Avatar from '../common/Avatar.jsx';
import { useToast } from '../../context/ToastContext.jsx';

const STORY_DURATION = 5000; // 5 seconds per slide

export default function StoryModal({ isOpen, onClose, stories, initialStoryIndex = 0 }) {
  const { showToast } = useToast();
  const [currentStoryIdx, setCurrentStoryIdx] = useState(initialStoryIndex);
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');

  const activeStory = stories[currentStoryIdx] || stories[0];
  const slides = activeStory?.slides || [];
  const activeSlide = slides[currentSlideIdx] || slides[0];

  const handleNext = useCallback(() => {
    if (currentSlideIdx < slides.length - 1) {
      setCurrentSlideIdx(prev => prev + 1);
      setProgress(0);
    } else if (currentStoryIdx < stories.length - 1) {
      setCurrentStoryIdx(prev => prev + 1);
      setCurrentSlideIdx(0);
      setProgress(0);
    } else {
      onClose();
    }
  }, [currentSlideIdx, slides.length, currentStoryIdx, stories.length, onClose]);

  const handlePrev = useCallback(() => {
    if (currentSlideIdx > 0) {
      setCurrentSlideIdx(prev => prev - 1);
      setProgress(0);
    } else if (currentStoryIdx > 0) {
      setCurrentStoryIdx(prev => prev - 1);
      const prevSlides = stories[currentStoryIdx - 1]?.slides || [];
      setCurrentSlideIdx(Math.max(0, prevSlides.length - 1));
      setProgress(0);
    }
  }, [currentSlideIdx, currentStoryIdx, stories]);

  // Reset slide index when changing story index directly
  useEffect(() => {
    setCurrentStoryIdx(initialStoryIndex);
    setCurrentSlideIdx(0);
    setProgress(0);
  }, [initialStoryIndex]);

  // Timer loop for story progress
  useEffect(() => {
    if (!isOpen || isPaused) return;

    const intervalTime = 50;
    const increment = (intervalTime / STORY_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isOpen, isPaused, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || !activeStory) return null;

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    showToast(`Reply sent to ${activeStory.userName}! 💬`, 'success');
    setReplyText('');
  };

  const handleSendReaction = () => {
    showToast(`Sent reaction to ${activeStory.userName}! ❤️`, 'success');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1050,
        backgroundColor: 'rgba(0, 0, 0, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      className="modal-backdrop-animate"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          width: 44,
          height: 44,
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 60
        }}
        className="interactive-btn"
        aria-label="Close story"
      >
        <X size={24} />
      </button>

      {/* Prev / Next controls on desktop */}
      <button
        onClick={handlePrev}
        disabled={currentStoryIdx === 0 && currentSlideIdx === 0}
        style={{
          position: 'absolute',
          left: '24px',
          width: 44,
          height: 44,
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: currentStoryIdx === 0 && currentSlideIdx === 0 ? 0.3 : 1,
          cursor: currentStoryIdx === 0 && currentSlideIdx === 0 ? 'default' : 'pointer'
        }}
        className="interactive-btn"
        aria-label="Previous story"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={handleNext}
        style={{
          position: 'absolute',
          right: '24px',
          width: 44,
          height: 44,
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        className="interactive-btn"
        aria-label="Next story"
      >
        <ChevronRight size={24} />
      </button>

      {/* Story phone-aspect container */}
      <div
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '420px',
          height: '85vh',
          maxHeight: '740px',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          backgroundColor: '#18181b',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Progress Bars */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            right: '12px',
            zIndex: 40,
            display: 'flex',
            gap: '5px'
          }}
        >
          {slides.map((_, idx) => {
            let width = '0%';
            if (idx < currentSlideIdx) width = '100%';
            else if (idx === currentSlideIdx) width = `${progress}%`;

            return (
              <div
                key={idx}
                style={{
                  flex: 1,
                  height: '3px',
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width,
                    backgroundColor: '#ffffff',
                    transition: idx === currentSlideIdx ? 'width 50ms linear' : 'none'
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* User Info Header */}
        <div
          style={{
            position: 'absolute',
            top: '24px',
            left: '14px',
            right: '14px',
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Avatar src={activeStory.userAvatar} alt={activeStory.userName} size="sm" />
            <div>
              <div
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  textShadow: '0 1px 3px rgba(0,0,0,0.8)'
                }}
              >
                {activeStory.userName}
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  textShadow: '0 1px 2px rgba(0,0,0,0.8)'
                }}
              >
                {activeSlide?.timestamp || 'Recently'}
              </div>
            </div>
          </div>
        </div>

        {/* Story Slide Image */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000000'
          }}
        >
          {activeSlide?.image && (
            <img
              src={activeSlide.image}
              alt="Story slide"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          )}

          {/* Tap Zones for Next / Prev */}
          <div
            onClick={handlePrev}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '35%',
              zIndex: 30
            }}
          />
          <div
            onClick={handleNext}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '65%',
              zIndex: 30
            }}
          />

          {/* Caption Overlay */}
          {activeSlide?.caption && (
            <div
              style={{
                position: 'absolute',
                bottom: '76px',
                left: '16px',
                right: '16px',
                zIndex: 35,
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(8px)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                color: '#ffffff',
                fontSize: '0.9rem',
                lineHeight: 1.4,
                textAlign: 'center'
              }}
            >
              {activeSlide.caption}
            </div>
          )}
        </div>

        {/* Bottom Reply Bar */}
        <div
          style={{
            padding: '12px 14px',
            backgroundColor: '#111827',
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <form
            onSubmit={handleSendReply}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Reply to ${activeStory.userName}...`}
              style={{
                width: '100%',
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: 'var(--radius-full)',
                padding: '0.55rem 2.4rem 0.55rem 0.9rem',
                fontSize: '0.85rem',
                color: '#ffffff'
              }}
            />
            <button
              type="submit"
              disabled={!replyText.trim()}
              style={{
                position: 'absolute',
                right: '6px',
                background: 'none',
                border: 'none',
                color: replyText.trim() ? 'var(--primary)' : '#6b7280',
                cursor: replyText.trim() ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center'
              }}
              aria-label="Send reply"
            >
              <Send size={16} />
            </button>
          </form>

          <button
            onClick={handleSendReaction}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              color: '#ec4899',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            className="hover-bounce"
            aria-label="Send heart reaction"
          >
            <Heart size={18} fill="#ec4899" />
          </button>
        </div>
      </div>
    </div>
  );
}
