import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ManageProduct from './pages/ManageProduct';
import ShowProducts from './pages/ShowProducts';
import SingleProduct from './pages/SingleProduct';
import AddProduct from './pages/AddProduct';
import { useEffect, useState } from 'react';
import checkSession from './auth/authService'; // Import the checkSession function
import axios from 'axios';
import EditProduct from './pages/EditProduct';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state

  axios.defaults.withCredentials = true;

  //for checking session 
  useEffect(() => {
    const authenticateUser = async () => {

      // Call checkSession to determine if user is authenticated
      // const isAuthenticated = await checkSession();
      // setIsAuthenticated(isAuthenticated);
      // setLoading(false); // Set loading to false after checking session
      try {
        const isAuthenticated = await checkSession();
        setIsAuthenticated(isAuthenticated);

      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // Set loading to false after authentication check
      }
    };
    if (!isAuthenticated) {
      authenticateUser(); // Check session only if user is not authenticated
    } else {
      setLoading(false); // Set loading to false immediately if user is authenticated
    }

  }, []);
  
  // Render routes only after loading is false and isAuthenticated is determined
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
 
    <BrowserRouter>
      <Routes>
        <Route path="/manageProduct" element={isAuthenticated ? <ManageProduct /> : <Navigate to="/login" />} />
        <Route path="/" element={isAuthenticated ? <ShowProducts /> : <Navigate to="/login" />} />
        <Route path="/showProducts" element={isAuthenticated ? <ShowProducts /> : <Navigate to="/login" />} />
        <Route path="/product/:id" element={isAuthenticated ? <SingleProduct /> : <Navigate to="/login" />} />
        <Route path="/addProduct" element={isAuthenticated ? <AddProduct /> : <Navigate to="/login" />} />
        <Route path="/editProduct/:id" element={isAuthenticated ? <EditProduct /> : <Navigate to="/login" />} />
        <Route path='/signup' element={!isAuthenticated ? <Signup /> : <Navigate to="/showProducts" />} />
        <Route index path='/login' element={!isAuthenticated ? <Login /> : <Navigate to="/showProducts" />} />
        <Route path="*" element={<h1>404 Not Found!</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
