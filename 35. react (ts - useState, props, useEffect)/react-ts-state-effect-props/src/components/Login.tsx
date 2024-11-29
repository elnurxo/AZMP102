import React from "react";

interface LoginProps {
  setIsLogged: (x: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsLogged }) => {
  return <button onClick={() => setIsLogged(true)}>Login</button>;
};

export default Login;
