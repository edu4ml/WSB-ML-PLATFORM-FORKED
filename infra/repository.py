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
        raise NotImplemented

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
    def with_entity(self, parent_uuid: UUID):
        """
        This is ment to retrieve entity model, do operations,
        and perform update automatically in db
        """
        with transaction.atomic():
            self.resource = self.retrieve(parent_uuid)
            yield self.resource
            self.update(self.resource)
