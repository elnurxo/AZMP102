import logo from "../../public/React-Symbol.png";

const Img = () => {
  //js code - function, class, variable, click, fetch
  let imgAlternativeText = "react logo";

  return (
    <img
      width={100}
      src={logo}
      alt={imgAlternativeText}
      title={imgAlternativeText}
    />
  );
};

export default Img;
