import React from 'react';
import Navbar from '../components/Navbar';
import MyResult from '../components/MyResult';

const MyResultPage = () => {
  return (
    <div>
      <Navbar />
      <MyResult apiBase="http://localhost:9999" />
    </div>
  );
};

export default MyResultPage;