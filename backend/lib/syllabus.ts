export const syllabus = [
  `
  `,
  `
  
  `,
  `
`
]
export function calcSyllabus(lastYear:number,yearsMissed:number){
    let text = ""
    for(let i=(lastYear-10)+1;i++;i<yearsMissed){
        text+=syllabus[i]
    }
    return text
}

