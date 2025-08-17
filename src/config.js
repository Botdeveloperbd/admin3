// 🔧 Simple Configuration File
// এখানে API URL গুলো পরিবর্তন করুন

const config = {
  // ========================================
  // 🌐 API CONFIGURATION
  // ========================================
  
  // Development Environment
  development: {
    API_BASE_URL: 'http://localhost:5001',
    SOCKET_URL: 'http://localhost:5001',
    MEDIA_BASE_URL: 'http://localhost:5001/media',
    FRONTEND_URL: 'http://localhost:3000'
  },
  
  // Local Development (for testing when Railway is down)
  local: {
    API_BASE_URL: 'http://localhost:5001',
    SOCKET_URL: 'http://localhost:5001',
    MEDIA_BASE_URL: 'http://localhost:5001/media',
    FRONTEND_URL: 'http://localhost:3000'
  },
  
  // Production Environment
  production: {
    API_BASE_URL: 'https://web-production-9e3a.up.railway.app/',
    SOCKET_URL: 'https://web-production-9e3a.up.railway.app/',
    MEDIA_BASE_URL: 'https://web-production-9e3a.up.railway.app/media',
    FRONTEND_URL: 'https://admin3-v9j1.onrender.com'
  },
  
  // Staging Environment
  staging: {
    API_BASE_URL: 'https://staging-your-domain.com',
    SOCKET_URL: 'https://staging-your-domain.com',
    MEDIA_BASE_URL: 'https://staging-your-domain.com/media',
    FRONTEND_URL: 'https://staging-your-domain.com'
  },
  
  // Render Environment (for Render deployment)
  render: {
    API_BASE_URL: 'https://web-production-9e3a.up.railway.app/',
    SOCKET_URL: 'https://web-production-9e3a.up.railway.app/',
    MEDIA_BASE_URL: 'https://web-production-9e3a.up.railway.app/media',
    FRONTEND_URL: 'https://admin3-v9j1.onrender.com'
  }
};

// ========================================
// 🔧 QUICK CHANGE FUNCTIONS
// ========================================

// Change to localhost for development
export const setLocalhost = () => {
  console.log('🔄 Switching to localhost configuration');
  return config.development;
};

// Change to production
export const setProduction = () => {
  console.log('🔄 Switching to production configuration');
  return config.production;
};

// Change to staging
export const setStaging = () => {
  console.log('🔄 Switching to staging configuration');
  return config.staging;
};

// Get current environment
export const getCurrentEnvironment = () => {
  const env = process.env.NODE_ENV || 'development'; // Changed to development by default
  return config[env] || config.development; // Changed to development as fallback
};

// ========================================
// 📊 UTILITY FUNCTIONS
// ========================================

// Utility functions for file handling
export const getFileExtension = (url) => {
  if (!url) return '';
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const extension = pathname.split('.').pop().toLowerCase();
    return extension;
  } catch (e) {
    // If URL parsing fails, try to extract extension from the string
    const match = url.match(/\.([a-zA-Z0-9]+)(?:[?#]|$)/);
    return match ? match[1].toLowerCase() : '';
  }
};

export const isGif = (url) => {
  const extension = getFileExtension(url);
  return extension === 'gif' || url.toLowerCase().includes('gif');
};

// Media URL helper function
export const getMediaUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) {
    // If it's a Telegram API URL, use a CORS proxy to avoid CORS issues
    if (url.includes('api.telegram.org')) {
      // Use a CORS proxy to avoid CORS issues
      return `https://caboose.proxy.rlwy.net:26036/${url}`;
    }
    return url;
  }
  // If it's a relative path, construct the full URL
  if (url.startsWith('/')) {
    return `${getCurrentEnvironment().API_BASE_URL}${url}`;
  }
  return url;
};

// ========================================
// 📦 DEFAULT EXPORT WITH UTILITIES
// ========================================

// Create default export that includes both config and utility functions
const defaultExport = {
  ...getCurrentEnvironment(),
  getFileExtension,
  isGif,
  getMediaUrl,
  setLocalhost,
  setProduction,
  setStaging,
  getCurrentEnvironment
};

export default defaultExport; 



