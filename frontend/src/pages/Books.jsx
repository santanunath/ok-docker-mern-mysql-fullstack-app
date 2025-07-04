import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";


const BACKEND_API_URL = "http://192.168.0.102:4000"; // defined in docker-compose.yml



const Books=()=> {

  // ------------
  // all retrieved records are stored in
  // 'books' variable 
  // ------------
  const [books, setBooks]= useState([]);

  
  // ---------
  // function defined inside
  // useEffect()
  // executes once before the page loads
  // ---------
  useEffect(() => {
    
    fetchAllBooks();
    
  },[]); // Empty dependency array means it runs once before page load


    
    // ****************
    // GET all books
    // ****************
    const fetchAllBooks= async ()=> {
      
        try
        {
           const res = await axios.get(BACKEND_API_URL + "/book");
           setBooks(res.data); // all records are stored in 'books' variable
        }
        catch(err)
        {
          console.log(err);
          alert(err);
        }
    }

  
  
  // ****************
  // DELETE a book
  // ****************
  const handleDelete= async (id)=>{
    
    try
    {
      await axios.delete(BACKEND_API_URL + "/book/" + id);
      window.location.reload()
    }
    catch(err)
    {
      console.log(err);
      alert(err);
    }
    
  }


  
  return (
    <div>
      <h1>My Books</h1>
      <div className='books'>

        {books.map(book => (

          <div className="book" key={book.id}>
           
            <h2>{book.title}</h2>

            <p>{book.desc}</p>    

             <button className='delete' onClick={()=>handleDelete(book.id)}>
               Delete
             </button>

             <button className='update'>
             <Link to={`/update/${book.id}`}>
              Update
             </Link>
             </button>

          </div>
        ))}

       <button>
        <Link to="/add" >
         Add new book
        </Link>
      </button>

      </div>
      
    </div>
  );
}

export default Books
