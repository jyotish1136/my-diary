import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import AddButton from "../components/AddButton";

const HomeLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <AddButton />
      <Footer />
    </>
  );
};

export default HomeLayout;
