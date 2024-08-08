import React, { useState } from "react";
import logoLeft from "../img/1000077337-removebg-preview.png";
import logoRight from "../img/cbse-logo-46D5A6B556-seeklogo.com.png";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
// import { API_BASE_URL, AUTH_ENDPOINT } from '../config/api';
import { loginUser } from "../config/api";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post(`${API_BASE_URL}${AUTH_ENDPOINT}`, { username, password });
      const response = await loginUser({ username, password });
      // console.log(response.data);
      
      if (response.data.accessToken) {
        sessionStorage.setItem('accessToken', response.data.accessToken);
        navigate("/student-table");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred");
    }
  };

  return (
    <div className="bg-gray-100  min-h-screen">
      <div className="flex flex-col sm:flex-row pb-12  pt-12 items-center justify-center relative z-10">
        <div className="w-32 h-32 sm:w-52 sm:h-52">
          <img
            src={logoLeft}
            alt="School Logo"
            loading="lazy"
            title="School Logo"
            className="object-contain h-full w-full"
          />
        </div>
        <div className="text-center  mb-20">
          <h2 className="text-red-700 mb-2 font-bold text-2xl sm:text-3xl">
            INDURA ENGLISH SCHOOL (CBSE)
          </h2>
          <p className="font-semibold">
            Enjangaon (East), Tq, Basmath Dist Hingoli
          </p>
          <p className="font-semibold">
            UDISE No.: 27160301903 Affiliation No.: 1131230 School Code: 31217
          </p>
          <div className="font-semibold">
            <a
              href="http://www.induraenglishschool.in"
              className="block sm:inline mx-4"
            >
              Website: www.induraenglishschool.in
            </a>
            <a
              href="mailto:induraenglishschool@gmail.com"
              className="block sm:inline mx-4"
            >
              Email: induraenglishschool@gmail.com
            </a>
          </div>
        </div>
        <div className="w-32 h-32 sm:w-40 sm:h-40 mb-4 sm:mb-6">
          <img
            src={logoRight}
            alt="CBSE Logo"
            loading="lazy"
            title="CBSE Logo"
            className="object-contain h-full w-full"
          />
        </div>
      </div>
      {/* form */}
      <div className="flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          {/* <form onSubmit={handleSubmit}> */}
          <form>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                User ID
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your User ID"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
            {/* <div className=" flex justify-center items-center">
              <Link
                to="/student-table"
                type="submit"
                className=" text-center w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </Link>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
