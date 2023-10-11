import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx';
import { BiSolidUserCircle } from 'react-icons/bi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function SignUp() {
  // State variables to store user input
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const naviagate = useNavigate();

  const register = () => {

    // Check if any of the input fields are empty
    if (!name || !email || !password || !phone) {
      alert('Please fill in all the required fields.')
      return;
    }

    // Check if the password is at least 7 characters long
    if (password.length < 7) {
      alert('Password must be at least 7 characters long.');
      return;
    }

    // Check if password and password confirmation match
    if (password !== passwordConfirm) {
      alert('Password and password confirmation do not match.');
      return;
    }

    // Create a user with email and password using Firebase Authentication
    createUserWithEmailAndPassword(auth, email, password).then((userCrendential) => {

      // Update the user's display name and phone number
      updateProfile(userCrendential.user, {
        displayName: name,
        phoneNumber: phone,
      }).then(() => {
        // Redirect the user to the login page after successful registration
        alert('Succesfully registered')
        naviagate('/login');
      }).catch((error) => {
        alert('Error setting display name: ' + error.message);
      })


    }).catch((error) => {
      // Handle registration errors (email already in use)

      if (error.code === 'auth/email-already-in-use') {
        alert('Email is already in use. Please use a different email.');
      } else {
        // Handle other registration errors
        alert('Registration failed: ' + error.message);
      }
    })
  }

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Check the password strength
    const strength = checkPasswordStrength(newPassword);
    setPasswordStrength(strength);
  };

  const checkPasswordStrength = (password) => {

    // Define a regular expression to check for:
    // - At least 8 characters
    // - At least one uppercase letter (A-Z)
    // - At least one number (0-9)
    // - At least one special character (non-alphanumeric)
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;

    if (passwordRegex.test(password)) {
      return '✅';
    } else {
      return 'Weak Password';
    }

  };



  // Function to handle navigation back to the cart page
  const handleHome = () => {
    naviagate('/cart')
  }
  return (
    <div className='auth'>
      <button onClick={handleHome} className='btn-home'><RxCross2 /></button>
      <div className='auth-card'>


        <div >

          <p className="heading"><BiSolidUserCircle /></p>
          <p className='access-heading'>Register to access your account</p>


          <div class="input-container">
            <label >Name <span style={{color:'red'}}>*</span></label>
            <input type="text" onChange={(e) => setName(e.target.value)} />
          </div>


          <div className="input-container">
            <label >Email <span style={{color:'red'}}>*</span></label>
            <input onChange={(e) => setEmail(e.target.value)} type='text' />
          </div>

          <div className='input-container'>
            <label>Phone Number <span style={{color:'red'}}>*</span></label>
            <input onChange={(e) => setPhoneNumber(e.target.value)} type='number' />
          </div>


          <div className='input-container'>
            <label>Password <span style={{color:'red'}}>*</span></label>
            <div className='password-input-container'>
              <input
                onChange={handlePasswordChange}
                type={showPassword ? 'text' : 'password'}
              />
              <i
                className={`password-toggle-icon ${showPassword ? 'eye-slash' : 'eye'}`}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </i>

            </div>
            <div className="password-strength">

              {passwordStrength === '✅' ? (
                <span style={{ color: 'green' }}>{passwordStrength}</span>
              ) : (
                <span className="weak-password">{passwordStrength}</span>
              )}
            </div>
          </div>

          <div className='input-container'>
            <label>Confirm Password <span style={{color:'red'}}>*</span></label>
            <div className='password-input-container'>
              <input
                onChange={(e) => setPasswordConfirm(e.target.value)}
                type={showPassword ? 'text' : 'password'}
              />
              <i
                className={`password-toggle-icon ${showPassword ? 'eye-slash' : 'eye'}`}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </i>

            </div>
          </div>


          <button className='submit-button' onClick={register}>SIGNUP</button>
          <p >Have an account?<Link to='/login' className='login-link' >Login</Link></p>

        </div>



      </div>
    </div>
  )
}
