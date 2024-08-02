// // src/config/api.js
// // export const API_BASE_URL_FORM = 'http://localhost:8800';
// export const API_BASE_URL = 'http://localhost:8800';

// // export const STUDENT_ENDPOINTS = {
// //     STUDENT: `${API_BASE_URL}/allstudents`,
// //     // Add other endpoints 
// //   };


// export const AUTH_ENDPOINT = '/auth'; 
// export const API_ENDPOINTS = {

//   LOGIN: `${API_BASE_URL}/login`,
//   STUDENT: `${API_BASE_URL}/allstudents`,

//     // Add 
// };

import axios from 'axios';

const getToken = () => {
  // Retrieve token from local storage, cookie, or any other storage
  return sessionStorage.getItem('accessToken');
};

export const api = axios.create({
  baseURL: 'http://localhost:8800',
  // baseURL: 'https://api-ps.elcomeitsolutions.com', // Replace with your backend URL
  // baseURL: 'https://api.ps.hemsidaavt.com', 
  headers: { 'authorization': `${getToken()}` }

});

// Get the baseURL
export const baseURL = api.defaults.baseURL;

// login the user
export const loginUser = async (userData) => api.post('/api/auth/login', userData);
// get all students
export const getAllStudents = async () => api.get('/allstudents');
// export feedetails of student
export const getStudentFeeDetails = async (student_id) => api.post('/feedetails', {student_id:100});
