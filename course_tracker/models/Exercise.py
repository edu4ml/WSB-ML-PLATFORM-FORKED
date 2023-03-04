# class Exercise(models.Model):
#     title = models.CharField(max_length=100)
#     description = models.TextField()
#     requires_file = models.BooleanField(default=False)
#     requires_test = models.BooleanField(default=False)
#     requires_manual_review = models.BooleanField(default=False)
#     is_self_evaluated = models.BooleanField(default=False)
#     file_solution = models.FileField(blank=True, null=True)
#     test_solution = models.TextField(blank=True)
#     course = models.ForeignKey(Course, on_delete=models.CASCADE)

# from django.db import models
# from django.contrib.auth.models import User
# from django.urls import reverse

# class Exercise(models.Model):
#     title = models.CharField(max_length=255)
#     description = models.TextField()
#     course = models.ForeignKey(Course, on_delete=models.CASCADE)
#     exercise_file = models.FileField(upload_to='exercises', blank=True)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.title

#     def get_absolute_url(self):
#         return reverse('exercise-detail', args=[str(self.id)])
