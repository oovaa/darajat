# Darajat Hack Project Documentation

## Overview

The **Darajat Hack Project** is an educational platform designed to help students create personalized study plans based on their academic history, available study time, and the subjects they need to cover. The project leverages Generative AI to dynamically adjust study plans, provide daily study content, and offer coaching based on the student's progress. The platform is built using a backend powered by **Express.js** and **Bun**, with AI capabilities provided by **Google's Gemini** model via **LangChain**.

---

## Project Structure

The project is organized into several key components:

### 1. **Backend**
   - Built with **Express.js** and **Bun**.
   - Provides RESTful APIs for creating study plans, generating daily content, and offering coaching.
   - Uses **Helmet** for security and **CORS** for cross-origin requests.

### 2. **AI Integration**
   - Utilizes **Google's Gemini** model via **LangChain** for generating study plans, content, and coaching responses.
   - The AI dynamically adjusts study plans based on the student's pace and progress.

### 3. **Syllabus Management**
   - Contains structured syllabus data for grades 10, 11, and 12 in JSON format.
   - The AI uses this syllabus to create study plans tailored to the student's academic level.

### 4. **Content Generation**
   - Generates daily study content, including reading materials, videos, and quizzes.
   - The content is dynamically created based on the student's current study plan.

### 5. **Coaching**
   - Provides AI-driven coaching to answer student questions based on the context of their study material.

---

## Key Features

### 1. **Study Plan Creation**
   - Students input their available study hours, last completed academic year, and years missed.
   - The AI generates a personalized study plan covering the necessary subjects and topics.

### 2. **Dynamic Study Plan Adjustment**
   - The AI adjusts the study plan based on the student's pace:
     - **Faster Pace**: Increases the number of topics covered per week.
     - **Slower Pace**: Reduces the number of topics per week.
     - **Extended Duration**: Assigns more time per topic.

### 3. **Daily Study Content**
   - The AI generates daily study content, including:
     - **Reading Materials**: Summarized content for each topic.
     - **Videos**: Relevant YouTube videos for visual learning.
     - **Quizzes**: Multiple-choice questions to test understanding.

### 4. **AI Coaching**
   - Students can ask questions related to their study material.
   - The AI provides detailed answers based on the context of the material.

---

## API Endpoints

### 1. **Health Check**
   - **Endpoint**: `GET /z`
   - **Response**:
     ```json
     {
       "status": "ok"
     }
     ```

### 2. **Create Study Plan**
   - **Endpoint**: `POST /api/plan`
   - **Request Body**:
     ```json
     {
       "hoursPerDay": 4,
       "lastYear": 10,
       "yearsMissed": 2
     }
     ```
   - **Response**:
     ```json
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
                 "Physics": ["Kinematics", "Displacement", "Velocity"]
               },
               "daily_focus": [
                 {
                   "date": "March 4",
                   "day": "Monday",
                   "subjects": {
                     "Mathematics": ["Functions"],
                     "Physics": ["Kinematics"]
                   }
                 }
               ]
             }
           ]
         }
       ]
     }
     ```

### 3. **Generate Daily Content**
   - **Endpoint**: `POST /api/generate-content`
   - **Request Body**:
     ```json
     {
       "lessons": ["Math", "Physics"]
     }
     ```
   - **Response**:
     ```json
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
                     "options": ["v = d/t", "v = t/d", "v = d × t"],
                     "answer": 0
                   }
                 ]
               }
             }
           ]
         }
       ]
     }
     ```

### 4. **AI Coaching**
   - **Endpoint**: `POST /api/coach`
   - **Request Body**:
     ```json
     {
       "information": "The first law of thermodynamics...",
       "question": "How does the first law apply to closed systems?"
     }
     ```
   - **Response**:
     ```json
     {
       "answer": "The first law of thermodynamics states that energy cannot be created or destroyed, only transferred or converted..."
     }
     ```

---

## Installation

### 1. **Clone the Repository**
   ```bash
   git clone https://github.com/oovaa/darajat.git
   cd darajat/backend
   ```

### 2. **Install Dependencies**
   ```bash
   bun install
   ```

### 3. **Run the Backend**
   ```bash
   bun start
   ```

---

## Configuration

### 1. **Environment Variables**
   - `DATABASE_URL`: URL for the database (if used).
   - `PORT`: Port on which the backend will run (default: 3000).

---

## Dependencies

### Backend
- **Express.js**: Web framework for building RESTful APIs.
- **Bun**: Fast JavaScript runtime.
- **Helmet**: Security middleware for Express.
- **CORS**: Middleware for enabling cross-origin requests.
- **Compression**: Middleware for enabling Compression
- **LangChain**: Framework for integrating with AI models.
- **Google Generative AI**: AI model for generating study plans and content.

---

## Future Enhancements

1. **User Authentication**: Add user accounts to save progress and preferences.
2. **Progress Tracking**: Track student progress and adjust study plans dynamically.
3. **Gamification**: Add badges and rewards to motivate students.
4. **Mobile App**: Develop a mobile app for easier access.

---

## License

This project is licensed under the **Apache License 2.0**. See the [LICENSE](LICENSE) file for more details.

---

## Contributors

- [Omar](https://github.com/oovaa)
- [Karam](https://github.com/karam-alhaj)

---

## Acknowledgments

- **Google Gemini**: For providing the AI model.
- **LangChain**: For simplifying AI integration.
- **Express.js** and **Bun**: For building a fast and reliable backend.

---

For any questions or issues, please open an issue on the [GitHub repository](https://github.com/oovaa/darajat).