import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';

function AuthDetails() {
    // State to store the authenticated user
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        // Use the `onAuthStateChanged` listener to track changes in the user's authentication status
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // If a user is authenticated, update the state with the user object
                setAuthUser(user);
            } else {
                // If there's no authenticated user, set the state to null
                setAuthUser(null);
            }
        });

        // Cleanup function to remove the listener when the component unmounts
        return () => {
            unsubscribe();
        };
    }, []);

    // Function to sign out the user
    const userSignOut = () => {
        signOut(auth)
            .then(() => {
                alert('Sign out successful');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            {authUser ? (
                // If there is an authenticated user, display their display name and a "Sign Out" button
                <>
                    <p>{`Signed In as ${authUser.displayName}`}</p>
                    <button onClick={userSignOut}>Sign Out</button>
                </>
            ) : (
                // If there's no authenticated user, display a message indicating that the user is not signed in
                <p>Not Signed In</p>
            )}
        </div>
    );
}

export default AuthDetails;
