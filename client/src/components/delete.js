import React, { useEffect, useState } from 'react';
import {useMutation} from '@apollo/client'
import {DELETE_MOVIE, GET_ALL_DATA} from '../queries'
import deleted from '../assets/delete.gif'
import Success from './success'

export default function Delete({ closeModal, id }) {
  let myRef;
  const [showSuccessModal, setshowSuccessModal] = useState(false);
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

  const handleShowSuccessModal = () => {
    setshowSuccessModal(true)
  }

  const handleCloseSuccessModal = () => {
    setshowSuccessModal(false)
  }

  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    refetchQueries: [
      {query: GET_ALL_DATA}
    ]
  })

  const deleteData = () => {
    handleShowSuccessModal()
  }

  const closeDelete = () => {
    deleteMovie({
      variables: {
        movieId: id
      }
    })
    closeModal()
  }

  return (
    <div className="modalWrapper text-center">
      <form ref={(node) => (myRef = node)} onSubmit={(e) => e.preventDefault()} >
      {showSuccessModal 
        ? 
          <Success closeModal={handleCloseSuccessModal} close={closeDelete}/>
        :
        <>
          <h1 style={{color: "red", fontWeight: "bold"}}>!! Caution !!</h1>
          <div className="form-group">
          <img src={deleted} alt='DELETE' style={{height: "200px"}}/>
          </div>
          <h5>Are you sure?</h5>
          <br></br>
          <button
            className="btn btn-secondary mr-1"
            onClick={() => closeModal()}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger mr-1"
            onClick={() => deleteData()}
          >
            Delete
          </button>
        </>
      }
      </form>
    </div>
    );
}
