import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [counter, setCounter] = useState(0);
  const [sortOrder, setSortOrder] = useState("asc"); // State to track sort order

  // Fetching data once when component mounts
  useEffect(() => {
    const axiosUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        const axiosResult = await response;
        setUsers([...axiosResult.data]);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    axiosUsers();
  }, []);

  // Dark mode effect
  useEffect(() => {
    document.body.style.background = darkMode ? "black" : "white";
    document.body.style.color = darkMode ? "white" : "black";
  }, [darkMode]);

  // Sorting users based on selected order
  const sortedUsers = [...users]
    .filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    )
    .sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (sortOrder === "asc") {
        return nameA < nameB ? -1 : 1;
      } else {
        return nameA > nameB ? -1 : 1;
      }
    });

  console.log(
    "sorted users renders again when another state changes: ",
    sortedUsers
  );

  return (
    <>
      {/* Counter Controls */}
      <button onClick={() => setCounter((prev) => prev - 1)}>Decrease</button>
      <span>{counter}</span>
      <button onClick={() => setCounter((prev) => prev + 1)}>Increase</button>

      <hr />

      {/* Dark Mode Toggle */}
      <button
        style={{
          backgroundColor: darkMode ? "black" : "white",
          color: darkMode ? "white" : "black",
        }}
        onClick={() => setDarkMode((prev) => !prev)}
      >
        Switch Mode
      </button>

      <hr />

      {/* Search Input and Sort Dropdown */}
      <h2>API Data List</h2>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
        <option value="asc">Sort A-Z</option>
        <option value="desc">Sort Z-A</option>
      </select>

      <ul>
        {sortedUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
