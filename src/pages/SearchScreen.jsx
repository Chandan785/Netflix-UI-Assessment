import React, { useState, useEffect } from 'react';
import { searchTitles } from '../services/api';
import TitleCard from '../components/TitleCard';
import './SearchScreen.css';
import { Search } from 'lucide-react';

// Custom debounce hook to avoid redundant API calls
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500); // 500ms debounce
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (debouncedQuery.trim().length === 0) {
      setResults([]);
      return;
    }
    
    let isMounted = true;
    setLoading(true);
    searchTitles(debouncedQuery)
      .then(data => {
        if (isMounted) {
          const items = Array.isArray(data.titles) ? data.titles : 
                        Array.isArray(data.results) ? data.results : 
                        Array.isArray(data) ? data : [];
          setResults(items);
        }
      })
      .catch(console.error)
      .finally(() => {
        if (isMounted) setLoading(false);
      });
      
    return () => { isMounted = false; };
  }, [debouncedQuery]);

  return (
    <div className="search-screen">
      <div className="search-header">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={28} />
          <input 
            type="text" 
            placeholder="Search TV shows, movies, names..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
            autoFocus
          />
        </div>
      </div>
      
      <div className="search-results-container">
        {loading && <div className="loader" style={{margin: '40px auto'}}></div>}
        
        {!loading && results.length > 0 && (
          <div className="card-grid" style={{padding: '0 40px'}}>
            {results.map((item, index) => (
              <TitleCard key={item.id || item.titleId || index} title={item} index={index} />
            ))}
          </div>
        )}
        
        {!loading && debouncedQuery && results.length === 0 && (
          <div className="no-results">
            No results found for "{debouncedQuery}"
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchScreen;
