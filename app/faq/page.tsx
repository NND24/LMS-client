"use client";

import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FAQ from "../components/Route/FAQ";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(4);
  const [route, setRoute] = useState("Login");

  return (
    <div className='min-h-screen'>
      <Heading
        title='FAQ - ELearning'
        description='ELearning is a platform for student to learn'
        keywords='FrontEnd, MERN, Redux'
      />
      <Header open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route} />
      <br />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Page;
