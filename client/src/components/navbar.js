import React, { useState, useEffect } from 'react'
import add from '../assets/add.svg'
import CreateEditModal from './create'
import { Link, useLocation} from 'react-router-dom'

export default function Navbar() {
  const {pathname} = useLocation()
  const url = ''
  const [showModal, setshowModal] = useState(false);

  useEffect(() => {
  }, [pathname])


  const handleShowModal = (e) => {
    e.preventDefault()
    setshowModal(true)
  }

  const handleCloseModal = () => {
    setshowModal(false)
  }
    return (
    <div id="header">
      {showModal && <CreateEditModal closeModal={handleCloseModal} />}
      <div className="row-1">
        <div className="fleft"><p href={url}>Cinema <span>World</span></p></div>
        <ul>
          <li><a href={url} onClick={(e) => handleShowModal(e)}><img style={{height: '25px'}} src={add} alt="" /></a></li>
        </ul>
      </div>
      <div className="row-2">
        <ul>
          <li><Link to='/' className={pathname === '/' ? 'active' : ""} >Home</Link></li>
          <li><Link to='/movies' className={pathname === '/movies' ? 'active' : ""} >Movies</Link></li>
          <li><Link to='/series' className={pathname === '/series' ? 'active' : ""} >TV Series</Link></li>
          <li><Link to='/favorites' className={pathname === '/favorites' ? 'active' : ""}>Favorites</Link></li>
        </ul>
      </div>
    </div>
    )
}
