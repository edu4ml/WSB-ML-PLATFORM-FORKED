from uuid import UUID
from elearning.coursing.entities.external_resource import ExternalResource
from infra.exceptions import RequestException
from infra.logging import logger
from infra.repository import ModelRepository
from db.models import ExternalResource as ExternalResourceDbModel

from django import forms


class ExternalResourceForm(forms.ModelForm):
    class Meta:
        model = ExternalResourceDbModel
        fields = ("title", "url", "file")


@logger
class ExternalResourceRepository(ModelRepository):
    db_model = ExternalResourceDbModel

    def create(self, **kwargs):
        post_data = kwargs.get("post_data")
        file_data = kwargs.get("file_data")

        form = ExternalResourceForm(post_data, file_data)

        if form.is_valid():
            resource = form.save()
            return self.from_model(resource)
        else:
            raise RequestException(form.errors, status_code=400)

    def update_by_uuid(self, uuid, **kwargs):

        try:
            resource = ExternalResourceDbModel.objects.get(uuid=uuid)
        except ExternalResourceDbModel.DoesNotExist:
            raise RequestException("Resource not found", status_code=404)

        post_data = kwargs.get("post_data")
        file_data = kwargs.get("file_data")

        resource.file.delete()
        form = ExternalResourceForm(post_data, file_data, instance=resource)

        if form.is_valid():
            resource = form.save()
            return self.from_model(resource)
        else:
            raise RequestException(form.errors, status_code=400)

    def delete_by_uuid(self, uuid: UUID):
        try:
            resource = self.db_model.objects.get(uuid=uuid)
            resource.file.delete()
            resource.delete()
        except self.db_model.DoesNotExist:
            raise RequestException("Resource not found", status_code=404)

    def from_model(self, external_resource):
        return ExternalResource(
            uuid=external_resource.uuid,
            title=external_resource.title,
            url=external_resource.url,
            file_link=external_resource.file.url if external_resource.file else "",
            type=external_resource.type,
        )
