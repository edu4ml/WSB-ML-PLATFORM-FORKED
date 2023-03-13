from pydantic import BaseModel

from course_tracker.models import Resource as ResourceModel


class Resource(BaseModel):
    url: str
    title: str

    def __init__(self, resource: ResourceModel, **kwargs):
        kwargs["url"] = resource.url
        kwargs["title"] = resource.title
        super().__init__(**kwargs)
