


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentTable from './component/StudentTable';
import StudentDetails from './component/StudentDetails';
import IdCard from './Certificate/IdCard';
import TransferForm from './Certificate/TransferForm';
import Bonafide from './Certificate/Bonfite';
import Leaving from './Certificate/Leaving';
import PaymentDetails from './component/PaymentDetails';
import LoginForm from './component/LoginForm';
import Form from './component/Form';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/student-table" element={<StudentTable />} />
        <Route path="/student-details" element={<StudentDetails />} />
        <Route path="/payment-details" element={<PaymentDetails />} />
        <Route path="/id-card/:id" element={<IdCard />} />
        <Route path="/transfer-certificate/:id" element={<TransferForm />} />
        <Route path="/bonafide-certificate/:id" element={<Bonafide />} />
        <Route path="/nirgam-certificate/:id" element={<Leaving />} />
      </Routes>
    </Router>

    // <div>
    //   <Form/>
    // </div>
  );
};

export default App;
