# Permissions

This document outlines the permissions and test cases for different user roles in a learning management system. It covers command permissions for actions like creating, updating, enrolling, and completing course steps, as well as query permissions for listing and accessing course and exercise details. The test cases section provides a checklist to ensure each user role is granted or denied access to specific actions as intended.

## Command Permissions 

| Command                 | Unauthorized | Student  | Teacher  | Admin  |
|-------------------------|--------------|----------|----------|--------|
| CREATE_COURSE           | ❌           | ❌       | ✅       | ✅     |
| UPDATE_COURSE           | ❌           | ❌       | ✅       | ✅     |
| ENROLL_FOR_COURSE       | ❌           | ✅       | ✅       | ✅     |
| COMPLETE_COURSE_STEP    | ❌           | ✅       | ✅       | ✅     |



Legend:
✅: Allowed
❌: Forbidden


## Query Permissions 

| Query             | Unauthorized | Student | Teacher | Admin |
|-------------------|--------------|---------|---------|-------|
| list_courses      | ❌           | ✅      | ✅      | ✅    |
| course_detail     | ❌           | ✅      | ✅      | ✅    |
| list_exercises    | ❌           | ✅      | ✅      | ✅    |
| exercise_detail   | ❌           | ✅      | ✅      | ✅    |

Legend:
✅: Allowed
❌: Forbidden




## Test Cases 

### Unauthorize 
- [ ] Unauthorized user cannot update course
- [ ] Unauthorized user cannot list courses
- [ ] Unauthorized user cannot access course detail
- [ ] Unauthorized user cannot list exercises
- [ ] Unauthorized user cannot access exercise detail

### Student 
- [ ] Student cannot update course
- [ ] Student cannot create a course
- [ ] Student can enroll for a course
- [ ] Student can complete a course step
- [ ] Student can list courses
- [ ] Student can access course detail
- [ ] Student can list exercises
- [ ] Student can access exercise detail

### Teacher
- [ ] Teacher can update a course
- [ ] Teacher can enroll for a course
- [ ] Teacher can complete a course step
- [ ] Teacher can create a course
- [ ] Teacher can list courses
- [ ] Teacher can access course detail
- [ ] Teacher can list exercises
- [ ] Teacher can access exercise detail

### Admin
- [ ] Admin can update a course
- [ ] Admin can enroll for a course
- [ ] Admin can complete a course step
- [ ] Admin can create a course
- [ ] Admin can list courses
- [ ] Admin can access course detail
- [ ] Admin can list exercises
- [ ] Admin can access exercise detail
