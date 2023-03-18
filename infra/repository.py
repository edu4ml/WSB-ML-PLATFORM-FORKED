from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction
from contextlib import contextmanager


class Repository:
    root_model = None

    def __init__(self, user=None) -> None:
        self.user = user

    def persist(self, model):
        raise NotImplementedError

    def list(self):
        raise NotImplementedError

    def retrieve(self, id):
        raise NotImplementedError

    def update(self, entity):
        raise NotImplementedError

    def delete(self, entity):
        raise NotImplemented

    @contextmanager
    def with_obj(self, obj_id, obj=None):
        if obj is None:
            try:
                obj = self.root_model.objects.get(id=obj_id)
            except ObjectDoesNotExist:
                raise self.root_model.DoesNotExist(
                    f"{self.root_model.__name__} with ID {obj_id} does not exist"
                )
        yield obj
        obj.save()

    @contextmanager
    def with_entity(self, parent_id: int):
        """
        This is ment to retrieve entity model, do operations,
        and perform update automatically in db
        """
        with transaction.atomic():
            self.resource = self.retrieve(parent_id)
            yield self.resource
            self.update(self.resource)
