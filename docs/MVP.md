# Stories 

Creating a new course:

Test creating a new course with valid data.
Test creating a new course with missing steps and description (invalid data).

Course availability for students:

Test course visibility for students when is_draft=false.
Test course invisibility for students when is_draft=true.

Editing an existing course:

Test editing a course with valid data.
Test editing a course with missing steps and description (invalid data).
Test course content and structure after the edits are saved.

Organizing course components in a logical order:

Test adding components as a course step.
Test reordering course steps.
Test students' ability to follow the defined order while progressing through the course.

Setting course prerequisites:

Test setting prerequisites for a course.
Test student enrollment when prerequisites are met.
Test student enrollment when prerequisites are not met.

Monitoring individual student progress:

Test accessing progress reports for students.
Test identifying areas where students may need additional support based on progress reports.

Sending course-related announcements or updates:

Test sending announcements or updates.
Test students' ability to receive notifications related to the course.

Changing evaluation type for course steps:

Test changing the evaluation type for a course step.
Test the impact of the evaluation type change on student progress.

Publishing a course:

Test publishing a course with is_draft=false when it has steps and a description (valid data).
Test publishing a course with is_draft=false when it is missing steps and a description (invalid data).
Test the course's visibility for students after publishing.





# MVP 

1. **Course Domain**
   - Ability to create, edit, and delete courses and course components.
   - Ability to enroll in a course and track progress through course components.
   - Basic exercise and evaluation types (e.g. file upload, multiple choice).
   - Basic course progress tracking and reporting.

2. **User Domain**
   - User registration and authentication.
   - Basic user profile management.
   - User roles and permissions management.

3. **Resource Domain**
   - Ability to add new external resources and categorize them.
   - Ability to search for resources by category and tag.

4. **Evaluation Domain**
   - Basic evaluation criteria definition and submission.

5. **Notification Domain**
   - Basic system-wide notifications.

6. **Reporting Domain**
   - Basic course progress reports.

7. **Content Domain**
   - Ability to create and edit course content.
   - Basic course content organization.


---