<<<<<<< HEAD
from django.contrib import admin
from django.urls import path, include
from base.views import product_views as views

urlpatterns = [
    path('test/', views.getRoutes, name="routes"),
    path('', views.getProducts, name="products"),
    path('<str:pk>', views.getProduct, name="product"),
]
=======
from django.contrib import admin
from django.urls import path, include
from base.views import product_views as views

urlpatterns = [
    path('test/', views.getRoutes, name="routes"),
    path('', views.getProducts, name="products"),
    path('<str:pk>', views.getProduct, name="product"),
]
>>>>>>> ca605efb8d6cfb9e1d4f1a141afc48a4f1183628
