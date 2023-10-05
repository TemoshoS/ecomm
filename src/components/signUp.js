import React,{useState} from 'react'
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {auth} from '../firebase'
import {Link, useNavigate} from 'react-router-dom'
import { RxCross2} from 'react-icons/rx';
import { BiSolidUserCircle } from 'react-icons/bi';

export default function SignUp() {
  // State variables to store user input
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhoneNumber] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const naviagate = useNavigate();

    const register=()=>{

      // Create a user with email and password using Firebase Authentication
      createUserWithEmailAndPassword(auth, email, password).then((userCrendential)=>{
        
        // Update the user's display name and phone number
        updateProfile(userCrendential.user, {
          displayName: name,
          phoneNumber: phone,
        }).then(()=>{
          // Redirect the user to the login page after successful registration
          naviagate('/login');
        }).catch((error)=>{
          alert('Error setting display name: ' + error.message);
        })
        

      }).catch((error)=>{
        // Handle registration errors (e.g., weak password or email already in use)
        alert('Please enter atleast 7 digits')
      })
    }

    // Function to toggle password visibility
    const togglePasswordVisibility=()=>{
      setShowPassword(!showPassword);
    }

     // Function to handle navigation back to the cart page
    const handleHome=()=>{
      naviagate('/cart')
    }
  return (
    <div className='auth'>
      <button onClick={handleHome} className='btn-home'><RxCross2/></button>
    <div className='auth-card'>
    
      
      <div >

        <p className="heading"><BiSolidUserCircle/></p>
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
            <label>Phone Number</label>
            <input onChange={(e) => setPhoneNumber(e.target.value)} type='number' />
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
