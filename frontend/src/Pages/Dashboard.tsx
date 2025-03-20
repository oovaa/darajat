
import Calendar from "../Components/Calander";
import Streak from "../Components/Streak";
import Lessons from "../Components/Lessons";
import abstractChalk from '../assets/abstract-chalk-texture-brush.png';
import logoHead from '../assets/darajat-logo.png';
import dayjs from "dayjs";

export default function Dashboard() {
  const today = dayjs().format("MMMM D")


  return (
    <div className="flex justify-between">
        <div className="w-2/3">
            <div className=" w-full max-w-3x p-8 h-35 bg-white border rounded-3xl flex items-center ">
                <img className="left-8 top-0 w-50 h-auto z-10" src={abstractChalk} width={200}/>
                <div className="">
                    <h1 className="text-5xl font-bold">Good morning, User</h1>
                    <p className="text-lg text-gray-600 mt-2">
                    Ready to take the next step in your learning journey? Let's dive in! 🚀
                    </p>
                </div>
            </div>
            <div className="ml-8 mt-10">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl">{today}</h1>
                        <p className="font-bold">Today's Progress</p>
                    </div>
                    <div className="bg-black px-4 py-2 rounded-3xl text-white">
                        Start Today's Lesson
                    </div>
                </div>
                <Lessons />

            </div>


        </div>
        <div className="flex flex-col">
            <div className="flex items-center justify-center">
                <div className="flex">
                <img src={logoHead} alt="logo" className='w-5' />
                <h3 className='text-xl font-bold ml-2'>DARAJAT</h3>
                </div>
            </div>
            <Calendar />
            <Streak />
        </div>

    </div>
  )
}
