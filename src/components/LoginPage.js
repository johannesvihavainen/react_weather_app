import { Link } from "react-router-dom"

export default function LoginPage() {
    return (
        <div>
            <form className="LoginForm">
                <div className="login-credentials">
                    <h1>Login</h1>
                    <input type="text" placeholder="Email" />
                    <input type="text" placeholder="Password" />
                    <button>Login</button>
                </div>
                <p>Don't have an account? <Link to='/signup'>Sign Up!</Link></p>
            </form>
        </div>
    )
}