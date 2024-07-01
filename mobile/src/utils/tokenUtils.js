// utils/tokenUtils.js
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/constants';

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  if (!refreshToken) {
    return null;
  }

  try {
    const response = await fetch('http://localhost:8000/api/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    if (data && data.access) {
      localStorage.setItem(ACCESS_TOKEN, data.access);
      return data.access;
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
  }

  return null;
};
