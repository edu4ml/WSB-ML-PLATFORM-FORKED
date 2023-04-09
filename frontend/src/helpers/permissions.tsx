import { User } from '../types/user';

const isTeacher = (user: User) => {
    return (
        user.roles &&
        (user.roles.includes('teacher') || user.roles.includes('admin'))
    );
};

const isStudent = (user: User) => {
    return user.roles && user.roles.includes('student');
};

const isAdmin = (user: User) => {
    return user.roles && user.roles.includes('admin');
};

export { isTeacher, isStudent, isAdmin };
