import React from "react";

interface LogoutProps {
  setIsLogged: (state: boolean) => void;
}

const Logout: React.FC<LogoutProps> = ({ setIsLogged }) => {
  return <button onClick={() => setIsLogged(false)}>Logout</button>;
};

export default Logout;
