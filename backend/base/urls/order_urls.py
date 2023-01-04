from django.contrib import admin
from django.urls import path, include
from base.views import order_views as views
from base.views.order_views import getOrderById

urlpatterns = [
    path('', views.getOrders, name='orders'),
    path('add/', views.addOrderItems, name='orders-add'),
    path('myorders/', views.getMyOrders, name='my-orders'),
    path('<str:pk>', views.getOrderById, name='order')
]
