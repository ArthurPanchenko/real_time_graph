from django.urls import re_path

from . import consumers


ws_urlpatterns = [
    re_path('graph/', consumers.GraphConsumer.as_asgi())
]