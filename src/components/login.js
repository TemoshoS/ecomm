import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';


const Signin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const naviagte = useNavigate();
    const [showPassword, setShowPassword] = useState(false)

    const login = () => {

        signInWithEmailAndPassword(auth, email, password)
        .then((userCrendential) => {
             console.log(userCrendential)
           
            naviagte('/');

        }).catch((error) => {
            console.log(error.message);

        })


    };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='auth-image'>
        <div className='auth-card'>

            
                <p className="heading">Sign In</p>

                <div className='input-container'>
                    <label>email</label>
                    <input type='text' onChange={(event) => setEmail(event.target.value)} />
                </div>

                <div className='input-container'>
                    <label>Password</label>
                    <div className='password-input-container'>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                        />
                        <i
                            className={`password-toggle-icon ${showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}`}
                            onClick={togglePasswordVisibility}
                        ></i>

                    </div>
                </div>


                <div >
                    <label>
                        <input type="checkbox" className='rememberme' />
                        Remeber me &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link to='/forgotpassword' style={{ color: 'red', textDecoration: 'none' }}>forgot password</Link>

                    </label>
                </div>

                <button className='submit-button' onClick={login}>Login</button>

                <p>Don't have an account ? <Link to='/register' style={{ color: 'red', textDecoration: 'none' }}>Sign up</Link></p>

            </div>

    

        </div>
    )
}


export default Signin;