class Repository:
    def __init__(self, user=None) -> None:
        self.user = user

    def persist(self, model):
        raise NotImplementedError

    def list(self):
        raise NotImplementedError

    def retrieve(self, id):
        raise NotImplementedError
