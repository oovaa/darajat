/* eslint-disable @typescript-eslint/no-explicit-any */
export const generateContent = (data: any) => {


    const week = Object.values(data.plan[0].weeks[0].daily_focus)
    const flattenedSubjects = week
    .flatMap((day: any) => Object.values(day.subjects).flat());
    console.log(flattenedSubjects);

    return flattenedSubjects;
}