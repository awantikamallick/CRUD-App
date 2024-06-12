import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams} from 'react-router-dom';

export default function Home() {
    //for storing user information
    const[users,setUsers]=useState([])
    const {id} = useParams()


    useEffect(()=>{
        loadUsers();
        console.log("Heyyyo")
    },[]); //empty array is put so that it runs only one time when the page loads otherwise it will run for infinite time

        //for loading the information everytime user loads the page
    const loadUsers = async()=>{ //async and await as js executes line by line
        const result=await axios.get("http://localhost:8080/getUsers")
        setUsers(result.data);
    }

    const deleteUser= async (id) =>{
        await axios.delete(`http://localhost:8080/user/${id}`)
        loadUsers()
    }

  return (
    <div className='container'>
        <div className='py-4'>
            {/* table code extracted from bootstrap */}
            <table className="table border shadow" >
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        users.map((user,index)=>(
                            <tr>
                                <th scope="row">{index+1}
                                </th>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button className='btn btn-primary mx-2'>View</button>
                                    <Link 
                                        className='btn btn-primary mx-2'
                                        to={`/edituser/${user.id}`}>
                                        Edit
                                    </Link>

                                    
                                    <button className='btn btn-danger mx-2' onClick={()=>deleteUser(user.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                         //creates new array from calling finction for every array element. when new user creted-> shown in the table
                    )}
                    
                </tbody>
            </table>

            </div>
    
    </div>
  )
}
