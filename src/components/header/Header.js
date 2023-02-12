import { Component } from 'react'
import { NavLink } from "react-router-dom";

import './header.scss'


class Header extends Component {
 

  render() {
    return (
      <header className='app-header'>
        <nav className='app-header__tabs-wrapper'>
          <li className='app-header__tab'>
            <NavLink to='/' className={({isActive}) => (isActive ? 'app-header__link-active' : 'app-header__link')}>
              Search
            </NavLink>
          </li>
          <li className='app-header__tab'>
            <NavLink to='/rated' className={({isActive}) => (isActive ? 'app-header__link-active' : 'app-header__link')}>
              Rated
            </NavLink>
          </li>
        </nav>
      </header>
    )
  }
}

export default Header
