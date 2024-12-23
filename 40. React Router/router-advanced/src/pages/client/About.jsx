import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Page</title>
      </Helmet>
      <h1 style={{ textAlign: "center", marginTop: "14%" }}>
        Here goes the data about us
      </h1>
    </>
  );
};

export default About;
