from setuptools import find_packages, setup


project = "django-react-oauth"
version = "0.1.0"

setup(
    name=project,
    version=version,
    description="django-react-oauth",
    author="KubaSzw",
    author_email="szwajkajakub@gmail.com",
    packages=find_packages(exclude=["*.tests", "*.tests.*", "tests.*", "tests"]),
    include_package_data=True,
)
