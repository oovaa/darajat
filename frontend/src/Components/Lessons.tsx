import read from '../assets/agreement.png';
import checkmark from '../assets/checkmark.png'
import quizGame from '../assets/quiz-game.png'
import video from '../assets/video-player.png'

export default function Lessons() {
// The content of the day will be summarized in a specific function to generate [progress,
// subject, title, next content to be worked on]

type Lesson = {
    subject: string;
    title: string;
    material: string;
    type: 'done' | 'read' | 'questions' | 'video';
  };
  
  type Icon = {
    icon: string;
    attribute: string;
  };

  type Icons = {
    done: Icon;
    read: Icon;
    questions: Icon;
    video: Icon;
  };
const lessons: Lesson[] = [
    {subject: 'Math', title: 'Algebra - Quadratic Equations', material: 'Review practice problems', type: 'questions'},
    {subject: 'Chemistry', title: 'Chemical Reactions', material: '', type: 'done'},
    {subject: 'Physics', title: 'Newton’s Laws of Motion', material: 'Read Lesson 03', type: 'read'}
]
const icons: Icons = {
    done: {icon: checkmark, attribute: ''}, 
    read: {icon: read, attribute: 'bg-[#AFE9D9]'}, 
    questions: {icon: quizGame, attribute: 'bg-[#FFA7C4]'}, 
    video: {icon: video, attribute: 'bg-[#FF9500]'},
}


  return (
    <div>
        <div className="w-full pt-4 flex flex-col gap-4">

            {lessons.map((item, index) => (
                <div key={index} className="h-20 bg-[#F5F5F5] p-3 flex">
                    <div className={`flex justify-center items-center h-14 w-14 mx-2 rounded-full ${icons[item.type].attribute}`}>
                        <img className={`${item.type != 'done' && 'w-[60%] h-[60%]'}`}src={icons[item.type].icon}/>
                    </div>
                    <div className={`ml-4 flex flex-col justify-center ${item.type == 'done' && 'opacity-25'}`}>
                        <h1 className='text-xl font-bold'>{item.subject}: {item.title}</h1>
                        <p>{item.type != 'done' ? `Next: ${item.material}` : 'All Done! Great job.' }</p>
                    </div>
                </div>
            ))}
        </div>

    </div>
  )
}
