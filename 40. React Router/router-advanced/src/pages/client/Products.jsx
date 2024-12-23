import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Rating,
  CircularProgress,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import controller from "../../services/api/api";
import { Helmet } from 'react-helmet-async';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterDiscounted, setFilterDiscounted] = useState("all");
  const [sortPrice, setSortPrice] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await controller.getAll("/products");
        setProducts(response);
        setFilteredProducts(response);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle search
  useEffect(() => {
    let updatedProducts = [...products];

    // Filter by search
    if (search) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by discount
    if (filterDiscounted === "discounted") {
      updatedProducts = updatedProducts.filter(
        (product) => product.discountPercentage > 0
      );
    }

    // Sort by price
    if (sortPrice === "lowToHigh") {
      updatedProducts.sort((a, b) => a.salePrice - b.salePrice);
    } else if (sortPrice === "highToLow") {
      updatedProducts.sort((a, b) => b.salePrice - a.salePrice);
    }

    setFilteredProducts(updatedProducts);
  }, [search, filterDiscounted, sortPrice, products]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={5}>
        {error}
      </Typography>
    );
  }

  return (
    <>
      <Helmet>
        <title>Products Page</title>
      </Helmet>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Products
        </Typography>

        {/* Filters and Search */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            mb: 4,
          }}
        >
          <TextField
            label="Search"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ minWidth: "250px" }}
          />

          <FormControl sx={{ minWidth: "150px" }}>
            <Select
              value={filterDiscounted}
              onChange={(e) => setFilterDiscounted(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="discounted">Discounted</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: "150px" }}>
            <InputLabel>Sort by Price</InputLabel>
            <Select
              value={sortPrice}
              onChange={(e) => setSortPrice(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="lowToHigh">Low to High</MenuItem>
              <MenuItem value="highToLow">High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Product Grid */}
        <Grid container spacing={4}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Grid size={4} xs={12} sm={6} md={6} key={product.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.imageUrl}
                    alt={product.name}
                    title={product.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Price: $
                      {(
                        product.salePrice -
                        (product.salePrice * product.discountPercentage) / 100
                      ).toFixed(2)}
                    </Typography>
                    {product.discountPercentage > 0 && (
                      <Typography variant="body2" color="success.main">
                        Discount: {product.discountPercentage}%
                      </Typography>
                    )}
                    <Typography
                      variant="body2"
                      color={product.stock > 0 ? "textPrimary" : "error"}
                    >
                      Stock:{" "}
                      {product.stock > 0 ? product.stock : "Out of Stock"}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <Rating
                        value={
                          product.reviews.length > 0
                            ? product.reviews.reduce(
                                (acc, review) => acc + review.rating,
                                0
                              ) / product.reviews.length
                            : 0
                        }
                        readOnly
                        precision={0.5}
                      />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {product.reviews.length} review
                        {product.reviews.length > 1 && "s"}
                      </Typography>
                    </Box>
                  </CardContent>
                  <Button variant="contained" color="primary" sx={{ m: 2 }}>
                    Buy Now
                  </Button>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" align="center" sx={{ width: "100%" }}>
              No products found.
            </Typography>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Products;
