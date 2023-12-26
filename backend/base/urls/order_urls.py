from django.urls import path
from base.views import order_views as views

urlpatterns = [
    path('', views.get_orders, name='orders'),
    path('add/', views.add_order_items, name='orders-add'),
    path('<str:pk>/', views.get_order_by_id, name='user-by-id'),
    path('<str:pk>/pay/', views.update_order_to_paid, name='pay'),
    path('<str:pk>/deliver/', views.update_order_to_delivered, name='deliver'),
    path('myorders/', views.get_my_orders, name='myorders'),
]
