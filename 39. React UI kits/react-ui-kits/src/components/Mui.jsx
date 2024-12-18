import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Grid2";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
} from "@mui/material";

const Mui = () => {
  return (
    <>
      {/* header */}
      <header>
        <AppBar
          sx={{
            background: "rgb(3,89,68)",
          }}
          position="static"
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Code Academy
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </header>
      {/* main cards section */}
      <main>
        <section id="cards">
          <Typography
            align="center"
            sx={{ marginTop: "20px" }}
            variant="h4"
            component="h2"
          >
            Books App
          </Typography>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              width: "20%",
              margin:'0 auto',
              justifyContent: "center",
              gap:'12px'
            }}
          >
            <TextField
              sx={{}}
              id="outlined-basic"
              label="Search Iguana"
              variant="outlined"
            />
            <Button variant="contained" color="success">
              search
            </Button>
          </form>
          <Grid
            sx={{ maxWidth: "90%", margin: "20px auto" }}
            container
            spacing={2}
          >
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 3 }}>
              <Card>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={
                    "https://talis-us.com/cdn/shop/articles/tmp_7e6e2b3e-1719-480b-a1fb-2a9edb618393.webp?v=1725120900"
                  }
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 3 }}>
              <Card>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={
                    "https://talis-us.com/cdn/shop/articles/tmp_7e6e2b3e-1719-480b-a1fb-2a9edb618393.webp?v=1725120900"
                  }
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 3 }}>
              <Card>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={
                    "https://talis-us.com/cdn/shop/articles/tmp_7e6e2b3e-1719-480b-a1fb-2a9edb618393.webp?v=1725120900"
                  }
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 3 }}>
              <Card>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={
                    "https://talis-us.com/cdn/shop/articles/tmp_7e6e2b3e-1719-480b-a1fb-2a9edb618393.webp?v=1725120900"
                  }
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </section>
      </main>
    </>
  );
};

export default Mui;
