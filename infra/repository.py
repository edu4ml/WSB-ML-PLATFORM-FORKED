from contextlib import contextmanager
from uuid import UUID

from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction


class Repository:
    root_model = None

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


class RepositoryCrud:
    root_model = None
    root_entity = None

    def retrieve(self, uuid: UUID):
        try:
            obj = self.root_model.objects.get(uuid=uuid)
            return self._from_object(obj)
        except self.root_model.DoesNotExist:
            return None

    def search(self, **kwargs):
        try:
            obj = self.root_model.objects.get(**kwargs)
            return self._from_object(obj)
        except self.root_model.DoesNotExist:
            return None

    def list(self):
        return [self._from_object(obj) for obj in self.root_model.objects.all()]

    def create(self, **kwargs):
        obj = self.root_model.objects.create(**kwargs)
        return self._from_object(obj)

    def update(self, obj_uuid, **kwargs):
        obj = self.root_model.objects.get(uuid=obj_uuid)
        for key, value in kwargs.items():
            setattr(obj, key, value)
        obj.save()
        return self._from_object(obj)

    def delete(self, uuid: UUID):
        self.root_model.objects.get(uuid=uuid).delete()

    def _from_object(self, obj):
        raise NotImplementedError("Implement this method in child class")
