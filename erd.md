
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
    "last_education_year": 2020,
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


create journy

```json
{
  "readingHoursPerDay": 2,
  "titles": ["Python for Beginners", "Data Science with Pandas", "Machine Learning with Scikit-learn"]
}
```

```json
{
  "months": [
    {
      "month": "January",
      "weeks": [
        {
          "week": 1,
          "title": "Introduction to Python",
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




chain coach route


req
```json
{
  "question": "tell me abojt....",
  "context": "all the content of the week in one string"
}
```
res

```json

{
  "answer": "the answer"
}

```

create content

```json
{
  "titles": ["Introduction to the Cell", "Cellular Respiration", "Photosynthesis"]
}
```


```json

{
  "content": "The cell is the basic unit of life... [Generated content about the titles]" 
}

```

create QA (optional)