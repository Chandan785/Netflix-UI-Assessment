import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import PreviewModal from './PreviewModal';
import './TitleCard.css';

const TitleCard = ({ title, index }) => {
  const [showPreview, setShowPreview] = useState(false);
  const imageUrl = title.primaryImage?.url || title.image?.url || `https://image.tmdb.org/t/p/w500${title.poster_path}`;

  return (
    <>
      <motion.div 
        className="title-card"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "50px" }}
        transition={{ duration: 0.4, delay: index % 10 * 0.05 }}
        whileHover={{ scale: 1.05, zIndex: 10 }}
        onClick={() => setShowPreview(true)}
      >
        <div className="card-image-wrapper">
          <img 
            src={imageUrl} 
            alt={title.primaryTitle || title.title || title.name || "Movie Poster"} 
            loading="lazy" 
            className="card-image"
            onError={(e) => { 
              if (e.target.dataset.error) return;
              e.target.dataset.error = true;
              e.target.src = 'https://via.placeholder.com/500x750/14141d/ffffff?text=Image+Not+Found';
            }}
          />
          <div className="card-overlay">
            <div className="card-actions">
              <button className="play-mini">▶</button>
            </div>
          </div>
        </div>
        <div className="card-info">
          <h3 className="title-name">{title.primaryTitle || title.title || title.name}</h3>
          <div className="title-meta">
            <span className="year">{title.startYear || title.year || '2023'}</span>
            {title.rating && (
              <span className="rating">
                <Star size={12} className="star-icon" />
                {title.rating.aggregateRating || title.rating}
              </span>
            )}
          </div>
        </div>
      </motion.div>
      
      <AnimatePresence>
        {showPreview && <PreviewModal title={title} onClose={() => setShowPreview(false)} />}
      </AnimatePresence>
    </>
  );
};

export default memo(TitleCard);
