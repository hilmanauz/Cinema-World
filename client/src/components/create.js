import React, { useEffect, useState } from 'react';
import {useMutation} from '@apollo/client'
import {ADD_MOVIE, GET_ALL_DATA} from '../queries'
import Error from './error'
import Success from './success'

const CreateModal = ({ closeModal}) => {
  const [showErrorModal, setshowErrorModal] = useState(false);
  const [showSuccessModal, setshowSuccessModal] = useState(false);

  const [data, setData] = useState({
    title: "",
    overview: "",
    poster_path: "",
    popularity: null,
    tags: ""
  })

  const [addMovie] = useMutation(ADD_MOVIE, {
    refetchQueries: [
      {query: GET_ALL_DATA}
    ]
  })
  let myRef;
  useEffect(() => {
    document.addEventListener('click', closeCreateModal);
    return () => {
      document.removeEventListener('click', closeCreateModal);
    }
    // eslint-disable-next-line
  }, []);

  const closeCreateModal = (e) => {
    if (myRef && !myRef.contains(e.target)) {
      closeModal();
    }
  }

  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name] : e.target.value
    })
  }

  const submitMovie = () => {
    if(data.title === "" || data.overview === "" || data.poster_path === "" || data.popularity === "" || data.tags === ""){
      handleShowErrorModal()
    } else {
      addMovie({
        variables: {
          newMovie: {...data, popularity: Number(data.popularity)}
        }
      })
      handleShowSuccessModal()
    }
  }

  
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
  
  const closeCreate = () => {
    closeModal()
  }
  return (
    <div className="modalWrapper">
      <form ref={(node) => (myRef = node)} onSubmit={(e) => e.preventDefault()}>
      {showErrorModal && <Error closeModal={handleCloseErrorModal} />}
      {showSuccessModal 
       ?
      <Success closeModal={handleCloseSuccessModal} close ={closeCreate}/>
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
            value={data.Popularity}
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
  );

};

export default CreateModal;