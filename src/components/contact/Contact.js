import React from 'react';
import { Link } from "react-router-dom";

import './contact.css'

export default function Contact() {
  return (
    <div className="contactPage">

    <nav className="landingNav navbar navbar-dark bg-dark sticky-top" id={'index'}>
      <div className="container-fluid d-flex mx-5" style={{justifyContent: "space-between"}}>
          <a 
            href="https://www.instagram.com/ethancowsky/?hl=en" target="_blank" rel="noreferrer" 
            className="fs-4 text-white w-30" style={{width: "3em"}}>
              <i className="fab fa-instagram"></i>
          </a>
          <Link 
          to="/"
          className="navbar-text text-white w-30 my-auto" >
          Ethan Cowsky
        </Link>
          <Link 
            to="/contact"
            className="navbar-text text-white w-30 my-auto">
            Contact
          </Link>
      </div>
   </nav>
    


      <img 
        src="https://live.staticflickr.com/371/32795970505_1fb785ef91_k.jpg" 
        // src="https://instagram.fphx1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/95329606_684554032088896_6392921806344290304_n.jpg?tp=1&_nc_ht=instagram.fphx1-1.fna.fbcdn.net&_nc_ohc=Xbj0ycop5B8AX-ba1rj&edm=ABfd0MgBAAAA&ccb=7-4&oh=6aae1f1f6d0bc3550b6231063e648e4f&oe=60BE18C8&_nc_sid=7bff83"
        alt="Artwork Unavailable..." 
        className="heroShot"
        ></img>

      <div className="contactInfo container-sm">
        <h2 >Ethan Cowsky</h2>

        <div className=" contactDescription text-center">Ethan Cowsky is a 3D Artist, photographer and all around solid dude. He does commisioned 3D renders and photography for clients upon request so if you have an idea you would like to see rendered feel free to contact him below!</div>

        <div>Instagram</div>
        <div>Email: EthanCowsky@gmail.com</div>
      </div>
      

    </div>
  )
}
