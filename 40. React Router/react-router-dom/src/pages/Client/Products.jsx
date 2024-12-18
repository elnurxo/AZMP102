import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts([...data.products]);
      });
  }, []);
  return (
    <>
      <Typography
        variant="h4"
        style={{ textAlign: "center", marginTop: "18px" }}
      >
        Products Page
      </Typography>
      <div style={{ width: "90%", margin: "0 auto" }}>
        <Grid container spacing={2}>
          {products &&
            products.map((product) => {
              return (
                <Grid key={product.id} size={3}>
                  <Card sx={{ height: 450 }}>
                    <CardMedia
                      sx={{ height: 200 }}
                      image={product.images[0]}
                      title={product.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {product.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {product.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">
                        <Link to={`/products/${product.id}`}>Learn More</Link>
                      </Button>
                      <Button size="small" color="error">
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </div>
    </>
  );
};

export default Products;
