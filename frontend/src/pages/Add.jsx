import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from "react-router-dom"


const BACKEND_API_URL = "http://192.168.0.102:4000"; // defined in docker-compose.yml



const Add=()=> {
  
  const [book, setBook] = useState({
    title:"",
    desc:"",
  });

  const navigate = useNavigate()

  const handleChange=(e) => {
    setBook((prev) => ({ ...prev, [e.target.name]:e.target.value}));
  };

  console.log(book)

  // *************
  // ADD a book
  // *************
  const handleClick =async e=>{
    
    e.preventDefault(); // prevent form submission 
    
    try
    {
      await axios.post(BACKEND_API_URL + "/book", book);
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

      <input
      type='text'
      placeholder='Title'
      onChange={handleChange}
      name='title'
      />

      <input
      type='text'
      placeholder='Discription'
      onChange={handleChange}
      name='desc'
      />
      
      <button onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add
