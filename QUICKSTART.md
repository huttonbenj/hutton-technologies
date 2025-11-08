# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn

### Setup & Run

#### Option 1: Use the convenience scripts

**Terminal 1 - Backend:**
```bash
./start-backend.sh
```

**Terminal 2 - Frontend:**
```bash
./start-frontend.sh
```

#### Option 2: Manual setup

**Backend (Terminal 1):**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm install
npm run dev
```

### Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs

## ✅ Features

- ✨ Modern, responsive design
- 🎨 Beautiful UI with Tailwind CSS
- 🚀 Fast API with FastAPI
- 📱 Mobile-first responsive layout
- 💼 Professional business sections
- 📧 Working contact form
- 👥 Team showcase
- 🛠️ Services catalog

## 📋 What's Included

### Sections
1. **Hero** - Eye-catching landing section
2. **About** - Company overview with stats
3. **Services** - 6 service offerings
4. **Team** - Team member profiles
5. **Contact** - Functional contact form

### API Endpoints
- `/api/services` - Get services
- `/api/team` - Get team members
- `/api/contact` - Submit contact form

## 🔧 Configuration

### Backend
Edit `backend/.env`:
```env
PORT=8000
HOST=0.0.0.0
CORS_ORIGINS=http://localhost:3000
```

### Frontend
Edit `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📖 Need More Help?

See the full README.md for:
- Detailed setup instructions
- Project structure
- Deployment guides
- Complete API documentation

---

**Hutton Technologies** - Built with FastAPI & Next.js
