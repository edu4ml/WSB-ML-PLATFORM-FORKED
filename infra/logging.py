from logging import getLogger


def logger(obj):
    """
    logging decorator, assiging an object the 'logger' property
    Can be used on a Python class:

    @logger
    class MyClass:
        ...
    """
    obj.logger = getLogger(obj.__name__)
    return obj
