import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import logoLeft from "../img/1000077337-removebg-preview.png";
import logoRight from "../img/cbse-logo-46D5A6B556-seeklogo.com.png";

import { getAllStudents, baseURL } from "../config/api";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getAllStudents();
        if (response.data && Array.isArray(response.data.student)) {
          const studentsWithCertificate = response.data.student.map(
            (student) => ({
              ...student,
              certificateType: "Select Certificate Type",
            })
          );
          setStudents(studentsWithCertificate);
        } else {
          console.error("Unexpected response format:", response.data);
          setError("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching students data:", error);
        setError("Failed to load students data");
      }
    };

    fetchStudents();
  }, []);

  const handleViewDetails = (student) => {
    const address = student.address;
    navigate("/student-details", { state: { student, address } });
    // navigate('/id-form', { state: { student } });
  };

  // const handleViewDetails = (student) => {
  //   navigate('/id-form', { state: { student } });
  // };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCertificateTypeChange = (id, value, student) => {
    // Define URL for each certificate type
    // navigate('/id-form', { state: { student } });

    const certificateUrls = {
      Type1: `/id-card/${id}`,
      Type2: `/transfer-certificate/${id}`,
      Type3: `/bonafide-certificate/${id}`,
      Type4: `/nirgam-certificate/${id}`,
    };

    const selectedStudent = students.find((student) => student.id === id);

    // Update the students state with the selected certificate type
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, certificateType: value } : student
      )
    );

    // Navigate to the corr. URL with the selected student data as state
    if (certificateUrls[value] && selectedStudent) {
      navigate(certificateUrls[value], { state: { student: selectedStudent } });
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.id.toString().includes(searchQuery) ||
      student.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.mobileNo.includes(searchQuery) ||
      student.emailId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row py-4 items-center justify-center relative z-10">
        <div className="w-32 h-32 sm:w-52 sm:h-52">
          <img
            src={logoLeft}
            alt="School Logo"
            loading="lazy"
            title="School Logo"
            className="object-contain h-full w-full"
          />
        </div>
        <div className="text-center mb-6 sm:mb-12">
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
      {error && (
        <div className="bg-red-100 text-red-800 p-4 mb-4 rounded">{error}</div>
      )}

      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by ID, Class, Mobile No, or Email ID"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Photo</th>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Class</th>
              <th className="py-2 px-4 border-b">Mobile No</th>
              <th className="py-2 px-4 border-b">Email ID</th>
              <th className="py-2 px-4 border-b">Actions</th>
              <th className="py-2 px-4 border-b">Certificate Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td className="py-2 px-4 border-b">
                    <div className="w-20 h-20 sm:w-44 sm:h-44 p-4">
                      <img
                        // src={`http://localhost:8800${student.photo}`}
                        src={`${baseURL}${student.photo}`}
                        alt="Student "
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">{student.id}</td>
                  <td className="py-2 px-4 border-b">{student.class}</td>
                  <td className="py-2 px-4 border-b">{student.mobileNo}</td>
                  <td className="py-2 px-4 border-b">{student.emailId}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleViewDetails(student)}
                      className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                    >
                      View Details
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <select
                      value={student.certificateType}
                      onChange={(e) =>
                        handleCertificateTypeChange(student.id, e.target.value)
                      }
                      className="border rounded py-1 px-2"
                    >
                      <option value="Select Certificate Type" disabled>
                        Select Certificate Type
                      </option>
                      <option value="Type1">Id_Card Certificate</option>
                      <option value="Type2">Transfer Certificate</option>
                      <option value="Type3">Bonafide Certificate</option>
                      <option value="Type4">Nirgam Certificate</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-2 px-4 border-b text-center">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import logoLeft from '../img/1000077337-removebg-preview.png';
// import logoRight from '../img/cbse-logo-46D5A6B556-seeklogo.com.png';

// const StudentTable = () => {
//   const [students, setStudents] = useState([]);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await axios.get('http://localhost:8800/allstudents');
//         console.log('API Response:', response.data);

//         if (response.data && Array.isArray(response.data.student)) {
//           const studentsWithCertificate = response.data.student.map(student => ({
//             ...student,
//             certificateType: 'Select Certificate Type'
//           }));
//           setStudents(studentsWithCertificate);
//         } else {
//           console.error('Unexpected response format:', response.data);
//           setError('Unexpected response format');
//         }
//       } catch (error) {
//         console.error('Error fetching students data:', error);
//         setError('Failed to load students data');
//       }
//     };

//     fetchStudents();
//   }, []);

//   const handleViewDetails = (student) => {
//     navigate('/student-details', { state: { student } });
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleCertificateTypeChange = (id, value) => {
//     const certificateUrls = {
//       'Type1': `/id-card/${id}`,
//       'Type2': `/transfer-certificate/${id}`,
//       'Type3': `/bonafide-certificate/${id}`,
//       'Type4': `/nirgam-certificate/${id}`,
//     };

//     const selectedStudent = students.find(student => student.id === id);

//     setStudents(students.map(student =>
//       student.id === id ? { ...student, certificateType: value } : student
//     ));

//     if (certificateUrls[value] && selectedStudent) {
//       navigate(certificateUrls[value], { state: { student: selectedStudent } });
//     }
//   };

//   const filteredStudents = students.filter(student =>
//     student.id.toString().includes(searchQuery) ||
//     student.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     student.mobileNo.includes(searchQuery) ||
//     student.emailId.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex flex-col sm:flex-row py-4 items-center justify-center relative z-10">
//         <div className="w-32 h-32 sm:w-52 sm:h-52">
//           <img src={logoLeft} alt="School Logo" loading="lazy" title="School Logo" className="object-contain h-full w-full" />
//         </div>
//         <div className="text-center mb-6 sm:mb-12">
//           <h2 className="text-red-700 mb-2 font-bold text-2xl sm:text-3xl">INDURA ENGLISH SCHOOL (CBSE)</h2>
//           <p className="font-semibold">Enjangaon (East), Tq, Basmath Dist Hingoli</p>
//           <p className="font-semibold">UDISE No.: 27160301903 Affiliation No.: 1131230 School Code: 31217</p>
//           <div className="font-semibold">
//             <a href="http://www.induraenglishschool.in" className="block sm:inline mx-4">Website: www.induraenglishschool.in</a>
//             <a href="mailto:induraenglishschool@gmail.com" className="block sm:inline mx-4">Email: induraenglishschool@gmail.com</a>
//           </div>
//         </div>
//         <div className="w-32 h-32 sm:w-40 sm:h-40 mb-4 sm:mb-6">
//           <img src={logoRight} alt="CBSE Logo" loading="lazy" title="CBSE Logo" className="object-contain h-full w-full" />
//         </div>
//       </div>
//       {error && <div className="bg-red-100 text-red-800 p-4 mb-4 rounded">{error}</div>}

//       <div className="mb-4">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={handleSearchChange}
//           placeholder="Search by ID, Class, Mobile No, or Email ID"
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b">Photo</th>
//               <th className="py-2 px-4 border-b">ID</th>
//               <th className="py-2 px-4 border-b">Class</th>
//               <th className="py-2 px-4 border-b">Mobile No</th>
//               <th className="py-2 px-4 border-b">Email ID</th>
//               <th className="py-2 px-4 border-b">Actions</th>
//               <th className="py-2 px-4 border-b">Certificate Type</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredStudents.length > 0 ? (
//               filteredStudents.map(student => (
//                 <tr key={student.id}>
//                   <td className="py-2 px-4 border-b">
//                     <div className="w-20 h-20 sm:w-44 sm:h-44 p-4">
//                       <img
//                         src={`http://localhost:8800${student.photo}`}
//                         alt="Student "
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   </td>
//                   <td className="py-2 px-4 border-b">{student.id}</td>
//                   <td className="py-2 px-4 border-b">{student.class}</td>
//                   <td className="py-2 px-4 border-b">{student.mobileNo}</td>
//                   <td className="py-2 px-4 border-b">{student.emailId}</td>
//                   <td className="py-2 px-4 border-b">
//                     <button
//                       onClick={() => handleViewDetails(student)}
//                       className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
//                     >
//                       View Details
//                     </button>
//                   </td>
//                   <td className="py-2 px-4 border-b">
//                     <select
//                       value={student.certificateType}
//                       onChange={(e) => handleCertificateTypeChange(student.id, e.target.value)}
//                       className="border rounded py-1 px-2"
//                     >
//                       <option value="Select Certificate Type" disabled>Select Certificate Type</option>
//                       <option value="Type1">Id_Card Certificate</option>
//                       <option value="Type2">Transfer Certificate</option>
//                       <option value="Type3">Bonafide Certificate</option>
//                       <option value="Type4">Nirgam Certificate</option>
//                     </select>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="py-2 px-4 border-b text-center">No students found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default StudentTable;
