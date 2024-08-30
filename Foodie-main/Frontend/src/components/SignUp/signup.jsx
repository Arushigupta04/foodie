import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./signup.css";
import SignUpImage from "../../assets/register.jpg";

// const serverURL = "http://192.168.54.63:5000"
const serverURL = "http://localhost:5000";

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [roles, setRoles] = useState([]); // Array to hold selected roles

  const handleRoleChange = (role) => {
    setRoles((prevRoles) =>
      prevRoles.includes(role)
        ? prevRoles.filter((r) => r !== role)
        : [...prevRoles, role]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for missing fields
    if (!fullName || !email || !password || !repeatedPassword || !mobile) {
      toast.error('Please fill in all fields');
      return;
    }

    // Check for password match
    if (password !== repeatedPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Ensure at least one role is selected
    if (roles.length === 0) {
      toast.error('Please select at least one role');
      return;
    }

    try {
      const response = await fetch(`${serverURL}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, password, mobile, roles }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Registration successful! Redirecting to sign-in...');
        setFullName('');
        setEmail('');
        setPassword('');
        setRepeatedPassword('');
        setMobile('');
        setRoles([]);
        setTimeout(() => window.location.href = '/sign-in', 2000);
      } else {
        toast.error(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred, please try again later');
    }
  };

  const handleSignInClick = () => {
    window.location.href = '/sign-in';
  };

  return (
    <div className="signup-content">
      <div className="signup-form">
        <h2 className="form-title">Sign up</h2>
        <form onSubmit={handleSubmit} className="register-form" id="register-form">
          <div className="form-group">
            <input
              type="text"
              name="fullName"
              id="name"
              placeholder="Your Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="mobile"
              id="mobile"
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
  <label className="flex items-center space-x-2 mt-2">
    <input
      type="checkbox"
      name="role"
      value="Admin"
      checked={roles.includes('Admin')}
      onChange={() => handleRoleChange('Admin')}
      className="form-checkbox h-16 w-5 text-blue-600"
    />
    <span className="text-black">Admin</span>
  </label>
</div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              id="pass"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="re_pass"
              id="re_pass"
              placeholder="Repeat your password"
              value={repeatedPassword}
              onChange={(e) => setRepeatedPassword(e.target.value)}
              required
            />
          </div>

          {/* Role Selection */}
          {/* <div className="form-group mb-4">
  <label className="flex items-center space-x-2 mt-2">
    <input
      type="checkbox"
      name="role"
      value="Admin"
      checked={roles.includes('Admin')}
      onChange={() => handleRoleChange('Admin')}
      className="form-checkbox h-16 w-5 text-blue-600"
    />
    <span className="text-black">Admin</span>
  </label>
</div> */}


          <div className="form-group form-button">
            <input type="submit" name="signup" id="signup" className="form-submit" value="Register" />
          </div>
        </form>
      </div>
      <div className="signup-image">
        <figure><img src={SignUpImage} alt="sign up" /></figure>
        <div className='already-signup'>
          <div>Already a Member ? </div>
          <button onClick={handleSignInClick} className="signup-image-link  mt-">SignIn</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
