import { useRef, useState } from "react";
import logoHead from "../assets/darajat-logo.png";
import { MainLink } from "../Container";
import { InView, useInView } from "react-intersection-observer";

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

const mocStudentPlan: StudyPlan = {
  duration: "6 months",
  plan: [
    {
      month: 1,
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
    {
      month: 2,
      title: "Month 2 - Foundation & Refresh",
      focus: "Building strong fundamentals in core subjects",
      subjects_covered: ["Mathematics", "Physics", "Chemistry"],
      goal: "Strengthen basic concepts and ensure foundational understanding",
      weeks: [
        {
          days: "april 4 - april 8",
          content: {
            Mathematics: ["Functions", "Domain & Range"],
            Physics: ["Kinematics", "Displacement", "Velocity"],
            Chemistry: ["Atomic Structure", "Periodic Table"],
          },
          daily_focus: [
            {
              date: "april 4",
              day: "Monday",
              subjects: {
                Mathematics: ["Functions"],
                Physics: ["Kinematics"],
              },
            },
            {
              date: "april 5",
              day: "Tuesday",
              subjects: {
                Mathematics: ["Domain & Range"],
                Physics: ["Displacement"],
              },
            },
            {
              date: "april 6",
              day: "Wednesday",
              subjects: {
                Mathematics: ["Functions Applications"],
                Physics: ["Velocity"],
              },
            },
            {
              date: "april 7",
              day: "Thursday",
              subjects: {
                Chemistry: ["Atomic Structure"],
              },
            },
            {
              date: "april 8",
              day: "Friday",
              subjects: {
                Chemistry: ["Periodic Table"],
              },
            },
          ],
        },
        {
          days: "april 11 - april 15",
          content: {
            Mathematics: ["Equations", "Inequalities"],
            Physics: ["Newton's Laws"],
            Chemistry: ["Chemical Bonding"],
          },
          daily_focus: [
            {
              date: "april 11",
              day: "Monday",
              subjects: {
                Mathematics: ["Equations"],
                Physics: ["Newton's First Law"],
              },
            },
            {
              date: "april 12",
              day: "Tuesday",
              subjects: {
                Mathematics: ["Inequalities"],
                Physics: ["Newton's Second Law"],
              },
            },
            {
              date: "april 13",
              day: "Wednesday",
              subjects: {
                Physics: ["Newton's Third Law"],
                Chemistry: ["Chemical Bonding"],
              },
            },
            {
              date: "april 14",
              day: "Thursday",
              subjects: {
                Chemistry: ["Intermolecular Forces"],
              },
            },
            {
              date: "april 15",
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
      month: 3,
      title: "Month 3 - Foundation & Refresh",
      focus: "Building strong fundamentals in core subjects",
      subjects_covered: ["Mathematics", "Physics", "Chemistry"],
      goal: "Strengthen basic concepts and ensure foundational understanding",
      weeks: [
        {
          days: "may 4 - may 8",
          content: {
            Mathematics: ["Functions", "Domain & Range"],
            Physics: ["Kinematics", "Displacement", "Velocity"],
            Chemistry: ["Atomic Structure", "Periodic Table"],
          },
          daily_focus: [
            {
              date: "may 4",
              day: "Monday",
              subjects: {
                Mathematics: ["Functions"],
                Physics: ["Kinematics"],
              },
            },
            {
              date: "may 5",
              day: "Tuesday",
              subjects: {
                Mathematics: ["Domain & Range"],
                Physics: ["Displacement"],
              },
            },
            {
              date: "may 6",
              day: "Wednesday",
              subjects: {
                Mathematics: ["Functions Applications"],
                Physics: ["Velocity"],
              },
            },
            {
              date: "may 7",
              day: "Thursday",
              subjects: {
                Chemistry: ["Atomic Structure"],
              },
            },
            {
              date: "may 8",
              day: "Friday",
              subjects: {
                Chemistry: ["Periodic Table"],
              },
            },
          ],
        },
        {
          days: "may 11 - may 15",
          content: {
            Mathematics: ["Equations", "Inequalities"],
            Physics: ["Newton's Laws"],
            Chemistry: ["Chemical Bonding"],
          },
          daily_focus: [
            {
              date: "may 11",
              day: "Monday",
              subjects: {
                Mathematics: ["Equations"],
                Physics: ["Newton's First Law"],
              },
            },
            {
              date: "may 12",
              day: "Tuesday",
              subjects: {
                Mathematics: ["Inequalities"],
                Physics: ["Newton's Second Law"],
              },
            },
            {
              date: "may 13",
              day: "Wednesday",
              subjects: {
                Physics: ["Newton's Third Law"],
                Chemistry: ["Chemical Bonding"],
              },
            },
            {
              date: "may 14",
              day: "Thursday",
              subjects: {
                Chemistry: ["Intermolecular Forces"],
              },
            },
            {
              date: "may 15",
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
      title: "Month 4 - Foundation & Refresh",
      focus: "Building strong fundamentals in core subjects",
      subjects_covered: ["Mathematics", "Physics", "Chemistry"],
      goal: "Strengthen basic concepts and ensure foundational understanding",
      weeks: [
        {
          days: "june 4 - june 8",
          content: {
            Mathematics: ["Functions", "Domain & Range"],
            Physics: ["Kinematics", "Displacement", "Velocity"],
            Chemistry: ["Atomic Structure", "Periodic Table"],
          },
          daily_focus: [
            {
              date: "june 4",
              day: "Monday",
              subjects: {
                Mathematics: ["Functions"],
                Physics: ["Kinematics"],
              },
            },
            {
              date: "june 5",
              day: "Tuesday",
              subjects: {
                Mathematics: ["Domain & Range"],
                Physics: ["Displacement"],
              },
            },
            {
              date: "june 6",
              day: "Wednesday",
              subjects: {
                Mathematics: ["Functions Applications"],
                Physics: ["Velocity"],
              },
            },
            {
              date: "june 7",
              day: "Thursday",
              subjects: {
                Chemistry: ["Atomic Structure"],
              },
            },
            {
              date: "june 8",
              day: "Friday",
              subjects: {
                Chemistry: ["Periodic Table"],
              },
            },
          ],
        },
        {
          days: "june 11 - june 15",
          content: {
            Mathematics: ["Equations", "Inequalities"],
            Physics: ["Newton's Laws"],
            Chemistry: ["Chemical Bonding"],
          },
          daily_focus: [
            {
              date: "june 11",
              day: "Monday",
              subjects: {
                Mathematics: ["Equations"],
                Physics: ["Newton's First Law"],
              },
            },
            {
              date: "june 12",
              day: "Tuesday",
              subjects: {
                Mathematics: ["Inequalities"],
                Physics: ["Newton's Second Law"],
              },
            },
            {
              date: "june 13",
              day: "Wednesday",
              subjects: {
                Physics: ["Newton's Third Law"],
                Chemistry: ["Chemical Bonding"],
              },
            },
            {
              date: "june 14",
              day: "Thursday",
              subjects: {
                Chemistry: ["Intermolecular Forces"],
              },
            },
            {
              date: "june 15",
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
  const [plans, setPlans] = useState<StudyPlan>(mocStudentPlan);
  const [activeMonth, setActiveMonth] = useState<Plan>(mocStudentPlan.plan[0]);
  const scrollContainerRef = useRef(null);

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
        <div className="p-4">
          <div className="flex flex-col h-[47rem]">
            <div className="bg-[#FCF1CC] p-4 sticky border border-b-0 rounded-t-2xl">
              {activeMonth ? (
                <div>
                  <h2 className="font-bold text-lg">{activeMonth.title}</h2>
                  <p>
                    <strong>Focus:</strong> {activeMonth.focus}
                  </p>
                  <p>
                    <strong>Subjects Covered:</strong>{" "}
                    {activeMonth.subjects_covered.join(", ")}
                  </p>
                  <p>
                    <strong>Goal:</strong> {activeMonth.goal}
                  </p>
                </div>
              ) : (
                <p>Scroll down to reveal month details...</p>
              )}
            </div>

            <div
              ref={scrollContainerRef}
              className="overflow-y-auto flex-1 border p-4 h-32"
            >
              {plans.plan.map((plan, planIndex) => (
                <div key={planIndex} className="mb-8">
                  {plan.weeks.map((week, weekIndex) => (
                    <InView
                      key={`${planIndex}-${weekIndex}`}
                      threshold={0.8}
                      root={scrollContainerRef.current}
                      onChange={(inView) => {
                        if (inView) {
                          setActiveMonth(plan);
                        }
                      }}
                    >
                      {({ ref }) => (
                        <div ref={ref} className="mb-4">
                          <h4 className="my-4">{week.days}</h4>
                          <ul className="bg-[#FCF1CC] p-2">
                            {Object.entries(week.content).map(
                              ([subject, topics]) => (
                                <li key={subject} className="bg-white p-1 m-2">
                                  <span className="font-bold">
                                    {subject}:&nbsp;
                                  </span>
                                  <span>{topics.join(", ")}</span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </InView>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
