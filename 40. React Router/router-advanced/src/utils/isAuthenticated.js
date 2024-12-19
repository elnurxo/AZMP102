const isAuthenticated = () => {
  return localStorage.getItem("adminAuth") === "true";
};

export default isAuthenticated;
