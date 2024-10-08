import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "tailwindcss/tailwind.css";
import { Link } from "react-router-dom";
const StudentForm = () => {
  const [formData, setFormData] = useState({
    file: "",
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
    father_mobile_no: "",
    mother_mobile_no: "",
    email_id: "",
    utilities: [],
    adm_date: "",
    rf_id: "",
    gr_id: "",
    school_category: "",
    roll_no: "",
    gender: "",
    caste: "",
    mother_tongue: "",
    previous_school: "",
    relation: "",
    father_occupation: "",
    income: "",
    adm_class: "",
    last_class: "",
    student_house: "",
    left: "",
    tc_issue_date: "",
    remarks: "",
    isAddressSame: false,
    showBusRoute: false,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const categories = [
    { id: 1, name: "category1" },
    { id: 2, name: "category2" },
    { id: 3, name: "category3" },
  ];

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

    console.log("FormData:", formData);

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
  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };
  console.log("Selected Ids: ", selectedIds);

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
              name="file"
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
        <div>
          <Link to={"/csvupload"}>
          <button>Csv Upload</button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 gap-x-36">
          {/* academic Year */}
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
          {/* RF Id */}
          <div>
            <label className="block font-medium text-white">RF ID</label>
            <input
              type="text"
              name="rf_id"
              value={formData.rf_id}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="RFId"
            />
          </div>
          {/* Roll no */}
          <div>
            <label className="block font-medium text-white">Roll No</label>
            <input
              type="text"
              name="roll_no"
              value={formData.roll_no}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Roll No"
            />
          </div>
          {/* Gender*/}
          <div>
            <label className="block font-medium text-white">Gender</label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Male,Female or Other"
            />
          </div>
          {/* Caste */}
          <div>
            <label className="block font-medium text-white">Caste</label>
            <input
              type="text"
              name="caste"
              value={formData.caste}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Caste"
            />
          </div>
          {/* mother tongue */}
          <div>
            <label className="block font-medium text-white">
              Mother Tongue
            </label>
            <input
              type="text"
              name="mother_tongue"
              value={formData.mother_tongue}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Mother Tongue"
            />
          </div>
          {/* previous School */}
          <div>
            <label className="block font-medium text-white">
              Previous School Name
            </label>
            <input
              type="text"
              name="previous_school"
              value={formData.previous_school}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Previous school"
            />
          </div>

          {/* income */}
          <div>
            <label className="block font-medium text-white">
              Income ( yearly )
            </label>
            <input
              type="text"
              name="income"
              value={formData.income}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Income"
            />
          </div>
          {/* admission class */}
          <div>
            <label className="block font-medium text-white">
              Admission Class
            </label>
            <input
              type="text"
              name="adm_class"
              value={formData.adm_class}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Admission Class"
            />
          </div>
          {/* last class */}
          <div>
            <label className="block font-medium text-white">Last Class</label>
            <input
              type="text"
              name="last_class"
              value={formData.last_class}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Last class"
            />
          </div>
          {/* student house */}
          <div>
            <label className="block font-medium text-white">
              Student House
            </label>
            <input
              type="text"
              name="student_house"
              value={formData.student_house}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Student House"
            />
          </div>
          {/* Left */}
          <div>
            <label className="block font-medium text-white">Left</label>
            <input
              type="text"
              name="left"
              value={formData.left}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Yes or No"
            />
          </div>
          {/* TC issue Date */}
          <div>
            <label className="block font-medium text-white">
              TC Issue Date
            </label>
            <input
              type="date"
              name="tc_issue_date"
              value={formData.tc_issue_date}
              onChange={handleChange}
              className="mt-1  p-2 focus:outline-none rounded-md block w-full"
            />
          </div>
          {/* remarks */}
          <div>
            <label className="block font-medium text-white">Remarks</label>
            <input
              type="text"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Remarks"
            />
          </div>
          {/* school category */}
          <div>
            <label className="block font-medium text-white">
              School Category
            </label>
            <input
              type="text"
              name="school_category"
              value={formData.school_category}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="CBSE or PRE Or SEMI"
            />
          </div>
          {/*  first name*/}
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
              <option value="semi">Semi</option>
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
            <label className="block font-medium text-white">
              Admission Date
            </label>
            <input
              type="date"
              name="adm_date"
              value={formData.adm_date}
              onChange={handleChange}
              className="mt-1  p-2 focus:outline-none rounded-md block w-full"
            />
          </div>
          <div>
            <label className="block font-medium text-white">GR ID</label>
            <input
              type="text"
              name="gr_id"
              value={formData.gr_id}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="GR ID"
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
          {/* relation */}
          <div>
            <label className="block font-medium text-white">Relation</label>
            <input
              type="text"
              name="relation"
              value={formData.relation}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Relation"
            />
          </div>
          {/* father occupation */}
          <div>
            <label className="block font-medium text-white">
              Father Occupation
            </label>
            <input
              type="text"
              name="father_occupation"
              value={formData.father_occupation}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Father Occupation"
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
              name="father_mobile_no"
              value={formData.father_mobile_no}
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
              name="mother_mobile_no"
              value={formData.mother_mobile_no}
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

          {/* <div className="flex gap-3">
            {categories.map((category, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  className="p-5"
                  id={`category-${category.id}-${index}`}
                  name={`category-${category.id}-${index}`}
                  value={category.id}
                  onChange={() => handleCheckboxChange(category.id)}
                />
                <label
                  htmlFor={`category-${category.id}-${index}`}
                  className=" font-medium text-white "
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div> */}

          <div>
            {categories.map((category, index) => (
              <div className="inline-flex items-center" key={index}>
                <label
                  className="relative flex items-center p-3 rounded-full cursor-pointer"
                  htmlFor={`check-${category.id}`}
                >
                  <input
                    type="checkbox"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                    id={`check-${category.id}`}
                    value={category.id}
                    onChange={() => handleCheckboxChange(category.id)}
                  />
                  <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
                <label
                  className="mt-px font-light text-white cursor-pointer select-none"
                  htmlFor={`check-${category.id}`}
                >
                  {category.name}
                </label>
              </div>
            ))}
            {/* <div>
              <h3>Selected IDs:</h3>
              <p>{JSON.stringify(selectedIds)}</p>
            </div> */}
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
