
interface ReadingMaterial{

    type: string,
    title: string,
    content: string,
}

interface Video{

    title:string,
    url:string,

}
interface VideoMaterial{
    type: string,
    content: Video[]

}

interface Question{
    question: string,
    options: string[],
    answer: number,
}

interface QuizContent{

    type: string,
    content:Question[],

}
interface Quiz{
    type:string,
    content: QuizContent,
}


interface Content {
    subject: string,
    "title": string,
    material: [ReadingMaterial,VideoMaterial,QuizContent],

}



export type { ReadingMaterial,Video,VideoMaterial,Question,QuizContent,Quiz, Content }