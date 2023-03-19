from collections import defaultdict

from django import forms
from django.contrib.contenttypes.models import ContentType

from db.models import CourseStep


class CourseStepForm(forms.ModelForm):
    course_component = forms.CharField(required=False)

    class Meta:
        model = CourseStep
        fields = [
            "course",
            "order",
            "course_component",
        ]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # FIXME: we can exclude instances already assingned to this course here
        # it is not needed but nice to have for better user experience
        content_types = ContentType.objects.filter(model__in=("exercise",))

        choices_dict = dict()
        for ct in content_types:
            choices_dict[ct] = list(ct.model_class().objects.all())

        choices = [("", "----------")]
        for key, queryset in choices_dict.items():
            for item in queryset:
                choices.append(((key.model, item.id), f"{key} | {str(item)}"))

        self.fields["course_component"] = forms.ChoiceField(
            choices=choices,
            required=False,
        )

    def save(self, commit=True):
        choice = self.cleaned_data.get("course_component", None)
        if choice:
            model, component_id = eval(choice)
        else:
            model, component_id = None, None

        # Set the step_object_id field based on the content type
        instance = super().save(commit=False)
        instance.step_object_id = component_id
        instance.step_content_type = (
            ContentType.objects.get(model=model) if model else None
        )

        if commit:
            instance.save()

        return instance
