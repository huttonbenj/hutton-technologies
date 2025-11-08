# Hutton Technologies Website

A modern, professional website for Hutton Technologies built with FastAPI backend and Next.js frontend.

## 🚀 Features

- **Modern Design**: Beautiful, responsive UI with smooth animations
- **Full-Stack Application**: FastAPI backend with Next.js frontend
- **RESTful API**: Well-structured API endpoints for services, team, and contact
- **Type Safety**: TypeScript for frontend type safety
- **Styling**: Tailwind CSS for modern, utility-first styling
- **Contact Form**: Functional contact form with backend integration
- **Responsive**: Mobile-first design that works on all devices

## 📋 Prerequisites

- Python 3.8+ (for backend)
- Node.js 18+ (for frontend)
- npm or yarn

## 🛠️ Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file (optional):
```bash
cp .env.example .env
```

5. Run the backend server:
```bash
python main.py
# or
uvicorn main:app --reload
```

The backend will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

The frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
hutton-technologies/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   ├── .env.example        # Environment variables template
│   └── .gitignore
├── frontend/
│   ├── app/
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   ├── Header.tsx      # Navigation header
│   │   ├── Hero.tsx        # Hero section
│   │   ├── About.tsx       # About section
│   │   ├── Services.tsx    # Services section
│   │   ├── Team.tsx        # Team section
│   │   ├── Contact.tsx     # Contact form
│   │   └── Footer.tsx      # Footer
│   ├── lib/
│   │   └── api.ts          # API client
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── next.config.js
└── README.md
```

## 🔌 API Endpoints

### Services
- `GET /api/services` - Get all services
- `GET /api/services/{id}` - Get specific service

### Team
- `GET /api/team` - Get all team members
- `GET /api/team/{id}` - Get specific team member

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact/messages` - Get all contact messages (admin)

### Health
- `GET /health` - Health check endpoint
- `GET /` - API info

## 🎨 Technologies Used

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **Uvicorn**: ASGI server
- **Pydantic**: Data validation using Python type annotations
- **Python-dotenv**: Environment variable management

### Frontend
- **Next.js 14**: React framework with App Router
- **React 18**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Axios**: HTTP client for API requests

## 🚢 Deployment

### Backend Deployment

The FastAPI backend can be deployed to:
- **Heroku**: Using Procfile
- **AWS**: Using EC2 or Lambda
- **DigitalOcean**: Using App Platform
- **Docker**: Using containerization

### Frontend Deployment

The Next.js frontend can be deployed to:
- **Vercel**: Recommended (zero-config)
- **Netlify**: Easy deployment with git integration
- **AWS Amplify**: Full-stack deployment
- **Docker**: Using containerization

## 📝 Environment Variables

### Backend (.env)
```
PORT=8000
HOST=0.0.0.0
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🧪 Testing

Run backend tests:
```bash
cd backend
pytest
```

Run frontend tests:
```bash
cd frontend
npm test
```

## 📄 License

This project is proprietary and confidential.

## 👥 Contact

For questions or support, please contact:
- Email: contact@huttontech.com
- Phone: +1 (555) 123-4567

---

Built with ❤️ by Hutton Technologies
