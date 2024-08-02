

import React from 'react';
import studentImg from '../img/student_2302834.png';

function StudentProfile() {
  return (
    <div className="font-[roboto] min-h-screen bg-[#FFFFFF]">
      <div className="mt-14 p-6 sm:p-12 bg-[#412249] text-white flex flex-col sm:flex-row justify-between items-center">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-0">
          <img src={studentImg} className="mx-4 w-24 h-24 sm:w-32 sm:h-32 rounded-full" alt="error" loading="lazy" title="student img" />
          <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
            <h2 className="font-semibold text-xl sm:text-2xl">Karan Kumar</h2>
            <p className="mt-2 mb-2 bg-[#D9D9D9] text-[#412249] text-center rounded-lg py-1">Student</p>
            <p>Class : 10th Grade</p>
          </div>
        </div>
        <button className="bg-[#9747FF] py-2 px-8 sm:px-12 rounded-md font-semibold text-lg text-center">Edit</button>
      </div>

      {/* Information */}
      <div className="mt-16 mx-4 sm:mx-12 bg-[#412249] p-2 sm:p-4 text-center">
        <h2 className="text-white text-2xl font-semibold">Student Profile</h2>
      </div>

      {/* Profile Details */}
      <div className="mt-8 mb-8 px-4 sm:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">RFID</h3>
            <p>RFID-12345</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">GR ID</h3>
            <p>GR-12345</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Roll No.</h3>
            <p>R-12345</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">New/Old</h3>
            <p>New Student</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Division</h3>
            <p>A</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Admission Date</h3>
            <p>05-07-2020</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Religion</h3>
            <p>Christian</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Birth Place</h3>
            <p>City A</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Bus Route</h3>
            <p>Route 1</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Local Address</h3>
            <p>123 Main Street, City B</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Nationality</h3>
            <p>Indian</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Mother Tongue</h3>
            <p>English</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Previous School</h3>
            <p>School X</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Aadhar card</h3>
            <p>1234-5678-90125</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Local District</h3>
            <p>District C</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Local Pin No</h3>
            <p>123456</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Father Occupation</h3>
            <p>Engineer</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Income</h3>
            <p>50,000 INR</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Class at time of Admission</h3>
            <p>Kindergarten</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Last class attended</h3>
            <p>Class IX</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Father mobile</h3>
            <p>9876543210</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Mother Mobile</h3>
            <p>9876543210</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Father email</h3>
            <p>father@example.com</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Relation</h3>
            <p>Parent</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Student House</h3>
            <p>House Red</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Remarks</h3>
            <p>Top Performer</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">English medium</h3>
            <p>Yes</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Semi eng medium</h3>
            <p>No</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
