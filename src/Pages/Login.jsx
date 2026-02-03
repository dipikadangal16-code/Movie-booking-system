import { useForm } from "react-hook-form"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, googleProvider, facebookProvider } from "../config/Firebase.js"
import Cookies from "js-cookie"
import { useNavigate, Link } from "react-router-dom"

export default function Login({ loginUpdate }) {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(userCredential => {
        Cookies.set("uid", userCredential.user.uid)
        Cookies.set("name", userCredential.user.displayName || "")
        Cookies.set("token", userCredential.user.accessToken)
        if (loginUpdate) loginUpdate()
        navigate("/profile") // go to profile after login
      })
      .catch(() => alert("Invalid email or password"))
  }

  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(userCredential => {
        Cookies.set("uid", userCredential.user.uid)
        Cookies.set("name", userCredential.user.displayName || "")
        Cookies.set("token", userCredential.user.accessToken)
        if (loginUpdate) loginUpdate()
        navigate("/profile")
      })
  }

  const loginWithFacebook = () => {
    signInWithPopup(auth, facebookProvider)
      .then(userCredential => {
        Cookies.set("uid", userCredential.user.uid)
        Cookies.set("name", userCredential.user.displayName || "")
        Cookies.set("token", userCredential.user.accessToken)
        if (loginUpdate) loginUpdate()
        navigate("/profile")
      })
  }

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
  )
}
