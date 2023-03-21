import { UserType } from '../types/user';

const isTeacher = (user: UserType) => {
    return user.roles && user.roles.includes('teacher');
};

const isStudent = (user: UserType) => {
    return user.roles && user.roles.includes('student');
};

const isAdmin = (user: UserType) => {
    return user.roles && user.roles.includes('admin');
};

export { isTeacher, isStudent, isAdmin };
