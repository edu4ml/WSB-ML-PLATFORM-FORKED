# class ExerciseCompletion(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
#     completed_at = models.DateTimeField(auto_now_add=True)
#     is_file_passed = models.BooleanField(default=False)
#     is_test_passed = models.BooleanField(default=False)
#     is_reviewed = models.BooleanField(default=False)
#     is_self_evaluated = models.BooleanField(default=False)
