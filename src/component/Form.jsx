import React, { useState } from "react";
import { addUtility } from "../config/api";
const initialData = {
  academic_year: "",
  school_category: "",
  class_name: "",
  utility_name: "",
  utility_amount: "",
  fee_type: "",
};
const Form = () => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (formData) {
      const utility = await addUtility(formData);
      alert("form data saved successfully.");
    }
    setFormData(initialData);
  };

  return (
    <div className="">
      
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
      >
        {/* Academic Year */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Academic Year
          </label>
          <input
            type="text"
            name="academic_year"
            value={formData.academic_year}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Academic Year"
            required
          />
        </div>
        {/* School */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            School
          </label>
          <input
            type="text"
            name="school_category"
            value={formData.school_category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="CBSE SEMI PRE"
            required
          />
        </div>
        {/*Student type */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Student Type
          </label>
          <input
            type="text"
            name="fee_type"
            value={formData.fee_type}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="old new semi"
            required
          />
        </div>
        {/* class */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Class
          </label>
          <input
            type="text"
            name="class_name"
            value={formData.class_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Class Name"
            required
          />
        </div>
        {/* Utility name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Utility Name
          </label>
          <input
            type="text"
            name="utility_name"
            value={formData.utility_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Utility Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Amount
          </label>
          <input
            type="number"
            name="utility_amount"
            value={formData.utility_amount}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
