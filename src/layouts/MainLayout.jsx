import { Outlet } from "react-router-dom";
import Side from "../components/Side";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import useSeccionII from "../hooks/useSeccionII";
const MainLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simular una carga de 2 segundos
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <>
    {isLoading ? (
        <Loader />
      ) : (
        <>
       <Navbar/>     
      <div className="flex ">
        <Side />
        <div className="mx-auto w-full mt-20 pt-20 pl-14  md:pl-48">
          <Outlet />
        </div>
      </div></>)}
    </>
  );
};

export default MainLayout;
