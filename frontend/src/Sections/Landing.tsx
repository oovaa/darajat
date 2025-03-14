import React from 'react';
import LandingImg from '../assets/landing-img.png';
import { MainLink } from '../Container';
const Landing: React.FC = () => {
    return (
        <div id='landing' className='bg-[#FCF1CC] py-7 mt-12 min-h-[95vh]'>
            <div className="container w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-3 justify-items-center items-center">
                <div className="intro-text mb-5 mt-14 lg:mb-0 lg:mt-0 text-center lg:text-left">
                    <h1 className='relative text-[48px] after:absolute after:bottom-4 after:content-[""] after:w-2 after:h-2 after:rounded-full after:bg-orange-400'>Reclaim Your <span className='font-bold'>Education </span>
                        One <span className='font-bold'>Step</span> at a Time</h1>
                    <p className='w-[70%] mx-auto lg:mx-0'>A personalized AI-powered school designed for displaced students to catch up and stay on track.</p>
                    <MainLink title='Get Start' className='bg-orange-400 text-white mt-6' route='#' />
                </div>
                <div className="img-wrapper flex justify-center">
                    <img src={LandingImg} alt="" className='w-[80%] animate-pulse' loading='lazy' />
                </div>
            </div>
        </div>
    )
}

export default Landing;