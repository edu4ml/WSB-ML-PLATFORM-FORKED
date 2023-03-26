from db.models import (
    CourseComponent as CourseComponentDbModel,
)
from elearning.coursing.entities.course_component import CourseComponent
from infra.logging import logger
from infra.repository import Repository, RepositoryCrud


@logger
class CourseComponentRepositoryCRUD(RepositoryCrud):
    root_model = CourseComponentDbModel
    root_entity = CourseComponent

    def create(self, **kwargs):
        # this can be done with a serializer
        assert "title" in kwargs.keys()
        assert "description" in kwargs.keys()
        assert "type" in kwargs.keys()

        return super().create(**kwargs)

    def _from_object(self, object: CourseComponentDbModel):
        return self.root_entity(
            uuid=object.uuid,
            title=object.title,
            description=object.description,
            type=object.type,
            resources=[
                dict(
                    title=resource.title,
                    url=resource.url,
                )
                for resource in object.resources.all()
            ],
        )


@logger
class CourseComponentRepository(Repository):
    root_model = CourseComponentDbModel
    crud = CourseComponentRepositoryCRUD()

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
