from contextlib import contextmanager
from uuid import UUID

from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction


class RepositoryEntityBuilder:
    def __init__(self, user=None) -> None:
        self.user = user

    def from_model(self, obj):
        raise NotImplementedError("Implement this method in child class")


class RepositoryCrud:
    root_model = None
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

    # @contextmanager
    # def with_entity(self, parent_uuid: UUID, commit=True):
    #     """
    #     This is meant to retrieve entity model, do operations,
    #     and perform update automatically in db
    #     """
    #     with transaction.atomic():
    #         self.resource = self.getByUUID(parent_uuid)
    #         yield self.resource

    #         if commit:
    #             self.updateByUUID(uuid=parent_uuid, self.resource)


class Repository:
    root_model = None
    crud: RepositoryCrud() = None
    entity_builder = RepositoryEntityBuilder()

    def __init__(self, user=None) -> None:
        self.user = user

    def persist(self, model):
        raise NotImplementedError

    def list(self):
        raise NotImplementedError

    def retrieve(self, uuid: UUID):
        raise NotImplementedError

    def update(self, entity):
        raise NotImplementedError

    def delete(self, entity):
        raise NotImplementedError

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

    @contextmanager
    def with_entity(self, parent_uuid: UUID, commit=True):
        """
        This is ment to retrieve entity model, do operations,
        and perform update automatically in db
        """
        with transaction.atomic():
            self.resource = self.retrieve(parent_uuid)
            yield self.resource

            if commit:
                self.update(self.resource)
