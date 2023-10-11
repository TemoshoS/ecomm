import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { RiCloseLine } from 'react-icons/ri';
import { BiSolidUserCircle } from 'react-icons/bi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Cookies from 'js-cookie';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false); // State to remember the "Remember Me" checkbox
    const [usererror, setUserError] = useState(null);
    const [passerror, setPassError] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Check if there is a saved email cookie and set it as the default value
    useEffect(() => {
        const savedEmail = Cookies.get('remembered_email');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    // Function to handle the "Remember Me" checkbox
    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    // Function to handle the login process
    const login = () => {

        if (!email || !password) {
            alert('Please fill in all the required fields.');
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUserError(null);
                navigate('/checkout'); // Redirect to the checkout page upon successful login
            })
            .catch((error) => {
                if (error.code === 'auth/user-not-found') {
                    setUserError('User does not exists.');
                } else if (error.code === 'auth/wrong-password') {
                    setPassError('Wrong password.');
                } else {
                    setError(error.message); 
                }
            
            });

        // If "Remember Me" is checked, save the email as a cookie
        if (rememberMe) {
            Cookies.set('remembered_email', email, { expires: 30 }); // Cookie expires in 30 days
        } else {
            Cookies.remove('remembered_email'); // Remove the cookie if "Remember Me" is unchecked
        }
    };

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Function to handle navigation back to the cart page
    const handleHome = () => {
        navigate('/cart');
    };

    return (
        <div className='auth'>
            <button onClick={handleHome} className='btn-home'>
                <RiCloseLine />
            </button>
            <div className='auth-card'>
                <p className="heading">
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

                {usererror && <div className="error-message">{usererror}</div>}

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
                    {passerror && <div className="error-message">{passerror}</div>}
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            className='rememberme'
                            checked={rememberMe}
                            onChange={handleRememberMeChange}
                        />
                     <span className='remeber'>  Remember me
                        <Link to='/forgotpassword' style={{ color: 'red', textDecoration: 'none' , marginLeft:'50px'}}>
                            Forgot password
                        </Link></span> 
                    </label>
                </div>

                

                <button className='submit-button' onClick={login}>
                    Login
                </button>

                {error && <div className="error-message">{error}</div>}
                <p className='account-yet'>
                    Don't have an account?{' '}
                    <Link to='/register' style={{ color: 'red', textDecoration: 'none' }}>
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signin;
