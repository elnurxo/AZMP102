import { Card, Col, Row, Statistic } from "antd";
import { Bar, Line, Pie } from "@ant-design/plots";

const Dashboard = () => {
  // Fake data for charts
  const productsData = [
    { month: "Jan", value: 30 },
    { month: "Feb", value: 50 },
    { month: "Mar", value: 40 },
    { month: "Apr", value: 70 },
    { month: "May", value: 90 },
  ];

  const ordersData = [
    { month: "Jan", value: 20 },
    { month: "Feb", value: 35 },
    { month: "Mar", value: 55 },
    { month: "Apr", value: 75 },
    { month: "May", value: 90 },
  ];

  const messagesData = [
    { category: "Product Inquiry", value: 30 },
    { category: "Order Issue", value: 20 },
    { category: "General", value: 50 },
  ];

  const usersData = [
    { month: "Jan", value: 40 },
    { month: "Feb", value: 60 },
    { month: "Mar", value: 80 },
    { month: "Apr", value: 100 },
    { month: "May", value: 120 },
  ];

  // Bar Chart configuration for Products
  const productsConfig = {
    data: productsData,
    xField: "month",
    yField: "value",
    label: {
      style: {
        fill: "#fff",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoRotate: false,
      },
    },
    meta: {
      month: {
        alias: "Month",
      },
      value: {
        alias: "Number of Products",
      },
    },
  };

  // Bar Chart configuration for Orders
  const ordersConfig = {
    data: ordersData,
    xField: "month",
    yField: "value",
    label: {
      style: {
        fill: "#fff",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoRotate: false,
      },
    },
    meta: {
      month: {
        alias: "Month",
      },
      value: {
        alias: "Number of Orders",
      },
    },
  };

  // Pie Chart configuration for Messages
  const messagesConfig = {
    appendPadding: 10,
    data: messagesData,
    angleField: "value",
    colorField: "category",
    radius: 0.8,
    label: {
      content: "{name} ({percentage}%)", // Ensure content formatting
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  // Line Chart configuration for Users
  const usersConfig = {
    data: usersData,
    xField: "month",
    yField: "value",
    seriesField: "month",
    lineStyle: {
      lineWidth: 3,
    },
    point: {
      size: 5,
    },
    meta: {
      month: {
        alias: "Month",
      },
      value: {
        alias: "Number of Users",
      },
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={16}>
        {/* Total Products */}
        <Col span={6}>
          <Card>
            <Statistic title="Total Products" value={200} />
          </Card>
        </Col>

        {/* Total Orders */}
        <Col span={6}>
          <Card>
            <Statistic title="Total Orders" value={150} />
          </Card>
        </Col>

        {/* Total Messages */}
        <Col span={6}>
          <Card>
            <Statistic title="Total Messages" value={120} />
          </Card>
        </Col>

        {/* Total Users */}
        <Col span={6}>
          <Card>
            <Statistic title="Total Users" value={300} />
          </Card>
        </Col>
      </Row>

      {/* Products Bar Chart */}
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={12}>
          <Card title="Products Added Each Month">
            <Bar {...productsConfig} />
          </Card>
        </Col>

        {/* Orders Bar Chart */}
        <Col span={12}>
          <Card title="Orders Placed Each Month">
            <Bar {...ordersConfig} />
          </Card>
        </Col>
      </Row>

      {/* Messages Pie Chart */}
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={12}>
          <Card title="Messages Received">
            <Pie {...messagesConfig} />
          </Card>
        </Col>

        {/* Users Line Chart */}
        <Col span={12}>
          <Card title="Users Registered Each Month">
            <Line {...usersConfig} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
