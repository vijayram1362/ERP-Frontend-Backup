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

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { getStudentFeeDetails } from "../config/api";

const PaymentDetails = () => {
  // getting student data
  const location = useLocation();
  const { studentId, studentName } = location.state || {};
  // table data
  const initialData = [
    { name: "Name 1", amount: "100", due: "2000", pay: "" },
    { name: "Name 2", amount: "9999", due: "100", pay: "" },
    { name: "Name 3", amount: "120", due: "500", pay: "" },
  ];

  // card amount
  const [amount, setAmount] = useState("$1000");
  const [paymentMode, setPaymentMode] = useState("Credit Card");
  const [referenceNo, setReferenceNo] = useState("123456789");

  const [data, setData] = useState(initialData);
 
  const handleInputChange = (index, field) => (e) => {
    const newData = [...data];
    newData[index][field] = e.target.value;
    setData(newData);
  };

  const [selectedNames, setSelectedNames] = useState({});

  // check box
  const handleCheckboxChange = (name) => {
    setSelectedNames((prevSelectedNames) => ({
      ...prevSelectedNames,
      [name]: !prevSelectedNames[name],
    }));
  };

  if (!studentId || !studentName)
    return <div className="text-center text-lg font-semibold">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Payment Details
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* student detail */}
          <div>
            <p className="font-medium text-gray-700">
              <strong>Student ID:</strong> {studentId}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Student Name:</strong> {studentName}
            </p>

            {/*  amount card */}
            <div className="  my-16 container">
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

            {/* table */}

            <table className="w-full border-collapse border border-gray-300 mt-4">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2"> </th>
                  {data.map((entry, index) => (
                    <th key={index} className="border border-gray-300 p-2">
                      <input
                        type="checkbox"
                        checked={!!selectedNames[entry.name]}
                        onChange={() => handleCheckboxChange(entry.name)}
                        className="mr-2"
                      />
                      {entry.name}
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
                        value={entry.amount}
                        onChange={handleInputChange(index, "amount")}
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
                        value={entry.due}
                        onChange={handleInputChange(index, "due")}
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
                        type="text"
                        value={entry.pay}
                        onChange={handleInputChange(index, "pay")}
                        className="border border-gray-300 rounded px-2 py-1"
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
            <div className="  inline-block my-6">
              <button className="bg-purple-600 p-2 w-[830px] rounded-md text-white font-semibold">
                Pay
              </button>

              <div className=" my-12 ">
                <p className="font-medium m-2 text-gray-700">
                  <strong>Total amount:</strong>1000{" "}
                </p>
                <p className="m-2 font-medium text-gray-700">
                  <strong>Total Due:</strong> 2000
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
