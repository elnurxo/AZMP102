import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function App() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {/* First item: full-width on xs, sm, md; 4 columns on lg and xl */}
          <Grid item size={4} xs={4} sm={12} md={12} lg={4} xl={4}>
            <Item>size=4</Item>
          </Grid>
          {/* Second item: full-width on xs, sm, md; 4 columns on lg and xl */}
          <Grid item size={4} xs={4} sm={12} md={12} lg={4} xl={4}>
            <Item>size=4</Item>
          </Grid>
          {/* Third item: full-width on xs, sm, md; 4 columns on lg and xl */}
          <Grid item size={4} xs={4} sm={12} md={12} lg={4} xl={4}>
            <Item>size=4</Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;
