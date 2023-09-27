import React, { useState } from 'react'
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [message, setMessage]  = useState('');

    const ResetPasword = () => {
        sendPasswordResetEmail(auth, email).then(() => {
            setMessage('Password reset email sent. Check your email.');
        }).catch((error) => {

            if (error.code === 'auth/user-not-found') {
                setMessage('User with this email does not exist.');
            } else {
                setMessage('An error occurred. Please try again later.');
            }

        })

    };

    return (
        <div className='auth'>
        <div className='auth-card'>

            <h3 style={{color:'#ccc'}}>Reset your password</h3>

            <div className='input-container'>
                <input type='text' placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />
                {message && <p style={{ color: 'red' }}>{message}</p>} {/* Display the message */}
            </div>

            <button className='submit-button' onClick={ResetPasword}>Reset passoword</button>

        </div>
</div>
    
    )
}

export default ForgotPassword