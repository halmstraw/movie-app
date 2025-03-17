/**
 * Utility functions for working with localStorage
 */

/**
 * Get an item from localStorage and parse it as JSON
 * @param {string} key - The key to retrieve from localStorage
 * @param {any} defaultValue - Default value to return if key doesn't exist or on error
 * @returns {any} The parsed value or defaultValue
 */
export const getStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Set an item in localStorage as JSON
 * @param {string} key - The key to set in localStorage
 * @param {any} value - The value to stringify and store
 * @returns {boolean} True if successful, false if error
 */
export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    return false;
  }
};

/**
 * Remove an item from localStorage
 * @param {string} key - The key to remove from localStorage
 * @returns {boolean} True if successful, false if error
 */
export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
    return false;
  }
};

/**
 * Clear all items from localStorage
 * @returns {boolean} True if successful, false if error
 */
export const clearStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
}; 