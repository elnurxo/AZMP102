import Button from "./components/Button";
import Input from "./components/Input";
import StyledButton from "./components/StyleButton";

//built in css in js (style object)
const titleStyleProps = {
  color: "red",
  backgroundColor: "black",
  textAlign: "center",
  fontFamily: "monospace",
  padding: "14px 12px",
};

function App() {
  return (
    <>
      <StyledButton />
      <h1 style={titleStyleProps}>Test React App</h1>
      <Button variant={"primary"} />
      <Button variant={"success"} />
      <Button variant={"info"} />
      <Button text={"click danger button"} variant={"danger"} />
      <Button />
      <Input />
    </>
  );
}

export default App;
