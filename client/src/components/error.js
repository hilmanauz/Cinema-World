import React, { useEffect } from 'react';
import error from '../assets/error.gif'

export default function Error({ closeModal }) {
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
  return (
    <div className="modalWrapper text-center">
      <form ref={(node) => (myRef = node)} onSubmit={(e) => e.preventDefault()} >
        <h1 style={{color: "red", fontWeight: "bold"}}>!! Error !!</h1>
        <div className="form-group">
        <img src={error} alt='ERROR' style={{height: "200px"}}/>
        </div>
        <h5>Please Fill All Fields</h5>
        <br></br>
        <button
          className="btn btn-danger mr-1"
          onClick={() => closeModal()}
        >
          Close
        </button>
      </form>
    </div>
    );
    
}
