import  { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link,useNavigate} from "react-router-dom";
import axios from 'axios'

export const User = () => {
  const [users,setUsers] = useState([])
  const [filterusers,setFilterusers] = useState("")

  useEffect(()=>{
    axios.get('http://localhost:4000/')
    .then((result) => {
      setUsers(result.data)
    })
    .catch(err => console.log(err)
    )
  })
  const navigate = useNavigate()
  const handlelogout=()=>{
    axios.get('http://localhost:4000/logout')
    .then(res=>{
      if(res.data.status){
        navigate('/')
      }
    }).catch(err =>{
      console.log(err);
      
    })
  }

  const handleDelete =  (id) => {
    axios.delete("http://localhost:4000/deleteUser/"+id)
    .then(res => {
      console.log(res)
      window.location.reload()})
    .catch(err => console.log(err))
  }
  return (
    <div className='flex items-center justify-center min-h-screen bg-white'>
      <div className='w-full max-w-4xl bg-white rounded-lg p-3 mt-3 mb-3 shadow-lg'>
      <button className="bg-red-500 text-white py-2 px-4 rounded text-sm hover:bg-red-600 float-right" onClick={handlelogout}>logout</button>
      <Link to="/create" className="bg-green-500 text-white py-2 px-4 rounded text-sm mb-4 inline-block hover:bg-green-600">
          Add +
        </Link>
        <input className='flex items-center justify-center w-full  p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3' type="search" placeholder='Search Text Here' 
        onChange={(e)=>setFilterusers(e.target.value)}/>
        <div className="overflow-x-auto">
         <table className='min-w-full table-auto'>
          <thead>
            <tr className="bg-gray-200 text-gray-900 uppercase text-sm leading-normal">
              
              <th className="py-3 px-6 text-left">S.No</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Age</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-900 text-md font-semibold">
            {
              users.filter((item)=>{
                return filterusers === "" ? item : item.name.toLowerCase().includes(filterusers.toLowerCase()) ||
                item.email.toLowerCase().includes(filterusers.toLowerCase())    
              }).map((user,index)=>{
               return (<tr className="border-b border-gray-200 hover:bg-gray-100" key={user.id}>
                <td className="py-3 px-6 text-left">{index + 1}</td>
                  <td className="py-3 px-6 text-left">{user.name}</td>
                  <td className="py-3 px-6 text-left">{user.email}</td>
                  <td className="py-3 px-6 text-left">{user.age}</td>
                  <td className="py-3 px-6 text-left">
                  <Link to={`/update/${user._id}`} className="bg-green-500 text-white py-1 px-3 rounded text-sm mr-2 hover:bg-green-600">Update</Link>
                    <button className="bg-red-500 text-white py-1 px-3 rounded text-sm hover:bg-red-600"
                    onClick={(e) => handleDelete(user._id) }>Delete</button>
                  </td>
                </tr>
               )
              })
            }
          </tbody>
         </table>
      </div>
      </div>
      </div>
  )
}
export default User

