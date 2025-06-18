# 🛍️ SDN302 E-commerce Platform

A modern e-commerce platform built with Next.js 14, TypeScript, and MongoDB, featuring complete authentication and product management.

## 🚀 Live Demo

**Production URL**: [Deploying to Vercel...]

## ✨ Features

### 🔐 Authentication System
- ✅ User registration and login
- ✅ Session management with NextAuth.js
- ✅ Protected routes and API endpoints
- ✅ Role-based access control

### 📦 Product Management
- ✅ Create, Read, Update, Delete products
- ✅ Image upload and management
- ✅ Product search and filtering
- ✅ Responsive product cards

### 🎨 User Interface
- ✅ Modern, responsive design
- ✅ Mobile-first approach
- ✅ Conditional UI based on authentication
- ✅ Loading states and error handling

### 🛡️ Security
- ✅ API endpoint protection
- ✅ Input validation with Zod
- ✅ JWT token verification
- ✅ Secure password hashing

## 📋 Assignment 2 Requirements

### ✅ User Registration/Login
- [x] User registration with validation
- [x] User login with session management
- [x] Logout functionality
- [x] Password hashing with bcrypt

### ✅ Product CRUD with Authentication
- [x] Create products (authenticated users only)
- [x] Read products (public access)
- [x] Update products (authenticated users only)
- [x] Delete products (authenticated users only)

### ✅ Proper Access Control
- [x] API endpoint protection
- [x] Route-level protection
- [x] UI conditional rendering
- [x] Redirect unauthorized users

### ✅ Required API Endpoints
- [x] `GET /api/products` - List all products
- [x] `POST /api/products` - Create product (protected)
- [x] `PUT /api/products` - Update product (protected)
- [x] `DELETE /api/products` - Delete product (protected)
- [x] `GET /api/products/[id]` - Get specific product
- [x] `PUT /api/products/[id]` - Update specific product (protected)
- [x] `DELETE /api/products/[id]` - Delete specific product (protected)
- [x] `POST /api/auth/register` - User registration
- [x] `POST /api/auth/login` - User login

### ✅ Complete UI with Auth Features
- [x] Navigation with authentication state
- [x] Product cards with conditional edit/delete buttons
- [x] Protected pages (new product, edit product)
- [x] Login/register forms
- [x] User info display
- [x] Responsive design

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **Validation**: Zod
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB database
- Vercel account (for deployment)

### Local Development

1. **Clone the repository**
```bash
git clone <repository-url>
cd sdn302-ecommerce
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp env.example .env.local
```

Edit `.env.local` with your configuration:
```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
MONGODB_URI=your-mongodb-connection-string
```

4. **Run development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

```bash
# Run all tests
npm run test:api        # API protection tests
npm run test:ui         # UI authentication tests
npm run test:complete   # Complete authentication tests
npm run build          # Build and TypeScript check
```

## 🚀 Deployment to Vercel

### 1. Prepare for Deployment

1. **Push code to GitHub**
```bash
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

2. **Set up Vercel project**
- Connect your GitHub repository to Vercel
- Configure environment variables in Vercel dashboard

### 2. Environment Variables Setup

In Vercel dashboard, add these environment variables:

```env
NEXTAUTH_SECRET=your-production-secret-key
NEXTAUTH_URL=https://your-domain.vercel.app
MONGODB_URI=your-production-mongodb-connection-string
```

### 3. Deploy

Vercel will automatically deploy your application when you push to the main branch.

## 📁 Project Structure

```
sdn302-ecommerce/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # Authentication endpoints
│   │   └── products/          # Product endpoints
│   ├── components/            # React components
│   ├── products/              # Product pages
│   └── auth/                  # Auth pages
├── lib/                       # Utilities and configurations
├── models/                    # MongoDB models
├── scripts/                   # Test scripts
├── docs/                      # Documentation
└── public/                    # Static assets
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXTAUTH_SECRET` | Secret key for NextAuth.js | Yes |
| `NEXTAUTH_URL` | Your application URL | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |

### Build Configuration

- **Framework**: Next.js 14
- **Node.js Version**: 18+
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

## 📊 Performance

- **Build Time**: ~10-15 seconds
- **Bundle Size**: 84.2 kB (shared)
- **First Load JS**: 112 kB
- **Static Pages**: 13 pages
- **API Routes**: 4 dynamic routes

## 🔒 Security Features

- ✅ JWT token verification
- ✅ Session-based authentication
- ✅ API endpoint protection
- ✅ Input validation
- ✅ Error handling
- ✅ No sensitive data exposure

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection**
   - Ensure MongoDB URI is correct
   - Check network connectivity
   - Verify database permissions

2. **Authentication Issues**
   - Verify NEXTAUTH_SECRET is set
   - Check NEXTAUTH_URL configuration
   - Clear browser cookies

3. **Build Errors**
   - Run `npm run build` locally first
   - Check TypeScript errors
   - Verify all dependencies are installed

## 📝 License

This project is created for SDN302 Assignment 2.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

**Assignment 2 Status**: ✅ **COMPLETE**

All requirements have been implemented and tested successfully!
