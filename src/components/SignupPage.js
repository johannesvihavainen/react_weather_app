import { Link } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../contexts/authContext"
import { doCreateUserWithEmailAndPassword } from "../firebase/auth"
import { Navigate } from "react-router-dom"

export default function SignupPage() {
    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        setErrorMessage("")
        if (!isRegistering) {
            setIsRegistering(true)
            try {
                await doCreateUserWithEmailAndPassword(email, password)
            } catch (err) {
                console.error(err)
                setErrorMessage("Please make sure to fill out both fields or use another account if it's already been created.")
                setTimeout(() => setErrorMessage(""), 3000)
            }
            setIsRegistering(false)
        }
    }

    return (
        <div className="SignupContainer">
            {userLoggedIn && <Navigate to={'/home'} replace={true} />}
            <form className="SignupForm" onSubmit={handleSubmit}>
                <div className="signup-credentials">
                    <h1>Sign Up</h1>
                    {errorMessage && <p style={{color: "#FFF", backgroundColor: "red", padding: "10px"}}>{errorMessage}</p>}
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button>Sign Up</button>
                </div>
                <p>Already have an account? <Link to='/'>Log In!</Link></p>
            </form>
        </div>
    )
}