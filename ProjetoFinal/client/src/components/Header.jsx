import React from "react";
import "../css/header.css";

const Header = () => {
    const sessionID = sessionStorage.getItem('sessionID');
    const user = JSON.parse(sessionStorage.getItem('user'));

    return (
        <div className="header">
            <a href="#" class="logo">Logo</a>

            <input type="checkbox" id="check" />
            <label for="check" class="icons">
                <i class='bx bx-menu' id="menu-icon"></i>
                <i class='bx bx-x' id="close-icon"></i>
            </label>

            <nav class="navbar">
                <a href="/" style={{ "--i": 0 }}>Home</a>
                {sessionID ? (
                    <>
                        <a href="/profile" style={{ "--i": 1 }}>Profile</a>
                        <a href="/message/3" style={{ "--i": 2 }}>Logout</a>
                    </>
                ) :
                    <>
                        <a href="/login" style={{ "--i": 1 }}>Login</a>
                        <a href="/register" style={{ "--i": 2 }}>Register</a>
                    </>
                }
                <a href="/movies" style={{ "--i": 3 }}>Movies</a>
                <a href="/tvShows" style={{ "--i": 4 }}>Tv Shows</a>
            </nav>
        </div>
    );
}

export default Header;