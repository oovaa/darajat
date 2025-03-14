import React, { useState } from 'react';
import onboardingImg from '../assets/onboarding-img.png';
import downImg from '../assets/select-dwon.svg';

const Onboarding: React.FC = () => {
    type paceValue = 'Relaxed' | 'Standard' | 'Accelerated';
    const [selectedPace, setSelectedPace] = useState("");

    const handlePaceSelect = (pace: paceValue) => {
        setSelectedPace(pace);
    };

    return (
        <div id='onboarding' className='p-20 bg-white'>
            <h1 className='font-bold text-2xl lg:text-3xl text-center mb-14'>Let`s bring you back!</h1>
            <div className="container bg-[#FCF1CC] grid grid-cols-1 lg:grid-cols-2 justify-items-center items-center rounded-2xl shadow-md shadow-gray-300 p-7">
                <div className="form-wrapper text-center lg:text-left w-full">
                    <div className="form-header">
                        <h1 className='text-4xl font-bold mb-5'>Onboarding</h1>
                    </div>
                    <form action="" onSubmit={(e) => e.preventDefault()}>
                        <div className="input-wrapper my-1">
                            <input type="text" placeholder='First Name' required className='w-full py-2 px-2 border-b-1 border-b-gray-400 placeholder:text-black transition-all' />
                        </div>
                        <div className="input-wrapper my-1">
                            <input type="number" placeholder='Age' required className='w-full py-2 px-2 border-b-1 border-b-gray-400 placeholder:text-black transition-all' />
                        </div>

                        <div className="input-wrapper my-1 relative w-full">
                            <select className="w-full text-[16px] py-2 px-2 bg-transparent outline-none border-b border-gray-400 appearance-none" >
                                <option value="" disabled selected>Last compelted grade</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                            <img src={downImg} alt="" className='w-4 absolute right-2 top-1/2 -translate-y-1/2 rotate-180' />
                        </div>
                        <div className="input-wrapper my-1 relative w-full ">
                            <select className="w-full text-[16px] py-2 px-2 bg-transparent outline-none border-b border-gray-400 appearance-none" >
                                <option value="" disabled selected>Years out of school</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <img src={downImg} alt="" className='w-4 absolute right-2 top-1/2 -translate-y-1/2 rotate-180' />
                        </div>
                        <div className="paces">
                            <h3 className='my-6'>What is your learning pace?</h3>
                            <div className="flex gap-3 my-4">
                                <button
                                    type="button"
                                    className={`flex-1 border rounded-md p-3 flex flex-col items-center hover:bg-gray-100 
                            ${selectedPace === "Relaxed" ? "bg-gray-200 border-blue-500" : ""}`}
                                    onClick={() => handlePaceSelect("Relaxed")}
                                >
                                    🐢 <span>Relaxed</span> <span className="text-xs">1-2 hours / day</span>
                                </button>
                                <button
                                    type="button"
                                    className={`flex-1 border rounded-md p-3 flex flex-col items-center hover:bg-gray-100 
                            ${selectedPace === "Standard" ? "bg-gray-200 border-blue-500" : ""}`}
                                    onClick={() => handlePaceSelect("Standard")}
                                >
                                    🚶‍♂️ <span>Standard</span> <span className="text-xs">3-4 hours / day</span>
                                </button>
                                <button
                                    type="button"
                                    className={`flex-1 border rounded-md p-3 flex flex-col items-center hover:bg-gray-100 
                            ${selectedPace === "Accelerated" ? "bg-gray-200 border-blue-500" : ""}`}
                                    onClick={() => handlePaceSelect("Accelerated")}
                                >
                                    🏃‍♂️ <span>Accelerated</span> <span className="text-xs">5-6 hours / day</span>
                                </button>
                            </div>
                        </div>
                        <button type="submit" className='bg-orange-400 text-white font-bold rounded-3xl px-12 py-2 hover:-translate-y-1 transition-all'>Start →</button>
                    </form>
                </div>
                <div className="img-wrapper mt-8 lg:mt-0">
                    <img src={onboardingImg} alt="onboarding-img" loading='lazy' className='w-[90%]' />
                </div>
            </div>
        </div>

    )
}

export default Onboarding;