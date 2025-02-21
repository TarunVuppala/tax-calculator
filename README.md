# Tax Management System

This project is a full-stack tax management application with a **Next.js frontend** and **Node.js backend**. Users can calculate taxes based on their gross income, claimed deductions, and age, and receive tax-saving suggestions.

---

## 🛠 Tech Stack

### Frontend:
- Next.js (React framework)
- Zustand (State management)
- Tailwind CSS (Styling)

### Backend:
- Node.js (Server-side runtime)
- Express.js (Web framework)
- MongoDB with Mongoose (Database & ODM)

---

## 🚀 Setup Instructions

### 1️⃣ Prerequisites
Ensure you have the following installed:
- **Node.js** (>= 16.0.0)
- **MongoDB** (or MongoDB Atlas for cloud storage)
- **Yarn or npm** (Package manager)

### 2️⃣ Clone the Repository
```sh
$ https://github.com/TarunVuppala/tax-calculator.git
$ cd tax-calculator
```

### 3️⃣ Backend Setup
Navigate to the `backend/` folder and install dependencies:
```sh
$ cd backend
$ npm install
```

Create a `.env` file in `backend/` and add:
```env
MONGO_URI=mongodb://localhost:27017/taxdb
PORT=5000
```

Start the backend server:
```sh
$ npm run dev
```
The API will be running at `http://localhost:5000`.

### 4️⃣ Frontend Setup
Navigate to the `frontend/` folder and install dependencies:
```sh
$ cd ../frontend
$ npm install
```

Create a `.env.local` file in `frontend/` and add:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

Start the Next.js frontend:
```sh
$ npm run dev
```
The frontend will be available at `http://localhost:3000`.

---

## 📌 API Documentation

### 🔹 Create a Tax Record
**Endpoint:** `POST /api/tax`

**Request Body:**
```json
{
  "age": 30,
  "grossIncome": 800000,
  "deductionsClaimed": {
    "Section 80C": 100000,
    "Section 80D": 20000
  }
}
```

**Response:**
```json
{
  "message": "Tax record created successfully",
  "success": true,
  "taxRecord": {
    "_id": "65a6b5f7d2...",
    "age": 30,
    "grossIncome": 800000,
    "taxableIncome": 680000,
    "finalTax": 54000,
    "cess": 2160,
    "taxSuggestions": [
      "Maximize Section 80C deductions",
      "Use NPS under Section 80CCD(1B)"
    ]
  }
}
```

### 🔹 Fetch All Tax Records
**Endpoint:** `GET /api/tax`

**Response:**
```json
{
  "message": "Tax records fetched successfully",
  "success": true,
  "taxRecords": [
    {
      "_id": "65a6b5f7d2...",
      "age": 30,
      "grossIncome": 800000,
      "taxableIncome": 680000,
      "finalTax": 54000,
      "cess": 2160
    }
  ]
}
```

### 🔹 Fetch a Tax Record by ID
**Endpoint:** `GET /api/tax/:id`

### 🔹 Update a Tax Record
**Endpoint:** `PUT /api/tax/:id`

### 🔹 Delete a Tax Record
**Endpoint:** `DELETE /api/tax/:id`

---

## 📂 Project Structure
```
📦 tax-management-system
├── 📂 backend
│   ├── 📂 constants
│   │   ├── taxConstants.js
│   ├── 📂 controller
│   │   ├── taxController.js
│   ├── 📂 model
│   │   ├── taxModel.js
│   ├── 📂 router
│   │   ├── tax.js
│   ├── 📂 util
│   │   ├── generateTaxSuggestions.js
│   │   ├── taxCalculator.js
│   ├── .env
│   ├── package.json
│   ├── server.js
├── 📂 frontend
│   ├── 📂 src
│   │   ├── 📂 app
│   │   │   ├── (tax)/records
│   │   │   │   ├── [id]/edit/page.jsx
|   |   |   |   ├── create/page.jsx
│   │   │   ├── page.jsx
│   │   ├── 📂 components
│   │   ├── 📂 lib
│   │   ├── globals.css
│   │   ├── layout.js
│   │   ├── page.js
│   ├── .env.development
│   ├── package.json
│   ├── README.md
```

---

## 📌 Features
✅ Calculate tax based on user input  
✅ Auto-generate tax-saving suggestions  
✅ Full CRUD operations (Create, Read, Update, Delete) for tax records  
✅ Zustand for state management in Next.js  
✅ MongoDB for storing tax data  
