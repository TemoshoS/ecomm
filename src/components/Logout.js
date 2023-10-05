import { signOut } from "firebase/auth"; // Import the signOut function from Firebase Authentication
import { auth } from "../firebase"; // Import your Firebase authentication instance

// Define the logout function
const logout = () => {
    // Use the signOut function from Firebase Authentication to sign the user out
    signOut(auth)
        .then(() => {
            // Handle successful sign-out (you can add actions here if needed)
            // For example, you might want to redirect the user to the login page.
        })
        .catch((error) => {
            // Handle errors that occur during sign-out
            console.error('Error signing out:', error);
        });
};

// Export the logout function for use in your application
export default logout;
