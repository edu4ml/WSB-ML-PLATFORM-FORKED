from django.apps import AppConfig

from infra.logging import logger

APP_NAME = "elearning"


@logger
class ElearningConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = APP_NAME

    config = None

    def ready(self) -> None:
        """
        Load configuration when app is ready.
        """
        from elearning.configuration import Configuration

        self.config = Configuration()
        self.config.configure()

        self.logger.info("App: elearning ready and loaded")
        return super().ready()
