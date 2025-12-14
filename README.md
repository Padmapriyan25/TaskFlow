# TaskFlow – Full Stack Task Management System ✔️

TaskFlow is a lightweight and modern full-stack Task Management System built using **Spring Boot**, **JWT Authentication**, **MySQL**, and a clean **HTML/CSS/JavaScript** frontend.  
It provides secure login, user registration, and complete CRUD operations for managing daily tasks with a smooth and minimal UI inspired by modern productivity apps.

---

## ✨ Features

### 🔐 Authentication
- User registration  
- Login with JWT token generation  
- Protected API routes using JWT filter  
- Password hashing with BCrypt  

### ✅ Task Management
- Add new tasks  
- Mark tasks as completed  
- Update task status  
- Delete tasks  
- Clean & responsive UI  

### 🧰 Tech Stack

**Backend**
- Java 17  
- Spring Boot  
- Spring Security (JWT)  
- MySQL  
- JPA + Hibernate  

**Frontend**
- HTML5  
- CSS3  
- JavaScript (Fetch API)  

---

## 📁 Project Structure

```
TaskFlow/
├── backend/                # Spring Boot source code
├── frontend/
│   ├── login.html
│   ├── register.html
│   ├── todos.html
│   ├── style.css
│   └── script.js
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/TaskFlow.git
cd TaskFlow
```

---

## 2️⃣ Backend Setup (Spring Boot)

Edit MySQL credentials in:

**src/main/resources/application.properties**

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/taskflow?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=root

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

### ▶️ Run the backend

```bash
mvn spring-boot:run
```

Backend runs at:

```
http://localhost:8080
```

---

## 3️⃣ Frontend Setup

You can directly open the HTML files in a browser  
OR use **VS Code Live Server**.

Files:
- login.html  
- register.html  
- todos.html  

Frontend uses:
- Fetch API  
- JWT stored in localStorage  

---

## 🔌 API Endpoints

### 🔑 Authentication

| Method | Endpoint       | Description       |
|--------|----------------|-------------------|
| POST   | /auth/register | Create new user   |
| POST   | /auth/login    | Login & receive JWT |

### 🗂️ Tasks (JWT Required)

| Method | Endpoint       | Description    |
|--------|----------------|----------------|
| GET    | /todo          | Fetch tasks    |
| POST   | /todo          | Add task       |
| PUT    | /todo          | Update task    |
| DELETE | /todo/{id}     | Delete task    |

---

## 🧪 Example Login Request

```json
{
  "email": "staff@taskflow.com",
  "password": "1234"
}
```

---

## 🚀 Future Enhancements
- Task categories & labels  
- Due dates, reminders & notifications  
- Dark mode UI  
- Cloud deployment (Render / AWS / Railway)  
- Mobile app version  
