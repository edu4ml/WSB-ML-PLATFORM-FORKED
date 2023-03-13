from django.contrib import admin
from .models import (
    Course,
    CourseEnrollment,
    CourseComponent,
    CourseStep,
    CourseComponentResource,
    CourseComponentCompletion,
)

admin.site.register(CourseComponentResource)


class CourseComponentCompletionAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "component",
        "component_type",
        "is_completed",
        "completed_at",
    )

    def component_type(self, obj):
        return obj.component.type

    component_type.short_description = "Course Component Type"


admin.site.register(CourseComponentCompletion, CourseComponentCompletionAdmin)


class CourseEnrollmentAdmin(admin.ModelAdmin):
    list_display = ("user", "course", "is_completed")


admin.site.register(CourseEnrollment, CourseEnrollmentAdmin)


class CourseComponentAdmin(admin.ModelAdmin):
    list_display = ("title", "type", "description")
    filter_horizontal = ("resources",)


admin.site.register(CourseComponent, CourseComponentAdmin)


class CourseStepAdmin(admin.ModelAdmin):
    list_display = (
        "course",
        "order",
        "component",
        "is_self_evaluated",
        "requires_file",
        "requires_test",
        "requires_manual_review",
    )


admin.site.register(CourseStep, CourseStepAdmin)


class CourseAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "is_draft")


admin.site.register(Course, CourseAdmin)
