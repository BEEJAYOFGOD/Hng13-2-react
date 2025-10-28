# Ticket Management App - React

A modern, responsive ticket management web application built with React, featuring authentication, dashboard, and full CRUD operations for tickets.

## 🚀 Technologies Used

- **React** 18.x
- **React Router DOM** - For routing and navigation
- **Vite** - Build tool and dev server
- **Tailwind CSS** - For styling
- **LocalStorage API** - For authentication and data persistence

## 📋 Features

- **Landing Page** with wavy hero section and decorative elements
- **Authentication System** (Login/Signup) with form validation
- **Protected Routes** - Dashboard and ticket pages require authentication
- **Dashboard** with ticket statistics (Total, Open, In Progress, Closed)
- **Full CRUD Ticket Management**
  - Create new tickets
  - View all tickets
  - Edit existing tickets
  - Delete tickets with confirmation
- **Form Validation** with inline error messages
- **Toast Notifications** for success/error feedback
- **Responsive Design** - Mobile, tablet, and desktop optimized
- **Status-based Color Coding** (Green for open, Amber for in_progress, Gray for closed)

## 🎨 Design Specifications

- **Max Width**: 1440px centered container
- **Hero Section**: SVG wavy background
- **Decorative Elements**: Circular shapes and card-based layouts
- **Responsive Breakpoints**: Mobile (< 768px), Tablet (768px - 1024px), Desktop (> 1024px)
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation support

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
   git clone <your-repo-url>
   cd ticket-app-react
```

2. **Install dependencies**
```bash
   npm install
```

3. **Run development server**
```bash
   npm run dev
```

4. **Open in browser**
```
   http://localhost:5173
```

### Build for Production
```bash
npm run build
```

The build output will be in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

## 🧪 Test Credentials

Use these credentials to test the application:

- **Email**: `test@example.com`
- **Password**: `password123`

Or create a new account via the signup page.

## 📁 Project Structure
```
ticket-app-react/
├── public/
│   └── assets/
│       ├── wave.svg
│       └── circles.svg
├── src/
│   ├── components/
│   │   ├── Landing/
│   │   ├── Auth/
│   │   ├── Dashboard/
│   │   ├── Tickets/
│   │   └── common/
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   └── useAuth.js
│   ├── utils/
│   │   ├── validation.js
│   │   └── storage.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md
```

## 🔐 Authentication & Authorization

- Authentication uses **localStorage** with key: `ticketapp_session`
- Protected routes redirect to `/auth/login` if no valid session
- Logout clears session and redirects to landing page
- Session token format: JSON object with user info and timestamp

## 📝 State Management

- **React Context API** for global authentication state
- **useState** for local component state
- **useEffect** for side effects and data fetching
- LocalStorage for data persistence

## ✨ UI Components

### Landing Page
- Hero section with wavy SVG background
- Feature cards with hover effects
- Call-to-action buttons
- Responsive navigation

### Authentication
- Login and Signup forms
- Real-time validation
- Error handling with toast notifications
- Password visibility toggle

### Dashboard
- Statistics cards (Total, Open, In Progress, Closed tickets)
- Quick action buttons
- Logout functionality
- Navigation to ticket management

### Ticket Management
- Ticket list with status badges
- Create/Edit forms with validation
- Delete confirmation modal
- Status-based color coding
- Search and filter capabilities

## 🎯 Validation Rules

- **Title**: Required, min 3 characters
- **Status**: Required, must be one of: `open`, `in_progress`, `closed`
- **Description**: Optional, max 500 characters
- **Priority**: Optional, must be: `low`, `medium`, `high`

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Color contrast compliance (WCAG AA)
- Alt text for images

## 🐛 Known Issues

- None currently identified

## 📱 Responsive Behavior

- **Mobile (< 768px)**: Stacked layout, hamburger menu
- **Tablet (768px - 1024px)**: 2-column grid for tickets
- **Desktop (> 1024px)**: 3-column grid, full navigation

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is part of the HNG Internship Stage 2 Frontend Task.

## 👤 Author

**Your Name**
- GitHub: [@yourusername]
- Email: your.email@example.com

## 🙏 Acknowledgments

- HNG Internship Program
- Task requirements and specifications
