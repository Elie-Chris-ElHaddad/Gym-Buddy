import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    // Prepare the payload for the backend
    const payload = { email, password };

    try {
      // Make the POST request to the backend
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Check if login was successful
      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      const data = await response.json();

      // Assuming your backend sends a token or user data on successful login
      if (data.token) {
        onLogin(data.user); // Pass token or user data to parent component
        navigate('/home');
      } else {
        setError('Invalid login credentials');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <style>
        {`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f4f4f4;
        }

        .login-form {
          background: #ffffff;
          padding: 20px 30px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        .login-form h2 {
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 15px;
          text-align: left;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          font-size: 14px;
        }

        .form-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }

        .submit-btn {
          background-color: #007bff;
          color: #ffffff;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          width: 100%;
          font-size: 16px;
        }

        .submit-btn:hover {
          background-color: #0056b3;
        }

        .error-message {
          color: red;
          margin-top: 10px;
        }
        `}
      </style>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Login
        </button>

        {error && <div className="error-message">{error}</div>}

        <div className="signup-link">
          <p>Don't have an account? <Link to="/signup">Click here to sign up</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;