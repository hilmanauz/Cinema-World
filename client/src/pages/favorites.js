import React from 'react'
import {useReactiveVar} from '@apollo/client'
import {favoritesVar} from '../config/cache'
import {Row} from 'react-bootstrap';
import CardComponent from '../components/card'
import nothing from '../assets/nothing.gif'


export default function Favorites() {
  const favorites = useReactiveVar(favoritesVar)

  return (
  <div id="content">
    <div id="slogan">
      <div className="favorites png"></div>
      <div className="inside">
        <h2>Your <span style={{display: "inline"}}>Favourites</span></h2>
        <p><span style={{fontWeight: "bold"}}>Cinema World</span> is the world's most popular and authoritative source for movie, TV and celebrity content. Find ratings and reviews for the newest movie and TV shows.</p>
      </div>
    </div>
    <br/>
        { favorites.length === 0 
          ?
          <div className="text-center my-5">
            <h1 style={{fontSize: "50px"}}>Sorry</h1>
            <img src={nothing} alt="NOTHING" className="my-4"></img>
            <h4>Your Favourite is not Available</h4>
          </div> 
          :
          <Row>
          {
            favorites.map(el => {
              return <CardComponent data={el} key={el._id}></CardComponent>
            })
          }
          </Row>
        }
  </div>
  )
}
