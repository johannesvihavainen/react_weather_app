import { useAuth } from "../contexts/authContext"
import { doSignOut } from "../firebase/auth"
import { Navigate, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"


export default function Weather() {
    const { currentUser } = useAuth()
    const { userLoggedIn } = useAuth()
    const navigate = useNavigate()

    const [location, setLocation] = useState("Helsinki")
    const [weather, setWeather] = useState(null)

    async function getData(e) {
        if (e) e.preventDefault()


        const API_key = process.env.REACT_APP_WEATHER_API_KEY
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_key}`

        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }

            const result = await response.json()
            console.log(result)
            setWeather(result)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getData()
        setLocation("")
    }, [])

    if (!currentUser) {
        return <Navigate to='/login' replace />
    }
    return (
        <div>
            <header>
                <nav className="nav-bar">
                    <h1>Hello {currentUser.displayName || currentUser.email}, you are now logged in.</h1>
                    {userLoggedIn
                        ?
                        <>
                            <button onClick={() => doSignOut().then(() => navigate('/login'))}>
                                Log out
                            </button>
                        </>
                        :
                        <>
                            <Link to={'/login'}>Log In</Link>
                            <Link to={'/signup'}>Register a new account</Link>
                        </>

                    }
                </nav>
            </header>

            <main>
                <div className="weather-form-container">
                    <form className="weather-data-form" onSubmit={getData}>
                        <h1>Weather App</h1>
                        <input type="text" placeholder="Helsinki" value={location} onChange={(e) => setLocation(e.target.value)} />
                        <button type="submit">Search</button>
                        <div className="weather-data"></div>
                    </form>
                </div>

                <div className="weather-container">
                    {weather && (
                        <div className="weather-data">
                            <img className="weather-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
                            <div className="main-temps-and-title">
                                <div className="location-wrapper">
                                <h2 className="location-title">{weather.name}</h2>
                                </div>
                                <div className="main-temps">
                                    <p className="temp">{weather.main.temp}℃</p>
                                    <p>Feels like: {weather.main.feels_like}℃</p>
                                </div>
                            </div>
                            <div className="min-and-max">
                                <p>Min: {weather.main.temp_min}℃</p>
                                <p>Max {weather.main.temp_max}℃</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>

        </div>
    )
}