import fire from '../assets/fire.png';
import { Check } from 'lucide-react';
import dayjs from "dayjs";


export default function Streak() {
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  const today = dayjs().day()
  console.log(today)
  
  return (
    <div className="bg-[#FF9500] w-70% h-30 p-5 flex items-center rounded-3xl">
      <img className="h-22 w-auto pr-3" src={fire} width={200}/>
      <div className='flex flex-col justify-center items-center flex-1'>
        <h1 className='text-xl text-white'><span className='text-4xl font-bold'>1</span> day streak</h1>
        <div className='flex gap-1 py-2'>
            {weekDays.map((item, index) => (
                <div className="flex flex-col items-center" key={index}>
                    <div className={`flex justify-center items-center rounded-full h-7 w-7 ${today == index ? 'bg-black' :'bg-[#D9D9D9]'}`}>
                        {today == index && <Check className='text-white'/>}
                    </div>
                    <h1 className='text-white'>{item}</h1>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}
