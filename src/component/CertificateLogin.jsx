// import React from "react";
// import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
// import { ChevronDownIcon } from '@heroicons/react/20/solid'
// import Navbar from "./Navbar";

// function Dropdown({ label, options }) {
//   return (
//     <Menu as="div" className="relative w-full">
//       <MenuButton className="w-full p-2 rounded text-gray-500 bg-white focus:outline-none inline-flex justify-between items-center">
//         {label}
//         <ChevronDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
//       </MenuButton>
//       <MenuItems className="absolute w-full mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//         {options.map((option, index) => (
//           <MenuItem key={index}>
//             {({ active }) => (
//               <a
//                 href="#"
//                 className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
//               >
//                 {option}
//               </a>
//             )}
//           </MenuItem>
//         ))}
//       </MenuItems>
//     </Menu>
//   )
// }

// function Login() {
//   return (
//     <div className="min-h-screen font-[roboto] bg-[#412249] ">
//       <Navbar />
//       <div className="p-12 mt-28 container mx-auto">
//         {/* <div className="flex flex-col md:flex-row lg:mb-16 mt-10 justify-between items-center">
//           <div className="mb-12 w-full md:w-[45%]">
//             <label className="text-white">Student's Registration No.</label>
//             <Dropdown label="Enter Registration No." options={['Option 1', 'Option 2', 'Option 3']} />
//           </div>
//           <div className="mb-12 w-full md:w-[45%]">
//             <label className="text-white">Academic Session</label>
//             <Dropdown label="Select Academic Session" options={['2021-2022', '2022-2023', '2023-2024']} />
//           </div>
//         </div> */}
//         {/* 2 */}
//         <div className="flex flex-col md:flex-row justify-between items-center">
//           {/* <div className="mb-12 w-full md:w-[45%]">
//             <label className="text-white">GR ID</label>
//             <Dropdown label="Enter GR ID" options={['Option 1', 'Option 2', 'Option 3']} />
//           </div> */}
//           <div className="mb-12 flex flex-col w-full md:w-[45%]">
//             <label className="text-white">GR ID</label>
//             {/* <Dropdown label="Enter GR ID" options={['Option 1', 'Option 2', 'Option 3']} /> */}
//             <input type="text" placeholder="Enter GR ID" className=" p-2 rounded focus:outline-none  cursor-pointer" />
//           </div>
//         </div>
//       </div>
//       {/* last */}
//       <div className="flex justify-center p-2 text-white">
//         <button className="bg-[#744881] px-16 p-2 rounded-md mx-12">Submit</button>
//         <button className="bg-[#744881] px-16 p-2 rounded-md mx-12">Clear All</button>
//       </div>
//     </div>
//   );
// }

// export default Login;














































// import Navbar from "./Navbar";



// function Login() {
//   return (
//     <div className="min-h-screen font-[roboto] bg-[#412249] ">
//       <Navbar />
//       <h2 className=" text-center font-semibold text-2xl lg:text-4xl   mt-32  text-white">Enter Your GR ID to Generate Your Certificate</h2>

//       <div className="p-12 mt-16 container flex items-center justify-center mx-auto">
   
//         {/* <div className="flex flex-col md:flex-row justify-between items-center"> */}
//           <div className="mb-12 flex flex-col  w-full md:w-[45%]">
//             <label className="text-white">GR ID</label>
//             <input
//               type="text"
//               placeholder="Enter GR ID"
//               className=" p-2 rounded focus:outline-none  cursor-pointer"
//             />
//           </div>
//         {/* </div> */}
//       </div>

//       <div className="flex justify-center p-2 text-white">
//         <button className="bg-[#744881] px-16 p-2 rounded-md mx-12">
//           Submit
//         </button>
//         <button className="bg-[#744881] px-16 p-2 rounded-md mx-12">
//           Clear All
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Login;



























import Navbar from "./Navbar";

function Login() {
  return (
    <div className="min-h-screen font-[roboto] bg-[#412249] flex flex-col">
      <Navbar />
      <h2 className="text-center font-semibold text-2xl lg:text-4xl mt-12 md:mt-32 text-white">
        Enter Your GR ID to Generate Your Certificate
      </h2>

      <div className="p-6 md:p-12 mt-8 md:mt-16 container flex items-center justify-center mx-auto">
        <div className="flex flex-col w-full max-w-md">
          <label className="text-white mb-2">GR ID</label>
          <input
            type="text"
            placeholder="Enter GR ID"
            className="p-2 rounded focus:outline-none cursor-pointer"
          />
        </div>
      </div>

      <div className="flex flex-col  md:flex-row justify-center p-8 text-white  mt-20">
        <button className="bg-[#744881] px-8 py-2 rounded-md mx-4 mt-2 lg:my-0 my-5 md:my-0 md:mt-0">
          Submit
        </button>
        <button className="bg-[#744881] px-8 py-2 rounded-md mx-4 mt-2 md:mt-0">
          Clear All
        </button>
      </div>
    </div>
  );
}

export default Login;
