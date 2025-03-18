import React, { useState, useEffect } from 'react';
import { CircleCheckBig } from 'lucide-react';
import logoHead from '../assets/darajat-logo.png';
import { MainLink } from '../Container';
import { Link } from 'react-router-dom';

interface Task {
    id: number;
    title: string;
    task_type: "video" | "questions" | "read";
    progress: number;
    url: string;
}

interface Lesson {
    id: number;
    title: string;
    subject: string;
    tasks: Task[];
}

const MyLearning: React.FC = () => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [expanded, setExpanded] = useState<number | null>(null);

    useEffect(() => {
        const fetchedLessons: Lesson[] = [
            {
                id: 1,
                title: 'Kinematics (Velocity & Acceleration)',
                subject: 'Physics',
                tasks: [{ id: 1, title: 'Start reading', task_type: "read", url: `read`, progress: 100 }],
            },
            {
                id: 2,
                title: 'Functions (Introduction & Types)',
                subject: 'Math',
                tasks: [
                    { id: 1, title: 'Reading: Functions - Chapter 2', task_type: 'read', url: 'read', progress: 50 },
                    { id: 2, title: 'Video Lecture: Understanding Functions', task_type: 'video', url: 'video', progress: 100 },
                    { id: 3, title: 'Practice Problems', task_type: 'video', url: 'video', progress: 0 },
                ],
            },
            {
                id: 3,
                title: 'Reinforcement & Review: Mini Quiz',
                subject: 'Math',
                tasks: [{ id: 1, title: 'Some quiz', task_type: 'questions', url: 'questions', progress: 100 }],
            },
        ];
        setLessons(fetchedLessons);
    }, []);

    const toggleLesson = (id: number) => {
        setExpanded(expanded === id ? null : id);
    };

    const isLessonComplete = (lesson: Lesson) => {
        return lesson.tasks.every(task => task.progress === 100);
    };

    return (
        <div>
            <div className="logo-head flex justify-start items-center">
                <img src={logoHead} alt="logo" className='w-5' />
                <h3 className='text-xl font-bold ml-2'>DARAJAT</h3>
            </div>
            <h1 className='title text-3xl font-bold my-5'>My Learning</h1>
            <div className='week flex flex-col-reverse lg:grid lg:grid-cols-12 gap-2 lg:gap-10'>
                <div className="week-lessons col-span-8 items-start">
                    <div className="week-title">
                        <h3 className="font-bold m-0 p-0">Week 2</h3>
                        <p>Thursday, March 14</p>
                    </div>
                    {lessons.map((lesson) => (
                        <div key={lesson.id} className="border my-2 p-1">
                            <div className='flex justify-center items-center'>
                                <CircleCheckBig size={'20px'} className={`mr-2 ${isLessonComplete(lesson) ? 'text-orange-400' : 'text-black'}`} />
                                <button
                                    className="w-full flex justify-between items-center text-xs lg:text-sm font-semibold"
                                    onClick={() => toggleLesson(lesson.id)}>
                                    {lesson.subject} - {lesson.title}
                                    <span className='mr-2 text-xl'>{expanded === lesson.id ? "-" : "+"}</span>
                                </button>
                            </div>
                            <div className={`task mt-2 space-y-2 overflow-hidden transition-all duration-500 ${expanded === lesson.id && lesson.tasks.length > 0 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                {lesson.tasks.map((task: Task) => (
                                    <Link to={task.url} key={task.id} className='p-2 bg-gray-100 rounded flex items-center'>
                                        <CircleCheckBig size={'20px'} className={`mr-2 ${task.progress === 100 ? 'text-orange-400' : 'text-black'}`} />
                                        <span className='text-xs lg:text-sm flex-1'>{task.title}</span>
                                        <span className="text-xs lg:text-sm text-gray-600 mr-auto">{task.progress}% Done</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="notes col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-2 lg:justify-items-end">
                    <div className='static-note lg:h-[160px] lg:w-[285px] my-3 shadow-md shadow-gray-400 py-3 bg-[#AFE9D9]'>
                        <h3 className="note-title text-xs lg:text-md font-bold px-3">Important Note</h3>
                        <hr className='my-1' />
                        <p className='text-[9px] lg:text-sm px-3 lg:py-1'>Content of week 3 will not be unlocked until week 2 is <span className='font-bold'>80% completed.</span> Delays will cause automatic adjustments to the learning plan.</p>
                    </div>
                    <div className='danger-note lg:h-[160px] lg:w-[285px] my-3 shadow-md shadow-gray-400 py-3 bg-[#FFA7C4]'>
                        <h3 className="note-title text-xs lg:text-md font-bold px-3">Important Note</h3>
                        <hr className='my-1' />
                        <p className='text-[9px] lg:text-sm px-3 lg:py-1'>Week 2 ended without finishing the required materials. Do you want to extend the week or adjust your learning pace?</p>
                        <div className="btns px-3 sm:flex lg:justify-between flex-wrap items-center mt-2">
                            <MainLink title='Adjust Learning Pace' className='bg-black! p-0! lg:p-2! text-center lg:text-left text-[9px] text-white block! lg:inline-block! font-normal lg:font-bold' route='#' />
                            <MainLink title='Extend' className='bg-black! p-0! lg:p-2! text-center lg:text-left text-[9px] text-white block! lg:inline-block! font-normal lg:font-bold' route='#' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyLearning;