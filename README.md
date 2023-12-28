# ProShop (An E-Commerce Website built with Django Rest Framework and React)
## Features
- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)
- Custom database models and managers
- Image upload
- Responsive design
- Mobile friendly
- Loading spinners
- And much much more...

## Installing Dependencies:

This project requires python version 3.8.10 (https://www.python.org/downloads/release/python-3810/)

1. Create a virtual environment and install the required packages
   Please open up a terminal and navigate to the project directory and run the following commands:
    ```shell
    python3.8 -m pip install poetry
    ```
    ```shell
    python3.8 -m poetry config virtualenvs.in-project true
    ```
    ```shell
    python3.8 -m poetry install
    ```
    This will create a virtual environment in the project directory and install all the required packages in it.
    Now, activate the virtual environment using the following command:
    ```shell
    . .venv/bin/activate
    ```

2. Setup the database
    1. You need to have a PostgreSQL database installed on your system. If you don't have it installed, please install it from https://www.postgresql.org/download/
    2. After installing PostgreSQL, please create the database.
    3. Now, open up the backend/settings.py file and change the database settings according to your PostgreSQL installation.

3. Run the migrations and start the server
    Please open up a terminal and navigate to the project directory and run the following commands:
    ```shell
    python3.8 manage.py migrate
    ```

4. Create a superuser
    ```shell
    python3.8 manage.py createsuperuser
    ```
    Now, enter the username, email and password for the superuser.

5. Run the server
    ```shell
    python3.8 manage.py runserver
    ```
    Now, open up a browser and go to http://127.0.0.1:8000/