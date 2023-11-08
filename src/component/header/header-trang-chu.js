import { useNavigate } from 'react-router-dom';
import React from 'react';
import logo from '../../image/logo.png';
import '../../css/headers.css';
import '../../css/style.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'

import {faLanguage, faLineChart, faDesktop,faSearchDollar,faLightbulb,faCode} from '@fortawesome/free-solid-svg-icons'

import slideshow1 from '../../image/slideshow_1.jpg';
import slideshow2 from '../../image/slideshow_2.jpg';
import slideshow3 from '../../image/slideshow_3.jpg';

export default function Header() {
    const navigate = useNavigate();
    const handleNavigate = (path) => {
      navigate(path);
    };
    return (
        <div className='container '>

        <header className="d-flex justify-content-center py-3 bg-light bg-gradient" id="topbar">
            <div className="d-inline-block">
                <a className="navbar-brand mr-1" href="/">
                    <img className="img-fluid logo" alt="logo" src={logo} />
                </a>
            </div>
            <div className="d-inline-block">
                <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                    <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search" />
                </form>
            </div>

            <div className="d-inline-block" style={{ alignItems: 'center' }}>
                <a href="https://www.google.com/">
                    <FontAwesomeIcon icon={faShoppingCart} style={{ color: '#999', fontSize: '30px' }} ></FontAwesomeIcon>
                    <i className="fa fa-shopping-cart" aria-hidden="true" ></i>
                    <span className="unica-sl-cart" style={{ border: 'none' }}>
                    </span>
                </a>
            </div>

            <a className="btn btn-primary margin-button-header" onClick={() => handleNavigate('/login')} >Đăng nhập</a>
            <a className="btn btn-primary margin-button-header" onClick={() => handleNavigate('/register')}>Đăng ký</a>
        </header>

        
    

    

        </div>   
    )
}