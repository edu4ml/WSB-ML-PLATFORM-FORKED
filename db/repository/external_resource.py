from uuid import UUID
from elearning.coursing.entities.external_resource import ExternalResource
from infra.exceptions import BadRequestException, NotFoundException
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
    root_model = ExternalResourceDbModel

    def create(self, **kwargs):
        post_data = kwargs.get("post_data")
        file_data = kwargs.get("file_data")

        form = ExternalResourceForm(post_data, file_data)

        if form.is_valid():
            resource = form.save()
            return self.from_model(resource)
        else:
            raise BadRequestException(form.errors)

    def update_by_uuid(self, uuid, **kwargs):

        try:
            resource = ExternalResourceDbModel.objects.get(uuid=uuid)
        except ExternalResourceDbModel.DoesNotExist:
            raise NotFoundException("Resource not found")

        post_data = kwargs.get("post_data")
        file_data = kwargs.get("file_data")

        resource.file.delete()
        form = ExternalResourceForm(post_data, file_data, instance=resource)

        if form.is_valid():
            resource = form.save()
            return self.from_model(resource)
        else:
            raise BadRequestException(form.errors)

    def delete_by_uuid(self, uuid: UUID):
        resource = self.root_model.objects.get(uuid=uuid)
        resource.file.delete()
        resource.delete()

    def from_model(self, external_resource):
        return ExternalResource(
            uuid=external_resource.uuid,
            title=external_resource.title,
            url=external_resource.url,
            file_link=external_resource.file.url if external_resource.file else "",
            type=external_resource.type,
        )
