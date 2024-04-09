import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



function Signup() {

    //initialize navigate
    const navigate = useNavigate();

    //storing registration data from input fields 
    const [registrationData, setRegistrationData] = useState({
        email: '',
        phone: '',
        password: '',
        role: '',
        profilePic: '',
    });

    //getting textdata from input fields
    const handleRegistrationChange = (e) => {
        const { name, value } = e.target;

        //storing textdata from input fields
        setRegistrationData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    };

    //getting profilePic
    const handleFileChange = (e) => {

        //storing profilePic
        setRegistrationData((formData) => ({
            ...formData,
            profilePic: e.target.files[0],
        }));
        console.log(registrationData.profilePic);


    };

    //adding user details to MongoDB
    const handleRegistrationSubmit = async (e) => {
        e.preventDefault();

        //sending API for storing user data to MongoDB 
        try {

            //appending data to formData
            const data = new FormData();

            //********************************************************* */
            // data.append('email', registrationData.email);
            // data.append('phone', registrationData.phone);
            // data.append('password', registrationData.password);
            // data.append('role', registrationData.role);
            // data.append('profilePic', registrationData.profilePic);
            //********************************************************* */

            //above code with for loop
            //appending registration data to formData
            for (const key in registrationData) {
                data.append(key, registrationData[key]);
            }

            console.log(data);
            //sending API for storing user data to MongoDB
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/signup`, data);
            //const { success, message } = response.data;
            console.log("res success: ", response.data);

            //if success then redirect to login
            if (response.data.success) {
                console.log('Registered Succesfully!!');
                navigate("/login");
            }

            //if not then show error
            else {
                console.log('User Already Exist!');
            }

        } catch (error) {
            console.log('Reg Error:', error);
            if (error.response && error.response.status === 400) {
                alert('Email Already Exist!');
            } else {
                alert('Error: Failed to connect to server');
            }
        }
    }


    return (
        <>
            <div className="container">
                <h2>User Registration</h2>
                <form encType="multipart/form-data" onSubmit={handleRegistrationSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email"
                            name="email"
                            className="form-control"
                            onChange={handleRegistrationChange}
                            value={registrationData.email}
                            placeholder="Enter your email.."
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number:</label>
                        <input type="tel"
                            name="phone"
                            className="form-control"
                            id="phone"
                            onChange={handleRegistrationChange}
                            value={registrationData.phone}
                            placeholder="Enter your Phone.."
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter your password.."
                            onChange={handleRegistrationChange}
                            value={registrationData.password}
                            id="password"
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role:</label>
                        <select name="role" className="form-control" required>
                            <option value={registrationData.role = "0"}>User</option>
                            <option value={registrationData.role = "1"}>Store Manager</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dp">Profile Picture (DP):</label>
                        <input type="file" name="profilePic" className="form-control-file" onChange={handleFileChange} accept="image/*" required />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>&nbsp;
                    <Link to="/login">Click here to login!</Link>
                </form>
            </div>
        </>
    )
}

export default Signup

