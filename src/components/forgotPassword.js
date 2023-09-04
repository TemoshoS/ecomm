import React, { useState } from 'react'
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');

    const ResetPasword=()=>{
   sendPasswordResetEmail(auth, email).then(()=>{
    alert('Check your email')
   }).catch((error)=>{

   })

    };

    return (
        <div className='App'>

            <h1>Reset password</h1>

            <input type='text' placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} /><br />
            <button className='submit-button' onClick={ResetPasword}>Reset passoword</button>

        </div>
    )
}

export default ForgotPassword