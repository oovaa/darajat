import { useEffect, useState } from "react";
import logoHead from "../assets/darajat-logo.png";
import { MainLink } from "../Container";

interface DailyFocus {
  date: string;
  day: string;
  subjects: Record<string, string[]>;
}

interface Week {
  days: string;
  content: Record<string, string[]>;
  daily_focus: DailyFocus[];
}

interface Plan {
  month: number;
  title: string;
  focus: string;
  subjects_covered: string[];
  goal: string;
  weeks: Week[];
}

interface StudyPlan {
  duration: string;
  plan: Plan[];
}

export default function LearningPlan() {
  const [plans, setPlans] = useState<StudyPlan | {}>({});

  useEffect(() => {
    const fetchedPlans = {
      duration: "6 months",
      plan: [
        {
          month: 1,
          title: "Month 1 - Introduction & Basics",
          focus: "Introduction to core concepts and foundational skills",
          subjects_covered: ["Mathematics", "Physics", "Chemistry"],
          goal: "Familiarize students with fundamental principles and problem-solving techniques",
          weeks: [
            {
              days: "January 1 - January 5",
              content: {
                Mathematics: ["Basic Algebra", "Arithmetic Operations"],
                Physics: ["Introduction to Motion", "Forces"],
                Chemistry: ["Introduction to Elements", "Basic Reactions"],
              },
            },
            {
              days: "January 8 - January 12",
              content: {
                Mathematics: ["Linear Equations", "Graphing Basics"],
                Physics: ["Laws of Motion", "Gravity"],
                Chemistry: ["States of Matter", "Chemical Changes"],
              },
            },
          ],
        },
        {
          month: 2,
          title: "Month 2 - Conceptual Expansion",
          focus: "Deepening understanding and applying knowledge",
          subjects_covered: ["Mathematics", "Physics", "Chemistry"],
          goal: "Encourage analytical thinking and practical application of concepts",
          weeks: [
            {
              days: "February 5 - February 9",
              content: {
                Mathematics: ["Quadratic Equations", "Functions"],
                Physics: ["Energy and Work", "Momentum"],
                Chemistry: ["Chemical Bonding", "Periodic Trends"],
              },
            },
            {
              days: "February 12 - February 16",
              content: {
                Mathematics: ["Polynomials", "Coordinate Geometry"],
                Physics: ["Electricity & Circuits", "Magnetism"],
                Chemistry: ["Acids and Bases", "Reaction Rates"],
              },
            },
          ],
        },
        {
          month: 3,
          title: "Month 1 - Foundation & Refresh",
          focus: "Building strong fundamentals in core subjects",
          subjects_covered: ["Mathematics", "Physics", "Chemistry"],
          goal: "Strengthen basic concepts and ensure foundational understanding",
          weeks: [
            {
              days: "March 4 - March 8",
              content: {
                Mathematics: ["Functions", "Domain & Range"],
                Physics: ["Kinematics", "Displacement", "Velocity"],
                Chemistry: ["Atomic Structure", "Periodic Table"],
              },
              daily_focus: [
                {
                  date: "March 4",
                  day: "Monday",
                  subjects: {
                    Mathematics: ["Functions"],
                    Physics: ["Kinematics"],
                  },
                },
                {
                  date: "March 5",
                  day: "Tuesday",
                  subjects: {
                    Mathematics: ["Domain & Range"],
                    Physics: ["Displacement"],
                  },
                },
                {
                  date: "March 6",
                  day: "Wednesday",
                  subjects: {
                    Mathematics: ["Functions Applications"],
                    Physics: ["Velocity"],
                  },
                },
                {
                  date: "March 7",
                  day: "Thursday",
                  subjects: {
                    Chemistry: ["Atomic Structure"],
                  },
                },
                {
                  date: "March 8",
                  day: "Friday",
                  subjects: {
                    Chemistry: ["Periodic Table"],
                  },
                },
              ],
            },
            {
              days: "March 11 - March 15",
              content: {
                Mathematics: ["Equations", "Inequalities"],
                Physics: ["Newton’s Laws"],
                Chemistry: ["Chemical Bonding"],
              },
              daily_focus: [
                {
                  date: "March 11",
                  day: "Monday",
                  subjects: {
                    Mathematics: ["Equations"],
                    Physics: ["Newton’s First Law"],
                  },
                },
                {
                  date: "March 12",
                  day: "Tuesday",
                  subjects: {
                    Mathematics: ["Inequalities"],
                    Physics: ["Newton’s Second Law"],
                  },
                },
                {
                  date: "March 13",
                  day: "Wednesday",
                  subjects: {
                    Physics: ["Newton’s Third Law"],
                    Chemistry: ["Chemical Bonding"],
                  },
                },
                {
                  date: "March 14",
                  day: "Thursday",
                  subjects: {
                    Chemistry: ["Intermolecular Forces"],
                  },
                },
                {
                  date: "March 15",
                  day: "Friday",
                  subjects: {
                    Chemistry: ["Molecular Geometry"],
                  },
                },
              ],
            },
          ],
        },
        {
          month: 4,
          title: "Month 2 - Intermediate Concepts",
          focus: "Expanding understanding and problem-solving skills",
          subjects_covered: ["Mathematics", "Physics", "Chemistry"],
          goal: "Enhance application skills and deepen conceptual knowledge",
          weeks: [
            {
              days: "April 1 - April 5",
              content: {
                Mathematics: ["Quadratic Functions", "Polynomials"],
                Physics: ["Work, Energy, Power"],
                Chemistry: ["Stoichiometry", "Gas Laws"],
              },
              daily_focus: [
                {
                  date: "April 1",
                  day: "Monday",
                  subjects: {
                    Mathematics: ["Quadratic Functions"],
                    Physics: ["Work"],
                  },
                },
                {
                  date: "April 2",
                  day: "Tuesday",
                  subjects: {
                    Mathematics: ["Polynomials"],
                    Physics: ["Energy"],
                  },
                },
                {
                  date: "April 3",
                  day: "Wednesday",
                  subjects: {
                    Physics: ["Power"],
                    Chemistry: ["Stoichiometry"],
                  },
                },
                {
                  date: "April 4",
                  day: "Thursday",
                  subjects: { Chemistry: ["Gas Laws"] },
                },
                {
                  date: "April 5",
                  day: "Friday",
                  subjects: { Chemistry: ["Kinetic Molecular Theory"] },
                },
              ],
            },
          ],
        },
        {
          month: 5,
          title: "Month 3 - Advanced Topics & Applications",
          focus: "Challenging concepts and practical problem-solving",
          subjects_covered: ["Mathematics", "Physics", "Chemistry"],
          goal: "Prepare for complex problem-solving and real-world applications",
          weeks: [
            {
              days: "May 6 - May 10",
              content: {
                Mathematics: ["Calculus Basics", "Differentiation"],
                Physics: ["Momentum", "Impulse"],
                Chemistry: ["Thermodynamics", "Reaction Rates"],
              },
              daily_focus: [
                {
                  date: "May 6",
                  day: "Monday",
                  subjects: {
                    Mathematics: ["Calculus Basics"],
                    Physics: ["Momentum"],
                  },
                },
                {
                  date: "May 7",
                  day: "Tuesday",
                  subjects: {
                    Mathematics: ["Differentiation"],
                    Physics: ["Impulse"],
                  },
                },
                {
                  date: "May 8",
                  day: "Wednesday",
                  subjects: {
                    Physics: ["Conservation of Momentum"],
                    Chemistry: ["Thermodynamics"],
                  },
                },
                {
                  date: "May 9",
                  day: "Thursday",
                  subjects: { Chemistry: ["Reaction Kinetics"] },
                },
                {
                  date: "May 10",
                  day: "Friday",
                  subjects: { Chemistry: ["Catalysts and Enzymes"] },
                },
              ],
            },
          ],
        },
        {
          month: 6,
          title: "Month 6 - Final Review and Mastery",
          focus: "Ensuring readiness for applications and advanced topics",
          subjects_covered: ["Mathematics", "Physics", "Chemistry"],
          goal: "Achieve confidence in all core concepts and apply them effectively",
          weeks: [
            {
              days: "June 3 - June 7",
              content: {
                Mathematics: ["Advanced Problem Solving"],
                Physics: ["Final Concepts Review"],
                Chemistry: ["Organic Chemistry Basics"],
              },
              daily_focus: [
                {
                  date: "June 3",
                  day: "Monday",
                  subjects: {
                    Mathematics: ["Advanced Equations"],
                    Physics: ["Motion in 2D"],
                  },
                },
                {
                  date: "June 4",
                  day: "Tuesday",
                  subjects: {
                    Mathematics: ["Probability and Statistics"],
                    Chemistry: ["Organic Chemistry Reactions"],
                  },
                },
              ],
            },
          ],
        },
      ],
    };
    setPlans(fetchedPlans);
  }, []);

  return (
    <div>
      <div className="logo-head flex justify-start items-center">
        <img src={logoHead} alt="logo" className="w-5" />
        <h3 className="text-xl font-bold ml-2">DARAJAT</h3>
      </div>
      <div className="flex flex-row justify-between w-2/3">
        <h1 className="title text-3xl font-bold my-5">Learning Plan</h1>
        <MainLink
          title="Adjust Learning Pace"
          className="bg-black! p-0! lg:p-2! text-center lg:text-left text-[9px] text-white block! lg:inline-block! font-normal lg:font-bold h-8 mt-8"
          route="#"
        />
      </div>
      <div></div>
      <div></div>
    </div>
  );
}
