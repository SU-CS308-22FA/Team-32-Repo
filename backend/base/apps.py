<<<<<<< HEAD
from django.apps import AppConfig


class BaseConfig(AppConfig):
    name = 'base'

    def ready(self):
        import base.signals
=======
from django.apps import AppConfig


class BaseConfig(AppConfig):
    name = 'base'

    def ready(self):
        import base.signals
>>>>>>> ca605efb8d6cfb9e1d4f1a141afc48a4f1183628
