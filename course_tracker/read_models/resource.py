from pydantic import BaseModel

from course_tracker.models import Resource


class ResourceReadModel(BaseModel):
    url: str
    description: str

    def __init__(self, resource: Resource, **kwargs):
        kwargs["url"] = resource.url
        kwargs["description"] = resource.description
        super().__init__(**kwargs)
