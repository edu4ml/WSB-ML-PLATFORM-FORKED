from db.models import (
    CourseComponent as CourseComponentDbModel,
)
from elearning.coursing.entities.course_component import (
    CourseComponent as CourseComponentDomainModel,
)
from elearning.coursing.entities.external_resource import ExternalResource
from infra.exceptions import BadRequestException
from infra.logging import logger
from infra.repository import ModelRepository
from db.models import ExternalResource as ExternalResourceDbModel
from django import forms


class ExternalResourceForm(forms.ModelForm):
    class Meta:
        model = ExternalResourceDbModel
        fields = ("title", "url", "file")


@logger
class CourseComponentRepo(ModelRepository):
    root_model = CourseComponentDbModel
    root_entity = CourseComponentDomainModel

    def create(self, **kwargs):
        assert "title" in kwargs.keys()
        return super().create(**kwargs)

    def from_model(self, obj):
        return self.root_entity(
            uuid=obj.uuid,
            title=obj.title,
            description=obj.description,
            type=obj.type,
            created_at=obj.created_at,
            resources=[
                ExternalResource(
                    uuid=resource.uuid,
                    title=resource.title,
                    url=resource.url,
                    file_link=resource.file.url if resource.file else "",
                    type=resource.type,
                )
                for resource in obj.resources.all()
            ],
        )

    def add_resource(self, component_uuid, payload):
        file_data = payload.get("file_data")
        form_data = dict(title=payload["file_data"]["file"].name.replace(" ", "_"))

        form = ExternalResourceForm(form_data, file_data)

        if form.is_valid():
            resource = form.save()
            course_component = self.root_model.objects.get(uuid=component_uuid)
            course_component.resources.add(resource)

            return self.from_model(course_component)

        else:
            raise BadRequestException(form.errors)

    def remove_resource(self, component_uuid, resource_uuid):
        course_component = self.root_model.objects.get(uuid=component_uuid)
        course_component.resources.filter(uuid=resource_uuid).delete()
        return self.from_model(course_component)
