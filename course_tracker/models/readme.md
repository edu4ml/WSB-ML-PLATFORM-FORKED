## Course
A course is a collection of exercises that teach a specific topic or skill. Users can enroll in courses to learn and track their progress.

## Exercise
An exercise represents a unit of learning within a course. Exercises can take various forms, such as reading material, coding exercises, or multiple choice quizzes.

## ExerciseAttempt
An exercise attempt represents a user's attempt to complete an exercise. The model tracks information such as the user who attempted the exercise, the exercise that was attempted, and the timestamp of the attempt.

## ExerciseCompletion
An exercise completion represents a user's successful completion of an exercise. The model tracks information such as the user who completed the exercise, the exercise that was completed, and the timestamp of the completion.

## Progress
A user's progress in a course is tracked through the progress model. The model records which exercises the user has completed in the course and allows the user to track their overall progress.

## Quiz
A quiz is a collection of questions that assess a user's knowledge of a specific topic or skill. Quizzes can contain various types of questions, such as multiple choice, true/false, and short answer.

## Question
A question is a unit of assessment within a quiz. Questions can take various forms, such as multiple choice, true/false, and short answer.

## Answer
An answer represents a user's response to a question within a quiz. The model tracks information such as the user who provided the answer, the question that was answered, and the timestamp of the answer.

## Enrolment
An enrolment represents a user's participation in a course. The model tracks information such as the user who enrolled in the course, the course they enrolled in, and the timestamp of enrolment.


1. User starts a new course and enrolls in it
2. Enrolment model is created and Progress model is created for that user and course
3. Course contains Exercises which need to be completed in order to finish the course
4. For each Exercise, Exercise model is created
5. When user starts an Exercise, ExerciseAttempt model is created
6. If Exercise requires evaluation, ExerciseCompletion model is created after successful attempt
7. Progress is updated for each successful ExerciseCompletion
8. Course may also contain Quizzes which contain Questions
9. For each Quiz, Quiz model is created, which contains Questions
10. For each Question, Question model is created, which contains Answers
11. When user starts a Quiz, QuizAttempt model is created
12. When user submits QuizAttempt, QuizCompletion model is created
13. Progress is updated for each successful QuizCompletion



All the models can be visible in the REST API, but you may want to control which fields and related models are exposed through the API to protect sensitive information and reduce clutter. Here's a suggestion for which models and fields to expose in the REST API:

Course: expose all fields except created_at and updated_at
Exercise: expose all fields except created_at and updated_at
ExerciseAttempt: expose all fields except created_at and updated_at, and exclude solution_file if it contains sensitive information
ExerciseCompletion: expose all fields except created_at and updated_at
Progress: expose exercise, status, and completed_at fields
Quiz: expose all fields except created_at and updated_at
Question: expose all fields except created_at and updated_at
Answer: expose all fields except created_at and updated_at
Enrollment: expose all fields except created_at and updated_at
Remember to also properly set up authentication and permissions to ensure that only authorized users can access the API and perform appropriate actions.