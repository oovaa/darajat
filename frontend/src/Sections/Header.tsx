import React from 'react'
import Logo from '../assets/darajat-logo.png';
const Header: React.FC = () => {
    return (
        <div id='header' className='bg-[#FFFFFF] shadow-sm shadow-gray-200 py-2 fixed top-0 left-0 lg:relative w-full z-[99]'>
            <div className="text flex justify-center items-center">
                <img src={Logo} alt="darajat-logo" className='w-7' loading='lazy'/>
                <h2 className='text-2xl ml-2 font-bold tracking-wider'>DARAJAT</h2>
            </div>
        </div>
    )
}

export default Header;