# Quick Start Guide - 5 Minutes to Running App

## ⚡ Super Quick Start (Mock Mode - Frontend Only)

### Step 1: Navigate to Frontend
```bash
cd c:\Users\HP\Downloads\Frontendproject\Frontendproject\frontend
```

### Step 2: Run the App
```bash
npm run dev
```

### Step 3: Open in Browser
```
http://localhost:5173
```

### Step 4: Login
**Student:**
- Email: `student@example.com`
- Password: `studentpass`

**Admin:**
- Email: `admin@example.com`
- Password: `adminpass`

### Step 5: Explore!
- Student: Dashboard → Resources → Programs → Support
- Admin: Dashboard → Manage Resources → Manage Programs → Metrics

---

## 🖥️ Full Setup (Both Backend + Frontend)

### Terminal 1: Start Backend
```bash
cd c:\Users\HP\Downloads\Frontendproject\Frontendproject\backend
set USE_INMEMORY_DB=true
set SEED_ON_START=true
npm start
```
Wait for: `Server running on port 5000`

### Terminal 2: Start Frontend
```bash
cd c:\Users\HP\Downloads\Frontendproject\Frontendproject\frontend
npm run dev
```
Visit: `http://localhost:5173`

---

## 📁 What's New in This Update

### New Context & Components
✅ `src/context/AuthContext.jsx` - State management  
✅ `src/components/ProtectedRoute.jsx` - Route guards  
✅ `src/layouts/StudentLayout.jsx` - Student sidebar  
✅ `src/layouts/AdminLayout.jsx` - Admin sidebar  

### New Student Pages (4)
✅ `src/pages/student/StudentDashboard.jsx` - Welcome & stats  
✅ `src/pages/student/Resources.jsx` - Resource browser  
✅ `src/pages/student/Programs.jsx` - Enroll in programs  
✅ `src/pages/student/Support.jsx` - Submit requests  

### New Admin Pages (4)
✅ `src/pages/admin/AdminDashboard.jsx` - Metrics  
✅ `src/pages/admin/ManageResources.jsx` - CRUD  
✅ `src/pages/admin/ManagePrograms.jsx` - CRUD  
✅ `src/pages/admin/Metrics.jsx` - Analytics  

### New Stylesheets (13)
✅ Comprehensive CSS for all pages with responsive design

### Updated Files
✅ `src/App.jsx` - Now uses React Router  
✅ `src/main.jsx` - Wrapped with AuthProvider  
✅ `src/pages/Login.jsx` - Uses AuthContext  
✅ `src/pages/Register.jsx` - Uses AuthContext  
✅ `src/styles.css` - Enhanced global styles  
✅ `src/data/mockData.js` - Centralized mock data  

### Documentation
✅ `PLATFORM_GUIDE.md` - Full developer guide  
✅ `IMPLEMENTATION_SUMMARY.md` - Implementation details  

---

## 🎯 What You Can Do Now

### As a Student
- ✅ View personalized dashboard
- ✅ Browse health resources with filters
- ✅ Enroll/leave wellness programs
- ✅ Submit support requests
- ✅ Track request status

### As an Admin
- ✅ View platform metrics & analytics
- ✅ Create/edit/delete resources
- ✅ Create/edit/delete programs
- ✅ See detailed usage statistics
- ✅ Monitor enrollment trends

---

## 🔧 Environment Setup

### If Frontend-Only (Mock API)
```env
VITE_USE_MOCK=true
VITE_API_URL=http://localhost:5000
```

### If With Backend
```env
VITE_USE_MOCK=false
VITE_API_URL=http://localhost:5000
```

Edit `frontend/.env` to switch modes.

---

## 📱 Responsive Features

- ✅ Desktop: Full sidebar layout (1024px+)
- ✅ Tablet: Adjusted layout (768px - 1023px)
- ✅ Mobile: Stacked layout (600px - 767px)
- ✅ Small: Optimized for small screens (<600px)

Test by resizing browser or opening DevTools (F12 → Device Mode).

---

## 🐛 Troubleshooting

### "Cannot find module" errors
```bash
npm install
npm run dev
```

### Port 5173 already in use
```bash
# Kill process and restart
npx fkill-cli 5173
npm run dev
```

### Login doesn't work
- Check `VITE_USE_MOCK=true` in `.env`
- Clear localStorage: F12 → Application → Storage → Clear All
- Use correct demo credentials
- Reload page

### Backend won't start
```bash
set USE_INMEMORY_DB=true
set SEED_ON_START=true
npm start
```

### Styles not loading
```bash
# Clear cache and restart
npm run dev
# Ctrl+F5 in browser
```

---

## 📚 Key Routes

### Public
- `/login` - Login page
- `/register` - Registration page

### Student Only
- `/student` - Dashboard
- `/student/resources` - Resources
- `/student/programs` - Programs
- `/student/support` - Support

### Admin Only
- `/admin` - Dashboard
- `/admin/resources` - Manage Resources
- `/admin/programs` - Manage Programs
- `/admin/metrics` - Analytics

### Other
- `/*` - 404 Not Found

---

## ✨ Demo Features

### Try These in Demo Mode

**Student:**
1. Login as student
2. View dashboard stats
3. Browse resources, filter by category
4. Click program cards to enroll
5. Submit support request with urgency level

**Admin:**
1. Login as admin
2. View metrics dashboard with charts
3. Add new resource/program
4. Edit existing entries
5. Delete entries (with confirmation)
6. View detailed analytics

---

## 🎓 Architecture Overview

```
App (Router)
├── Public Routes
│   ├── /login (LoginPage)
│   ├── /register (RegisterPage)
│   └── /* (NotFoundPage)
├── ProtectedRoute (Student)
│   └── StudentLayout
│       └── Outlet
│           ├── /student (StudentDashboard)
│           ├── /student/resources (Resources)
│           ├── /student/programs (Programs)
│           └── /student/support (Support)
└── ProtectedRoute (Admin)
    └── AdminLayout
        └── Outlet
            ├── /admin (AdminDashboard)
            ├── /admin/resources (ManageResources)
            ├── /admin/programs (ManagePrograms)
            └── /admin/metrics (Metrics)

State Management:
- AuthContext: User, token, role
- Component Level: Forms, UI toggles, lists
- localStorage: Persistence
```

---

## 📊 Data Flow

```
User (Input Form)
  ↓
Component (useState)
  ↓
AuthContext or api.postJson()
  ↓
mockApi.js (or Real Backend)
  ↓
Response Handling
  ↓
State Update + Redirect/Toast
  ↓
UI Re-render
```

---

## 💡 Tips & Tricks

1. **Add New Page**: Create file in `src/pages/student/` or `src/pages/admin/`
2. **Add Route**: Import page in `App.jsx` and add `<Route>` element
3. **Add CSS**: Create stylesheet in `src/styles/` and import in component
4. **Add Component**: Use existing components: Nav, Modal, Toast, Loading
5. **Debug**: Open DevTools (F12) → React tab to inspect context

---

## 🚀 Next Steps

1. **Now**: Run app and explore demo
2. **Next**: Connect to real backend (if running)
3. **Then**: Customize colors, add your content
4. **Later**: Add new features, deploy

---

## ❓ Questions?

See `PLATFORM_GUIDE.md` for:
- Complete API documentation
- Component descriptions
- Styling guide
- Troubleshooting

See `IMPLEMENTATION_SUMMARY.md` for:
- Technical details
- File structure
- Feature checklist
- Design system

---

## ✅ Pre-Launch Checklist

Before sharing/deploying:

- [ ] Test login with both roles
- [ ] Navigate all pages
- [ ] Test CRUD operations (create, edit, delete)
- [ ] Check responsive design on mobile
- [ ] Clear localStorage and reload
- [ ] Test with backend (if using)
- [ ] Verify all links work
- [ ] Check error messages display
- [ ] Test form validation
- [ ] Confirm data persists

---

**Ready to go! 🎉**

Start with:
```bash
cd frontend && npm run dev
```

Then open: `http://localhost:5173`

Enjoy the app!
