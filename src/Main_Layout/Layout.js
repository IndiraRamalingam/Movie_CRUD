import React from 'react'
import Header from './Header'
import Footer from './Footer'
import ReadMovies from '../Components/ReadMovies'
import CreateMovie from '../Components/CreateMovie'
import EditMovie from '../Components/EditMovie'
import DeleteMovie from '../Components/DeleteMovie'
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom'
import { useState,useRef } from 'react'

function Layout({movieList}) {

 //Setting a state 
const[movies,setMovies] = useState(movieList)
const[newMovieName,setNewMovieName] = useState('')
const[newMovieImage,setNewMovieImage] = useState('')
const[newMovieLanguage,setNewMovieLanguage] = useState('')
const[newMovieDuration,setNewMovieDuration] = useState('')

const initialformstate = { id: null, movieName: '', img:'',language: '', duration:'',};

const [currentuserdata,setcurrentuserdata]=useState([initialformstate])

const[editing,setEditing]=useState(false)

const newNameContentRef = useRef(null);


const editfun =(movieList)=>{
  setEditing(true)
  setcurrentuserdata({id:movieList.id,movieName: movieList.movieName, img:movieList.img,language:movieList.language, duration:movieList.duration})
  }

  
  const updateUser =(id,updateUser)=>{
    setEditing(false)
    setMovies(movies.map((user) => (user.id ==id ? updateUser : user) )) 
  }

  const deletefun =(user) => {

    setMovies(movies.filter((data) => user !== data.id  ))   
    setEditing(false)
  
  }


let handleNameChange = (event) => {
  setNewMovieName(event.target.value);
}

let handleImageChange = (event) => {
  setNewMovieImage(event.target.value);
}

let handleLanguageChange = (event) => {
  setNewMovieLanguage(event.target.value);
}

let handleDurationChange = (event) => {
  setNewMovieDuration(event.target.value);
}

let addMovie = (event) =>
{
  event.preventDefault();

  let newMovie ={
    id:movies.length+1,
    movieName:newMovieName,
    img:newMovieImage,
    language:newMovieLanguage,
    duration:newMovieDuration,
  }
  setMovies(movies.concat(newMovie))
  //setMovies([...movies,newMovie])

  setNewMovieName('')
  setNewMovieImage('')
  setNewMovieLanguage('')
  setNewMovieDuration('')
  newNameContentRef.current.focus();
}

  return (
    <div>
      <Router>
        <div id="page-top">
        <div id="wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
          <Header />
          <div>
              <Link to="/"></Link>
              {/* <Link to="/createmovie">CreateMovie</Link> */}
              {/* <Link to="/editmovie">EditMovie</Link> */}
              {/* <Link to="/deletemovie">DeleteMovie</Link> */}
            </div>

            <div id="content">                

                  <div className="container ">
                      <div className="row mt-5">
                          <div className="  col-lg-4 col-md-5 col-12">
                              <div className='formcontainer'>
                                {editing ?
                                (<div> 
                                  <EditMovie currentuserdata={currentuserdata} setEditing={setEditing} updateUser={updateUser}/>
                                  {/* <Routes><Route path='/editmovie/:id' element={<EditMovie currentuserdata={currentuserdata} setEditing={setEditing} updateUser={updateUser}/>}/></Routes> */}
                                </div>)
                                :
                                (<div>
                                  <CreateMovie addMovie={addMovie} newMovieName={newMovieName} newMovieImage={newMovieImage} newMovieLanguage={newMovieLanguage}
                                  newMovieDuration={newMovieDuration} newNameContentRef={newNameContentRef} handleNameChange={handleNameChange} 
                                  handleImageChange={handleImageChange} handleLanguageChange={handleLanguageChange} handleDurationChange={handleDurationChange} />
                                   {/* <Routes><Route path='/addmovie' element={
                                  <CreateMovie addMovie={addMovie} newMovieName={newMovieName} newMovieImage={newMovieImage} newMovieLanguage={newMovieLanguage}
                                  newMovieDuration={newMovieDuration} newNameContentRef={newNameContentRef} handleNameChange={handleNameChange} 
                                  handleImageChange={handleImageChange} handleLanguageChange={handleLanguageChange} handleDurationChange={handleDurationChange} />
                              }/></Routes> */}
                              </div>)   
                                }
                              </div>
                          </div>

                          <div className=" col-lg-8  col-md-7  ">
                              <div className='listcontainer'>
                              <Routes><Route path="/" element={<ReadMovies movieList={movies} setEditing={setEditing} editfun={editfun} deletefun={deletefun}/> }/></Routes>
                              </div>
                          </div>
                      </div>
                  </div>
            </div>

            


            <a className="backtotop" href="#page-top">
              <i className="fas fa-angle-up"></i>
            </a>
            <Footer />
          </div>
        </div>
      </div>
      </Router>
    </div>
  )
}

export default Layout