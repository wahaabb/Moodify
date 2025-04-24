import React from 'react'
import TopNav from './TopNav'
import '../../SCSS/Components/_header.scss'
import { useNavigate } from "react-router-dom"
export default function Header() {
    const navigate = useNavigate();
    return (
        <>
            <TopNav />
            <section className='header'>
                <div className="container text-light ">
                    <div className="row">
                        <div className="col">
                            <h1>Moodify</h1>
                            <p>"Soundtrack your feelings with the perfect vibe for every emotion"</p>
                            <button className="signupBtn mt-4" onClick={() => {
                                window.scrollTo(0, 0);
                                navigate("/agent");
                            }}>
                                Try Now
                                <span className="arrow">
                                    <svg fill="rgb(183, 128, 255)" viewBox="0 0 320 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path></svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
