

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseURL, getStudentFeeDetails } from "../config/api";

const StudentDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { student, address } = location.state || {};
  const [error, setError] = useState(null);

  const [feeDetail, setFeeDetail] = useState("");

  useEffect(() => {
    // const data = fetchFeeDetails(student.id);
    const fetchFeeDetails = async (student_id) => {
      try {
        const response = await getStudentFeeDetails(student_id);
        if (response.data) {
          setFeeDetail(response.data);
        }
      } catch (error) {
        console.error("Unexpected response format:", error);
        setError("Unexpected response format");
      }
    };

    fetchFeeDetails(student.id);
  }, [student]);

  if (!student || !address)
    return <div className="text-center text-lg font-semibold">Loading...</div>;

  const handlePaymentDetails = () => {
    navigate("/payment-details", {
      state: {
        studentId: student.id,
        studentName: `${student.firstName} ${student.middleName} ${student.lastName}`,
      },
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 mt-12">
        Payment Section
      </h1>
      <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg max-w-4xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <img
              src={`${baseURL}${student.photo}`}
              alt="Student Photo"
              className="w-32 h-32 object-cover rounded-full border-4 border-blue-500 mr-4"
            />
            <div>
              <p className="text-xl font-semibold">
                {student.firstName} {student.middleName} {student.lastName}
              </p>
              <p className="text-gray-700">ID: {student.id}</p>
            </div>
          </div>
          <button
            onClick={handlePaymentDetails}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            View Payment Details
          </button>
        </div>
        <div>
          <p className="font-medium text-gray-700">
            <strong>Total Amount:</strong> Rs {feeDetail.totalFee}
          </p>
          <p className="font-medium text-gray-700">
            <strong>Pending Amount:</strong> Rs {feeDetail.pendingFee}
          </p>
          <p className="font-medium text-gray-700">
            <strong>Last Payment Amount:</strong> Rs{" "}
            {feeDetail.lastTransactionAmount}
          </p>
          <p className="font-medium text-gray-700">
            <strong>Last Payment Date: </strong>
            {new Date(feeDetail.lastTransactionDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Student Details
      </h1>
      <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-6">
          <img
            src={`${baseURL}${student.photo}`}
            alt="Student Photo"
            className="w-32 h-32 object-cover rounded-full border-4 border-blue-500 mb-4"
          />
          <p className="text-xl font-semibold">
            {/* <span className=" px-4">Student Name</span> */}
            {student.firstName} {student.middleName} {student.lastName}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="font-medium text-gray-700">
              <strong>ID:</strong> {student.id}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Academic Year:</strong> {student.academicYear}
            </p>
            <p className="font-medium text-gray-700">
              <strong>First Name:</strong> {student.firstName}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Middle Name:</strong> {student.middleName}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Last Name:</strong> {student.lastName}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Student Type:</strong> {student.studentType}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Class:</strong> {student.class}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Division:</strong> {student.division}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Admission Date:</strong>{" "}
              {new Date(student.adm_date).toLocaleDateString()}
            </p>
            <p className="font-medium text-gray-700">
              <strong>UID No:</strong> {student.uidNo}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Date of Birth:</strong>{" "}
              {new Date(student.dob).toLocaleDateString()}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Place of Birth:</strong> {student.dobPlace}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Blood Group:</strong> {student.bloodGrp}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Identification Mark 1:</strong>{" "}
              {student.identificationMark1}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Identification Mark 2:</strong>{" "}
              {student.identificationMark2}
            </p>
          </div>

          <div>
            <p className="font-medium text-gray-700">
              <strong>Father's Name:</strong> {student.fatherName}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Mother's Name:</strong> {student.motherName}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Guardian's Name:</strong> {student.guardianName}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Religion:</strong> {student.religion}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Category:</strong> {student.category}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Nationality:</strong> {student.nationality}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Bus Route:</strong> {student.busRoute}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Father's Mobile No:</strong> {student.fatherMobileNo}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Mother's Mobile No:</strong> {student.motherMobileNo}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Email ID:</strong> {student.emailId}
            </p>
            <p className="font-medium text-gray-700">
              <strong>RF ID:</strong> {student.rfId}
            </p>
            <p className="font-medium text-gray-700">
              <strong>GR ID:</strong> {student.grId}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Roll No:</strong> {student.rollNo}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Gender:</strong> {student.gender}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Caste:</strong> {student.caste}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Mother Tongue:</strong> {student.motherTongue}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Previous School:</strong> {student.previousSchool}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Relation:</strong> {student.relation}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Father's Occupation:</strong> {student.fatherOccupation}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Income:</strong> {student.income}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Admission Class:</strong> {student.admClass}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Last Class:</strong> {student.lastClass}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Student House:</strong> {student.studentHouse}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Left:</strong> {student.left}
            </p>
            <p className="font-medium text-gray-700">
              <strong>TC Issue Date:</strong>{" "}
              {new Date(student.tcIssueDate).toLocaleDateString()}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Remarks:</strong> {student.remarks}
            </p>
            <p className="font-medium text-gray-700">
              <strong>School Category:</strong> {student.schoolCategory}
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Address Details
        </h2>
        <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
          <p className="font-medium text-gray-700">
            <strong>Present Address:</strong> {address.presentAddress}
          </p>
          <p className="font-medium text-gray-700">
            <strong>Permanent Address:</strong> {address.permanentAddress}
          </p>
          <p className="font-medium text-gray-700">
            <strong>Taluka:</strong> {address.taluka}
          </p>
          <p className="font-medium text-gray-700">
            <strong>City:</strong> {address.city}
          </p>
          <p className="font-medium text-gray-700">
            <strong>District:</strong> {address.district}
          </p>
          <p className="font-medium text-gray-700">
            <strong>State:</strong> {address.state}
          </p>
          <p className="font-medium text-gray-700">
            <strong>Pincode:</strong> {address.pincode}
          </p>
          <p className="font-medium text-gray-700">
            <strong>Country:</strong> {address.country}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
