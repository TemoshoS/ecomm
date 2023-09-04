import React,{useState} from 'react'
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../firebase'
import {Link, useNavigate} from 'react-router-dom'
import authimage from '../images/login.jpg'

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const naviagate = useNavigate();

    const register=()=>{
      createUserWithEmailAndPassword(auth, email, password).then(()=>{
        naviagate('/');
      }).catch((error)=>{
        alert('Please enter atleast 7 digits')
      })
    }

    const togglePasswordVisibility=()=>{
      setShowPassword(!showPassword);
    }
  return (
    <div className='auth-image'>
    <div className='auth-card'>
      
      <div className='auth'>

        <p className="heading">Sign up</p>
        <p>Register to access your account</p>


        <div class="input-container">
          <label >Name</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>


        <div className="input-container">
          <label >Email</label>
          <input onChange={(e) => setEmail(e.target.value)} type='text' />
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


        <button className='submit-button' onClick={register}>SIGNUP</button>
        <p >Have an account?<Link to='/login' className='login-link' >Login</Link></p>

      </div>
      


    </div>
    </div>
  )
}
