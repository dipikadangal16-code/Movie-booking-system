import { useForm } from "react-hook-form"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../config/Firebase.js"
import { useNavigate } from "react-router-dom"

export default function Register() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        updateProfile(auth.currentUser, { displayName: data.name })
        alert("Registered successfully!")
        navigate("/login")
      })
      .catch(err => alert(err.message))
  }

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: "50px auto" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input placeholder="Name" {...register("name", { required: "Name is required" })} />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

        <input placeholder="Email" {...register("email", {
          required: "Email is required",
          pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" }
        })} />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

        <input type="password" placeholder="Password" {...register("password", {
          required: "Password is required",
          minLength: { value: 6, message: "At least 6 characters" }
        })} />
        {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}

        <button type="submit" style={{ padding: "10px", background: "red", color: "white", border: "none" }}>Register</button>
      </form>
    </div>
  )
}
