from contextlib import contextmanager
from typing import Generic, TypeVar
from uuid import UUID

from django.core.exceptions import ObjectDoesNotExist


class RepositoryEntityBuilder:
    def __init__(self, user=None) -> None:
        self.user = user

    def from_model(self, obj):
        raise NotImplementedError("Implement this method in child class")


RootModel = TypeVar("RootModel")


class ModelRepository(Generic[RootModel]):
    root_model: RootModel = None
    entity_builder = RepositoryEntityBuilder()

    def __init__(self, user=None) -> None:
        self.user = user

    def getByUUID(self, uuid: UUID):
        try:
            obj = self.root_model.objects.get(uuid=uuid)
            return self.entity_builder.from_model(obj)
        except self.root_model.DoesNotExist:
            return None

    def searchSingle(self, **kwargs):
        try:
            obj = self.root_model.objects.get(**kwargs)
            return self.entity_builder.from_model(obj)
        except self.root_model.DoesNotExist:
            return None

    def listAll(self):
        return [
            self.entity_builder.from_model(obj) for obj in self.root_model.objects.all()
        ]

    def create(self, **kwargs):
        obj = self.root_model.objects.create(**kwargs)
        return self.entity_builder.from_model(obj)

    def updateByUUID(self, uuid: UUID, **kwargs):
        obj = self.root_model.objects.get(uuid=uuid)
        for key, value in kwargs.items():
            setattr(obj, key, value)
        obj.save()
        return self.entity_builder.from_model(obj)

    def updateWithEntity(self, entity: RootModel):
        """
        This is specific for root model method so it should implement
        logic for root model only
        """
        raise NotImplementedError("Implement this method in child class")

    def deleteByUUID(self, uuid: UUID):
        self.root_model.objects.get(uuid=uuid).delete()

    @contextmanager
    def with_obj(self, obj_uuid, obj=None):
        if obj is None:
            try:
                obj = self.root_model.objects.get(uuid=obj_uuid)
            except ObjectDoesNotExist:
                raise self.root_model.DoesNotExist(
                    f"{self.root_model.__name__} with ID {obj_uuid} does not exist"
                )
        yield obj
        obj.save()
