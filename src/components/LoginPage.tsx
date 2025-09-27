// src/pages/LoginPage.tsx
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";
import img from "../assets/logo.webp";

interface Props {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUser: (user: any) => void;
}

const LoginPage = ({ setIsLoggedIn, setUser }: Props) => {
  const provider = new GoogleAuthProvider();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User:", result.user); // user info here
      // later: redirect to dashboard after successful login
      setIsLoggedIn(true);
      setUser(result.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="signInPage">
      <h1>Welcome to StudyFinder! </h1>

      <button className="gsi-material-button" onClick={handleLogin}>
        <div className="google-button">
          <img className="logo" src={img}></img>
          <div>Sign in with Google</div>
        </div>
      </button>
    </div>
  );
};

export default LoginPage;
