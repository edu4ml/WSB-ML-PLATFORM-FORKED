from db.models import (
    CourseComponent as CourseComponentDbModel,
)
from elearning.coursing.entities.course_component import CourseComponent
from elearning.coursing.entities.external_resource import ExternalResource
from infra.exceptions import BadRequestException
from infra.logging import logger
from infra.repository import Repository, RepositoryCrud, RepositoryEntityBuilder
from db.models import ExternalResource as ExternalResourceDbModel
from django import forms


class ExternalResourceForm(forms.ModelForm):
    class Meta:
        model = ExternalResourceDbModel
        fields = ("title", "url", "file")


@logger
class CourseComponentEntityBuilder(RepositoryEntityBuilder):
    root_entity = CourseComponent

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


@logger
class CourseComponentRepositoryCRUD(RepositoryCrud):
    root_model = CourseComponentDbModel
    root_entity = CourseComponent
    entity_builder = CourseComponentEntityBuilder()

    def create(self, **kwargs):
        # this can be done with a serializer
        assert "title" in kwargs.keys()
        assert "description" in kwargs.keys()
        assert "type" in kwargs.keys()

        return super().create(**kwargs)


@logger
class CourseComponentRepository(Repository):
    root_model = CourseComponentDbModel
    crud = CourseComponentRepositoryCRUD()
    entity_builder = CourseComponentEntityBuilder()

    def list(self):
        return [
            CourseComponent(
                uuid=component.uuid,
                title=component.title,
                description=component.description,
                type=component.type,
                resources=self._get_resources(component),
            )
            for component in self.root_model.objects.all()
        ]

    def persist(self, data):
        # This one is done in a CRUD fashion. No logic needed here.
        obj = self.root_model.objects.create(
            title=data["title"],
            description=data["description"],
            type=data["type"],
        )
        return self._prepare_domain_entity(obj)

    def _prepare_domain_entity(self, obj):
        return CourseComponent(
            uuid=obj.uuid,
            title=obj.title,
            description=obj.description,
            type=obj.type,
            resources=self._get_resources(obj),
        )

    def _get_resources(self, component):
        return [
            dict(
                title=resource.title,
                url=resource.url,
            )
            for resource in component.resources.all()
        ]

    def add_resource(self, component_uuid, payload):
        file_data = payload.get("file_data")
        form_data = dict(title=payload["file_data"]["file"].name.replace(" ", "_"))

        form = ExternalResourceForm(form_data, file_data)

        if form.is_valid():
            resource = form.save()
            course_component = self.root_model.objects.get(uuid=component_uuid)
            course_component.resources.add(resource)

            return self.entity_builder.from_model(course_component)

        else:
            raise BadRequestException(form.errors)

    def remove_resource(self, component_uuid, resource_uuid):
        course_component = self.root_model.objects.get(uuid=component_uuid)
        course_component.resources.filter(uuid=resource_uuid).delete()
        return self.entity_builder.from_model(course_component)
