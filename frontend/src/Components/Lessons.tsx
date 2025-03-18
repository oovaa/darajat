import read from '../assets/agreement.png';
import checkmark from '../assets/checkmark.png'
import quizGame from '../assets/quiz-game.png'
import video from '../assets/video-player.png'

export default function Lessons() {
// The content of the day will be summarized in a specific function to generate [progress,
// subject, title, next content to be worked on]
const lessons = [
    {subject: 'Math', title: 'Algebra - Quadratic Equations', material: 'Review practice problems', type: 'questions'},
    {subject: 'Chemistry', title: 'Chemical Reactions', material: '', type: 'done'},
    {subject: 'Physics', title: 'Newton’s Laws of Motion', material: 'Read Lesson 03', type: 'read'}
]
const icons = {
    done: {icon: checkmark, attribute: 'w-full h-full'}, 
    read: {icon: read, attribute: 'bg-[#AFE9D9]'}, 
    questions: {icon: quizGame, attribute: 'bg-[#FFA7C4]'}, 
    video: {icon: video, attribute: 'bg-[#FF9500]'},
}

  return (
    <div>
        <div className="w-full pt-4">
            {lessons.map((item, index) => (
                <div key={index} className="h-10 bg-[#F5F5F5] p-2 flex">
                    <div className='h-5 w-5 bg-amber-500'>

                    </div>

                </div>
            ))}
        </div>

    </div>
  )
}
