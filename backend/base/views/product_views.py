from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from base.models import Product, Review
from base.serializers import ProductSerializer
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import status


@api_view(['GET'])
def get_products(request):
    keyword = request.query_params.get('keyword')
    page = request.query_params.get('page')

    if keyword is None or keyword == '':
        keyword = ''

    products = Product.objects.filter(name__icontains=keyword)
    page_size = 1
    paginator = Paginator(products, page_size)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
        page = 1
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
        page = paginator.num_pages

    if page == None or page == '':
        page = 1

    page = int(page)

    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def get_product(request, pk):
    product = Product.objects.get(id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_product(request, pk):
    product = Product.objects.get(id=pk)
    product.delete()
    return Response('Product successfully deleted')


@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_product(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        count_in_stock=0,
        category='Sample Category',
        description=''
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_product(request, pk):
    data = request.data
    product = Product.objects.get(id=pk)
    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.count_in_stock = data['count_in_stock']
    product.category = data['category']
    product.description = data['description']
    product.save()
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def upload_image(request):
    data = request.data
    product_id = data['product_id']
    product = Product.objects.get(id=product_id)
    product.image = request.FILES.get('image')
    product.save()
    return Response('Image was uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_product_review(request, pk):
    user = request.user
    product = Product.objects.get(id=pk)
    data = request.data
    # 1 - Review already exists
    already_exists = product.review_set.filter(user=user).exists()
    if already_exists:
        content = {'message': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    # 2 - No Rating or 0
    elif data['rating'] == 0:
        content = {'message': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    # 3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment']
        )
        reviews = product.review_set.all()
        product.num_reviews = len(reviews)
        total = 0

        for review in reviews:
            total += review.rating

        product.rating = total / len(reviews)
        product.save()
        return Response('Review added')


@api_view(['GET'])
def get_top_products(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)
