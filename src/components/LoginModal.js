// LoginModal.js
import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { RiCloseLine } from 'react-icons/ri';
import { BiSolidUserCircle } from 'react-icons/bi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Cookies from 'js-cookie';
import RegisterModal from './RegisterModal';

const LoginModal = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [userError, setUserError] = useState(null);
    const [passError, setPassError] = useState(null);
    const [error, setError] = useState(null);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const navigate = useNavigate();

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const login = () => {
        if (!email || !password) {
            setError('Please fill in all the required fields.');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUserError(null);
                navigate('/checkout');
                onClose(); // Close the modal upon successful login
            })
            .catch((error) => {
                if (error.code === 'auth/user-not-found') {
                    setUserError('User does not exist.');
                } else if (error.code === 'auth/wrong-password') {
                    setPassError('Wrong password.');
                } else {
                    setError(error.message);
                }
            });

        if (rememberMe) {
            Cookies.set('remembered_email', email, { expires: 30 });
        } else {
            Cookies.remove('remembered_email');
        }
    };

    const openRegisterModal = () => {
        setShowRegisterModal(true);
        // onClose();  Close the LoginModal when opening RegisterModal
    };

    return (
        <div className='modal'>
            <div className='modal-content'>
                <button onClick={onClose} className='btn-close'>
                    <RiCloseLine />
                </button>
                <p className='heading'>
                    <BiSolidUserCircle />
                </p>
                <div className='input-container'>
                    <label>Email</label>
                    <input
                        type='text'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                {userError && <div className='error-message'>{userError}</div>}
                <div className='input-container'>
                    <label>Password</label>
                    <div className='password-input-container'>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                        />
                        <i
                            className={`password-toggle-icon ${showPassword ? 'eye-slash' : 'eye'}`}
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </i>
                    </div>
                    {passError && <div className='error-message'>{passError}</div>}
                </div>
                <div>
                    <label>
                        <input
                            type='checkbox'
                            className='rememberme'
                            checked={rememberMe}
                            onChange={handleRememberMeChange}
                        />
                        <span className='remeber'>
                            Remember me
                        </span>
                    </label>
                </div>
                <button className='submit-button' onClick={login}>
                    Login
                </button>
                {error && <div className='error-message'>{error}</div>}
                <div className='account-yet'>
                    Don't have an account?{' '}
                    <button onClick={openRegisterModal} className='register-link'>
                        Sign up
                    </button>
                </div>
                {showRegisterModal && <RegisterModal onClose={() => setShowRegisterModal(false)} />}
            </div>
        </div>
    );
};

export default LoginModal;
