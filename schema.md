## Studying plan

[![Screenshot-2025-03-15-at-11-43-13-PM.png](https://i.postimg.cc/VkNYPnNx/Screenshot-2025-03-15-at-11-43-13-PM.png)](https://postimg.cc/HVfGQJXz)

### Input

[![Screenshot-2025-03-16-at-12-37-41-PM.png](https://i.postimg.cc/d1GFj9Wy/Screenshot-2025-03-16-at-12-37-41-PM.png)](https://postimg.cc/LY4GHjF9)

Using this formula the Generative AI, must be able to tell the expected duration for the studying plan

This input is made based on the student answers to the form and also to the total topics to be covered based on the syllabus content available.

- Total Topics Across Subjects = [The total of lessons based on the syllabus, with consideration to the chapters for logical hierrarchial order].
- Study Days Per Week = 5 [fixed]
- Hours Per Week = [depending on students’s pace: accelerated (5) * 7, standard(3) * 7, relaxed (1) * 7]
- Average Time Per Topic = 3 hours [fixed]

<aside>
💡

### **How AI Adapts the Plan Dynamically**

Adjustiments to pace, will affects hours per week and will result on recalculation of the studying plan from where the user is at currently.

**Faster Pace?** → AI increases the number of topics covered per week.

**Slower Pace?** → AI reduces the number of topics per week.

**Extending duration?** → AI assigns more time per topic, increasing duration.

</aside>

---

### Output

JSON schema of the General Studying Plan

```jsx
{
  "duration": "6 months",
  "plan": [
    {
      "month": 3,
      "title": "Month 1 - Foundation & Refresh",
      "focus": "Building strong fundamentals in core subjects",
      "subjects_covered": ["Mathematics", "Physics", "Chemistry"],
      "goal": "Strengthen basic concepts and ensure foundational understanding",
      "weeks": [
        {
          "days": "March 4 - March 8",
          "content": {
            "Mathematics": ["Functions", "Domain & Range"],
            "Physics": ["Kinematics", "Displacement", "Velocity"],
            "Chemistry": ["Atomic Structure", "Periodic Table"]
          },
          "daily_focus": [
            {
              "date": "March 4",
              "day": "Monday",
              "subjects": {
                "Mathematics": ["Functions"],
                "Physics": ["Kinematics"]
              }
            },
            {
              "date": "March 5",
              "day": "Tuesday",
              "subjects": {
                "Mathematics": ["Domain & Range"],
                "Physics": ["Displacement"]
              }
            },
            {
              "date": "March 6",
              "day": "Wednesday",
              "subjects": {
                "Mathematics": ["Functions Applications"],
                "Physics": ["Velocity"]
              }
            },
            {
              "date": "March 7",
              "day": "Thursday",
              "subjects": {
                "Chemistry": ["Atomic Structure"]
              }
            },
            {
              "date": "March 8",
              "day": "Friday",
              "subjects": {
                "Chemistry": ["Periodic Table"]
              }
            }
          ]
        },
        {
          "days": "March 11 - March 15",
          "content": {
            "Mathematics": ["Equations", "Inequalities"],
            "Physics": ["Newton’s Laws"],
            "Chemistry": ["Chemical Bonding"]
          },
          "daily_focus": [
            {
              "date": "March 11",
              "day": "Monday",
              "subjects": {
                "Mathematics": ["Equations"],
                "Physics": ["Newton’s First Law"]
              }
            },
            {
              "date": "March 12",
              "day": "Tuesday",
              "subjects": {
                "Mathematics": ["Inequalities"],
                "Physics": ["Newton’s Second Law"]
              }
            },
            {
              "date": "March 13",
              "day": "Wednesday",
              "subjects": {
                "Physics": ["Newton’s Third Law"],
                "Chemistry": ["Chemical Bonding"]
              }
            },
            {
              "date": "March 14",
              "day": "Thursday",
              "subjects": {
                "Chemistry": ["Intermolecular Forces"]
              }
            },
            {
              "date": "March 15",
              "day": "Friday",
              "subjects": {
                "Chemistry": ["Molecular Geometry"]
              }
            }
          ]
        }
      ]
    }
  ]
}

```

### Explanation of Structure:

- **`duration`**: Specifies whether the plan is for 6 or 9 months.
- **`plan`**: An array containing each month's study plan.
    - **`month`**: Numerical representation of the month.
    - **`title`**: Title summarizing the month's focus.
    - **`focus`**: A brief description of the primary goal of the month.
    - **`subjects_covered`**: A list of subjects studied during the month.
    - **`goal`**: Describes what the student is expected to achieve by the end of the month.
    - **`weeks`**: An array where each object represents one of the four weeks in the month.
        - **`days`**: Specifies the span of dates for the week. (Weeks span from Monday–Friday.)
        - **`content`**: A dictionary where keys are subjects and values are lists of topics covered during that week.
        - **`daily_focus`**: A list of objects representing individual days.
            - **`date`**: The actual date.
            - **`day`**: Day of the week.
            - **`subjects`**: A dictionary where keys are subjects and values are lists of topics covered on that day.
    
    | **Field** | **Type** | **Description** |
    | --- | --- | --- |
    | `duration` | `string` | Specifies the study duration (either "6 months" or "9 months"). |
    | `plan` | `array` | An array containing monthly study plans. |
    | `month` | `integer` | The numerical representation of the month (1 for January, 2 for February, etc.). |
    | `title` | `string` | A brief title summarizing the month’s focus (e.g., "Foundation & Refresh"). |
    | `focus` | `string` | A brief description of the main goal or focus for that month. |
    | `subjects_covered` | `array` | A list of subjects covered in the month (e.g., ["Math", "Physics"]). |
    | `goal` | `string` | A description of the expected achievement by the end of the month. |
    | `weeks` | `array` | An array representing the four weeks of the month. |
    | `weeks[i].days` | `string` | Specifies the span of dates for the week (e.g., "Week 1: March 1 - March 5"). |
    | `weeks[i].content` | `object` | A dictionary where keys are subjects and values are lists of topics covered during that week. |
    | `weeks[i].daily_focus` | `array` | A list of objects representing individual days. |
    | `weeks[i].daily_focus[i].date` | `string` | The specific date for that day (e.g., "2025-03-16"). |
    | `weeks[i].daily_focus[i].day` | `string` | The day of the week (e.g., "Monday", "Tuesday"). |
    | `weeks[i].daily_focus[i].subjects` | `object` | A dictionary where keys are subjects and values are lists of topics covered on that day. |

## Daily Content

[![Screenshot-2025-03-15-at-11-46-41-PM.png](https://i.postimg.cc/nVYZs098/Screenshot-2025-03-15-at-11-46-41-PM.png)](https://postimg.cc/NLMZS8xb)

### Input

The input for generating daily content includes the **full study plan** and the **current date** or **current day** the user is requesting content for. The generative AI uses this input to determine the subject, topic, and associated material that should be covered on that day, ensuring relevance and progression through the study plan.

---

### Output

JSON schema of the content of a day

```jsx
{
  "date": "2025-03-16",
  "content": [
    {
      "subject": "Physics",
      "title": "Kinematics",
      "material": [
        {
          "type": "read",
          "title": "Reading - Functions - Chapter 2",
          "content": "URL or text content here"
        },
        {
          "type": "video",
          "content": [
            {
              "title": "Understanding Kinematics",
              "url": "https://example.com/video-kinematics"
            }
          ]
        },
        {
          "type": "questions",
          "content": {
            "type": "mcqs",
            "questions": [
              {
                "question": "What is the formula for velocity?",
                "options": [
                  "v = d/t",
                  "v = t/d",
                  "v = d × t"
                ],
                "answer": 0
              },
              {
                "question": "Which of the following is a vector quantity?",
                "options": [
                  "Speed",
                  "Velocity",
                  "Distance"
                ],
                "answer": 1
              }
            ]
          }
        }
      ]
    },
    {
      "subject": "Mathematics",
      "title": "Functions",
      "material": [
        {
          "type": "read",
          "title": "Introduction to Functions",
          "content": "URL or text content here"
        },
        {
          "type": "video",
          "content": [
            {
              "title": "Functions and Their Graphs",
              "url": "https://example.com/video-functions"
            }
          ]
        },
        {
          "type": "questions",
          "content": {
            "type": "mcqs",
            "questions": [
              {
                "question": "What is the domain of f(x) = 1/x?",
                "options": [
                  "All real numbers",
                  "All real numbers except 0",
                  "Only positive numbers"
                ],
                "answer": 1
              }
            ]
          }
        }
      ]
    }
  ]
}

```

### **Explanation of** Structure

1. **`date`**: The current date of study.
2. **`content`**: A list of subjects and their corresponding study materials for the day.
    - **`subject`**: The name of the subject (e.g., `"Physics"`).
    - **`title`**: The specific topic covered under the subject (e.g., `"Kinematics"`).
    - **`material`**: A list of different types of materials associated with the subject and topic.
        - **`type`**: The type of material (e.g., `"read"`, `"video"`, `"questions"`).
        - **`content`**: The actual material, which varies depending on the type.
            - **`video.content`**:
                - **`title`**: The title of the video.
                - **`url`**: The URL to access the video.
            - **`questions.content`**:
                - **`type`**: The type of question (e.g., `"mcq"`).
                - **`question`**: The actual question text.
                - **`options`**: A list of possible answers for the question.
                - **`answer`**: The index of the correct option in the list of options.

| **Field** | **Type** | **Description** |
| --- | --- | --- |
| `date` | `string` | The current date for which the study plan is being generated. |
| `content` | `array` | A list of subjects covered on this day. |
| `subject` | `string` | The name of the subject (e.g., `"Physics"`, `"Mathematics"`). |
| `title` | `string` | The specific topic being studied under the subject (e.g., `"Kinematics"`). |
| `material` | `array` | A list of study materials for the subject. Each item represents a different type of learning material (e.g., reading, videos, questions). |
| `type` | `string` | The type of material (`"read"`, `"video"`, or `"questions"`). |
| `title` | `string` | The title of the reading or video material. |
| `content` | `string` / `array` | The actual content (could be a URL, text, or list of video links). |
| `questions` | `array` | A list of multiple-choice questions (MCQs) for the topic. |
| `question` | `string` | The actual question being asked. |
| `options` | `array` | A list of possible answers for the question. |
| `answer` | `integer` | The **index** (starting from `0`) of the correct answer in the `options` list. |
