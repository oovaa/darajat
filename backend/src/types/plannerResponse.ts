interface StudyPlan {
  duration: string
  plan: MonthPlan[]
}

interface MonthPlan {
  month: number
  title: string
  focus: string
  subjects_covered: string[]
  goal: string
  weeks: WeekPlan[]
}

interface WeekPlan {
  days: string
  content: {
    [subject: string]: string[]
  }
  daily_focus: DailyFocus[]
}

interface DailyFocus {
  date: string
  day: string
  subjects: {
    [subject: string]: string[]
  }
}

export type { StudyPlan, MonthPlan, WeekPlan, DailyFocus }

// interface StudyPlan {
//   duration: string
//   plan: {
//     month: number
//     title: string
//     focus: string
//     subjects_covered: string[]
//     goal: string
//     weeks: {
//       days: string
//       content: {
//         [subject: string]: string[]
//       }
//       daily_focus: {
//         date: string
//         day: string
//         subjects: {
//           [subject: string]: string[]
//         }
//       }[]
//     }[]
//   }[]
// }

// export type { StudyPlan }
