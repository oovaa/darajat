import React, { useState } from 'react';
import logoHead from '../assets/darajat-logo.png';
import { QuestionContent, VideoContent, ReadingContent, FadeIn, MainLink } from '../Container';
import { QuestionProps } from '../Components/QuestionContent';


interface Material {
    type: 'read' | 'video' | 'questions';
    title?: string;
    content:
    | string // For 'read' type
    | { title: string; url: string }[] // For 'video' type
    | { type: 'mcqs'; questions: QuestionProps[] }; // For 'questions' type
    progress?: number;
}


interface SubjectContent {
    subject: string;
    title: string;
    material: Material[];
}
interface LessonPageProps {
    content: SubjectContent[];
}

const dummyContent: SubjectContent[] = [
    {
        subject: 'Physics',
        title: 'Kinematics',
        material: [
            {
                type: 'read',
                title: 'Functions - Chapter 2',
                content: 'This is the text content for the reading material. (physics)',
            },
            {
                type: 'video',
                title: 'Understanding Kinematics',
                content: [
                    {
                        title: 'Introduction to Kinematics',
                        url: 'https://www.youtube.com/watch?v=-tekPImQcU0',
                    },
                ],
            },
            {
                type: 'questions',
                title: 'Practice Questions',
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
        subject: 'Math',
        title: 'Functions',
        material: [
            {
                type: 'read',
                title: 'Functions (Introduction & Types)',
                content: 'This is the text content for the introduction to functions. (math)',
            },
            {
                type: 'video',
                title: 'Understanding Functions',
                content: [
                    {
                        title: 'Basics of Functions',
                        url: 'https://www.youtube.com/watch?v=-tekPImQcU0',
                    },
                ],
            },
        ],
    },
];

const LessonPage: React.FC<LessonPageProps> = ({ content = dummyContent }) => {


    const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
    const [currentMaterialIndex, setCurrentMaterialIndex] = useState(0);

    const currentSubject = content[currentSubjectIndex];
    const currentMaterial = currentSubject.material[currentMaterialIndex];


    // calculating total progress for current subject

    const totalProgress = currentSubject.material.reduce(
        (sum, material) => sum + (material.progress || 0), 0) / currentSubject.material.length;

    // for questions
    const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number | null }>({});

    const [noPreviousMessage, setNoPreviousMessage] = useState(false);
    // lesson compelted functionlity 
    const [lessonCompleted, setLessonCompleted] = useState(false);

    const handlePrevious = () => {
        if (currentMaterialIndex > 0) {
            setCurrentMaterialIndex((prev) => prev - 1);
            setNoPreviousMessage(false);
        } else if (currentSubjectIndex > 0) {
            setCurrentSubjectIndex((prev) => prev - 1);
            setCurrentMaterialIndex(content[currentSubjectIndex - 1].material.length - 1);
            setNoPreviousMessage(false);
        } else {
            setNoPreviousMessage(true);
            setTimeout(() => setNoPreviousMessage(false), 2000);
        }
        setLessonCompleted(false)
    };

    const handleNext = () => {

        const updatedContent = [...content];

        if (!updatedContent[currentSubjectIndex].material[currentMaterialIndex].progress) {
            updatedContent[currentSubjectIndex].material[currentMaterialIndex].progress = 100;
        }

        if (currentMaterialIndex < currentSubject.material.length - 1) {
            setCurrentMaterialIndex(prev => prev + 1);
        } else if (currentSubjectIndex < content.length - 1) {
            setCurrentSubjectIndex(prev => prev + 1);
            setCurrentMaterialIndex(0);
        }
        else {
            setLessonCompleted(true);
        }
    };


    const handleNextClick = (e: React.MouseEvent) => {
        if (currentMaterial.type === 'questions' && !allQuestionsAnswered()) {
            e.preventDefault();
            alert('Please answer all questions before proceeding.');
        } else {
            handleNext();  // Proceed with the next content
        }
    };

    const allQuestionsAnswered = () => {
        if (currentMaterial.type === 'questions') {
            return (
                typeof currentMaterial.content === 'object' &&
                'questions' in currentMaterial.content &&
                Array.isArray(currentMaterial.content.questions) &&
                currentMaterial.content.questions.every((q, index) => selectedOptions.hasOwnProperty(index))
            );
        }
        return true;
    };

    return (
        <div id='lesson-page' className="relative h-full">
            <div className="logo-head flex justify-start items-center">
                <img src={logoHead} alt="logo" className='w-5' />
                <h3 className='text-xl font-bold ml-2'>DARAJAT</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 h-full gap-2">
                <div className="lesson col-span-9 relative lg:h-full">
                    <h1 className='lesson-title text-2xl font-bold my-5'>{currentSubject.subject} - {currentSubject.title}</h1>
                    <div className="progress-bar py-5 px-4 border">
                        <div className="prgoress-head mb-2 mx-2 flex justify-between">
                            <h4 className=''>{currentSubject.title}</h4>
                            <span className="Percentage">{Math.round(totalProgress)}%</span>
                        </div>
                        <div className='flex bars'>
                            {
                                currentSubject.material.map((material, index) => (
                                    <span key={index} className={`rounded-2xl mx-1.5 h-3 flex-1 ${material.progress && material.progress >= 100 ? 'bg-gray-500' : 'bg-gray-300'}`}></span>
                                ))
                            }
                        </div>
                    </div>
                    <div className="lesson-content">
                        <h3 className="content-title font-bold text-xl mt-2">{currentMaterial.type} - {currentMaterial.title}</h3>
                        <div className="main-content mt-5">

                            {currentMaterial.type === 'questions' &&
                                typeof currentMaterial.content === 'object' &&
                                'questions' in currentMaterial.content &&
                                Array.isArray(currentMaterial.content.questions) &&
                                currentMaterial.content.questions.map((q, index) => (
                                    <FadeIn>
                                        <QuestionContent
                                            key={index}
                                            question={q.question}
                                            options={q.options}
                                            answer={q.answer}
                                            selectedOption={selectedOptions[index] ?? null}
                                            handleSelect={(optionIndex) => setSelectedOptions((prev) => ({ ...prev, [index]: optionIndex }))}

                                        />
                                    </FadeIn>
                                ))
                            }
                            {
                                currentMaterial.type === 'video' &&
                                Array.isArray(currentMaterial.content) &&
                                currentMaterial.content.map((video, index) => (
                                    <FadeIn>
                                        <VideoContent key={index} url={video.url} />
                                    </FadeIn>
                                ))
                            }
                            {
                                currentMaterial.type === 'read' &&
                                typeof currentMaterial.content === 'string' &&
                                <FadeIn>
                                    <ReadingContent title={currentMaterial.title || ''} summary={currentMaterial.content} />
                                </FadeIn>
                            }
                        </div>
                    </div>
                    <div className="btns">

                        <button
                            onClick={handlePrevious}
                            className={`bg-black text-white text-sm border-none px-5 py-1.5 absolute bottom-2 left-2 rounded-2xl hover:-translate-y-1 transition-all }`}
                        >
                            ◀ Previous
                        </button>

                        <p className={`text-black font-bold text-sm absolute bottom-12 left-2 transition-all ${noPreviousMessage ? 'scale-100' : 'scale-0'}`}>There is no more previous pages!</p>

                        <button
                            onClick={handleNextClick}
                            disabled={!allQuestionsAnswered()}  // Disable if not all questions are answered
                            className={`bg-black text-white text-sm border-none px-5 py-1.5 absolute bottom-2 right-2 rounded-2xl hover:-translate-y-1 transition-all ${!allQuestionsAnswered() ? 'cursor-not-allowed opacity-50' : ''}`}
                        >
                            Next ▶
                        </button>

                    </div>
                </div>
                <div className='static-note col-span-3 lg:h-[160px] lg:w-[285px] my-3 shadow-md shadow-gray-400 py-3 bg-[#AFE9D9]'>
                    <h3 className="note-title text-xs lg:text-md font-bold px-3">Important Note</h3>
                    <hr className='my-1' />
                    <p className='text-[9px] lg:text-sm px-3 lg:py-1'>Content of week 3 will not be unlocked until week 2 is <span className='font-bold'>80% completed.</span> Delays will cause automatic adjustments to the learning plan.</p>
                </div>
            </div>

            {/* this is the message appear when the user complete all lessons */}
            {
                lessonCompleted &&
                <div className={`fixed top-0 left-0 w-full h-full bg-[rgba(33, 33, 33, 0.5)] backdrop-blur-md z-[98]`}></div>
            }
            <div className={`completion-message w-full h-full fixed top-0 left-0 text-xl flex justify-center items-center  z-[99] ${lessonCompleted ? 'scale-100' : 'scale-0'}`}>
                <MainLink title='← Dashboard' route='/dashboard' className='bg-black! absolute top-3 left-3'/>
                <h2 className='font-bold text-xl lg:text-3xl '>You completed all lessons for today <span className='inline-block animate-bounce'>🚀</span></h2>
            </div>

        </div >
    )
}

export default LessonPage;