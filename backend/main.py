from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime
import uvicorn

app = FastAPI(
    title="Hutton Technologies API",
    description="Backend API for Hutton Technologies website",
    version="1.0.0"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    message: str
    company: Optional[str] = None
    phone: Optional[str] = None

class WaitlistSignup(BaseModel):
    email: EmailStr

class Service(BaseModel):
    id: int
    title: str
    description: str
    icon: str

class TeamMember(BaseModel):
    id: int
    name: str
    role: str
    bio: str
    image: str

# In-memory storage (replace with database in production)
contact_messages: List[ContactMessage] = []
waitlist_emails: List[dict] = []

# Sample data
services = [
    Service(
        id=1,
        title="Custom Software Development",
        description="Tailored software solutions built to meet your unique business needs with cutting-edge technologies.",
        icon="code"
    ),
    Service(
        id=2,
        title="Cloud Infrastructure",
        description="Scalable and secure cloud solutions to power your applications and drive business growth.",
        icon="cloud"
    ),
    Service(
        id=3,
        title="AI & Machine Learning",
        description="Intelligent systems and data-driven insights to transform your business operations.",
        icon="brain"
    ),
    Service(
        id=4,
        title="Mobile App Development",
        description="Native and cross-platform mobile applications that deliver exceptional user experiences.",
        icon="mobile"
    ),
    Service(
        id=5,
        title="DevOps & Automation",
        description="Streamline your development workflow with continuous integration and deployment solutions.",
        icon="settings"
    ),
    Service(
        id=6,
        title="Cybersecurity",
        description="Comprehensive security solutions to protect your digital assets and maintain compliance.",
        icon="shield"
    ),
]

team_members = [
    TeamMember(
        id=1,
        name="Sarah Johnson",
        role="Chief Technology Officer",
        bio="15+ years of experience in enterprise software architecture and cloud infrastructure.",
        image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
    ),
    TeamMember(
        id=2,
        name="Michael Chen",
        role="Lead Software Engineer",
        bio="Full-stack developer specializing in modern web technologies and scalable systems.",
        image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
    ),
    TeamMember(
        id=3,
        name="Emily Rodriguez",
        role="AI/ML Engineer",
        bio="Expert in machine learning models and natural language processing applications.",
        image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"
    ),
    TeamMember(
        id=4,
        name="David Kim",
        role="DevOps Lead",
        bio="Kubernetes and cloud infrastructure specialist with a focus on automation.",
        image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400"
    ),
]

# API Routes
@app.get("/")
async def root():
    return {
        "message": "Welcome to Hutton Technologies API",
        "version": "1.0.0",
        "status": "active"
    }

@app.get("/api/services", response_model=List[Service])
async def get_services():
    """Get all available services"""
    return services

@app.get("/api/services/{service_id}", response_model=Service)
async def get_service(service_id: int):
    """Get a specific service by ID"""
    service = next((s for s in services if s.id == service_id), None)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service

@app.get("/api/team", response_model=List[TeamMember])
async def get_team():
    """Get all team members"""
    return team_members

@app.get("/api/team/{member_id}", response_model=TeamMember)
async def get_team_member(member_id: int):
    """Get a specific team member by ID"""
    member = next((m for m in team_members if m.id == member_id), None)
    if not member:
        raise HTTPException(status_code=404, detail="Team member not found")
    return member

@app.post("/api/contact")
async def submit_contact(message: ContactMessage):
    """Submit a contact form message"""
    # Add timestamp
    message_dict = message.model_dump()
    message_dict["timestamp"] = datetime.now().isoformat()
    contact_messages.append(message)
    
    return {
        "success": True,
        "message": "Thank you for your message. We'll get back to you soon!",
        "data": message_dict
    }

@app.get("/api/contact/messages")
async def get_contact_messages():
    """Get all contact messages (admin endpoint)"""
    return contact_messages

@app.post("/api/waitlist")
async def join_waitlist(signup: WaitlistSignup):
    """Add email to waitlist"""
    # Check if email already exists
    if any(entry["email"] == signup.email for entry in waitlist_emails):
        return {
            "success": True,
            "message": "You're already on the waitlist!",
            "already_subscribed": True
        }
    
    # Add to waitlist
    entry = {
        "email": signup.email,
        "timestamp": datetime.now().isoformat()
    }
    waitlist_emails.append(entry)
    
    return {
        "success": True,
        "message": "Welcome to the waitlist! We'll notify you when we launch.",
        "already_subscribed": False
    }

@app.get("/api/waitlist")
async def get_waitlist():
    """Get all waitlist signups (admin endpoint)"""
    return waitlist_emails

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
