import React, { useEffect, useState } from 'react';
import {useQuery} from '@apollo/client'
import {GET_MOVIE, GET_SERIES} from '../queries'
import {Row, Button} from 'react-bootstrap'
import loading from '../assets/loading.gif'
import star from '../assets/starFill.svg'


export default function Detail({ closeModal, id, isSeries }) {
  let myRef;
  const [decideData, setDecideData] = useState('');

  let QUERY = isSeries ? GET_SERIES : GET_MOVIE
  const {data, loading: loadingMovie, error} = useQuery(QUERY, {
    variables: {
      movieId: id
    }
  })

  useEffect(() => {
    if(data){
      let decide = isSeries ? data.tvSeries : data.movie
      setDecideData(decide)
    }
    // eslint-disable-next-line
  }, [data])

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

  if(loadingMovie && decideData.length === 0 ){
    return (
      <div className="modalWrapper">
        <div className="background">
          <img src={loading} alt="LOADING"></img>
        </div>
      </div>
    )
  }

  if(error){
    return (
      <div className="modalWrapper">
        <div className="background">
          <h1>{error}</h1>
        </div>
      </div>
    )
  }
  console.log(decideData)
  return (
    <div className="modalWrapper text-center">
      <form ref={(node) => (myRef = node)} onSubmit={(e) => e.preventDefault()}  style={{width: "950px"}} >
        <Row>
          <div className="col-4">
            <img src={decideData.poster_path} style={{height: "400px"}} alt="MOVIE"></img>
          </div>
          <div className="col-8 text-left">
            <h1>{decideData.title}</h1>
            <br></br>
            <h4>Overview</h4>
            <p>{decideData.overview}</p>
            <Button style={{backgroundColor:"white", borderColor:"gold", color:"gold"}} size="lg" disabled className="mb-4">
              <img src={star} alt="STAR" style={{height: "29px"}}></img> <span style={{fontSize:"20px"}}>: {decideData.popularity}</span>
            </Button>
            <h4 className="mb-3">Tags</h4>
            {
              decideData?.tags?.map(tag => {
                return <Button disabled variant="secondary" className="mx-2">{tag}</Button>
              })
            }
          </div>
        </Row>
        <br></br>
        <Button
          className="btn-danger mr-1"
          onClick={() => closeModal()}
        >
          Done
        </Button>
      </form>
    </div>
    );
    
}

