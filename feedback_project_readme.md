# Feedback Management Project

This project is a **Feedback Management System** consisting of three main modules:

1. **Admin** – Admin dashboard to manage questions and view feedback.
2. **Backend** – Express.js backend providing APIs for users, questions, and feedback.
3. **Feedback Widget** – A user-facing feedback widget that can be embedded in any website using a script tag.

---

## Project Structure

```
root/
│
├─ admin/                 # Admin dashboard (React + Material UI)
├─ backend/               # Backend server (Express.js + MongoDB)
└─ feedback-widget/       # Feedback widget (React) for embedding via script
```

---

## Features

### Admin Module
- Add, delete, and update feedback questions.
- View feedback submitted by all users.
- Dashboard UI built with Material UI.

### Backend
- REST APIs for user login/signup, question management, and feedback management.
- MongoDB database stores users, questions, and feedback.

### Feedback Widget
- Embedded via a script tag in any website.
- Users can login/signup and submit feedback.
- Supports **Yes/No** and **Star Rating** questions.
- Feedback is saved in the backend and can be viewed by admin.

> ⚠️ Note: Feedback widget is partially implemented due to time constraints (24-hour time limit).

---

## Steps to Run the Project

### 1. Backend
```bash
cd backend
npm install
npm start
```
This starts the backend server.

### 2. Admin
```bash
cd admin
npm install
npm run dev
```
This starts the React admin dashboard.

### 3. Feedback Widget
```bash
cd feedback-widget
npm install
npm run dev
```
This starts the widget for testing. The widget can be embedded in other projects using a `<script>` tag.

---

## Usage

- Admin can manage questions (add/edit/delete).
- Users can view the feedback widget, login/signup, and submit feedback.
- Submitted feedback is displayed in the admin dashboard.

---

## Notes
- Ensure MongoDB is running and backend API URLs are correctly configured in both admin and feedback-widget projects.
- Feedback widget is **not fully completed** due to time constraints. Some features may be partially functional.

---

## Author

Pawan Kumar

