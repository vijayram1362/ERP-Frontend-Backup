// // import React from 'react';
// // import { useLocation } from 'react-router-dom';

// // const PaymentDetails = () => {
// //   const location = useLocation();
// //   const { studentId, studentName } = location.state || {};

// //   if (!studentId || !studentName) return <div className="text-center text-lg font-semibold">Loading...</div>;

// //   return (
// //     <div className="container mx-auto p-6">
// //       <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg max-w-4xl mx-auto">
// //         <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Payment Details</h1>
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           <div>
// //             <p className="font-medium text-gray-700"><strong>Student ID:</strong> {studentId}</p>
// //             <p className="font-medium text-gray-700"><strong>Student Name:</strong> {studentName}</p>
// //             <p className="font-medium text-gray-700"><strong>Amount:</strong> $1000</p>
// //             <p className="font-medium text-gray-700"><strong>Payment Mode:</strong> Credit Card</p>
// //             <p className="font-medium text-gray-700"><strong>Reference No:</strong> 123456789</p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PaymentDetails;

// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';

// const PaymentDetails = () => {
//   const location = useLocation();
//   const { studentId, studentName } = location.state || {};

//   // State to hold the values of the editable fields
//   const [amount, setAmount] = useState('$1000');
//   const [paymentMode, setPaymentMode] = useState('Credit Card');
//   const [referenceNo, setReferenceNo] = useState('123456789');

//   if (!studentId || !studentName) return <div className="text-center text-lg font-semibold">Loading...</div>;

//   return (
//     <div className="container mx-auto p-6">
//       <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Payment Details</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <p className="font-medium text-gray-700"><strong>Student ID:</strong> {studentId}</p>
//             <p className="font-medium text-gray-700"><strong>Student Name:</strong> {studentName}</p>

//             <div className="font-medium text-gray-700">
//               <strong>Amount:</strong>
//               <input
//                 type="text"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 className="border border-gray-300 rounded px-2 py-1 ml-2"
//               />
//             </div>

//             <div className="font-medium text-gray-700 mt-4">
//               <strong>Payment Mode:</strong>
//               <input
//                 type="text"
//                 value={paymentMode}
//                 onChange={(e) => setPaymentMode(e.target.value)}
//                 className="border border-gray-300 rounded px-2 py-1 ml-2"
//               />
//             </div>

//             <div className="font-medium text-gray-700 mt-4">
//               <strong>Reference No:</strong>
//               <input
//                 type="text"
//                 value={referenceNo}
//                 onChange={(e) => setReferenceNo(e.target.value)}
//                 className="border border-gray-300 rounded px-2 py-1 ml-2"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentDetails;
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  getStudentFeeDetails,
  getFeeDetailUtilityWise,
  updateStudentFees,
} from "../config/api";

const PaymentDetails = () => {
  const location = useLocation();
  const { studentId, studentName } = location.state || {};

  const [amount, setAmount] = useState(0);
  const [paymentMode, setPaymentMode] = useState("");
  const [referenceNo, setReferenceNo] = useState("");
  const [feeDetail, setFeeDetail] = useState({});
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [selectedNames, setSelectedNames] = useState({});

  useEffect(() => {
    const fetchFeeDetails = async (studentId) => {
      try {
        const response1 = await getStudentFeeDetails(studentId);
        const response2 = await getFeeDetailUtilityWise(studentId);

        if (response1.data && response2.data) {
          setFeeDetail(response1.data);
          console.log(response1.data);
          console.log(response2.data);

          setData(response2.data.utilityData);
        }
      } catch (error) {
        console.error("Unexpected response format:", error);
        setError("Unexpected response format");
      }
    };
    console.log("selectedNames:", selectedNames);

    if (studentId) {
      fetchFeeDetails(studentId);
    }
  }, [studentId, selectedNames]);

  const handleInputChange = (index, field) => (e) => {
    const newData = [...data];
    newData[index][field] = e.target.value;
    setData(newData);
  };

  const handlePayment = async () => {
    const selectedUtilities = data
      .filter((entry) => selectedNames[entry.utility.name])
      .map((entry) => entry.UtilityId); // Assuming each utility has an `id`

    const paymentObj = {
      student_id: studentId,
      utility: selectedUtilities,
      payment_mode: paymentMode,
      ref_no: referenceNo,
      remark: "Payment up to the selected date", // Update remark as per requirement
    };
    console.log(paymentObj);

    // try {
    //   await updateStudentFees(paymentObj);
    //   console.log("Payment Successful:", paymentObj);
    // } catch (error) {
    //   console.error("Payment Error:", error);
    // }
  };

  const handleCheckboxChange = (name) => {
    setSelectedNames((prevSelectedNames) => ({
      ...prevSelectedNames,
      [name]: !prevSelectedNames[name],
    }));
  };

  if (!studentId || !studentName) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Payment Details
        </h1>
        <div className="flex">
          <div>
            <p className="font-medium text-gray-700">
              <strong>Student ID:</strong> {studentId}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Student Name:</strong> {studentName}
            </p>

            <div className="my-16 container">
              <div className="font-medium text-gray-700">
                <strong>Amount:</strong>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 ml-2"
                />
              </div>

              <div className="font-medium text-gray-700 mt-4">
                <strong>Payment Mode:</strong>
                <input
                  type="text"
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 ml-2"
                />
              </div>

              <div className="font-medium text-gray-700 mt-4">
                <strong>Reference No:</strong>
                <input
                  type="text"
                  value={referenceNo}
                  onChange={(e) => setReferenceNo(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 ml-2"
                />
              </div>
            </div>
            <div className="flex">
              <table className="w-full border-collapse border border-gray-300 mt-4">
                <thead>
                  <tr>
                    <th className="p-2"> </th>
                    {data.map((entry, index) => (
                      <th key={index} className="border border-gray-300 p-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={!!selectedNames[entry.utility.name]}
                            onChange={() =>
                              handleCheckboxChange(entry.utility.name)
                            }
                            className="mr-2"
                          />
                          {entry.utility.name}
                        </label>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium text-gray-700">
                      Amount
                    </td>
                    {data.map((entry, index) => (
                      <td key={index} className="border border-gray-300 p-2">
                        <input
                          type="text"
                          value={entry.utility.amount}
                          disabled
                          // onChange={handleInputChange(index, "amount")}
                          className="border border-gray-300 rounded px-2 py-1"
                        />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium text-gray-700">
                      Due
                    </td>
                    {data.map((entry, index) => (
                      <td key={index} className="border border-gray-300 p-2">
                        <input
                          type="text"
                          value={entry.remainingAmount}
                          // onChange={handleInputChange(index, "due")}
                          className="border border-gray-300 rounded px-2 py-1"
                        />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium text-gray-700">
                      Pay
                    </td>
                    {data.map((entry, index) => (
                      <td key={index} className="border border-gray-300 p-2">
                        <input
                          type="number"
                          placeholder="0"
                          value={entry.pay}
                          className="border border-gray-300 rounded px-2 py-1"
                        />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="inline-block my-6">
              <button
                className="bg-purple-600 p-2 w-full rounded-md text-white font-semibold"
                onClick={handlePayment}
              >
                Pay
              </button>

              <div className="my-12">
                <p className="font-medium m-2 text-gray-700">
                  <strong>Total amount:</strong> Rs {feeDetail.totalFee}
                </p>
                <p className="m-2 font-medium text-gray-700">
                  <strong>Total Due:</strong> Rs {feeDetail.pendingFee}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
