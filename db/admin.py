from django.contrib import admin
from django.utils.html import format_html
from django.template.loader import render_to_string
from .models import (
    Course,
    CourseEnrollment,
    CourseStep,
    LinkResource,
    Exercise,
    CourseStepUserCompletion,
)
from .forms import CourseStepForm

admin.site.register(LinkResource)


class CourseEnrollmentAdmin(admin.ModelAdmin):
    list_display = ("user", "course", "is_completed")


admin.site.register(CourseEnrollment, CourseEnrollmentAdmin)


class CourseStepAdmin(admin.ModelAdmin):
    list_display = (
        "course",
        "order",
        "step_object",
        # "component",
        "is_self_evaluated",
        "requires_file",
        "requires_test",
        "requires_manual_review",
    )
    list_editable = (
        "order",
        "is_self_evaluated",
        "requires_file",
        "requires_test",
        "requires_manual_review",
    )
    list_editable_groups = [("order",)]

    form = CourseStepForm


admin.site.register(CourseStep, CourseStepAdmin)


class CourseAdmin(admin.ModelAdmin):
    list_display = ("title", "is_draft", "course_step_list")
    list_filter = ("is_draft",)
    search_fields = ("title", "description")

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


class ExerciseAdmin(admin.ModelAdmin):
    list_display = ("title", "description")
    filter_horizontal = ("resources",)


admin.site.register(Exercise, ExerciseAdmin)


class CourseStepUserCompletionAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "course",
        "object",
        "is_completed",
        "completed_at",
    )

    def component_type(self, obj):
        return obj.component.type

    component_type.short_description = "Course Component Type"


admin.site.register(CourseStepUserCompletion, CourseStepUserCompletionAdmin)
