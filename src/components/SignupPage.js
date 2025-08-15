import { Link } from "react-router-dom"
export default function SignupPage() {
    return (
        <div>
            <form className="SignupForm">
                <div className="signup-credentials">
                    <h1>Sign Up</h1>
                    <input type="email" placeholder="Email" />
                    <input type="text" placeholder="Password" />
                    <button>Sign Up</button>
                </div>
                <p>Already have an account? <Link to='/'>Log In!</Link></p>
            </form>
        </div>
    )
}