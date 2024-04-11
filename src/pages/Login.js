import axios from 'axios';
import { React, useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {

    axios.defaults.withCredentials = true;


    //hook for Storing email & password
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    })


    //getting textdata from input fields
    const handleLoginChange = (e) => {
        const { name, value } = e.target;

        //storing textdata from input fields
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }


    //callback function to FIRE login API
    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        //calling Login API
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, loginData);

            //initializing response data from API response
            const { userData, success, message } = response.data;

            //if success then navigate to home page
            if (success) {
                // navigate('/');
                window.location.reload(false);//for solving refresh issue
            } else {
                console.log(message);
                alert(message);
            }
        } catch (error) {
            console.log("Login Err: ", error);
            if (error.response && error.response.status === 401) {
                alert('Invalid username or password');
            } else {
                alert('Error: Failed to connect to server');
            }
        }

        //set login data in Login hook
        setLoginData({
            email: '',
            password: '',
        })
    }

    return (
        <>
            <div className="container">
                <h2>User Login</h2>
                <form onSubmit={handleLoginSubmit} className="form">
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            onChange={handleLoginChange}
                            value={loginData.email}
                            placeholder="Enter you emaill.."
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password"
                            name="password"
                            className="form-control"
                            onChange={handleLoginChange}
                            value={loginData.password}
                            placeholder="Enter you password.."
                            id="password"
                            required />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>&nbsp;<Link to="/signup">Create a new account?</Link>
                </form>
            </div>

        </>
    )
}

export default Login


