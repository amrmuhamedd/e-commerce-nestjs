# E-Commerce Project Documentation

Welcome to the documentation for the E-Commerce project built with NestJS. This project aims to provide a backend solution for an e-commerce platform with user registration, product management, and shopping cart functionality.

## Project Overview

The E-Commerce project is built using the NestJS framework, which provides a robust foundation for creating scalable and maintainable applications. The project follows a clear structure to ensure organization and readability.



## Tech Stack

The E-Commerce project REST API is built using the following technologies:

- **Node.js**: The server-side environment for running JavaScript.
- **Nest.js**: A fast and minimalist web framework for Node.js.
- **mongoose**: An ORM (Object-Relational Mapping) for database interactions.
- **MongoDb**: A powerful, open-source relational database.
- **JWT (JSON Web Tokens)**: For secure authentication and authorization.
- **Swagger**: For API documentation.


### Project Structure

The project is organized into the following main directories:

- `src`: This directory contains the source code of the application.
  - `auth`: Manages user authentication and authorization.
  - `products`: Handles product management and shopping cart functionality.
    - `products-controller`: Contains CRUD operations for products and shopping cart management.

## Design Patterns and Logic

### Authentication and Authorization

The project implements a role-based authentication and authorization system. Users can register with the system and have roles of either "user" or "admin". Users with the "user" role can browse products and add them to their cart, while users with the "admin" role can create and update products.

### Product Management

Product management is handled through the `products` module. The `products-controller` implements CRUD operations for products. Only admins can create and update products, and users can view products and add them to their cart.

### Shopping Cart

Users can add products to their shopping cart, allowing them to collect items before proceeding to checkout. The shopping cart functionality is integrated with the `products` module.

## Optimization and Validation

### Validation Process

Input validation and data integrity are crucial in any application. The project employs validation mechanisms to ensure that only valid data is accepted. NestJS provides built-in validation through decorators and pipes, which helps prevent invalid data from entering the system.

### Error Handling

The project has implemented error handling strategies to provide meaningful and user-friendly error messages in case of failures. This enhances the user experience and helps developers quickly identify and resolve issues.

## Getting Started

To set up the project locally, follow these steps:

1. Clone the repository.
2. Navigate to the project directory and run `npm install` to install dependencies.
3. Create a `.env.prod` file and add your database URL in the following format:

```
DataBaseUrl = "your_database_url_here"
```
4. Run `npm start` to start the project. It will run on port 7000 by default.


## Conclusion

The E-Commerce project built with NestJS provides a solid foundation for developing an e-commerce backend. The clear project structure, role-based authentication, product management, and shopping cart functionality make it a versatile solution for building and scaling e-commerce platforms.

Please refer to the [live documentation](https://e-commerce-0tqz.onrender.com/docs/) for more detailed information about the project's API endpoints and functionality.
