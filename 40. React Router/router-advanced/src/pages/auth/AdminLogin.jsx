import { useNavigate } from "react-router-dom";
import { Card, Input, Button, Typography, Space, Form } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import adminLoginSchema from "../../validations/admin.login.validation";
import controller from "../../services/api/api";
import { useEffect } from "react";
import isAuthenticated from "../../utils/isAuthenticated";
const { Title } = Typography;

const AdminLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAuth = isAuthenticated();
    if (checkAdminAuth) {
      navigate("/admin");
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values, actions) => {
      console.log("values:", values);
      actions.resetForm();
      const admins = await controller.getAll("/users?role=admin");
      const validAdmin = admins.find(
        (x) =>
          x.username === values.username &&
          x.password === values.password &&
          x.role === "admin"
      );
      if (validAdmin) {
        // Displaying success toast notification
        toast.success("Welcome back, Admin!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });

        // Simulate authentication process
        setTimeout(() => {
          localStorage.setItem("adminAuth", "true");
          navigate("/admin");
        }, 300);
      } else {
        toast.error("Incorrect username or password!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    },
    validationSchema: adminLoginSchema,
  });

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f5fa",
      }}
    >
      <Card
        style={{
          width: 400,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: 8,
          padding: "20px",
        }}
        bordered={false}
      >
        <Title level={3} style={{ textAlign: "center", color: "#1976d2" }}>
          Admin Login
        </Title>

        <Space direction="vertical" style={{ width: "100%" }}>
          <form onSubmit={formik.handleSubmit}>
            {/* Username Field */}
            <Form.Item
              label="Username"
              validateStatus={
                formik.touched.username && formik.errors.username
                  ? "error"
                  : "success"
              }
              help={formik.touched.username && formik.errors.username}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
                size="large"
                style={{ marginBottom: "16px" }}
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>

            {/* Password Field */}
            <Form.Item
              label="Password"
              validateStatus={
                formik.touched.password && formik.errors.password
                  ? "error"
                  : "success"
              }
              help={formik.touched.password && formik.errors.password}
            >
              <Input
                prefix={<LockOutlined />}
                placeholder="Password"
                type="password"
                size="large"
                style={{ marginBottom: "24px" }}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>

            {/* Login Button */}
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              style={{
                fontWeight: "bold",
              }}
              disabled={
                !formik.dirty ||
                formik.isSubmitting ||
                Object.keys(formik.errors).length > 0
              }
            >
              Login
            </Button>
          </form>
        </Space>
      </Card>
    </div>
  );
};

export default AdminLogin;
