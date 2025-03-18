import React from 'react'
import { Link } from 'react-router-dom';

interface MainLinkProps {
    title: string;
    route: string;
    className?: string;
    onClick?:() => void;
}

const MainLink: React.FC<MainLinkProps> = ({ title, className, route,onClick }) => {
    return (
        <Link to={route} onClick={onClick} className={`inline-block bg-orange-400 text-white font-bold border-none outline-none cursor-pointer rounded-3xl px-8 py-2.5 my-2 hover:-translate-y-1 transition-all ${className}`}>{title}</Link>
    )
}

export default MainLink;