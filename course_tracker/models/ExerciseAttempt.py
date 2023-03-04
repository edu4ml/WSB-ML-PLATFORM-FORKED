# class ExerciseAttempt(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
#     attempt_file = models.FileField(upload_to='attempts', blank=True)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f'{self.user.username} - {self.exercise.title}'

#     def save(self, *args, **kwargs):
#         super().save(*args, **kwargs)
#         self.update_progress()

#     def update_progress(self):
#         try:
#             completion = ExerciseCompletion.objects.get(user=self.user, exercise=self.exercise)
#         except ExerciseCompletion.DoesNotExist:
#             completion = ExerciseCompletion(user=self.user, exercise=self.exercise)
#         if self.successful_attempt():
#             completion.completed = True
#         completion.save()

#     def successful_attempt(self):
#         # Add your custom validation logic here
#         return True
