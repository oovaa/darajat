import upArrowImg from '../assets/up-arrow.svg'

interface GoUpProps {
    status: boolean;
    onclick: () => void;
}
const GoUp: React.FC<GoUpProps> = ({ status, onclick }) => {
    return (
        <div className={`fixed bottom-5 right-5 bg-orange-400 shadow-md shadow-gray-500 w-10 p-2 rounded-full flex justify-center items-center cursor-pointer z-[999] hover:-translate-y-1 transition-all ${status ? 'visible' : 'invisible'} `} onClick={onclick}>
            <img src={upArrowImg} alt="" className='w-full' loading='lazy'/>
        </div>
    )
}
export default GoUp;