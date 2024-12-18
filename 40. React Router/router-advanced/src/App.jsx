import { Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import ClientRoutes from "./routes/ClientRoutes";

function App() {
  return (
    <>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Client Routes */}
        <Route path="/*" element={<ClientRoutes />} />
      </Routes>
    </>
  );
}

export default App;
