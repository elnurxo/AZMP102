import { useState, useEffect } from "react";
import moment from "moment";
import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Table,
  Image,
  Space,
  Popconfirm,
  Row,
  Col,
  Spin,
  message,
  Select,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import controller from "../../services/api/api"; // Import your API service
import Product from "../../classes/Product";

const Products = () => {
  const [products, setProducts] = useState([]); // All products state
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products state
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Fetch categories and products from the API
  const fetchCategories = async () => {
    try {
      const response = await controller.getAll("/categories"); // Replace with your endpoint
      setCategories(response || []); // Ensure data fallback to empty array if undefined
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      message.error("Failed to load categories. Please try again later.");
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await controller.getAll("/products"); // Replace with your endpoint
      setProducts(response || []); // Ensure data fallback to empty array if undefined
      setFilteredProducts(response || []); // Set filtered products to all initially
    } catch (error) {
      console.error("Failed to fetch products:", error);
      message.error("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Filter products by category
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    if (value === "all") {
      setFilteredProducts(products); // Reset to all products when "All" is selected
    } else {
      const filtered = products.filter(
        (product) => product.categoryId === value
      );
      setFilteredProducts(filtered); // Filter products based on the selected category
    }
  };

  // Search products by name
  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await controller.delete("/products", id); // Replace with your endpoint
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
      setFilteredProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
      message.success("Product deleted successfully.");
    } catch (error) {
      console.error("Failed to delete product:", error);
      message.error("Failed to delete product. Please try again.");
    }
  };

  const handleAddOrUpdateProduct = async (values) => {
    try {
      const newProduct = new Product(
        values.name,
        values.categoryId,
        values.price,
        values.costPrice,
        values.salePrice,
        values.discountPercentage,
        values.stock,
        values.imageUrl
      );

      if (editingProduct) {
        // Update existing product
        const response = await controller.put(
          "/products",
          editingProduct.id,
          newProduct
        );
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === editingProduct.id ? response : product
          )
        );
        setFilteredProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === editingProduct.id ? response : product
          )
        );
        message.success("Product updated successfully.");
      } else {
        // Add new product
        const response = await controller.post("/products", newProduct);
        setProducts((prevProducts) => [...prevProducts, response]);
        setFilteredProducts((prevProducts) => [...prevProducts, response]);
        message.success("Product added successfully.");
      }

      // Close modal and reset the form state
      setIsModalVisible(false);
      setEditingProduct(null); // Reset editing state
    } catch (error) {
      console.error("Failed to save product:", error);
      message.error("Failed to save product. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingProduct(null); // Reset editing state when canceling
  };

  const columns = [
    {
      title: "Product Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (text) => <Image width={50} src={text} />,
    },
    {
      title: "Product Title",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Cost Price",
      dataIndex: "costPrice",
      key: "costPrice",
      sorter: (a, b) => a.costPrice - b.costPrice,
    },
    {
      title: "Sale Price",
      dataIndex: "salePrice",
      key: "salePrice",
      sorter: (a, b) => a.salePrice - b.salePrice,
    },
    {
      title: "Discount (%)",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      sorter: (a, b) => a.discountPercentage - b.discountPercentage,
    },
    {
      title: "Stock Quantity",
      dataIndex: "stock", // Corrected this to match your data
      key: "stock",
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<InfoCircleOutlined />}
            onClick={() => alert(`Product Info: ${record.name}`)} // Changed 'title' to 'name'
          />
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        style={{ marginBottom: 20 }}
        onClick={() => setIsModalVisible(true)}
      >
        Add New Product
      </Button>

      {/* Search Input */}
      <Input
        placeholder="Search by Product Name"
        style={{ width: 250, marginBottom: 20, marginLeft: "20px" }}
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <Select
        style={{ width: 200, marginBottom: 20, marginLeft: "20px" }}
        placeholder="Filter by Category"
        onChange={handleCategoryChange}
        value={selectedCategory}
      >
        <Select.Option value="all">All</Select.Option>
        {categories.map((category) => (
          <Select.Option key={category.id} value={category.id}>
            {category.name}
          </Select.Option>
        ))}
      </Select>

      {loading ? (
        <Spin
          size="large"
          style={{ display: "block", textAlign: "center", margin: "20px 0" }}
        />
      ) : (
        <Table
          columns={columns}
          dataSource={filteredProducts}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: filteredProducts.length,
            onChange: (page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
            },
          }}
        />
      )}

      {/* Modal for Adding/Editing Products */}
      <Modal
        title={editingProduct ? "Edit Product" : "Add New Product"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={500}
      >
        <Form
          key={editingProduct ? editingProduct.id : "new"}
          initialValues={editingProduct || {}}
          onFinish={handleAddOrUpdateProduct}
          layout="vertical"
        >
          <Form.Item
            label="Product Name"
            name="name"
            rules={[{ required: true, message: "Please enter product name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Category"
            name="categoryId"
            rules={[{ required: true, message: "Please select category!" }]}
          >
            <Select>
              {categories.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Cost Price"
                name="costPrice"
                rules={[
                  { required: true, message: "Please enter cost price!" },
                ]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Sale Price"
                name="salePrice"
                rules={[
                  { required: true, message: "Please enter sale price!" },
                ]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Discount (%)"
                name="discountPercentage"
                rules={[{ required: true, message: "Please enter discount!" }]}
              >
                <InputNumber min={0} max={100} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Stock Quantity"
                name="stock"
                rules={[
                  { required: true, message: "Please enter stock quantity!" },
                ]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Image URL"
            name="imageUrl"
            rules={[{ required: true, message: "Please enter image URL!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editingProduct ? "Update Product" : "Add Product"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
