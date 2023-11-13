// RegisterModal.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { RxCross2 } from 'react-icons/rx';
import { BiSolidUserCircle } from 'react-icons/bi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LoginModal from './LoginModal';

const RegisterModal = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);

  const register = async () => {
    try {
      if (!name || !email || !password || !phone) {
        alert('Please fill in all the required fields.');
        return;
      }

      if (password.length < 7) {
        alert('Password must be at least 7 characters long.');
        return;
      }

      if (password !== passwordConfirm) {
        alert('Password and password confirmation do not match.');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: name,
        phoneNumber: phone,
      });

      // Close the RegisterModal
      onClose();

      // Open the LoginModal
      setShowLoginModal(true);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Email is already in use. Please use a different email.');
      } else {
        alert('Registration failed: ' + error.message);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const strength = checkPasswordStrength(newPassword);
    setPasswordStrength(strength);
  };

  const checkPasswordStrength = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;

    if (passwordRegex.test(password)) {
      return '✅';
    } else {
      return 'Weak Password';
    }
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <button onClick={onClose} className='btn-close'>
          <RxCross2 />
        </button>
        <p className='heading'>
          <BiSolidUserCircle />
        </p>
        <div className='input-container'>
          <label>Name</label>
          <input type='text' onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='input-container'>
          <label>Email</label>
          <input onChange={(e) => setEmail(e.target.value)} type='text' />
        </div>
        <div className='input-container'>
          <label>Phone Number</label>
          <input onChange={(e) => setPhoneNumber(e.target.value)} type='number' />
        </div>
        <div className='input-container'>
          <label>Password</label>
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
          <div className='password-strength'>
            {passwordStrength === '✅' ? (
              <span style={{ color: 'green' }}>{passwordStrength}</span>
            ) : (
              <span className='weak-password'>{passwordStrength}</span>
            )}
          </div>
        </div>
        <div className='input-container'>
          <label>Confirm Password</label>
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
        <button className='submit-button' onClick={register}>
          SIGNUP
        </button>
        <p>
          Already have an account?{' '}
          <button className='login-link' onClick={() => setShowLoginModal(true)}>
            Login
          </button>
        </p>
        {showLoginModal && (
          <LoginModal onClose={() => setShowLoginModal(false)} />
        )}
      </div>
    </div>
  );
};

export default RegisterModal;
