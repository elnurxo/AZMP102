import { Outlet } from "react-router";
import Navbar from "../../components/Admin/Navbar";

const AdminLayout = () => {
  return (
    <>
      {/* admin header */}
      <Navbar />
      <Outlet />
    </>
  );
};

export default AdminLayout;
