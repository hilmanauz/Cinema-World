import React from 'react';
import nice from '../assets/nice.gif'
import confettiRight from '../assets/confetti-right.svg'
import confettiLeft from '../assets/confetti-left.svg'


export default function Success({ closeModal, close }) {

  return (
    <div className="modalWrapper text-center">
      <div className="background">
        <h1 style={{fontWeight: "bold"}}> <img src={confettiLeft} alt="" style={{height: "30px"}}></img> Successfull <img src={confettiRight} alt="" style={{height: "30px"}}></img></h1>
        <div className="form-group">
        <img src={nice} alt='NICE' style={{height: "200px"}}/>
        </div>
        <h5>Your Movies has been Updated</h5>
        <br></br>
        <button
          className="btn btn-danger mr-1"
          onClick={() => {
            closeModal()
            close()
          }}
        >
          Close
        </button>
      </div>
    </div>
    );
}
