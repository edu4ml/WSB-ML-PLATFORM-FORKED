from pydantic import BaseModel

from course_tracker.models import Resource


class ResourceReadModel(BaseModel):
    url: str
    title: str

    def __init__(self, resource: Resource, **kwargs):
        kwargs["url"] = resource.url
        kwargs["title"] = resource.title
        super().__init__(**kwargs)
