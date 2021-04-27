import React, {useState} from 'react'
import {Card, Col} from 'react-bootstrap'
import star from '../assets/star.svg'
import starFill from '../assets/starFill.svg'
import clear from '../assets/clear.svg'
import clearFill from '../assets/clearFill.svg'
import edit from '../assets/edit.svg'
import editFill from '../assets/editFill.svg'
import EditModal from './edit'
import DeleteModal from './delete'
import DetailModal from './detail'
import {favoritesVar} from '../config/cache'
import {useReactiveVar} from '@apollo/client'


export default function CardComponent(props) {
  const favorites = useReactiveVar(favoritesVar)
  const [showEditModal, setshowEditModal] = useState(false);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [showDetailModal, setshowDetailModal] = useState(false);
  const {data, isSeries} = props
  const isFavorite = favorites?.filter(favorite => favorite._id === data._id)
  const url = ''
  const handleShowEditModal = (e) => {
    e.preventDefault()
    setshowEditModal(true)
  }

  const handleCloseEditModal = () => {
    setshowEditModal(false)
  }

  const handleShowDeleteModal = (e) => {
    e.preventDefault()
    setshowDeleteModal(true)
  }

  const handleCloseDeleteModal = () => {
    setshowDeleteModal(false)
  }

  const handleShowDetailModal = (e) => {
    e.preventDefault()
    setshowDetailModal(true)
  }

  const handleCloseDetailModal = () => {
    setshowDetailModal(false)
  }

  const addToFavorites = () => {
    const existingFavorites = favoritesVar();
    const alreadyExist = existingFavorites.filter(favorite => {
      return favorite._id === data._id
    })
    if(alreadyExist.length !== 0){
      const removeFavorites = existingFavorites.filter(favorite => {
        return favorite._id !== data._id
      })
      favoritesVar(removeFavorites)
    } else {
      const addFavorites = existingFavorites.concat(data)
      favoritesVar(addFavorites)
    }
  }
  
  return (
    <Col lg={4} className="my-3">
      <Card bg="dark" style={{height: "35rem"}}>
        {showEditModal && <EditModal id={data._id} closeModal={handleCloseEditModal} />}
        {showDeleteModal && <DeleteModal id={data._id} closeModal={handleCloseDeleteModal} />}
        {showDetailModal && <DetailModal id={data._id} closeModal={handleCloseDetailModal} isSeries={isSeries}/>}
        <a href={url} className="poster" onClick={handleShowDetailModal}><Card.Img variant="top" src={data.poster_path} style={{height: "27rem"}}/></a>
        <Card.Body>
          { !isSeries &&
            <>
              { isFavorite.length !== 0  
                ?
                <img src={starFill} alt="" className="top-right-icon-click m-2" onClick={addToFavorites}/>
                :
                <>
                <img src={star} alt="" className="top-right-icon m-2" />
                <img src={starFill} alt="" className="top-right-icon-favorites m-2" onClick={addToFavorites}/>
                </>
              }
              <img src={clear} alt="" className="top-left-icon m-2"/>
              <img src={clearFill} alt="" className="top-left-icon-delete m-2" onClick={handleShowDeleteModal}/>
              <img src={edit} alt="" className="icon-edit m-2"/>
              <img src={editFill} alt="" className="icon-edit-click m-2" onClick={handleShowEditModal}/>
            </>
          }
          <Card.Title style={{fontWeight: 'bold', color: 'white'}}>{data.title}</Card.Title>
          <Card.Text>
            Popularity: {data.popularity}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}
