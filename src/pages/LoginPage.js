import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../context/user";
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      username: username,
      password: password
    };
    try{
      const response = await axios.post("http://localhost:8080/authenticate", formData);
      const user = {
        username: response.data.username,
        userId: response.data.userId
      };
      setUser(user);
      localStorage.setItem('token', response.data.jwt);
      navigate("/");
    }
    catch(e) {
      console.log("Login error");
    }
  }

  return <div>
    <form onSubmit={handleFormSubmit}>
      <label>Username:</label>
      <input type="text" value={username} onChange={handleUsernameChange} />
      <label>Password:</label>
      <input type="password" value={password} onChange={handlePasswordChange} />
      <button>Submit</button>
    </form>
  </div>
}

export default LoginPage;