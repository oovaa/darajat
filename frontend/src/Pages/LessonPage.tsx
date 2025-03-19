import React, { useState, useEffect } from 'react';
import logoHead from '../assets/darajat-logo.png';
import { QuestionContent, VideoContent, ReadingContent, FadeIn, MainLink } from '../Container';
import { useParams } from 'react-router-dom';
import { fetchedSubjects, SubjectContent } from './MyLearning';

interface LessonPageProps {
    content: SubjectContent[];
}

const LessonPage: React.FC<LessonPageProps> = ({ content = fetchedSubjects }) => {

    const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
    const [currentMaterialIndex, setCurrentMaterialIndex] = useState(0);

    const { subject, title, type } = useParams<{ subject: string; title: string; type: string }>();
    useEffect(() => {
        // Find the lesson based on the subject and title from the URL
        const lessonIndex = content.findIndex(lesson => lesson.subject === subject && lesson.title === title);

        if (lessonIndex !== -1) {
            setCurrentSubjectIndex(lessonIndex);
            // Find the material based on the type from the URL
            const materialIndex = content[lessonIndex].material.findIndex(material => material.type === type);
            if (materialIndex !== -1) {
                setCurrentMaterialIndex(materialIndex);
            }
        }
    }, [subject, title, type, content]);
    const currentSubject = content[currentSubjectIndex];
    const currentMaterial = currentSubject.material[currentMaterialIndex];


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
            setCurrentMaterialIndex((prev) => prev + 1);
            // } else if (currentSubjectIndex < content.length - 1) {
            //     setCurrentSubjectIndex(prev => prev + 1);
            //     setCurrentMaterialIndex(0);
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


                            {currentMaterial.type === 'questions' && typeof currentMaterial.content === 'object' && 'questions' in currentMaterial.content && Array.isArray(currentMaterial.content.questions) &&
                                currentMaterial.content.questions.map((q, index) => (
                                    <FadeIn key={index}>
                                        <QuestionContent
                                            question={q.question}
                                            options={q.options}
                                            answer={q.answer}
                                            selectedOption={selectedOptions[index] ?? null}
                                            handleSelect={(optionIndex) => setSelectedOptions((prev) => ({ ...prev, [index]: optionIndex }))}
                                        />
                                    </FadeIn>
                                ))
                            }
                            {currentMaterial.type === 'video' && Array.isArray(currentMaterial.content) &&
                                currentMaterial.content.map((video, index) => (
                                    <FadeIn key={index}>
                                        <VideoContent url={video.url} />
                                    </FadeIn>
                                ))
                            }
                            {currentMaterial.type === 'read' && typeof currentMaterial.content === 'string' &&
                                <FadeIn>
                                    <ReadingContent title={currentMaterial.title || ''} summary={currentMaterial.content} />
                                </FadeIn>
                            }

                            {/* {material.type === 'video' && Array.isArray(material.content) &&
                                        material.content.map((video, index) => (
                                            <FadeIn key={index}>
                                                <VideoContent url={video.url} />
                                            </FadeIn>
                                        ))
                                    }
                                    {material.type === 'read' && typeof material.content === 'string' &&
                                        <FadeIn>
                                            <ReadingContent title={material.title || ''} summary={material.content} />
                                        </FadeIn>
                                    } */}
                            {/* {currentMaterial.type === 'questions' &&
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
                            } */}
                            {/* {
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
                            } */}
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
                <MainLink title='← Dashboard' route='/mylearning' className='bg-black! absolute top-3 left-3' />
                <h2 className='font-bold text-xl lg:text-3xl '>You completed all lessons for this subject <span className='inline-block animate-bounce'>🚀</span></h2>
            </div>
        </div >
    )
}

export default LessonPage;