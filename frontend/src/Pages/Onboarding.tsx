import React, { useState } from 'react';
import onboardingImg from '../assets/onboarding-img.png';
import downImg from '../assets/select-dwon.svg';
import { FadeIn, Header, MainLink } from '../Container';
import axios from 'axios';
import { generateContent } from '../Utils/generateContent';

type paceValue = "Relaxed" | "Standard" | "Accelerated";

const Onboarding: React.FC = () => {
    const [selectedPace, setSelectedPace] = useState("");
    const [formData, setFormData] = useState({
        firstName: '',
        age: '',
        lastCompletedGrade: '',
        yearsOutOfSchool: '',
        learningPace: ''
    });
    const [error, setError] = useState<string | null>('')
    const [loading, setLoading] = useState<boolean | null>(false)
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

        const learningPaceHours = {
            Relaxed: 2,
            Standard: 4,
            Accelerated: 6
        };
        // Define dataToSend before using it in useData
        const dataToSend = {
            hoursPerDay: 0, // Default or initial value
            titles: [] as string[], // Specify that titles is an array of strings
            lastYear: 0,
            yearsMissed: 0
        };
        // Update the existing dataToSend object
        dataToSend.hoursPerDay = learningPaceHours[formData.learningPace as keyof typeof learningPaceHours];
        dataToSend.titles = ["Mathematics", "Physics", "Biology"];
        dataToSend.lastYear = parseInt(formData.lastCompletedGrade, 10);
        dataToSend.yearsMissed = parseInt(formData.yearsOutOfSchool, 10);

        setLoading(true);
        try {
            const response = await axios.post('#', dataToSend, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.data) {
                localStorage.setItem('studyPlan', JSON.stringify(response.data));
                console.log(response.data);
                const processedData = generateContent(response.data);
                console.log(processedData);

                
                const secondResponse = await axios.post('#', processedData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    
                });
                console.log(secondResponse.data);
            }
        } catch (error) {
            setError('Failed to fetch study plan. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // const [expanded, setExpanded] = useState<boolean>(false)
    // // const rotateArrow = (key: number) => {
    // //     setExpanded(!expanded);
    // // }
    return (
        <div className='min-h-screen'>
            {loading && <div className="loading-spinner">Loading...</div>}
            <Header />
            <FadeIn>
                <div id='onboarding' className='p-4 mt-12 lg:mt-0 lg:min-h-[calc(100vh-47.98px)] bg-[#FCF1CC] flex justify-center items-center'>
                    <div className="container relative lg:w-[75%] lg:h-[clac(100vh - 4.44vh)] mx-auto bg-white grid grid-cols-1 lg:grid-cols-2 justify-items-center items-center rounded-2xl shadow-md shadow-gray-300 p-7 overflow-hidden">
                        <MainLink title='← Home' route='/' className='absolute left-0 -top-2 rounded-l-none' />
                        <div className="form-wrapper text-center lg:text-left w-full flex-1">
                            <div className="form-header">
                                <h1 className='text-3xl font-bold mt-6 mb-3'>Onboarding</h1>
                            </div>
                            <form action="" onSubmit={handleSubmit}>
                                <div className="input-wrapper my-0.5">
                                    <input type="text" name='firstName' className='w-full py-1.5 px-2 border-b-1 border-b-gray-400 placeholder:text-black transition-all' placeholder='First Name' required value={formData.firstName} onChange={handleChange} />
                                </div>
                                <div className="input-wrapper my-0.5">
                                    <input type="number" name='age' className='w-full py-1.5 px-2 border-b-1 border-b-gray-400 placeholder:text-black transition-all' placeholder='Age' required value={formData.age} onChange={handleChange} />
                                </div>
                                <div className="input-wrapper my-0.5 relative w-full">
                                    <select name='lastCompletedGrade' required className="w-full text-md py-1.5 px-2 bg-transparent outline-none border-b border-gray-400 appearance-none" value={formData.lastCompletedGrade} onChange={handleChange}>
                                        <option value="" disabled defaultValue={'Last compelted grade'}>Last compelted grade</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>
                                    <img src={downImg} alt="" className='w-3.5 absolute right-2 top-1/2 -translate-y-1/2 rotate-180' />
                                </div>
                                <div className="input-wrapper my-0.5 relative w-full ">
                                    <select name='yearsOutOfSchool' required className="w-full text-md py-1.5 px-2 bg-transparent outline-none border-b border-gray-400 appearance-none" value={formData.yearsOutOfSchool} onChange={handleChange}>
                                        <option value="" disabled defaultValue={'Years out of school'}>Years out of school</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                    <img src={downImg} alt="" className='w-3.5 absolute right-2 top-1/2 -translate-y-1/2 rotate-180' />
                                </div>
                                <div className="paces">
                                    <h3 className='my-4 font-bold'>What is your learning pace?</h3>
                                    <div className="flex flex-wrap gap-3 my-3">
                                        <button type="button" className={`flex-1 border rounded-md p-1 flex flex-col items-center hover:bg-gray-100 ${selectedPace === "Relaxed" ? "bg-gray-200 border-blue-500" : ""}`} onClick={() => handlePaceSelect("Relaxed")}>
                                            🐢 <span>Relaxed</span> <span className="text-xs">1-2 hours / day</span>
                                        </button>
                                        <button type="button" className={`flex-1 border rounded-md p-1 flex flex-col items-center hover:bg-gray-100 ${selectedPace === "Standard" ? "bg-gray-200 border-blue-500" : ""}`} onClick={() => handlePaceSelect("Standard")}>
                                            🚶‍♂️ <span>Standard</span> <span className="text-xs">3-4 hours / day</span>
                                        </button>
                                        <button type="button" className={`flex-1 border rounded-md p-1 flex flex-col items-center hover:bg-gray-100 ${selectedPace === "Accelerated" ? "bg-gray-200 border-blue-500" : ""}`} onClick={() => handlePaceSelect("Accelerated")}>
                                            🏃‍♂️ <span>Accelerated</span> <span className="text-xs">5-6 hours / day</span>
                                        </button>
                                    </div>
                                </div>
                                <button type="submit" className='bg-orange-400 text-white font-bold rounded-3xl px-12 py-2 mt-1 hover:-translate-y-1 transition-all'>Start →</button>
                                <span className={` text-red-600 block my-2.5 scale-0 transition-all ${error ? 'scale-100' : ''}`}>{error}</span>
                            </form>
                        </div>
                        <div className="img-wrapper mt-8 lg:mt-0 flex justify-center">
                            <img src={onboardingImg} alt="onboarding-img" loading='lazy' className='w-[75%]' />
                        </div>
                    </div>
                </div>
            </FadeIn>
        </div>

    )
}

export default Onboarding;