from db.models import (
    CourseComponent as CourseComponentDbModel,
)
from elearning.coursing.entities.course_component import (
    CourseComponent as CourseComponentDomainModel,
)
from elearning.coursing.entities.external_resource import ExternalResource
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
