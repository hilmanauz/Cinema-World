import React from 'react'
import {Row} from 'react-bootstrap';
import { useQuery } from '@apollo/client'
import CardComponent from '../components/card'
import {GET_SERIESS} from '../queries'

export default function Series() {
  const { data, loading, error } = useQuery(GET_SERIESS)

  if(loading){
    return <h1>Loading ...</h1>
  }

  if(error){
    return <h1>{error}</h1>
  }

  return (
    <div id="content">
      <div id="slogan">
          <div className="series png"></div>
          <div className="inside">
          <h2>TV Series <span style={{display: "inline"}}>List</span></h2>
            <p><span style={{fontWeight: "bold"}}>Cinema World</span> is the world's most popular and authoritative source for movie, TV and celebrity content. Find ratings and reviews for the newest movie and TV shows.</p>
          </div>
        </div>
        <br/>
      <Row>
        {
          data.tvSeriess.map(el => {
            return <CardComponent data={el} key={el._id} isSeries={true}></CardComponent>
          })
        }
      </Row>
    </div>
  )
}
