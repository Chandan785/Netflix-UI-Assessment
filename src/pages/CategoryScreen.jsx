import React from 'react';
import { useParams } from 'react-router-dom';
import LazyList from '../components/LazyList';
import { getTitles } from '../services/api';

const CategoryScreen = () => {
  const { type } = useParams();
  
  const titleMap = {
    'TV_SERIES': 'TV Shows',
    'MOVIE': 'Movies',
    'VIDEO_GAME': 'Video Games'
  };

  return (
    <div style={{ paddingTop: '40px' }}>
      <h2 style={{ padding: '0 40px', fontSize: '2rem', marginBottom: '20px' }}>
        {titleMap[type] || 'Browse'}
      </h2>
      <LazyList fetchFn={getTitles} queryParams={{ types: [type], sortBy: 'SORT_BY_POPULARITY' }} />
    </div>
  );
};

export default CategoryScreen;
