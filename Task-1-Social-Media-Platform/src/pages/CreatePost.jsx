import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, Smile, MapPin, X, Sparkles, Upload, ArrowLeft } from 'lucide-react';
import Avatar from '../components/common/Avatar.jsx';
import Button from '../components/common/Button.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { usePosts } from '../context/PostContext.jsx';

const PRESET_IMAGES = [
  { label: 'Modern Setup', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Alpine Peak', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Abstract Art', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80' },
  { label: 'City Lights', url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Coffee & Code', url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Creative Studio', url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&auto=format&fit=crop&q=80' }
];

const FEELINGS = [
  '🚀 excited',
  '☕ relaxed',
  '💡 inspired',
  '💻 coding',
  '🎨 creative',
  '🔥 energized'
];

export default function CreatePost() {
  const { currentUser } = useAuth();
  const { createPost } = usePosts();
  const navigate = useNavigate();

  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [category, setCategory] = useState('Design');
  const [feeling, setFeeling] = useState('');
  const [location, setLocation] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [showPresets, setShowPresets] = useState(false);
  const [showFeelings, setShowFeelings] = useState(false);
  const [showLocationInput, setShowLocationInput] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const parsedTags = tagsInput
      ? tagsInput
          .split(/[\s,]+/)
          .filter(t => t.trim().length > 0)
          .map(t => (t.startsWith('#') ? t : `#${t}`))
      : [`#${category}`, '#SocialSphere'];

    createPost({
      content,
      image: selectedImage,
      category,
      feeling,
      location,
      tags: parsedTags
    });

    navigate('/');
  };

  if (!currentUser) return null;

  return (
    <div className="create-post-page surface-card animate-fade-in-up" style={{ padding: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: '6px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-surface-hover)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          className="interactive-btn"
        >
          <ArrowLeft size={18} />
        </button>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Create New Post</h2>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Author row & category selector */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Avatar src={currentUser.avatar} alt={currentUser.name} size="md" />
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {currentUser.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                @{currentUser.username}
              </div>
            </div>
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              padding: '0.4rem 0.85rem',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-surface-hover)',
              border: '1px solid var(--border)'
            }}
          >
            <option value="Design">🎨 Design</option>
            <option value="Tech">💻 Tech</option>
            <option value="Photography">📷 Photography</option>
            <option value="Code">⚡ Code</option>
            <option value="Lifestyle">✨ Lifestyle</option>
          </select>
        </div>

        {/* Text Area */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`Share what you're working on, learning, or discovering today...`}
          rows={5}
          style={{
            width: '100%',
            resize: 'none',
            border: 'none',
            backgroundColor: 'transparent',
            padding: '0.5rem 0',
            fontSize: '1.05rem',
            lineHeight: 1.5,
            color: 'var(--text-primary)'
          }}
          autoFocus
        />

        {/* Active Feeling / Location tags */}
        {(feeling || location) && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {feeling && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 10px',
                  backgroundColor: 'var(--bg-surface-hover)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)'
                }}
              >
                Feeling {feeling}
                <X size={12} style={{ cursor: 'pointer' }} onClick={() => setFeeling('')} />
              </span>
            )}
            {location && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 10px',
                  backgroundColor: 'var(--bg-surface-hover)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)'
                }}
              >
                📍 {location}
                <X size={12} style={{ cursor: 'pointer' }} onClick={() => setLocation('')} />
              </span>
            )}
          </div>
        )}

        {/* Image Preview */}
        {selectedImage && (
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              maxHeight: '340px',
              border: '1px solid var(--border)'
            }}
          >
            <img
              src={selectedImage}
              alt="Uploaded preview"
              style={{ width: '100%', height: '340px', objectFit: 'cover' }}
            />
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: '#ffffff',
                width: 32,
                height: 32,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Remove image"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Preset Gallery Picker */}
        {showPresets && (
          <div
            style={{
              backgroundColor: 'var(--bg-surface-hover)',
              padding: '0.85rem',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Choose from Showcase Photos</span>
              <X size={14} style={{ cursor: 'pointer' }} onClick={() => setShowPresets(false)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {PRESET_IMAGES.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedImage(img.url);
                    setShowPresets(false);
                  }}
                  style={{
                    height: '80px',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  className="interactive-btn"
                >
                  <img src={img.url} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: '4px 6px',
                      color: '#ffffff',
                      fontSize: '0.7rem',
                      fontWeight: 600
                    }}
                  >
                    {img.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feelings Picker */}
        {showFeelings && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              padding: '0.65rem',
              backgroundColor: 'var(--bg-surface-hover)',
              borderRadius: 'var(--radius-md)'
            }}
          >
            {FEELINGS.map((f, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => {
                  setFeeling(f);
                  setShowFeelings(false);
                }}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--bg-surface)',
                  fontSize: '0.85rem',
                  border: '1px solid var(--border)'
                }}
                className="interactive-btn"
              >
                {f}
              </button>
            ))}
          </div>
        )}

        {/* Location Input */}
        {showLocationInput && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. San Francisco Design Studio"
              style={{ flex: 1 }}
            />
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={() => setShowLocationInput(false)}
            >
              Done
            </Button>
          </div>
        )}

        {/* Tags input */}
        <input
          type="text"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="Add tags separated by space (e.g. #DesignSystem #WebDev)"
        />

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {/* Action bar and Submit */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border)',
            paddingTop: '1rem',
            marginTop: '0.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Upload from device"
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: 'var(--bg-surface-hover)',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              className="hover-bounce"
            >
              <Upload size={18} />
            </button>

            <button
              type="button"
              onClick={() => setShowPresets(prev => !prev)}
              title="Pick showcase photo"
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: 'var(--bg-surface-hover)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              className="hover-bounce"
            >
              <Sparkles size={18} />
            </button>

            <button
              type="button"
              onClick={() => setShowFeelings(prev => !prev)}
              title="Add feeling"
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: 'var(--bg-surface-hover)',
                color: '#f59e0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              className="hover-bounce"
            >
              <Smile size={18} />
            </button>

            <button
              type="button"
              onClick={() => setShowLocationInput(prev => !prev)}
              title="Add location"
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: 'var(--bg-surface-hover)',
                color: '#ec4899',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              className="hover-bounce"
            >
              <MapPin size={18} />
            </button>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={!content.trim()}
          >
            Publish Post
          </Button>
        </div>
      </form>
    </div>
  );
}
