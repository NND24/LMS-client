"use client";
import React, { FC, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import { RootState } from "@/redux/store";

type Props = {};

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className='min-h-screen'>
      <Protected>
        <Heading
          title={`${user?.name} profile - ELearning`}
          description='ELearning is a platform for students to learn'
          keywords='FrontEnd, MERN, Redux'
        />
        <Header open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route} />
        <Profile user={user} />
        <Footer />
      </Protected>
    </div>
  );
};

export default Page;
