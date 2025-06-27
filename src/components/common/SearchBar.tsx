import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import axios from 'axios';
import { Ibook } from '../../types/Book';
import { searchService } from '../../services/search.service';
import '../../css/search.css';

interface SearchSuggestion {
  _id: string;
  title: string;
  cover_image: string;
  price: number;
}

export const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search for suggestions
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim() && searchTerm.length > 1) {
        fetchSuggestions(searchTerm);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchSuggestions = async (query: string) => {
    try {
      setIsLoading(true);
      // Try the new suggestions endpoint first
      try {
        const response = await axios.get(`http://localhost:8888/api/books/suggestions?q=${encodeURIComponent(query)}&limit=5`);
        if (response.data?.data) {
          setSuggestions(response.data.data);
        } else {
          setSuggestions([]);
        }
      } catch (apiError) {
        // Fallback to search service
        const suggestions = await searchService.getSearchSuggestions(query, 5);
        setSuggestions(suggestions);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      performSearch(searchTerm.trim());
    }
  };

  const performSearch = (query: string) => {
    // Save to search history
    searchService.saveSearchHistory(query);
    
    // Update local recent searches
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    
    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setSearchTerm(suggestion.title);
    performSearch(suggestion.title);
  };

  const handleRecentSearchClick = (query: string) => {
    setSearchTerm(query);
    performSearch(query);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
    inputRef.current?.focus();
  };

  const removeRecentSearch = (query: string, e: React.MouseEvent) => {
    e.stopPropagation();
    searchService.removeFromSearchHistory(query);
    const updated = recentSearches.filter(s => s !== query);
    setRecentSearches(updated);
  };

  return (
    <div ref={searchRef} className="search-bar-container relative w-full max-w-2xl">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex items-center bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 focus-within:border-blue-500 focus-within:shadow-lg">
          <Search className="absolute left-3 md:left-4 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Tìm kiếm sách, tác giả, thể loại..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            className="search-input w-full pl-10 md:pl-12 pr-10 md:pr-12 py-2 md:py-3 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 text-sm md:text-base"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-10 md:right-12 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-3 h-3 md:w-4 md:h-4" />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-1 md:right-2 p-1.5 md:p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={!searchTerm.trim()}
          >
            <Search className="w-3 h-3 md:w-4 md:h-4" />
          </button>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="search-suggestions absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
          {/* Loading */}
          {isLoading && (
            <div className="p-4 text-center">
              <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
            </div>
          )}

          {/* Search Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-semibold text-gray-500 px-3 py-2 uppercase tracking-wide">
                Gợi ý tìm kiếm
              </div>
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion._id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="suggestion-item w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left cursor-pointer"
                >
                  <img
                    src={suggestion.cover_image}
                    alt={suggestion.title}
                    className="w-10 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{suggestion.title}</p>
                    <p className="text-sm text-blue-600 font-semibold">
                      {suggestion.price?.toLocaleString('vi-VN')}đ
                    </p>
                  </div>
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {!searchTerm && recentSearches.length > 0 && (
            <div className="p-2 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 px-3 py-2 uppercase tracking-wide">
                <Clock className="w-3 h-3" />
                Tìm kiếm gần đây
              </div>
              {recentSearches.map((query, index) => (
                <div
                  key={index}
                  onClick={() => handleRecentSearchClick(query)}
                  className="suggestion-item w-full flex items-center justify-between gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{query}</span>
                  </div>
                  <button
                    onClick={(e) => removeRecentSearch(query, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 transition-all"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Popular Searches */}
          {!searchTerm && suggestions.length === 0 && (
            <div className="p-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 px-3 py-2 uppercase tracking-wide">
                <TrendingUp className="w-3 h-3" />
                Tìm kiếm phổ biến
              </div>
              {['Sách kinh tế', 'Tiểu thuyết', 'Sách thiếu nhi', 'Sách học ngoại ngữ'].map((query) => (
                <div
                  key={query}
                  onClick={() => handleRecentSearchClick(query)}
                  className="suggestion-item w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left cursor-pointer"
                >
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{query}</span>
                </div>
              ))}
            </div>
          )}

          {/* No results */}
          {searchTerm && !isLoading && suggestions.length === 0 && (
            <div className="empty-state p-6 text-center text-gray-500">
              <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p>Không tìm thấy sản phẩm nào</p>
              <p className="text-sm">Thử tìm kiếm với từ khóa khác</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};