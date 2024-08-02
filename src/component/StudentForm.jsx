


import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "tailwindcss/tailwind.css";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    photo: "",
    academic_year: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    student_type: "new",
    className: "",
    division: "",
    uid_no: "",
    dob: "",
    dob_place: "",
    blood_grp: "",
    identification_mark_1: "",
    identification_mark_2: "",
    father_name: "",
    mother_name: "",
    guardian_name: "",
    religion: "",
    category: "",
    nationality: "",
    present_address: "",
    permanent_address: "",
    taluka: "",
    district: "",
    country: "",
    state: "",
    city: "",
    countries: [],
    states: [],
    cities: [],
    pincode: "",
    bus_route: "",
    mobile_no: "",
    alternate_mobile_no: "",
    email_id: "",
    isAddressSame: false,
    showBusRoute: false,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const classOptions = [
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
  ];
  const bloodGroupOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const categoryOptions = ["General", "OBC", "SC", "ST"];
  const busRouteOptions = ["Route 1", "Route 2", "Route 3"];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      if (name === "isAddressSame") {
        setFormData({
          ...formData,
          isAddressSame: checked,
          permanent_address: checked ? formData.present_address : "",
        });
      } else {
        setFormData({
          ...formData,
          [name]: checked,
        });
      }
    } else if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await axios.post("/api/student", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    // Fetch countries
    axios
      .get("https://restcountries.com/v2/all")
      .then((response) => {
        const countries = response.data.map((country) => ({
          value: country.name,
          label: country.name,
        }));
        setFormData((prevData) => ({ ...prevData, countries }));
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const fetchStates = (country) => {
    // Replace this with an actual API endpoint
    axios
      .get(`/api/states?country=${country}`)
      .then((response) => {
        const states = response.data.map((state) => ({
          value: state.name,
          label: state.name,
        }));
        setFormData((prevData) => ({ ...prevData, states, cities: [] }));
      })
      .catch((error) => console.error("Error fetching states:", error));
  };

  const fetchCities = (state) => {
    // Replace this with an actual API endpoint
    axios
      .get(`/api/cities?state=${state}`)
      .then((response) => {
        const cities = response.data.map((city) => ({
          value: city.name,
          label: city.name,
        }));
        setFormData((prevData) => ({ ...prevData, cities }));
      })
      .catch((error) => console.error("Error fetching cities:", error));
  };

  const handleCountryChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      country: selectedOption,
      state: "",
      city: "",
    }));
    fetchStates(selectedOption.value);
  };

  const handleStateChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      state: selectedOption,
      city: "",
    }));
    fetchCities(selectedOption.value);
  };

  const handleCityChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      city: selectedOption,
    }));
  };








  return (
    // <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-[#8614a2] ">
    <div className="bg-[#8614a2] font-[roboto]  ">
      <form
        onSubmit={handleSubmit}
        className="max-w-6xl font-[roboto]  mx-auto p-6 bg-[#8614a2] "
      >
        <h2 className="text-4xl  font-medium  text-black mb-6 text-center">
          Student Registration Form
        </h2>

  
         <div className="flex mt-16 justify-center items-center mb-6">
      <div className="flex justify-center items-center flex-col">
        <label className="block text-white font-medium">Photo</label>
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleChange}
          className="mt-1 block"
        />
        <div className="w-32 h-32 mb-12 p-4 mt-6 bg-gray-200 flex justify-center items-center">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="object-cover mx-auto w-full h-full"
            />
          ) : (
            <span className="text-gray-500 text-center">Image Preview</span>
          )}
        </div>
      </div>
    </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 gap-x-36">
          <div>
            <label className="block font-medium text-white">
              Academic Year
            </label>
            <input
              type="text"
              name="academic_year"
              value={formData.academic_year}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Academic Year"
            />
          </div>
          <div>
            <label className="block font-medium text-white">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="First Name"
            />
          </div>
          <div>
            <label className="block  font-medium text-white">Middle Name</label>
            <input
              type="text"
              name="middle_name"
              value={formData.middle_name}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Middle Name"
            />
          </div>
          <div>
            <label className="block font-medium text-white">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Last Name"
            />
          </div>
          <div>
            <label className="block font-medium text-white">Student Type</label>
            <select
              name="student_type"
              value={formData.student_type}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
            >
              <option className=" bg-slate-200 hover:bg-gray-200" value="new">
                New
              </option>
              <option value="old">Old</option>
            </select>
          </div>
          <div>
            <label className="block font-medium text-white">Class</label>
            <select
              name="className"
              value={formData.className}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
            >
              {classOptions.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium text-white">Division</label>
            <input
              type="text"
              name="division"
              value={formData.division}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Division"
            />
          </div>
          <div>
            <label className="block font-medium text-white">UID No</label>
            <input
              type="text"
              name="uid_no"
              value={formData.uid_no}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="UID No"
              maxLength={12}
            />
          </div>
          <div>
            <label className="block font-medium text-white">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="mt-1  p-2 focus:outline-none rounded-md block w-full"
            />
          </div>
          <div>
            <label className="block font-medium text-white">
              Place of Birth
            </label>
            <input
              type="text"
              name="dob_place"
              value={formData.dob_place}
              onChange={handleChange}
              className="mt-1 block p-2 focus:outline-none rounded-md w-full"
              placeholder="Place of Birth"
            />
          </div>
          <div>
            <label className="block font-medium text-white">Blood Group</label>
            <select
              name="blood_grp"
              value={formData.blood_grp}
              onChange={handleChange}
              className="mt-1 block p-2 focus:outline-none rounded-md w-full"
            >
              {bloodGroupOptions.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium text-white">
              Identification Mark 1
            </label>
            <input
              type="text"
              name="identification_mark_1"
              value={formData.identification_mark_1}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Identification Mark 1"
            />
          </div>
          <div>
            <label className="block font-medium text-white">
              Identification Mark 2
            </label>
            <input
              type="text"
              name="identification_mark_2"
              value={formData.identification_mark_2}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Identification Mark 2"
            />
          </div>
          <div>
            <label className="block font-medium text-white">
              Father's Name
            </label>
            <input
              type="text"
              name="father_name"
              value={formData.father_name}
              onChange={handleChange}
              className="mt-1 block p-2 focus:outline-none rounded-md w-full"
              placeholder="Father's Name"
            />
          </div>
          <div>
            <label className="block font-medium text-white">
              Mother's Name
            </label>
            <input
              type="text"
              name="mother_name"
              value={formData.mother_name}
              onChange={handleChange}
              className="mt-1 block p-2 focus:outline-none rounded-md w-full"
              placeholder="Mother's Name"
            />
          </div>
          <div>
            <label className="block font-medium text-white">
              Guardian's Name
            </label>
            <input
              type="text"
              name="guardian_name"
              value={formData.guardian_name}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Guardian's Name"
            />
          </div>
          <div>
            <label className="block font-medium text-white">Religion</label>
            <input
              type="text"
              name="religion"
              value={formData.religion}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Religion"
            />
          </div>
          <div>
            <label className="block font-medium text-white">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block p-2 focus:outline-none rounded-md w-full"
            >
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium text-white">Nationality</label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Nationality"
            />
          </div>
          <div>
            <label className="block font-medium text-white">
              Present Address
            </label>
            <input
              type="text"
              name="present_address"
              value={formData.present_address}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Present Address"
            />
          </div>
          <div>
            <label className="block font-medium text-white">
              Permanent Address
            </label>
            <input
              type="text"
              name="permanent_address"
              value={formData.permanent_address}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Permanent Address"
            />
          </div>
          <div>
            <label className="block font-medium text-white">Taluka</label>
            <input
              type="text"
              name="taluka"
              value={formData.taluka}
              onChange={handleChange}
              className="mt-1 block w-full p-2 focus:outline-none rounded-md"
              placeholder="Taluka"
            />
          </div>
       
          <div>
            <label className="block font-medium text-white">Country</label>
            <Select
              options={formData.countries}
              value={formData.country}
              onChange={handleCountryChange}
              className="mt-1"
            />
          </div>
          <div>
            <label className="block font-medium text-white">State</label>
            <Select
              options={formData.states}
              value={formData.state}
              onChange={handleStateChange}
              className="mt-1"
              isDisabled={!formData.country}
            />
          </div>
          <div>
            <label className="block font-medium text-white">City</label>
            <Select
              options={formData.cities}
              value={formData.city}
              onChange={handleCityChange}
              className="mt-1"
              isDisabled={!formData.state}
            />
          </div>
          <div>
            <label className="block font-medium text-white">District</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="mt-1 block w-full p-2 focus:outline-none rounded-md"
              placeholder="District"
            />
          </div>
          
          <div>
            <label className="block font-medium text-white">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="mt-1 block w-full p-2 focus:outline-none rounded-md"
              placeholder="Pincode"
            />
          </div>
         
          <div>
            <label className="block font-medium text-white">Bus Route</label>
            <input
              type="text"
              name="bus_route"
              value={formData.bus_route}
              onChange={handleChange}
              className="mt-1 block w-full p-2 focus:outline-none rounded-md"
              placeholder="Bus Route"
            />
          </div>
          <div>
            <label className="block font-medium text-white">Mobile No</label>
            <input
              type="text"
              name="mobile_no"
              value={formData.mobile_no}
              onChange={handleChange}
              className="mt-1 block w-full p-2 focus:outline-none rounded-md"
              placeholder="Mobile No"
              maxLength={10}
            />
          </div>
          <div>
            <label className="block font-medium text-white">
              Alternate Mobile No
            </label>
            <input
              type="text"
              name="alternate_mobile_no"
              value={formData.alternate_mobile_no}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Alternate Mobile No"
              maxLength={10}
            />
          </div>
          <div>
            <label className="block font-medium text-white">Email ID</label>
            <input
              type="email"
              name="email_id"
              value={formData.email_id}
              onChange={handleChange}
              className="mt-1 block w-full p-2 focus:outline-none rounded-md"
              placeholder="Email ID"
            />
          </div>
        </div>

        <div className="mt-12 p-4   text-xl flex justify-center items-center  text-white  ">
          <button
            type="submit"
            className=" w-1/3 bg-[#5d0473] font-[roboto]    py-2 px-4 rounded-md hover:bg-[#b314db]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
