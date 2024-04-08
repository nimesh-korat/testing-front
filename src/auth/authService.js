import axios from 'axios';

const checkSession = async () => {
    axios.defaults.withCredentials = true;
    try {
        console.log('Checking session');
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/session`, {}, {
            withCredentials: true // Send cookies with the request
        });
        console.log(response);
        return true; // Session is valid
    } catch (error) {
        if (error.response) {
            console.log('Error response:', error.response.data);
        } else if (error.request) {
            console.log('No response received:', error.request);
        } else {
            console.log('Error:', error.message);
        }
        return false; // Session is not valid
    }
};

export default checkSession;
