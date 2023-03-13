from django.apps import AppConfig


class DbConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "db"

    def ready(self) -> None:
        """
        Load configuration when app is ready.
        """
        from elearning.configuration import Configuration

        GLOBAL_CONFIG = Configuration()
        GLOBAL_CONFIG.configure()

        return super().ready()
