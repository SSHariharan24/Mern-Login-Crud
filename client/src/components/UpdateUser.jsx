import {useEffect,useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'

export const UpdateUser = () => {
  const {id} = useParams()
  const[name,setName] = useState()
  const[email,setEmail] = useState()
  const[age,setAge] = useState()
  const navigate = useNavigate()

  useEffect(()=>{
    axios.get('http://localhost:4000/getUser/'+id) 
    .then(result => {console.log(result)
      setName(result.data.name)
      setEmail(result.data.email)
      setAge(result.data.age)})
    .catch(err => console.log(err))
  },[])

  const Update = (e) =>{
    e.preventDefault()
    axios.put("http://localhost:4000/updateUser/"+id,{name,email,age})
    .then(result => {
      console.log(result)
      navigate('/user')
    })
    .catch(err => console.log(err))
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500">
    <div className="bg-white w-full max-w-lg rounded-lg shadow-md p-6 md:w-1/2">
      <form onSubmit={Update}>
        <h2 className='text-2xl font-bold mb-4'>Update User</h2>
        <div className="mb-4">
          <label htmlFor="" className='block text-sm font-medium text-gray-700'>Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="" className='block text-sm font-medium text-gray-700'>Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="" className='block text-sm font-medium text-gray-700' >Age</label>
          <input
            type="text"
            placeholder="Enter Age"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">Update</button>
      </form>
    </div>
  </div>
  )
}
export default UpdateUser