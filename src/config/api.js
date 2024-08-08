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
// search students
export const getStudentSearch = async () => api.get('/search');
// export feedetails of student
export const getStudentFeeDetails = async (student_id) => api.get('/feedetails', {
  params: { student_id }
});
// export feedetails of student utilitywise
export const getFeeDetailUtilityWise = async (student_id) => api.get('/feeutilitywise', {
  params: { student_id }
});
// add utility
export const addUtility = async (utilityData) => api.post('/addutility', utilityData);
// get certificate serial number
export const getCertificateSerialNumber = async() => api.get('/certificate-id');
// upload certificate
export const uploadCertificate = async(certificateData) => api.post('/certificate-upload',certificateData);
export const updateStudentFees = async(paymentData) => api.put('/updatefee', paymentData);