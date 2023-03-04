# class Progress(models.Model):
#     course = models.ForeignKey(Course, on_delete=models.CASCADE)
#     student = models.ForeignKey(User, on_delete=models.CASCADE)
#     exercises_completed = models.ManyToManyField(Exercise)

#     def __str__(self):
#         return f'{self.student} - {self.course}'
    
# progress = Progress.objects.get(course=course, student=student)
# progress.exercises_completed.add(exercise)

# class Progress(models.Model):
#     # ...

#     def get_progress_percentage(self):
#         total_exercises = self.course.exercises.count()
#         completed_exercises = self.exercises_completed.count()
#         return int((completed_exercises / total_exercises) * 100)