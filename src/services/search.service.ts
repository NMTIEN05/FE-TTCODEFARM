import axios from 'axios';
import { Ibook } from '../types/Book';

const API_BASE_URL = 'http://localhost:8888/api';

export interface SearchParams {
  q: string;
  limit?: number;
  page?: number;
  sortBy?: 'relevance' | 'price-asc' | 'price-desc' | 'name';
  minPrice?: number;
  maxPrice?: number;
  category?: string;
}

export interface SearchResponse {
  data: Ibook[];
  total: number;
  page: number;
  totalPages: number;
}

class SearchService {
  // Tìm kiếm sản phẩm
  async searchProducts(params: SearchParams): Promise<SearchResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      queryParams.append('q', params.q);
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.minPrice) queryParams.append('minPrice', params.minPrice.toString());
      if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());
      if (params.category) queryParams.append('category', params.category);

      const response = await axios.get(`${API_BASE_URL}/books/search?${queryParams}`);
      
      return {
        data: response.data?.data || [],
        total: response.data?.total || 0,
        page: response.data?.page || 1,
        totalPages: response.data?.totalPages || 1
      };
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  // Lấy gợi ý tìm kiếm
  async getSearchSuggestions(query: string, limit: number = 5): Promise<Ibook[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/books/search?q=${encodeURIComponent(query)}&limit=${limit}`);
      return response.data?.data || [];
    } catch (error) {
      console.error('Error fetching search suggestions:', error);
      return [];
    }
  }

  // Lấy từ khóa tìm kiếm phổ biến
  async getPopularSearches(): Promise<string[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/search/popular`);
      return response.data?.data || [
        'Sách kinh tế',
        'Tiểu thuyết',
        'Sách thiếu nhi',
        'Sách học ngoại ngữ',
        'Sách kỹ năng sống'
      ];
    } catch (error) {
      console.error('Error fetching popular searches:', error);
      // Fallback to default popular searches
      return [
        'Sách kinh tế',
        'Tiểu thuyết', 
        'Sách thiếu nhi',
        'Sách học ngoại ngữ',
        'Sách kỹ năng sống'
      ];
    }
  }

  // Lưu lịch sử tìm kiếm
  saveSearchHistory(query: string): void {
    try {
      const history = this.getSearchHistory();
      const updated = [query, ...history.filter(item => item !== query)].slice(0, 10);
      localStorage.setItem('searchHistory', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  }

  // Lấy lịch sử tìm kiếm
  getSearchHistory(): string[] {
    try {
      const history = localStorage.getItem('searchHistory');
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error getting search history:', error);
      return [];
    }
  }

  // Xóa lịch sử tìm kiếm
  clearSearchHistory(): void {
    try {
      localStorage.removeItem('searchHistory');
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  }

  // Xóa một mục trong lịch sử tìm kiếm
  removeFromSearchHistory(query: string): void {
    try {
      const history = this.getSearchHistory();
      const updated = history.filter(item => item !== query);
      localStorage.setItem('searchHistory', JSON.stringify(updated));
    } catch (error) {
      console.error('Error removing from search history:', error);
    }
  }
}

export const searchService = new SearchService();
export default searchService;