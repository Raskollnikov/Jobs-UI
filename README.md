# React + Vite

[Swagger API Documentation](https://jobs-api-backend-c4563190d035.herokuapp.com/api-docs/)
Jobify - Full Stack Job Management Application

Project Overview

Jobs Ui is a full-stack job management application that allows users to register, log in, and manage job-related tasks.<br> After successful authentication, users can perform CRUD (Create, Read, Update, Delete) operations on job listings.<br> The backend is built with Node.js, Express.js, and MongoDB,<br> while the frontend is developed using React.js and interacts with the API to provide a seamless user experience.<br>

<br>
<br>
This project serves as a learning opportunity to understand the flow between frontend and backend development, API integration, and user authentication using JWT tokens.

<br>
<br>
Features
User Registration & Login: Users can sign up and log in using their email and password.<br>Authentication is handled with JWT (JSON Web Tokens).<br>

Job Management: Authenticated users can:
<br>
Create job listings
View all their jobs
Update job details
Delete jobs
<br>
API Integration: The frontend consumes the API built with Node.js and Express for managing jobs.<br>
Protected Routes: Certain routes are protected and only accessible to logged-in users.<br> If the token is absent or invalid, the user will be redirected to the login page.<br>
Responsive UI: Designed for ease of use across different devices.<br>

<br>
Tech Stack<br>
Backend<br>
Node.js: JavaScript runtime for building the server-side of the app.<br>
Express.js: Web framework for routing and handling requests.<br>
MongoDB: NoSQL database to store user and job data.<br>
JWT: For secure user authentication.<br>
<br>
Frontend<br>
React.js: JavaScript library for building the user interface.<br>
React Router: For client-side routing and navigation.<br>
Axios: HTTP client for making requests to the backend API.<br>
Tailwind
