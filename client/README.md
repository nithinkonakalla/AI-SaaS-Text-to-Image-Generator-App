# 🤖 AI SaaS Text-to-Image Generator

[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.1-646CFF)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.8.4-47A248)](https://www.mongodb.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payment_Integration-02042B)](https://razorpay.com/)
[![ClipDrop API](https://img.shields.io/badge/ClipDrop_API-AI_Image_Generation-FF6B35)](https://clipdrop.co/)

A full-stack SaaS application that generates high-quality images from text prompts using AI. Features user authentication, credit-based system, secure payments via Razorpay, and a modern, responsive UI.

## 🌟 Live Demo

[View Live Application](https://ai-saa-s-text-to-image-generator-app-afel.vercel.app/)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Usage](#-usage)
- [Payment Integration](#-payment-integration)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Features

### Core Functionality
- **AI-Powered Image Generation**: Transform text prompts into high-quality images using ClipDrop API
- **User Authentication**: Secure JWT-based login and registration system
- **Credit-Based System**: Users start with 2 free credits, can purchase more via Razorpay
- **Responsive Design**: Modern UI built with Tailwind CSS and Framer Motion animations

### User Experience
- **Real-time Generation**: Watch images generate with loading animations
- **Download Functionality**: Direct download of generated images
- **Credit Management**: Track remaining credits in user dashboard
- **Mobile Optimized**: Fully responsive design for all devices

### Business Features
- **Multiple Pricing Plans**: Basic ($10/100 credits), Advanced ($50/500 credits), Business ($250/5000 credits)
- **Secure Payments**: Razorpay integration for Indian payments
- **Transaction Tracking**: Complete payment history and verification
- **User Management**: Profile management and credit balance tracking

## 🛠 Tech Stack

### Frontend
- **React 18** - Component-based UI library
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Toastify** - Notification system
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Token for authentication
- **bcryptjs** - Password hashing
- **Razorpay** - Payment gateway integration
- **CORS** - Cross-origin resource sharing

### External APIs
- **ClipDrop API** - AI-powered text-to-image generation
- **Razorpay API** - Payment processing

## 🏗 Architecture

```
AI SaaS Text-to-Image Generator/
├── client/                    # React Frontend (Vite)
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Main application pages
│   │   ├── context/         # React Context for state management
│   │   ├── assets/          # Images, icons, and static assets
│   │   └── ...
│   └── public/              # Static files
│
└── server/                   # Node.js Backend
    ├── config/              # Database configuration
    ├── controllers/         # Business logic
    ├── models/             # MongoDB schemas
    ├── routes/             # API routes
    ├── middlewares/        # Authentication middleware
    └── server.js           # Main server file
```

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB Atlas** account (or local MongoDB)
- **Razorpay** account for payment integration
- **ClipDrop API** key for image generation

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/nithinkonakalla/AI-SaaS-Text-to-Image-Generator-App.git
cd AI-SaaS-Text-to-Image-Generator-App
```

### 2. Backend Setup
```bash
cd server
npm install
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

### 4. Configure Environment Variables
See [Environment Variables](#-environment-variables) section below.

### 5. Start the Application

**Backend:**
```bash
cd server
npm run server  # Development with nodemon
# or
npm start       # Production
```

**Frontend:**
```bash
cd client
npm run dev     # Development server
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:4000

## 🔐 Environment Variables

### Backend (.env in server/)
```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/your_database

# JWT Authentication
JWT_SECRET=your_jwt_secret_key_here

# Razorpay Payment Gateway
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CURRENCY=INR

# ClipDrop AI API
CLIPDROP_API=your_clipdrop_api_key

# Server
PORT=4000
```

### Frontend (.env in client/)
```env
VITE_BACKEND_URL=http://localhost:4000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

## 📡 API Endpoints

### Authentication Routes
```
POST /api/user/register     # User registration
POST /api/user/login        # User login
POST /api/user/credits      # Get user credits
```

### Payment Routes
```
POST /api/user/pay-razor    # Create Razorpay order
POST /api/user/verify-razor # Verify payment
```

### Image Generation Routes
```
POST /api/image/generate    # Generate image from prompt
```

## 🗄 Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  creditBalance: Number (default: 2)
}
```

### Transaction Model
```javascript
{
  userId: String (required),
  plan: String (required),
  amount: Number (required),
  credits: Number (required),
  payment: Boolean (default: false),
  date: Number
}
```

## 📖 Usage

### 1. User Registration/Login
- New users can register with name, email, and password
- Existing users can login with email and password
- JWT tokens are issued for authenticated sessions

### 2. Image Generation
- Users start with 2 free credits
- Enter text prompts to generate images
- Each generation costs 1 credit
- Images are generated using ClipDrop AI API

### 3. Credit Management
- View current credit balance in user dashboard
- Purchase additional credits through Razorpay integration
- Three pricing tiers available

### 4. Payment Flow
- Select a plan (Basic/Advanced/Business)
- Razorpay handles secure payment processing
- Credits are added immediately after successful payment
- Transaction records are maintained for audit

## 💳 Payment Integration

### Pricing Plans
| Plan | Price | Credits | Best For |
|------|-------|---------|----------|
| Basic | $10 | 100 | Personal use |
| Advanced | $50 | 500 | Business use |
| Business | $250 | 5000 | Enterprise use |

### Razorpay Integration
- Secure payment processing
- Support for INR currency
- Order creation and verification
- Webhook handling for payment confirmation
- Duplicate payment prevention

## 🚀 Deployment

### Frontend Deployment (Vercel)
```bash
cd client
npm run build
# Deploy to Vercel
```

### Backend Deployment (Railway/Render)
```bash
cd server
npm run build
# Deploy to your preferred platform
```

### Environment Setup
- Set all environment variables in your deployment platform
- Configure MongoDB Atlas for production database
- Set up Razorpay production keys
- Configure CORS for your frontend domain

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Areas for Improvement

- [ ] Add image history for users
- [ ] Implement image editing features
- [ ] Add batch image generation
- [ ] Include user profile management
- [ ] Add admin dashboard for analytics
- [ ] Implement referral system
- [ ] Add social sharing features

## 🐛 Troubleshooting

### Common Issues

**Image Generation Fails:**
- Check ClipDrop API key validity
- Verify user has sufficient credits
- Check server logs for API errors

**Payment Issues:**
- Verify Razorpay keys are correct
- Check webhook configuration
- Ensure proper order verification

**Database Connection:**
- Verify MongoDB URI format
- Check network connectivity
- Validate database permissions

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **ClipDrop API** for AI-powered image generation
- **Razorpay** for seamless payment integration
- **MongoDB Atlas** for reliable database hosting
- **React & Vite** communities for excellent documentation

## 📞 Support

For support, email nithinkonakalla2357@gmail.com or create an issue in this repository.

---

**Built with ❤️ by Nithin Konakalla**

⭐ Star this repo if you found it helpful!
