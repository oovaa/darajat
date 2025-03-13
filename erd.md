
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
