import React from 'react';
import logoHead from '../assets/darajat-logo.png';
import { MainLink } from '../Container';

const LessonPage: React.FC = () => {
    return (
        <div id='lesson-page' className="relative h-full">
            <div className="logo-head flex justify-start items-center">
                <img src={logoHead} alt="logo" className='w-5' />
                <h3 className='text-xl font-bold ml-2'>DARAJAT</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 h-full gap-2">
                <div className="lesson col-span-9 relative lg:h-full">
                    <h1 className='lesson-title text-2xl font-bold my-5'>Math - Functions (introduction & Types)</h1>
                    <div className="progress-bar py-5 px-4 border">

                        <div className="prgoress-head mb-2 mx-2 flex justify-between">
                            <h4 className=''>Reading:Functions - Chapter 2</h4>
                            <span className="Percentage">20%</span>
                        </div>
                        <div className='flex bars'>
                            <span className='rounded-2xl bg-gray-500 mx-1.5 h-3 flex-1'></span>
                            <span className='rounded-2xl bg-gray-500 mx-1.5 h-3 flex-1'></span>
                            <span className='rounded-2xl bg-gray-500 mx-1.5 h-3 flex-1'></span>
                            <span className='rounded-2xl bg-gray-500 mx-1.5 h-3 flex-1'></span>
                        </div>
                    </div>
                    <div className="lesson-content">
                        <h3 className="content-title font-bold text-xl mt-2">Reading: Functions - Chapter 2</h3>
                        <div className="main-content mt-5">

                            blablabla

                        </div>
                    </div>
                    <div className="btns">
                        <MainLink title='◀ Previous' route='#' className='bg-black! text-white! text-sm px-5! py-1.5! absolute bottom-0 left-2' />
                        <MainLink title='Next ▶' route='#' className='bg-black! text-white! text-sm px-5! py-1.5! absolute bottom-0 right-2' />
                    </div>
                </div>
                <div className='static-note col-span-3 lg:h-[160px] lg:w-[285px] my-3 shadow-md shadow-gray-400 py-3 bg-[#AFE9D9]'>
                    <h3 className="note-title text-xs lg:text-md font-bold px-3">Important Note</h3>
                    <hr className='my-1' />
                    <p className='text-[9px] lg:text-sm px-3 lg:py-1'>Content of week 3 will not be unlocked until week 2 is <span className='font-bold'>80% completed.</span> Delays will cause automatic adjustments to the learning plan.</p>
                </div>
            </div>
        </div>
    )
}

export default LessonPage;