import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
export const CreateUser = () => {
  
  const[name,setName] = useState()
  const[email,setEmail] = useState()
  const[age,setAge] = useState()
  const navigate = useNavigate()
  const submit = (e) =>{
    e.preventDefault()
    axios.post("http://localhost:4000/createUser",{name,email,age})
    .then(result => {
      console.log(result)
      navigate('/user')
    })
    .catch(err => console.log(err))
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500">
    <div className="bg-white w-full max-w-lg rounded-lg shadow-md p-6 md:w-1/2">
      <form onSubmit={submit}>
        <h2 className='text-2xl font-bold mb-4'>Add User</h2>
        <div className="mb-4">
          <label htmlFor="name" className='block text-sm font-medium text-gray-700'>Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="age"className='block text-sm font-medium text-gray-700' >Age</label>
          <input
            type="text"
            placeholder="Enter Age"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">Submit</button>
      </form>
    </div>
  </div>
  )
}
export default CreateUser
