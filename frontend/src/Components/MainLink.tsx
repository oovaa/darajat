import React from 'react'

interface MainLinkProps {
    title: string;
    route: string;
    className?: string;
}

const MainLink: React.FC<MainLinkProps> = ({ title, className, route }) => {
    return (
        <a href={route} className={`inline-block font-bold border-none outline-none cursor-pointer rounded-3xl px-8 py-2.5 my-2 hover:-translate-y-1 transition-all ${className}`}>{title}</a>
    )
}

export default MainLink;