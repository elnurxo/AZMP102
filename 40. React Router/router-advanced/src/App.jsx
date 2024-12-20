import { Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import ClientRoutes from "./routes/ClientRoutes";
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "./services/context/AuthContext.jsx";

function App() {
  return (
    <AuthContextProvider>
      <ToastContainer />
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Client Routes */}
        <Route path="/*" element={<ClientRoutes />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
