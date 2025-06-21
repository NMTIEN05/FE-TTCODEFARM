// Utility functions for authentication
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const isAdmin = (): boolean => {
  const user = getUser();
  return user?.isAdmin || false;
};

export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/auth/login';
};

export const setAuthHeader = (token: string): void => {
  if (token) {
    localStorage.setItem('token', token);
  }
};