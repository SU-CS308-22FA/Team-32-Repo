from django.contrib import admin
from django.urls import path, include
from base.views import product_views as views

urlpatterns = [
    path('test/', views.getRoutes, name="routes"),
    path('', views.getProducts, name="products"),
    path('<str:pk>', views.getProduct, name="product"),
]
