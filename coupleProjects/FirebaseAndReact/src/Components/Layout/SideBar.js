import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SideBar extends Component {
    render() {
        return (
            <Link to='/client/add' className='btn-small brown darken-2'>
               <i className="fas fa-plus"/> New
            </Link>
        )
    }
}

export default SideBar;