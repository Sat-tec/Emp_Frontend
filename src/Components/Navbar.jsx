import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import gsap from 'gsap';



const Navbar = () => {

  useEffect(() => {
    gsap.fromTo(".navbar", 
      { opacity: 0, y: -30 }, 
      { opacity: 1, y: 0, duration: 0.5, ease: "power4.inOut" }
    );
  }, []);

  return (
    <header className='navbar'>
      <nav className="flex justify-between bg-purple-800 h-14 px-8 items-center text-white">
        <Link className="logo font-semibold text-2xl" to='/'>
          <FontAwesomeIcon icon={faHome} className="text-white" />
        </Link>
        <Link className="appname font-semibold text-xl" to='/'>
          <FontAwesomeIcon icon={faUser} className="text-white px-2 text-xl font-semibold" />
          Employee Management
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
