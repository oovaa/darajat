import React, { useState } from 'react';
import onboardingImg from '../assets/onboarding-img.png';
import downImg from '../assets/select-dwon.svg';
import axios from 'axios';
import { FadeIn, Header, MainLink } from '../Container';

const Onboarding: React.FC = () => {
    type paceValue = 'Relaxed' | 'Standard' | 'Accelerated';
    const [selectedPace, setSelectedPace] = useState("");

    const [formData, setFormData] = useState({
        firstName: '',
        age: '',
        lastCompletedGrade: '',
        yearsOutOfSchool: '',
        learningPace: ''
    });
    const [error, setError] = useState<string | null>('')

    const handlePaceSelect = (pace: paceValue) => {
        setSelectedPace(pace)
        setFormData({ ...formData, learningPace: pace });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('#', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200 || response.status === 201) {
                console.log('Form submitted successfully:', response.data);
            } else {
                console.error('Form submission failed:', response);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setError(`An error occurred. Please check your connection and try again.`);

        }
    };
    return (
        <>
            <Header />
            <FadeIn>
                <div id='onboarding' className='p-8 lg:p-20 mt-12 lg:mt-4 min-h-[95vh] bg-[#FCF1CC]'>
                    <div className="container relative lg:w-[90%] mx-auto bg-white grid grid-cols-1 lg:grid-cols-2 justify-items-center items-center rounded-2xl shadow-md shadow-gray-300 p-7 mt-8 overflow-hidden">
                    <MainLink title='← Home' route='/' className='absolute left-0 -top-2 rounded-l-none' />
                        <div className="form-wrapper text-center lg:text-left w-full">
                            <div className="form-header">
                                <h1 className='text-4xl font-bold my-10'>Onboarding</h1>
                            </div>
                            <form action="" onSubmit={handleSubmit}>
                                <div className="input-wrapper my-1">
                                    <input type="text" name='firstName' className='w-full py-2 px-2 border-b-1 border-b-gray-400 placeholder:text-black transition-all' placeholder='First Name' required value={formData.firstName} onChange={handleChange} />
                                </div>
                                <div className="input-wrapper my-1">
                                    <input type="number" name='age' className='w-full py-2 px-2 border-b-1 border-b-gray-400 placeholder:text-black transition-all' placeholder='Age' required value={formData.age} onChange={handleChange} />
                                </div>
                                <div className="input-wrapper my-1 relative w-full">
                                    <select name='lastCompletedGrade' className="w-full text-[16px] py-2 px-2 bg-transparent outline-none border-b border-gray-400 appearance-none" value={formData.lastCompletedGrade} onChange={handleChange}>
                                        <option value="" disabled defaultValue={'Last compelted grade'}>Last compelted grade</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>
                                    <img src={downImg} alt="" className='w-4 absolute right-2 top-1/2 -translate-y-1/2 rotate-180' />
                                </div>
                                <div className="input-wrapper my-1 relative w-full ">
                                    <select name='yearsOutOfSchool' className="w-full text-[16px] py-2 px-2 bg-transparent outline-none border-b border-gray-400 appearance-none" value={formData.yearsOutOfSchool} onChange={handleChange}>
                                        <option value="" disabled defaultValue={'Years out of school'}>Years out of school</option>
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
                                    <div className="flex flex-wrap gap-3 my-4">
                                        <button type="button" className={`flex-1 border rounded-md p-3 flex flex-col items-center hover:bg-gray-100 ${selectedPace === "Relaxed" ? "bg-gray-200 border-blue-500" : ""}`} onClick={() => handlePaceSelect("Relaxed")}>
                                            🐢 <span>Relaxed</span> <span className="text-xs">1-2 hours / day</span>
                                        </button>
                                        <button type="button" className={`flex-1 border rounded-md p-3 flex flex-col items-center hover:bg-gray-100 ${selectedPace === "Standard" ? "bg-gray-200 border-blue-500" : ""}`} onClick={() => handlePaceSelect("Standard")}>
                                            🚶‍♂️ <span>Standard</span> <span className="text-xs">3-4 hours / day</span>
                                        </button>
                                        <button type="button" className={`flex-1 border rounded-md p-3 flex flex-col items-center hover:bg-gray-100 ${selectedPace === "Accelerated" ? "bg-gray-200 border-blue-500" : ""}`} onClick={() => handlePaceSelect("Accelerated")}>
                                            🏃‍♂️ <span>Accelerated</span> <span className="text-xs">5-6 hours / day</span>
                                        </button>
                                    </div>
                                </div>
                                <button type="submit" className='bg-orange-400 text-white font-bold rounded-3xl px-12 py-2 hover:-translate-y-1 transition-all'>Start →</button>

                                <span className={`block my-2.5 scale-0 transition-all ${error ? 'scale-100' : ''}`}>{error}</span>
                            </form>
                        </div>
                        <div className="img-wrapper mt-8 lg:mt-0 flex justify-center">
                            <img src={onboardingImg} alt="onboarding-img" loading='lazy' className='w-[90%]' />
                        </div>
                    </div>
                </div>
            </FadeIn>
        </>

    )
}

export default Onboarding;