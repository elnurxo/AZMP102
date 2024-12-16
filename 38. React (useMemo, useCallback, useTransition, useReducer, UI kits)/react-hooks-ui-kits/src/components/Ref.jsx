import { useRef } from "react";

const Ref = () => {
  const inputRef = useRef("");
  function handleClick() {
    inputRef.current.focus();
  }
  return (
    <>
      <input ref={inputRef} placeholder="search" />
      <button onClick={handleClick}>Focus Input</button>
    </>
  );
};

export default Ref;
