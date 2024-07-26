"use client";
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Reviews from "./components/Route/Reviews";
import Courses from "./components/Route/Courses";
import FAQ from "./components/Route/FAQ";
import Footer from "./components/Footer";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title='ELearning'
        description='ELearning is a platform for student to learn'
        keywords='FrontEnd, MERN, Redux'
      />
      <Header open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route} />
      <Hero />
      {/* <Courses /> */}
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Page;
