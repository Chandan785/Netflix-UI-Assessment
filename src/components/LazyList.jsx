import React, { useState, useEffect, useRef, useCallback } from 'react';
import TitleCard from './TitleCard';
import './LazyList.css';

const LazyList = ({ fetchFn, queryParams }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();
  
  // Reset when query changes
  useEffect(() => {
    let isMounted = true;
    setItems([]);
    setNextPageToken(null);
    setHasMore(true);
    setError(null);

    const loadInitial = async () => {
      setLoading(true);
      try {
        const data = await fetchFn(queryParams);
        if (isMounted) {
          // Flatten standard IMDb payload 
        const results = Array.isArray(data.titles) ? data.titles : 
                        Array.isArray(data.results) ? data.results : 
                        Array.isArray(data) ? data : [];
        setItems(results);
          setNextPageToken(data.nextPageToken || data.pageInfo?.endCursor || null);
          setHasMore(!!(data.nextPageToken || data.pageInfo?.hasNextPage));
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    
    loadInitial();
    return () => { isMounted = false; };
  }, [fetchFn, JSON.stringify(queryParams)]);

  // Observer callback for infinite scrolling
  const lastElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const loadMore = async () => {
    setLoading(true);
    try {
      const data = await fetchFn({ ...queryParams, pageToken: nextPageToken });
      const results = Array.isArray(data.titles) ? data.titles : 
                      Array.isArray(data.results) ? data.results : 
                      Array.isArray(data) ? data : [];
      if (results.length === 0) {
        setHasMore(false);
      } else {
        setItems(prev => [...prev, ...results]);
        setNextPageToken(data.nextPageToken || data.pageInfo?.endCursor || null);
        setHasMore(!!(data.nextPageToken || data.pageInfo?.hasNextPage));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div className="list-error">Error: {error}</div>;
  }

  return (
    <div className="lazy-list-container">
      <div className="card-grid">
        {items.map((item, index) => {
          // Identify unique ID if possible
          const key = item.id || item.titleId || `${item.title}-${index}`;
          // Ref goes on the last item to trigger intersection
          if (items.length === index + 1) {
            return (
              <div ref={lastElementRef} key={key}>
                <TitleCard title={item} index={index} />
              </div>
            );
          } else {
            return <TitleCard key={key} title={item} index={index} />;
          }
        })}
      </div>
      {loading && (
        <div className="loading-indicator">
          <div className="loader"></div>
        </div>
      )}
      {!hasMore && items.length > 0 && (
        <div className="end-of-list">You've reached the end!</div>
      )}
    </div>
  );
};

export default LazyList;
