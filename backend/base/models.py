from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)  # blank=True means that the field is not required
    image = models.ImageField(null=True, blank=True, default='/placeholder.png')
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    num_reviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    count_in_stock = models.IntegerField(null=True, blank=True, default=0)
    # auto_now_add=True means that the field is automatically set when the object is first created
    created_at = models.DateTimeField(auto_now_add=True)
    # auto_now=True means that the field is automatically updated every time you save the object
    updated_at = models.DateTimeField(auto_now=True)
    # _id = models.AutoField(primary_key=True, editable=False)  # editable=False means that the field cannot be edited

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'product'


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)  # user who wrote the review
    name = models.CharField(max_length=200, null=True, blank=True)  # name of the user who wrote the review
    rating = models.IntegerField(null=True, blank=True, default=0)  # rating given by the user
    comment = models.TextField(null=True, blank=True)  # comment given by the user
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.rating)

    class Meta:
        db_table = 'review'


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)  # user who placed the order
    payment_method = models.CharField(max_length=200, null=True, blank=True)  # payment method used by the user
    tax_price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)  # tax price of the order
    shipping_price = models.DecimalField(max_digits=7, decimal_places=2, null=True,
                                         blank=True)  # shipping price of the order
    total_price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)  # total price of the order
    is_paid = models.BooleanField(default=False)  # whether the order is paid or not
    paid_at = models.DateTimeField(auto_now_add=False, null=True, blank=True)  # when the order was paid
    is_delivered = models.BooleanField(default=False)  # whether the order is delivered or not
    delivered_at = models.DateTimeField(auto_now_add=False, null=True, blank=True)  # when the order was delivered
    created_at = models.DateTimeField(auto_now_add=True)  # when the order was created
    updated_at = models.DateTimeField(auto_now=True)  # when the order was last updated
    # shipping_address = models.ForeignKey('ShippingAddress', on_delete=models.SET_NULL,
    #                                      null=True, blank=True)  # shipping address of the order

    def __str__(self):
        return str(self.created_at)

    class Meta:
        db_table = 'order'


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)  # product ordered
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)  # order the product is in
    name = models.CharField(max_length=200, null=True, blank=True)  # name of the product ordered
    qty = models.IntegerField(null=True, blank=True, default=0)  # quantity of the product ordered
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)  # price of the product ordered
    image = models.CharField(max_length=200, null=True, blank=True)  # image of the product ordered
    created_at = models.DateTimeField(auto_now_add=True)  # when the order item was created
    updated_at = models.DateTimeField(auto_now=True)  # when the order item was last updated

    def __str__(self):
        return str(self.name)

    class Meta:
        db_table = 'order_item'


class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True,
                                 blank=True)  # order the shipping address is for
    address = models.CharField(max_length=200, null=True, blank=True)  # address of the shipping address
    city = models.CharField(max_length=200, null=True, blank=True)  # city of the shipping address
    postal_code = models.CharField(max_length=200, null=True, blank=True)  # postal code of the shipping address
    country = models.CharField(max_length=200, null=True, blank=True)  # country of the shipping address
    shipping_price = models.DecimalField(max_digits=7, decimal_places=2, null=True,
                                         blank=True)  # shipping price of the shipping address
    created_at = models.DateTimeField(auto_now_add=True)  # when the shipping address was created
    updated_at = models.DateTimeField(auto_now=True)  # when the shipping address was last updated

    def __str__(self):
        return str(self.address)

    class Meta:
        db_table = 'shipping_address'
