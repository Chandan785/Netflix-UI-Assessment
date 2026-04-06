import React, { useState, useEffect } from 'react';
import { getTitles } from '../services/api';
import LazyList from '../components/LazyList';
import { Play, Plus } from 'lucide-react';
import './HomeScreen.css';

const HomeScreen = () => {
  const [topShow, setTopShow] = useState(null);

  useEffect(() => {
    // Fetch a single popular title for banner
    getTitles({ types: ['TV_SERIES'], sortBy: 'SORT_BY_POPULARITY' })
      .then(data => {
        const items = Array.isArray(data.titles) ? data.titles : 
                      Array.isArray(data.results) ? data.results : 
                      Array.isArray(data) ? data : [];
        if (items.length > 0) setTopShow(items[0]);
      }).catch(console.error);
  }, []);

  // Use a fallback dynamic high quality image from Unsplash to ensure the UI looks premium if IMDb API poster is missing
  const bannerImg = topShow?.primaryImage?.url || topShow?.image?.url || 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2000&auto=format';

  return (
    <div className="home-screen">
      {topShow && (
        <div className="hero-banner" style={{ backgroundImage: `url(${bannerImg})` }}>
          <div className="hero-gradient"></div>
          <div className="hero-content">
            <h1 className="hero-title">{topShow.primaryTitle || topShow.title || topShow.name || 'Top Show'}</h1>
            <p className="hero-overview">Today's Top Pick • {topShow.startYear || topShow.year || '2024'}</p>
            <div className="hero-actions">
              <button className="btn-play"><Play fill="black" size={20}/> Play</button>
              <button className="btn-add"><Plus size={20}/> My List</button>
            </div>
          </div>
        </div>
      )}
      
      <div className="list-section">
        <h2 className="section-title">Trending Now</h2>
        {/* Pass an array of types to lazy list */}
        <LazyList fetchFn={getTitles} queryParams={{ types: ['MOVIE', 'TV_SERIES'] }} />
      </div>
    </div>
  );
};

export default HomeScreen;
