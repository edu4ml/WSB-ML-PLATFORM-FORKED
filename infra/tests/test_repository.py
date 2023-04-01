import pytest
from django.contrib.auth import get_user_model

from infra.repository import ModelRepository


UserModel = get_user_model()


class DummyUserRepo(ModelRepository):
    root_model = UserModel


@pytest.mark.django_db
def test_repository_retrieve_single_context_manager_success():
    user = UserModel.objects.create_user(
        email="test@example.com", username="test-user", password="1234"
    )
    assert user.username == "test-user"

    with DummyUserRepo().with_obj(user.uuid) as user:
        user.username = "test-user-new-name"

    assert UserModel.objects.get(uuid=user.uuid).username == "test-user-new-name"


@pytest.mark.django_db
def test_repository_retrieve_single_context_manager_exception():
    with pytest.raises(UserModel.DoesNotExist):
        with DummyUserRepo(UserModel()).with_obj(1):
            pass  # pragma: no cover


@pytest.mark.django_db
def test_repository_needs_implementation_for_persist_method():
    with pytest.raises(NotImplementedError):
        DummyUserRepo(UserModel()).create(
            **dict(email="example@example.com", username="example")
        )
