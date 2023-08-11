from django.urls import path
from django.contrib.auth import views as auth_views
from . import views, trans_views

urlpatterns = [
    path('', views.index, name="home"),
    path('login/', views.login_view, name="login"),
    path('register/', views.register, name="register"),
    path("dashboard/", views.dashboard, name="dashboard"),

]