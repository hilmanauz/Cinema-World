import React from 'react'
import {Row} from 'react-bootstrap';
import { useQuery } from '@apollo/client'
import CardComponent from '../components/card'
import {GET_MOVIES} from '../queries'

export default function Movies() {
  const { data, loading, error } = useQuery(GET_MOVIES)

  if(loading){
    return <h1>Loading ...</h1>
  }

  if(error){
    return <h1>{error}</h1>
  }

  return (
    <div id="content">
      <div id="slogan">
        <div className="movies png"></div>
        <div className="inside">
          <h2>Movie <span style={{display: "inline"}}>List</span></h2>
          <p><span style={{fontWeight: "bold"}}>Cinema World</span> is the world's most popular and authoritative source for movie, TV and celebrity content. Find ratings and reviews for the newest movie and TV shows.</p>
        </div>
      </div>
      <br/>
      <Row>
        {
          data.movies.map(el => {
            return <CardComponent data={el} key={el._id}></CardComponent>
          })
        }
      </Row>
    </div>
  )
}
