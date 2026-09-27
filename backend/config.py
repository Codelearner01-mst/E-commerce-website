import os
from dotenv import load_dotenv


load_dotenv()


class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key")


class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DEV_DATABASE_URL")
    DEBUG = True

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.getenv("TEST_DATABASE_URL")


class ProductionConfig(Config):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.getenv("PROD_DATABASE_URL")

configs = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig
    }
