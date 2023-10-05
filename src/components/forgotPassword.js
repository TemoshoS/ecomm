import React, { useState } from 'react';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {
    // State to store the user's email and a message to display to the user
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    // Function to send a password reset email
    const resetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // If the email was sent successfully, set a success message
                setMessage('Password reset email sent. Check your email.');
            })
            .catch((error) => {
                // Handle different error cases
                if (error.code === 'auth/user-not-found') {
                    setMessage('User with this email does not exist.');
                } else {
                    setMessage('An error occurred. Please try again later.');
                }
            });
    };

    return (
        <div className='auth'>
            <div className='auth-card'>
                <h3 style={{ color: '#ccc' }}>Reset your password</h3>
                <div className='input-container'>
                    {/* Input field for email */}
                    <input type='text' placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />
                    {message && <p style={{ color: 'red' }}>{message}</p>} {/* Display the message */}
                </div>
                {/* Button to trigger password reset */}
                <button className='submit-button' onClick={resetPassword}>
                    Reset password
                </button>
            </div>
        </div>
    );
};

export default ForgotPassword;
