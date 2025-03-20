import React, { useState, useEffect } from 'react';
import { CircleCheckBig } from 'lucide-react';
import logoHead from '../assets/darajat-logo.png';
import { MainLink } from '../Container';
import { Link } from 'react-router-dom';
import { QuestionProps } from '../Components/QuestionContent';
// import axios from 'axios';

export interface Material {
    id?: number;
    type: 'read' | 'video' | 'questions';
    title?: string;
    content:
    | string // For 'read' type
    | { title: string; url: string }[] // For 'video' type
    | { type: 'mcqs'; questions: QuestionProps[] }; // For 'questions' type
    progress?: number;
}

export interface SubjectContent {
    id?: number;
    subject: string;
    title: string;
    material: Material[];
}

export interface FetchedData {
    date: string;
    content: SubjectContent[];
}

export const dummyData: FetchedData = {
    date: '2025-03-16',
    content: [
        {
            subject: 'Physics',
            title: 'Kinematics',
            material: [
                {
                    type: 'read',
                    title: 'Functions - Chapter 2',
                    content: 'URL or text content here',
                },
                {

                    type: 'video',
                    content: [
                        {
                            title: 'Understanding Kinematics',
                            url: 'https://www.youtube.com/watch?v=JNFknI78WYY',
                        },
                    ],
                },
                {
                    type: 'questions',
                    content: {
                        type: 'mcqs',
                        questions: [
                            {
                                question: 'What is the formula for velocity?',
                                options: ['v = d/t', 'v = t/d', 'v = d × t'],
                                answer: 0,
                            },
                            {
                                question: 'Which of the following is a vector quantity?',
                                options: ['Speed', 'Velocity', 'Distance'],
                                answer: 1,
                            },
                        ],
                    },
                },
            ],
        },
        {
            subject: 'Mathematics',
            title: 'Functions',
            material: [
                {
                    type: 'read',
                    title: 'Introduction to Functions',
                    content: 'URL or text content here',
                },
                {
                    type: 'video',
                    content: [
                        {
                            title: 'Functions and Their Graphs',
                            url: 'https://www.youtube.com/watch?v=JNFknI78WYY',
                        },
                    ],
                },
                {
                    type: 'questions',
                    content: {
                        type: 'mcqs',
                        questions: [
                            {

                                question: 'What is the domain of f(x) = 1/x?',
                                options: ['All real numbers', 'All real numbers except 0', 'Only positive numbers'],
                                answer: 1,
                            },
                        ],
                    },
                },
            ],
        },
    ],
};

const stored

const MyLearning: React.FC = () => {
    const [subjects, setSubjects] = useState<SubjectContent[]>([]);
    const [date, setDate] = useState<string>('');

    const [expanded, setExpanded] = useState<number | null>(null);

    useEffect(() => {
        // Fetch data from API
        // const fetchData = async () => {
        //     try {
        //         const response = await axios.get<FetchedData>('#');

        //         const assignIds = (subjects: SubjectContent[]) => {
        //             let subjectId = 1;
        //             let materialId = 1;
        //             return subjects.map(subject => ({
        //                 ...subject,
        //                 id: subjectId++,
        //                 material: subject.material.map(material => ({
        //                     ...material,
        //                     id: materialId++
        //                 }))
        //             }));
        //         };

        //         setDate(response.data.date);
        //         setSubjects(assignIds(response.data.content));
        //     }
        //     catch (err) {
        //         console.error('Error fetching data:', err);
        //     }
        // }

        // fetchData();

        // Assign unique IDs to subjects and materials
        const assignIds = (subjects: SubjectContent[]) => {
            let subjectId = 1;
            let materialId = 1;
            return subjects.map(subject => ({
                ...subject,
                id: subjectId++,
                material: subject.material.map(material => ({
                    ...material,
                    id: materialId++
                }))
            }));
        };
        setDate(dummyData.date);
        setSubjects(assignIds(dummyData.content));
    }, []);

    const togglesubject = (id: number) => {
        setExpanded(expanded === id ? null : id);
    };

    const isSubjectComplete = (subject: SubjectContent) => {
        return subject.material.every(task => task.progress === 100);
    };

    return (
        <div>
            <div className="logo-head flex justify-start items-center">
                <img src={logoHead} alt="logo" className='w-5' />
                <h3 className='text-xl font-bold ml-2'>DARAJAT</h3>
            </div>
            <h1 className='title text-3xl font-bold my-5'>My Learning</h1>
            <div className='week flex flex-col-reverse lg:grid lg:grid-cols-12 gap-2 lg:gap-10'>
                <div className="week-subjects col-span-8 items-start">
                    <div className="week-title">
                        <h3 className="font-bold m-0 p-0">Week 2</h3>
                        <p>{new Date(date).toLocaleDateString()}</p>
                    </div>
                    {subjects.map((subject) => (
                        <div key={subject.id} className="border my-2 p-1">
                            <div className='flex justify-center items-center'>
                                <CircleCheckBig size={'20px'} className={`mr-2 ${isSubjectComplete(subject) ? 'text-orange-400' : 'text-black'}`} />
                                <button
                                    className="w-full flex justify-between items-center text-xs lg:text-sm font-semibold"
                                    onClick={() => togglesubject(subject.id!)}>
                                    {subject.subject} - {subject.title}
                                    <span className='mr-2 text-xl'>{expanded === subject.id ? "-" : "+"}</span>
                                </button>
                            </div>
                            <div className={`material mt-2 space-y-2 overflow-hidden transition-all duration-500 ${expanded === subject.id && subject.material.length > 0 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                {
                                    subject.material.map((material: Material) => (
                                        <Link to={`/lesson/${subject.subject}/${subject.title}/${material.type}`} key={material.id} className='p-2 bg-gray-100 rounded flex items-center'>
                                            <CircleCheckBig size={'20px'} className={`mr-2 ${material.progress === 100 ? 'text-orange-400' : 'text-black'}`} />
                                            <span className='text-xs lg:text-sm flex-1'>
                                                {material.type} - {material.type === 'read' ? material.title : (material.type === 'video' && Array.isArray(material.content) ? material.content[0].title : (material.type === 'questions' && typeof material.content === 'object' && 'type' in material.content ? material.content.type : ''))}
                                            </span>
                                            <span className="text-xs lg:text-sm text-gray-600 mr-auto">{material.progress}% Done</span>
                                        </Link>
                                    ))
                                }
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