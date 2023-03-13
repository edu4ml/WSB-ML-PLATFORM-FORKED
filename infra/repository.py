from infra.logging import logger


class Repository:
    def persist(self, model):
        raise NotImplementedError

    def list(self):
        raise NotImplementedError

    def retrieve(self):
        raise NotImplementedError


@logger
class MockedEntityRepository(Repository):
    def persist(self, model):
        self.logger.info(f"Mock Repository: persiting entity: {model}")

    def list(self):
        raise NotImplementedError

    def retrieve(self):
        raise NotImplementedError
