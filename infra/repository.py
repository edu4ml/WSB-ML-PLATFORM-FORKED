from contextlib import contextmanager
from typing import Generic, TypeVar
from uuid import UUID

from django.core.exceptions import ObjectDoesNotExist

RootModel = TypeVar("RootModel")


class ModelRepository(Generic[RootModel]):
    db_model: RootModel = None

    def __init__(self, user=None) -> None:
        self.user = user

    def from_model(self, obj):
        raise NotImplementedError("Implement this method in child class")

    def update_with_entity(self, entity: RootModel):
        """
        This is specific for root model method so it should implement
        logic for root model only
        """
        raise NotImplementedError("Implement this method in child class")

    def get_by_uuid(self, uuid: UUID):
        try:
            obj = self.db_model.objects.get(uuid=uuid)
            return self.from_model(obj)
        except self.db_model.DoesNotExist:
            return None

    def search_single(self, **kwargs):
        try:
            obj = self.db_model.objects.get(**kwargs)
            return self.from_model(obj)
        except self.db_model.DoesNotExist:
            return

    def list_all(self):
        return [self.from_model(obj) for obj in self.db_model.objects.all()]

    def create(self, **kwargs):
        obj = self.db_model.objects.create(**kwargs)
        return self.from_model(obj)

    def update_by_uuid(self, uuid: UUID, **kwargs):
        obj = self.db_model.objects.get(uuid=uuid)
        for key, value in kwargs.items():
            setattr(obj, key, value)
        obj.save()
        return self.from_model(obj)

    def delete_by_uuid(self, uuid: UUID):
        self.db_model.objects.get(uuid=uuid).delete()

    @contextmanager
    def with_obj(self, obj_uuid, obj=None):
        if obj is None:
            try:
                obj = self.db_model.objects.get(uuid=obj_uuid)
            except ObjectDoesNotExist:
                raise self.db_model.DoesNotExist(
                    f"{self.db_model.__name__} with ID {obj_uuid} does not exist"
                )
        yield obj
        obj.save()
