import { useState, useTransition } from "react";

const Transition = () => {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  const LIST_SIZE = 20_000;

  function handleChange(e) {
    setInput(e.target.value);
    startTransition(() => {
      const l = [];
      for (let i = 0; i < LIST_SIZE; i++) {
        l.push(e.target.value);
      }
      setList(l);
    });
  }
  return (
    <>
      <input type="text" value={input} onChange={handleChange} />
      {isPending
        ? "loading..."
        : list &&
          list.map((item, idx) => {
            return <div key={idx}>{item}</div>;
          })}
    </>
  );
};

export default Transition;
