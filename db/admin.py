from django.contrib import admin
from .models import (
    Course,
    CourseEnrollment,
    CourseComponent,
    CourseStep,
    CourseComponentResource,
    CourseComponentCompletion,
)

admin.site.register(Course)
admin.site.register(CourseEnrollment)
admin.site.register(CourseComponent)
admin.site.register(CourseStep)
admin.site.register(CourseComponentResource)


class CourseComponentCompletionAdmin(admin.ModelAdmin):
    list_display = ("user", "component", "is_completed", "completed_at")


admin.site.register(CourseComponentCompletion, CourseComponentCompletionAdmin)
