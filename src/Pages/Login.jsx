import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "../config/Firebase.js";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/Firebase.js"; // make sure your Firestore is imported

export default function Login({ loginUpdate }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleRole = async (uid) => {
    // Fetch user role from Firestore
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      Cookies.set("role", data.role || "user"); // Save role in cookie
    } else {
      Cookies.set("role", "user"); // default role
    }
  };

  const onSubmit = async (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        const uid = userCredential.user.uid;
        Cookies.set("uid", uid);
        Cookies.set("name", userCredential.user.displayName || "");
        Cookies.set("token", userCredential.user.accessToken);

        await handleRole(uid); // set role in cookie

        if (loginUpdate) loginUpdate();
        navigate("/profile");
      })
      .catch(() => alert("Invalid email or password"));
  };

  const loginWithGoogle = async () => {
    signInWithPopup(auth, googleProvider)
      .then(async (userCredential) => {
        const uid = userCredential.user.uid;
        Cookies.set("uid", uid);
        Cookies.set("name", userCredential.user.displayName || "");
        Cookies.set("token", userCredential.user.accessToken);

        await handleRole(uid);

        if (loginUpdate) loginUpdate();
        navigate("/profile");
      });
  };

  const loginWithFacebook = async () => {
    signInWithPopup(auth, facebookProvider)
      .then(async (userCredential) => {
        const uid = userCredential.user.uid;
        Cookies.set("uid", uid);
        Cookies.set("name", userCredential.user.displayName || "");
        Cookies.set("token", userCredential.user.accessToken);

        await handleRole(uid);

        if (loginUpdate) loginUpdate();
        navigate("/profile");
      });
  };

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: "50px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input placeholder="Email" {...register("email", { required: "Email is required" })} />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

        <input type="password" placeholder="Password" {...register("password", { required: "Password is required" })} />
        {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}

        <button type="submit" style={{ padding: "10px", background: "red", color: "white", border: "none" }}>Login</button>
      </form>

      <p style={{ marginTop: 15 }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>

      <hr />
      <button onClick={loginWithGoogle} style={{ marginTop: 10, width: "100%", padding: 10 }}>Login with Google</button>
      <button onClick={loginWithFacebook} style={{ marginTop: 10, width: "100%", padding: 10 }}>Login with Facebook</button>
    </div>
  );
}
