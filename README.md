
# Message Management System 

This is a fullstack application built with **Spring Boot 4** and **React (Vite)**. It allows users to view, delete, and create messages with a focus on clean architecture and smooth user experience.

## 🚀 Quick Start

### 1. Prerequisites

Ensure you have the following installed:

-   **Java 21** (JDK)
    
-   **Maven 3.9+**
    
-   **Node.js 20+** & npm
    

### 2. Backend Setup (Spring Boot)

1.  Navigate to the backend folder: `cd backend/messages`
    
2.  Install dependencies: `mvn clean install`
    
3.  Run the application: `mvn spring-boot:run`
    
    -   The API will be available at: `http://localhost:8080`
        
    -   H2 Console: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:messagedb`)

### 📖 API Documentation (Swagger)

Once the backend is running, you can explore and test the API endpoints interactively via Swagger UI:

-   **URL:** [http://localhost:8080/swagger-ui/index.html](https://www.google.com/search?q=http://localhost:8080/swagger-ui/index.html)
        

### 3. Frontend Setup (React)

1.  Navigate to the frontend folder: `cd frontend`
    
2.  Install dependencies: `npm install`
    
3.  Start the development server: `npm run dev`
    
    -   The app will be available at: `http://localhost:5173`
        

----------

## 🛠️ Tech Stack & Tools

### **Backend**

-   **Framework:** Spring Boot 4.0.2
    
-   **Database:** H2 (In-memory)
    
-   **Testing:** JUnit 5 & Mockito (Unit Testing)
    
-   **Documentation:** SpringDoc OpenAPI (Swagger)
    
-   **Key Features:**
    
    -   Layered Architecture (Controller -> Service -> Repository).
        
    -   Data Validation using `jakarta.validation`.
        
    -   Global Exception Handling for consistent API responses.
        
    -   DTO pattern to decouple Persistence and API layers.
        

### **Frontend**

-   **Framework:** React 18 with TypeScript
    
-   **State Management:** TanStack Query (React Query) for server-state.
    
-   **Styling:** Tailwind CSS v4.
    
-   **Routing:** React Router Dom.
    
-   **UX Enhancements:** - Loading Skeletons.
        
    -   Responsive Inbox layout.
        

----------

## 🧪 Testing

The backend includes **Unit Tests** for the Controller layer, ensuring business logic and DTO mapping work as expected without needing a full server restart.

To run the tests:

Bash

```
cd backend/messages
mvn test

```

----------

## 📁 Project Structure

Plaintext

```
.
├── backend/messages      # Spring Boot application
│   ├── src/main/java     # Logic and Configuration
│   └── src/test/java     # Unit Tests 
└── frontend/             # React + Vite + Tailwind v4
    ├── src/components    # Reusable UI components
    ├── src/hooks         # Custom hook
    └── src/services      # API Axios configuration

```

----------

Samuel Sanabria - 2026