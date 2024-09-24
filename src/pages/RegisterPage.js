import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL;

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      username: username,
      password: password,
    };
    try {
      const response = await axios.post(
        `${API_URL}/register`,
        formData
      );
      const user = {
        username: response.data.username,
        userId: response.data.userId,
      };
      setUser(user);
      localStorage.setItem("token", response.data.jwt);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (e) {
      setPassword("");
      setUsername("");
      alert("Incorrect username or password");
    }
  };

  return (
    <div className="flex-col">
      <div className="flex justify-center">
        <form
          onSubmit={handleFormSubmit}
          className="border p-4 rounded-lg shadow-lg flex-col w-[280px]"
        >
          <div className="flex flex-row justify-between m-2 mb-4">
            <p className="text-2xl">Register your account</p>
          </div>
          <div className="m-2 flex-col">
            <label className="block text-md">Username:</label>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              className="p-1 border rounded w-full"
              required
            />
          </div>
          <div className="m-2 flex-col">
            <label className="block text-md">Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="p-1 border rounded w-full"
              required
            />
          </div>
          <div className="m-2 flex justify-center">
            <button className="w-full p-1 bg-blue-800 shadow-md rounded text-white mt-2">
              Continue
            </button>
          </div>
        </form>
      </div>
      <div className="flex justify-center">
        <div className="m-4">
          <p>Already have an account?</p>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="underline text-blue-400"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
