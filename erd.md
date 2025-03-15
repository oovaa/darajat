
### 1. Health Check Route (`/z`)
This is a simple endpoint that returns a JSON response indicating the status of the system. This doesn't require any entities or relationships in the ERD since it's a stateless operation.

### 2. Create Journey
This involves creating a "Journey" entity that stores information about a user's educational journey. The data to be stored includes:
- **Approximate hours per day**: The number of hours the user plans to study per day.
- **Last year in education**: The last year the user was in formal education.
- **Years missed**: The number of years the user has missed in their education.

### Example JSON for Creating a Journey

When a user creates a journey, the JSON payload might look like this:

```json
{
    "hours_per_day": 4,
    "last_education_year": "G1",
    "years_missed": 2
}
```

### Example Response for Health Check

- **Success**:
  ```json
  {
      "status": "ok"
  }
  ```

- **Failure**:
  ```json
  {
      "status": "failure"
  }
  ```


create-journy

req
```json
{
  "readingHoursPerDay": 2,
  "journey": [
    {
      "subject":"Math",
      "lessons":["l1","l2"]
    },
    {
      "subject":"Physics",
      "lessons":["l1","l2"]
    },
    {
      "subject":"Science",
      "lessons":["l1","l2"]
    }
  ]
}
```

res
```json
{
  "months": [
    {
      "month": "January",
      "weeks": [
        {
          "week": 1,
          "subject": "Introduction to Python",
          "description": "Learn the basic syntax and data structures of Python.",
          "lessonTitles": ["Variables and Data Types", "Basic Operators", "Input and Output"]
        },
        {
          "week": 2,
          "title": "Control Flow in Python",
          "description": "Learn how to control the flow of execution in Python programs.",
          "lessonTitles": ["Conditional Statements", "Loops", "Functions"]
        }
      ]
    }
  ]
}
```

coach 

req
```json
{
  "question": "tell me about....",
  "context": "all the content of the week in one string"
}
```

res
```json

{
  "answer": "the answer"
}
```

create-content

```json
{
  "titles": ["Introduction to the Cell", "Cellular Respiration", "Photosynthesis"]
}
```
 
``` json
  {
    "summary":"str",
    "ytvidoes":["link1","link2"],
    "quiz":[
      {
        "question":"1+1=?",
        "answers":["2","4","1","7"],
        "right":0
      },
      {
        "question":"in x^2 = 1 what is the value of x?",
        "answers":["2","4","1","7"],
        "right":3
      }
    ]
  }
```
