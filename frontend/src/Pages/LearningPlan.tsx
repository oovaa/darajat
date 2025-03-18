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

const emptyStudyPlan: StudyPlan = {
  duration: "6 months",
  plan: [
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
            Physics: ["Newton's Laws"],
            Chemistry: ["Chemical Bonding"],
          },
          daily_focus: [
            {
              date: "March 11",
              day: "Monday",
              subjects: {
                Mathematics: ["Equations"],
                Physics: ["Newton's First Law"],
              },
            },
            {
              date: "March 12",
              day: "Tuesday",
              subjects: {
                Mathematics: ["Inequalities"],
                Physics: ["Newton's Second Law"],
              },
            },
            {
              date: "March 13",
              day: "Wednesday",
              subjects: {
                Physics: ["Newton's Third Law"],
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
  ],
};

export default function LearningPlan() {
  const [plans, setPlans] = useState<StudyPlan>(emptyStudyPlan);

  console.log(plans);
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
      <div>
        <div className="bg-[#FCF1CC]">{}</div>
        <div className="border p-4 rounded-b-2xl pl-10">
          {plans.plan.map((plan, index) => (
            <div className="">
              {plan.weeks.map((week, weekIndex) => (
                <div>
                  <h4 className="my-4">{week.days}</h4>
                  <ul className="bg-[#FCF1CC] p-2">
                    {Object.entries(week.content).map(([Key, value]) => (
                      <li className="bg-white p-1 m-2">
                        <span className="font-bold">{Key}:&nbsp;</span>
                        <span>{value.join(", ")}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
