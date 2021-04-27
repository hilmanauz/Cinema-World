import React, {useState, useEffect} from 'react'
import {Row, Button} from 'react-bootstrap';
import { useQuery } from '@apollo/client'
import CardComponent from '../components/card'
import more from '../assets/icon-more.svg'
import {GET_ALL_DATA} from '../queries'
import {useHistory} from 'react-router-dom'
import _ from 'lodash'

export default function Home() {
  const history = useHistory();
  const [randomMovie, setRandomMovie] = useState([])
  const [randomSeries, setRandomSeries] = useState([])
  const { data, loading, error } = useQuery(GET_ALL_DATA)

  useEffect(() => {
    if(data){
      const movie = _.sampleSize(data.movies, 3)
      const series = _.sampleSize(data.tvSeriess, 3)
      setRandomMovie(movie)
      setRandomSeries(series)
    }
  }, [data])

  const goToMovies = () => {
    history.push('/movies')
  }

  const goToSeries = () => {
    history.push('/series')
  }
  
  if(loading){
    return <h1>Loading ...</h1>
  }

  if(error){
    return <h1>{error}</h1>
  }

  return (
      <div id="content">
        <div id="slogan">
          <div className="image png"></div>
          <div className="inside">
            <h2>We are breaking<span>All Limitations</span></h2>
            <p><span style={{fontWeight: "bold"}}>Cinema World</span> is the world's most popular and authoritative source for movie, TV and celebrity content. Find ratings and reviews for the newest movie and TV shows.</p>
          </div>
        </div>
        <br/>
        <h3>Fresh <span>Movies</span></h3>
        <Row>
          {
            randomMovie.map(el => {
              return <CardComponent data={el} key={el._id}></CardComponent>
            })
          }
        </Row>
        <div className="d-flex flex-row-reverse mb-5">
          <Button variant="outline-secondary" onClick={goToMovies}><img style={{height: '18px'}} src={more} alt="+" /> View More</Button>
        </div>
        <h3>Fresh <span>TV Series</span></h3>
        <Row>
          {
            randomSeries.map(el => {
              return <CardComponent data={el} key={el._id} isSeries={true}></CardComponent>
            })
          }
        </Row>
        <div className="d-flex flex-row-reverse mb-5">
          <Button variant="outline-secondary" onClick={goToSeries}><img style={{height: '18px'}} src={more} alt="+" /> View More</Button>
        </div>
      </div>
  )
}
