# ContextIQ Frontend — Angular Q&A Interface

> Angular application that allows users to ask questions based on a given text context.

---

## 🎯 Project Overview

The frontend provides a user interface where:

- Users paste a block of text (context)
- Users ask a question related to that text
- The system displays an answer based strictly on the context
- Previous questions are stored for quick reuse

This layer is responsible only for **UI, validation, and API communication**.

---

## 🛠️ Tech Stack

| What | Technology |
|------|-----------|
| Framework | Angular v16 |
| Language | TypeScript |
| Styling | SCSS |
| HTTP | HttpClient |
| Forms | Reactive Forms |

---

## 📁 Project Structure
src/
app/
components/
qa-tool/ # Main UI (input + answer + history)
services/
qa.service.ts # API communication
models/
qa.model.ts # Type definitions


---

## 🔄 Data Flow
User Input → Validation → API Call → Response → UI Update → Save to History


---

## ✨ Key Features

- Context-based question answering UI
- Form validation (minimum input constraints)
- Real-time feedback and loading states
- Error handling with user-friendly messages
- Question history for reuse
- Responsive design for multiple devices

---

## 🎯 Responsibility

The frontend is responsible for:

- Collecting user input
- Validating data
- Sending requests to backend
- Rendering responses
- Managing UI state