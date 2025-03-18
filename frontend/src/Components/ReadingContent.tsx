import React from 'react'

export interface ReadingProps {
    title: string;
    summary: string;
}

const ReadingContent: React.FC<ReadingProps> = ({ title, summary }) => {
    return (
        <div>
            <h3 className='font-bold text-lg'>{title}</h3>
            <p className='mt-2'>{summary}</p>
        </div>
    )
}

export default ReadingContent;