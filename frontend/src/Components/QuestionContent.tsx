import React from 'react';

export interface QuestionProps {
    question: string;
    options: string[];
    answer: number;
    selectedOption?: number | null; // Track selected option
    handleSelect?: (optionIndex: number) => void;
}

const QuestionContent: React.FC<QuestionProps> = ({ question, options, selectedOption, handleSelect }) => {
    return (
        <div>
            <h3 className='font-bold text-lg my-1'>{question}</h3>
            <form action="" onSubmit={(e) => e.preventDefault()}>

                {options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 my-1">
                        <input required
                            type="radio"
                            id={`option-${question}-${index}`}
                            name={`question-${question}`}
                            value={index}
                            checked={selectedOption === index}
                            onChange={() => handleSelect &&  handleSelect(index)}
                        />
                        <label htmlFor={`option-${question}-${index}`} className="cursor-pointer">
                            {option}
                        </label>
                    </div>
                ))}
            </form>
            
        </div>

    )
}

export default QuestionContent;