import { useNavigate } from 'react-router-dom';
import React from 'react';




export default function Footer() {
    const navigate = useNavigate();
    const handleNavigate = (path) => {
      navigate(path);
    };
    return (
        <footer className="py-3 my-4 bg-white p-0 m-0">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item"><a href="#" class="nav-link px-2 text-muted">Home</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Features</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Pricing</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">FAQs</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">About</a></li>
        </ul>
        <p className="text-center text-muted">© 2023 EDU123</p>
    </footer>
    )
}