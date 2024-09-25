import React from 'react'
import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'
// import './App.css'
import { useNavigate } from 'react-router-dom';

export const Signin = () => {
    
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    // axios.defaults.withCredentials = true;
   
      const handleSubmit = (e) => {
      e.preventDefault()
      axios.post('http://localhost:4000/login', { email, password})
      .then(result => {console.log(result)
        if(result.data === 'success'){
            navigate('/user')
        }
      })
      .catch(err => console.log(err))
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Sign In
        </button>
      </form>
      <div className="text-center mt-4">
        <a href="/register" className="text-indigo-600 hover:underline">
          Don’t have an account? Sign Up
        </a>
      </div>
    </div>
  </div>
  )
}
export default Signin