import React,{useState} from 'react'

export interface VideoProps {
    url: string;
}

const VideoContent: React.FC<VideoProps> = ({ url }) => {

    const embedUrl = url.includes('watch?v=') ? url.replace('watch?v=', 'embed/') : url;
    const [loading, setLoading] = useState(true);


    return (
        <div id='video-content' className="flex justify-center my-4">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <span className="animate-spin border-4 border-gray-500 border-t-transparent rounded-full w-8 h-8"></span>
                </div>
            )}
            <iframe className='w-[60%] h-[270px] rounded-lg '
                src={embedUrl}
                title="Video Content"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => setLoading(false)}
            ></iframe>
        </div>
    )
}

export default VideoContent;