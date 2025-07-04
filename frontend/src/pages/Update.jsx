import React, { useState } from 'react'
import axios from 'axios';
import {useLocation, useNavigate} from "react-router-dom"


const BACKEND_API_URL = "http://192.168.0.102:4000"; // defined in docker-compose.yml

const Update=()=> {

  const [book,setBook]=useState({
    title:"",
    desc:"",
  });

  const navigate=useNavigate()
  const location=useLocation()

  const bookId = location.pathname.split("/")[2]

  const handleChange=(e)=>{
    setBook((prev)=>({ ...prev, [e.target.name]:e.target.value}));
  };

  console.log(book)
  
  const handleClick =async e=>{

    e.preventDefault()

    try
    {
      await axios.put(BACKEND_API_URL + "/book/" + bookId, book);
      navigate("/");
    }
    catch(err)
    {
      console.log(err);
      alert(err);
    }
  }


  return (

    <div className='form'>

      <h1>Update the Book</h1>

      <input
      type='text'
      placeholder='Title'
      onChange={handleChange}
      name='title'
      />

      <input
      type='text'
      placeholder='Description'
      onChange={handleChange}
      name='desc'
      />
      
      <button className='formButton' onClick={handleClick}>Add</button>
    </div>
  )
}

export default Update
