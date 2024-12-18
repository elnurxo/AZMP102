import { Outlet } from "react-router";
import Navbar from "../../components/Client/Navbar";
import { useState } from "react";

const ClientLayout = () => {
  const [test, setTest] = useState("hello outlet");
  return (
    <>
      {/* client header */}
      <Navbar />
      <Outlet context={{ test }} />
    </>
  );
};

export default ClientLayout;
