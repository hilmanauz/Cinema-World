import React, {useState, useEffect} from 'react'
import {useQuery, useMutation} from '@apollo/client'
import {GET_MOVIE, GET_ALL_DATA, UPDATE_MOVIE} from '../queries'
import Error from './error'
import Success from './success'


export default function EditModal({ closeModal, id }) {
  const [showErrorModal, setshowErrorModal] = useState(false);
  const [showSuccessModal, setshowSuccessModal] = useState(false);
  const [data, setData] = useState({
    title: "",
    overview: "",
    poster_path: "",
    popularity: null,
    tags: ""
  })
  let myRef;

  const {data: dataMovie, loading, error} = useQuery(GET_MOVIE, {
    variables: {
      movieId: id
    }
  })

  const [updateMovie] = useMutation(UPDATE_MOVIE, {
    refetchQueries: [
      {query: GET_ALL_DATA}
    ]
  })
  
  useEffect(() => {
    if(!loading){
      const {movie} = dataMovie
      setData({...movie, popularity: movie.popularity.toString()})
    }
    // eslint-disable-next-line
  }, [loading])
  
  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name] : e.target.value
    })
  }
  
  const closeCreateModal = (e) => {
    if (myRef && !myRef.contains(e.target)) {
      closeModal();
    }
  }
  
  useEffect(() => {
    document.addEventListener('click', closeCreateModal);
    return () => {
      document.removeEventListener('click', closeCreateModal);
    }
    // eslint-disable-next-line
  }, []);

  const handleShowErrorModal = () => {
    setshowErrorModal(true)
  }

  const handleCloseErrorModal = () => {
    setshowErrorModal(false)
  }

  const handleShowSuccessModal = () => {
    setshowSuccessModal(true)
  }

  const handleCloseSuccessModal = () => {
    setshowSuccessModal(false)
  }
  
  const submitMovie = () => {
    if(data.title === "" || data.overview === "" || data.poster_path === "" || data.popularity === "" || data.tags === ""){
      handleShowErrorModal()
    } else {
      updateMovie({
        variables: {
          movieId: id,
          editMovie: {title: data.title, overview: data.overview, poster_path: data.poster_path, popularity: Number(data.popularity), tags: data.tags}
        }
      })
      handleShowSuccessModal();
    }
  }

  if(error){
    return (
      <div className="modalWrapper">
       <div className="background">
          <h1 className="text-center">{error}</h1>
        </div>
      </div>
    )
  }

  if(loading){
    return (
      <div className="modalWrapper">
        <div className="background">
          <h1 className="text-center">Loading</h1>
        </div>
      </div>
    )
  }

  const closeEdit = () => {
    closeModal()
  }
  
  return (
    <div className="modalWrapper">
      <form ref={(node) => (myRef = node)} onSubmit={(e) => e.preventDefault()}>
        {showErrorModal && <Error closeModal={handleCloseErrorModal} />}
        {showSuccessModal 
        ? 
        <Success closeModal={handleCloseSuccessModal} close={closeEdit}/>
        :
          <>
            <h3 className="text-center">Movie Form</h3>
            <label>Title</label>
            <div className="form-group">
              <input
                type="text"
                name="title"
                id="title"
                value={data.title}
                className="form-control"
                placeholder="Enter new Title"
                onChange={handleOnChange} 
              />      
            </div>
            <label>Popularity</label>
            <div className="form-group">
              <input
                type="number"
                min="0"
                max="10"
                step=".01"
                name="popularity"
                id="popularity"
                value={data.popularity}
                className="form-control"
                placeholder="0 - 10"
                onChange={handleOnChange} 
              />      
            </div>
            <label>Link Poster</label>
            <div className="form-group">
              <input
                type="text"
                name="poster_path"
                id="poster_path"
                className="form-control"
                value={data.poster_path}
                placeholder="https://m.media-amazon.com/images"
                onChange={handleOnChange} 
              />      
            </div>
            <label>Tags</label>
            <div className="form-group">
              <input type="text" id="tags" name="tags" className="form-control" placeholder="More tags just add comma ," onChange={handleOnChange} value={data.tags}/>  
            </div>
            <label>Overview</label>
            <div className="form-group">
              <textarea 
                className="form-control" 
                name="overview"
                id="overview" 
                placeholder="Movie Description"
                rows="3"
                onChange={handleOnChange} 
                value={data.overview}
              ></textarea>  
            </div>
            <button
              className="btn btn-primary float-right"
              onClick={submitMovie}
            >
              Save
            </button>
            <button
              className="btn btn-danger float-right mr-1"
              onClick={() => closeModal()}
            >
              Cancel
            </button>
        </>
      }
        </form>
      </div>
  )
}
