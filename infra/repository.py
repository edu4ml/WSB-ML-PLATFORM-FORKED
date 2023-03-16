from django.core.exceptions import ObjectDoesNotExist


class RetrieveSingleContext:
    def __init__(self, root_model, obj_id, obj=None):
        self.root_model = root_model
        self.obj_id = obj_id
        self.obj = obj

    def __enter__(self):
        if self.obj is None:
            try:
                self.obj = self.root_model.objects.get(id=self.obj_id)
            except ObjectDoesNotExist:
                raise self.root_model.DoesNotExist(
                    f"{self.root_model.__name__} with ID {self.obj_id} does not exist"
                )
        return self.obj

    def __exit__(self, exc_type, exc_value, traceback):
        if exc_type is None:
            self.obj.save()


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

    def with_obj(self, obj_id, obj=None):
        return RetrieveSingleContext(self.root_model, obj_id, obj)
