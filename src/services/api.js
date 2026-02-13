/* src/services/api.js */
import axios from 'axios';
// const BASE_URL = 'http://localhost:5000';
// console.log(import.meta.env);

let BASE_URL = 'https://api.merishiksha.com';
// console.log(BASE_URL); 
// console.log(REACT_APP_BASE_URL);


// Create an Axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL, // Points to your Flask backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export const promptService = {
  /**
   * Generates a simple prompt from a raw thought (One-Shot)
   * @param {string} userThought 
   */
  generateSimple: async (userThought) => {
    try {
      const response = await apiClient.post('/promptapi/generate', {
        thought: userThought,
      });
      return response.data; // Axios automatically parses JSON
    } catch (error) {
      console.error("Simple Gen Error:", error);
      throw error.response ? error.response.data : error;
    }
  },

  /**
   * Handles the interactive chat mode (Step-by-Step)
   * @param {Array} history - Full chat history
   * @param {string} newMessage - The latest user input
   */
  generateInteractive: async (history, newMessage) => {
    try {
      const response = await apiClient.post('/promptapi/interactive', {
        history: history,
      });
      return response.data;
    } catch (error) {
      console.error("Interactive Chat Error:", error);
      throw error.response ? error.response.data : error;
    }
  },
};