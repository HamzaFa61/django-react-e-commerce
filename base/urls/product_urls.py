
from django.urls import path
from base.views import product_views

urlpatterns = [
    path('', product_views.get_products, name='products'),
    path('upload/', product_views.upload_image, name='image-upload'),
    path('create/', product_views.create_product, name='product-create'),
    path('top/', product_views.get_top_products, name='top-products'),
    path('<str:pk>/', product_views.get_product, name='product'),
    path('delete/<str:pk>/', product_views.delete_product, name='product-delete'),
    path('update/<str:pk>/', product_views.update_product, name='product-update'),
    path('create-review/<str:pk>/', product_views.create_product_review, name='create-review'),
]
