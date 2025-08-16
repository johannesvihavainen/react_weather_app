import { Link } from "react-router-dom"
import { doSignInWithEmailAndPassword } from "../firebase/auth"
import { useAuth } from "../contexts/authContext"
import { useState } from "react"
import { Navigate } from "react-router-dom"

export default function LoginPage() {
    const {userLoggedIn} = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        setErrorMessage("")
        if(!isSigningIn) {
            setIsSigningIn(true)
            try {
                await doSignInWithEmailAndPassword(email, password)
            } catch (err) {
                console.error(err)
                setErrorMessage("Invalid email or password.")
                setTimeout(() => setErrorMessage(""), 3000)
            }
            setIsSigningIn(false)
        }
    }


    return (
        <div className="LoginContainer">
            {userLoggedIn && <Navigate to={'/home'} replace={true} />}
            <form className="LoginForm" onSubmit={handleSubmit}>
                <div className="login-credentials">
                    <h1>Login</h1>
                    {errorMessage && <p style={{color: "#FFF", backgroundColor: "red", padding: "10px"}}>{errorMessage}</p>}
                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Login</button>
                </div>
                <p>Don't have an account? <Link to='/signup'>Sign Up!</Link></p>
            </form>
        </div>
    )
}