# from django.db import models
# from django.contrib.auth.models import User
# from django.utils.translation import ugettext_lazy as _

# class Enrolment(models.Model):
#     student = models.ForeignKey(User, on_delete=models.CASCADE)
#     course = models.ForeignKey(Course, on_delete=models.CASCADE)
#     enrolled_at = models.DateTimeField(auto_now_add=True)
#     is_completed = models.BooleanField(default=False)

#     class Meta:
#         verbose_name = _('Enrolment')
#         verbose_name_plural = _('Enrolments')
