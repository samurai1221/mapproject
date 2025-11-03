from django.urls import path
from . import views

urlpatterns = [
    path('', views.map_view, name='index'),
    path("sw-log/", views.sw_log, name="sw_log"),
]
