### Elearning App Permissions Checklist

1. **User roles**
   - [ ] Verify that the app has three user roles: Student, Teacher, and Admin.

2. **Registration and authentication**
   - [ ] Ensure that users can register with the appropriate role (Student, Teacher, or Admin).
   - [ ] Confirm that users can log in and log out of the app.
   - [ ] Make sure that the authentication mechanism is in place (e.g., token-based authentication, session authentication).

3. **Course management**
   - [ ] Teachers can create, update, and ?delete? courses.
   - [ ] Admins can view, create, update, and delete all courses.
   - [ ] Students can view courses but cannot create, update, or delete them.

4. **Exercise management**
   - [ ] Teachers can create, update, and delete exercises related to their courses.
   - [ ] Admins can view, create, update, and delete all exercises for all courses.
   - [ ] Students can view exercises but cannot create, update, or delete them.

5. **Enrollment**
   - [ ] Students can enroll and unenroll in courses.
   - [ ] Teachers and admins cannot enroll or unenroll in courses.

6. **Content viewing**
   - [ ] Students can view course content and related exercises.
   - [ ] Teachers can view course content and related exercises for their courses.
   - [ ] Admins can view all course content and related exercises.

7. **User management (optional, for Admins only)**
   - [ ] Admins can view, create, update, and delete users.
   - [ ] Admins can change user roles.

8. **Permission testing**
   - [ ] Test permissions for each user role (Student, Teacher, Admin) to ensure they only have access to their allowed actions.
   - [ ] Verify that users receive a `403 Forbidden` response when trying to access an action they're not allowed to perform.

9. **Security**
   - [ ] Implement and test CSRF protection.
   - [ ] Ensure secure password storage and handling.
   - [ ] Confirm that user data is protected and not exposed through APIs or views to unauthorized users.

10. **Deployment**
   - [ ] Test the application in a staging environment that replicates the production environment.
   - [ ] Verify that all the permissions work correctly in the staging environment.
