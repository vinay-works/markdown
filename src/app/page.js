"use client"

import React from 'react';
import Header from '@/components/header';
import MainBody from '@/components/main-body'
import Footer from '@/components/footer';
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Page = () => {
  return (
    
    <div>
      <Header />
      <MainBody />
      <Footer />
      <ToastContainer/>
    </div>
  );
};

export default Page;
