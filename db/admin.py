from django.contrib import admin
from django.template.loader import render_to_string
from django.utils.html import format_html

from .models import (
    Course,
    CourseEnrollment,
    CourseStep,
    CourseStepUserProgress,
    CourseComponent,
    CustomUser,
    EvaluationAttempt,
    ExternalResource,
    Role,
)


class ExternalResourceAdmin(admin.ModelAdmin):
    pass


admin.site.register(ExternalResource, ExternalResourceAdmin)


class CourseEnrollmentAdmin(admin.ModelAdmin):
    list_display = ("user", "course", "is_completed")


admin.site.register(CourseEnrollment, CourseEnrollmentAdmin)


class CourseStepAdmin(admin.ModelAdmin):
    list_display = (
        "course",
        "component",
        "order",
        "evaluation_type",
    )
    list_editable = ("component", "order", "evaluation_type")
    list_editable_groups = [("order",)]
    list_filter = ("course",)


admin.site.register(CourseStep, CourseStepAdmin)


class CourseAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "is_draft", "course_step_list")
    list_filter = ("is_draft",)
    search_fields = ("title", "description")
    list_editable = ("author", "is_draft")
    fieldsets = (
        (None, {"fields": ("title", "description")}),
        ("Advanced options", {"classes": ("collapse",), "fields": ("is_draft",)}),
    )

    def course_step_list(self, obj):
        return format_html(
            '<div class="nowrap" style="white-space: nowrap;">{}</div>',
            render_to_string("admin/course_row.html", {"object": obj}),
        )

    course_step_list.short_description = "Course Steps"


admin.site.register(Course, CourseAdmin)


class CourseStepUserCompletionAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "course",
        "is_completed",
        "completed_at",
    )


admin.site.register(CourseStepUserProgress, CourseStepUserCompletionAdmin)


class EvaluationAttemptAdmin(admin.ModelAdmin):
    pass


admin.site.register(EvaluationAttempt, EvaluationAttemptAdmin)


class RoleAdmin(admin.ModelAdmin):
    pass


admin.site.register(Role, RoleAdmin)


class UserAdmin(admin.ModelAdmin):
    filter_horizontal = ("roles",)


admin.site.register(CustomUser, UserAdmin)


class CourseComponentAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "type")
    list_editable = ("type",)


admin.site.register(CourseComponent, CourseComponentAdmin)
