import React, { useState, useEffect } from 'react';
import logoHead from '../assets/darajat-logo.png';
import { CircleCheckBig } from 'lucide-react'

interface Task {
    id: number;
    type: "video" | "quiz" | "reading" | "practice" | "lecture" | 'somthingElse';
    title: string;
    progress: number;
}

interface Lesson {
    id: number;
    title: string;
    tasks: Task[];
}

const MyLearning: React.FC = () => {
    // green note color : #AFE9D9
    // red note color : #FFA7C4

    const [lessons, setLessons] = useState<Lesson[] | any[]>([]);
    const [expanded, setExpanded] = useState<number | null>(null);

    useEffect(() => {
        const fetchedLessons = [
            { id: 1, title: 'Physics - Kinematics (Velocity & Acceleration)', tasks: [{ id: 1, title: 'Start reading', type: 'reading', progress: 100 }] },
            {
                id: 2, title: 'Math - Functions (Introduction & Types)', tasks: [
                    { id: 1, title: 'Reading: Fuctions - Chapter 2', type: 'reading', progress: 50 },
                    { id: 2, title: 'Video Lecture: Understanding Fuctions', type: 'video', progress: 0 },
                    { id: 3, title: 'Practice Problems', type: 'video', progress: 0 },
                ]
            },
            { id: 3, title: 'Reinforcement & Review: Mini Quiz', tasks: [{ id: 1, title: 'some quiz', type: 'quiz', progress: 100 }] },
        ];

        setLessons(fetchedLessons);
    }, []);

    const toggleLesson = (id: number) => {
        setExpanded(expanded === id ? null : id);
    };

    // Function to check if all tasks in a lesson are complete
    const isLessonComplete = (lesson: Lesson) => {
        return lesson.tasks.every(task => task.progress === 100);
    };

    return (
        <div id='my-learning' className='min-h-screen p-6 bg-[#FCF1CC]'>
            <div className="container lg:w-[94%] lg:ml-auto my-auto bg-white rounded-2xl p-8 shadow-md shadow-gray-300">
                <div className="logo-head flex justify-start items-center">
                    <img src={logoHead} alt="logo" className='w-5' />
                    <h3 className='text-xl font-bold ml-2'>DARAJAT</h3>
                </div>
                <h1 className='title text-3xl font-bold my-5'>My Learning</h1>
                <div className="week">
                    <div className="week-title">
                        <h3 className="font-bold m-0 p-0">Week 2</h3>
                        <p className=''>Thursday, March 14</p>
                    </div>
                    <div className="week-lessons">
                        {lessons.map((lesson) => (
                            <div key={lesson.id} className="border my-2 p-2">
                                <div className='flex justify-center items-center '>
                                    <CircleCheckBig size={'20px'} className={`mr-2 ${isLessonComplete(lesson) ? 'text-orange-400' : 'text-black'}`} />
                                    <button
                                        className="w-full flex justify-between items-center text-lg font-semibold "
                                        onClick={() => toggleLesson(lesson.id)}>
                                        {lesson.title}
                                        <span className='mr-2 text-xl'>{expanded === lesson.id ? "-" : "+"}</span>
                                    </button>
                                </div>
                                <div className={`mt-2 space-y-2 overflow-hidden transition-all duration-500 ${expanded === lesson.id && lesson.tasks.length > 0 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    {lesson.tasks.map((task: Task) => (
                                        <div key={task.id} className="p-2 bg-gray-100 rounded flex justify-between">
                                            <span>{task.title}</span>
                                            <span className="text-sm text-gray-600">{task.progress}% Done</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyLearning;