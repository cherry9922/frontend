# Student Health & Wellness Platform - Complete Restructuring Guide

## Overview

This is a full restructure of the Student Health & Wellness Platform frontend into a modern, scalable React application with:

- **React Router v6** for multi-page navigation
- **AuthContext** for centralized authentication state management
- **Protected Routes** with role-based access control (student/admin)
- **Separate Layouts** for student and admin dashboards with sidebars
- **Student Pages**: Dashboard, Resources, Programs, Support Requests
- **Admin Pages**: Dashboard, Resource Management, Program Management, Metrics
- **Mock Data API** for frontend-only development
- **Responsive Design** with mobile-friendly CSS
- **Real Backend Integration** option at `http://localhost:5000`

## Project Structure

```
frontend/src/
├── context/
│   └── AuthContext.jsx              # Auth state management & useAuth hook
├── components/
│   ├── ProtectedRoute.jsx           # Route guard with role checking
│   ├── Nav.jsx                      # Navigation header
│   ├── Modal.jsx                    # Reusable modal component
│   ├── Toast.jsx                    # Notification component
│   ├── Loading.jsx                  # Loading indicator
│   └── ...other components
├── layouts/
│   ├── StudentLayout.jsx            # Student area wrapper with sidebar
│   └── AdminLayout.jsx              # Admin area wrapper with sidebar
├── pages/
│   ├── Login.jsx                    # Login page
│   ├── Register.jsx                 # Registration page
│   ├── NotFound.jsx                 # 404 page
│   ├── student/
│   │   ├── StudentDashboard.jsx    # Student home with stats
│   │   ├── Resources.jsx            # Resource browser
│   │   ├── Programs.jsx             # Program enrollment
│   │   └── Support.jsx              # Support request form
│   └── admin/
│       ├── AdminDashboard.jsx       # Admin metrics overview
│       ├── ManageResources.jsx      # Resource CRUD
│       ├── ManagePrograms.jsx       # Program CRUD
│       └── Metrics.jsx              # Detailed analytics
├── services/
│   ├── api.js                       # Fetch wrapper (real backend or mock)
│   └── mockApi.js                   # In-memory mock API
├── data/
│   └── mockData.js                  # Centralized mock data
├── styles/
│   ├── Auth.css                     # Login/Register styling
│   ├── StudentLayout.css            # Student sidebar layout
│   ├── AdminLayout.css              # Admin sidebar layout
│   ├── StudentDashboard.css         # Dashboard stats & cards
│   ├── StudentResources.css         # Resource list styling
│   ├── StudentPrograms.css          # Program cards
│   ├── StudentSupport.css           # Support form styling
│   ├── AdminDashboard.css           # Admin metrics charts
│   ├── AdminManageResources.css     # Resource table
│   ├── AdminManagePrograms.css      # Program table
│   ├── AdminMetrics.css             # Analytics page
│   └── NotFound.css                 # 404 page
├── styles.css                       # Global styles
├── App.jsx                          # Main Router component
├── main.jsx                         # Entry point with Providers
└── index.html
```

## Quick Start

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment

Create or verify `.env` file in `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000
VITE_USE_MOCK=true
```

- Set `VITE_USE_MOCK=true` to use the mock API (no backend needed)
- Set `VITE_USE_MOCK=false` to connect to real backend at port 5000

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
npm run preview
```

## Authentication Flow

### Demo Credentials

**Admin User:**
```
Email: admin@example.com
Password: adminpass
```

**Student User:**
```
Email: student@example.com
Password: studentpass
```

### Auth Context Features

The `AuthContext` (in `src/context/AuthContext.jsx`) provides:

- `user` - Current authenticated user object
- `isLoading` - Loading state during auth operations
- `error` - Last error message if any
- `isAuthenticated` - Boolean flag for easy checks
- `login(email, password)` - Async login function
- `register(name, email, password)` - Async registration function
- `logout()` - Clear auth state and localStorage

### Protected Routes

Routes are protected using the `ProtectedRoute` component:

```jsx
<Route
  path="/student"
  element={
    <ProtectedRoute requiredRole="student">
      <StudentLayout />
    </ProtectedRoute>
  }
/>
```

If user is not authenticated or role doesn't match, they're redirected to `/login`.

## Page Guide

### Student Area (`/student`)

#### Dashboard (`/student`)
- Overview of student stats
- Active programs count
- Resources viewed
- Wellness tips
- Quick links to other pages

#### Resources (`/student/resources`)
- Browse health & wellness resources
- Filter by category
- Expandable resource cards with full descriptions
- Fetches from `/api/resources`

#### Programs (`/student/programs`)
- Browse available wellness programs
- Enroll/Leave programs
- View enrollment status and capacity
- Progress bars for enrollment percentage
- Status indicators (open/closed)

#### Support (`/student/support`)
- Submit support requests with category and urgency
- View submitted support requests
- Track support request status
- Urgency levels: Low, Medium, High

### Admin Area (`/admin`)

#### Dashboard (`/admin`)
- High-level metrics (resources, programs, students, support requests)
- Weekly login activity chart
- Top programs by enrollment
- Responsive bar charts and visualizations

#### Manage Resources (`/admin/resources`)
- Table view of all resources
- Add new resources
- Edit existing resources
- Delete resources
- Form with title, category, description fields

#### Manage Programs (`/admin/programs`)
- Table view of all programs
- Add new programs
- Edit existing programs
- Delete programs
- Form with name, category, schedule, mode, status fields

#### Metrics (`/admin/metrics`)
- Detailed analytics and usage statistics
- Weekly login trends
- Program enrollment leaders
- Key insights (most active day, avg logins, etc.)
- Custom calculations and insights

## API Endpoints

### Mock API (mockApi.js)

The mock API provides these endpoints:

```
POST /auth/login
  Body: { email, password }
  Response: { token, user }

POST /auth/register
  Body: { name, email, password }
  Response: { token, user }

GET /api/resources
  Response: [{ id, title, category, description, createdAt }]

POST /api/resources
  Body: { title, category, description }

PUT /api/resources/:id
  Body: { title, category, description }

DELETE /api/resources/:id

GET /api/programs
  Response: [{ id, name, category, schedule, mode, status, enrolled, capacity }]

POST /api/programs
  Body: { name, category, schedule, mode, status }

PUT /api/programs/:id
  Body: { name, category, schedule, mode, status }

DELETE /api/programs/:id

GET /api/metrics
  Response: { totalResources, totalPrograms, totalSupportRequests, activeStudents, loginsThisWeek, topPrograms }
```

### Real Backend (http://localhost:5000)

When `VITE_USE_MOCK=false`, the app connects to the real Node.js/Express backend.

## Styling System

### Global Styles (styles.css)

- Comprehensive utility classes
- Form styling
- Card and grid layouts
- Message/alert styling
- Table styling
- Badge and tag components
- Responsive breakpoints

### Page-Specific Styles

Each major feature has its own CSS file:
- Auth pages: `Auth.css`
- Layouts: `StudentLayout.css`, `AdminLayout.css`
- Student pages: `StudentDashboard.css`, `StudentResources.css`, etc.
- Admin pages: `AdminDashboard.css`, `AdminManageResources.css`, etc.

### Responsive Design

Breakpoints:
- Desktop: `1024px` and up
- Tablet: `768px` - `1023px`
- Mobile: `600px` - `767px`
- Small Mobile: below `600px`

Layout changes:
- Sidebar converts to horizontal grid on mobile
- Grids collapse to single column
- Fonts scale down
- Padding reduces

## Running Backend + Frontend Together

### Terminal 1: Start Backend

```bash
cd backend
set USE_INMEMORY_DB=true
set SEED_ON_START=true
npm start
```

Backend runs on `http://localhost:5000`

### Terminal 2: Start Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on `http://localhost:5173`

### Configure Frontend for Real Backend

Edit `.env`:
```env
VITE_API_URL=http://localhost:5000
VITE_USE_MOCK=false
```

Then login with seeded credentials:
- Email: `admin@example.com` / Password: `adminpass`
- Email: `student@example.com` / Password: `studentpass`

## Component Architecture

### Context & State Management

- **AuthContext**: Manages user auth state, provides `useAuth()` hook
- Component-level state: Used for form inputs, UI toggles
- localStorage: Persists auth token and user between sessions

### Hooks Usage

- `useAuth()`: Access auth context
- `useNavigate()`: Programmatic navigation
- `useParams()`, `useSearchParams()`: URL parameters
- `useState()`: Local component state
- `useEffect()`: Data fetching and side effects

### Data Fetching

- `api.js` wrapper provides `getJson()`, `postJson()`, `putJson()`, `deleteJson()`
- All fetch calls go through this wrapper
- Automatically routes to mock or real backend based on env
- Auth token included in headers automatically

## Extending the App

### Adding a New Student Page

1. Create file: `src/pages/student/NewPage.jsx`
2. Create styles: `src/styles/StudentNewPage.css`
3. Add route in `App.jsx`:
   ```jsx
   <Route path="new-page" element={<NewPageComponent />} />
   ```
4. Add nav link in `StudentLayout.jsx`

### Adding a New Admin Page

Follow same steps but use:
- Path: `src/pages/admin/NewPage.jsx`
- Route: `/admin/new-page`
- Add link to `AdminLayout.jsx`

### Adding New API Endpoints

1. Add mock endpoint to `mockApi.js`
2. Add API wrapper functions to `api.js`
3. Import and use in components

### Styling Tips

- Import CSS at top of component: `import '../styles/ComponentName.css'`
- Follow BEM naming: `.component__element--modifier`
- Use CSS Grid and Flexbox for layouts
- Mobile-first: Start with mobile, add media queries for larger screens
- Color variables: Use consistent colors defined in global styles

## Troubleshooting

### Login shows "Invalid Credentials"

**Solutions:**
1. Ensure mock API is enabled: `VITE_USE_MOCK=true`
2. Check backend is running if using real backend
3. Clear localStorage: Open DevTools → Application → Storage → Clear All
4. Use correct demo credentials

### Pages not loading

**Check:**
1. Are you inside a ProtectedRoute with correct role?
2. Is AuthContext working? (Check React DevTools)
3. Network tab - are API calls succeeding?
4. Console - any error messages?

### Styles not applying

**Solutions:**
1. Verify CSS file is imported in component
2. Check class names match CSS file
3. Clear browser cache (Ctrl+Shift+Delete)
4. Verify no CSS conflicts in DevTools

### CORS errors connecting to backend

**Solutions:**
1. Ensure backend is running on port 5000
2. Check backend has CORS enabled
3. Verify `VITE_API_URL` is correct
4. Use mock API if backend isn't available

## Key Features Implemented

✅ React Router v6 with nested routes  
✅ AuthContext for state management  
✅ Protected routes with role checking  
✅ Student dashboard with stats  
✅ Resource browser with filtering  
✅ Program enrollment system  
✅ Support request submission  
✅ Admin metrics dashboard  
✅ Resource CRUD management  
✅ Program CRUD management  
✅ Mock API for frontend-only development  
✅ Real backend integration option  
✅ Responsive design (mobile, tablet, desktop)  
✅ localStorage persistence  
✅ Toast notifications  
✅ Modal dialogs  
✅ Loading states  
✅ Error handling  
✅ Comprehensive CSS styling  

## Performance Optimizations

- Code splitting with React Router
- Lazy loading for routes (optional with React.lazy)
- Memoized components where needed
- Efficient re-renders with proper state management
- CSS animations for smooth UX
- Optimized images and assets

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

## Next Steps

1. **Add user preferences**: Settings page for students
2. **Real backend**: Replace mock API with real API calls
3. **Database persistence**: Move from in-memory to actual database
4. **Email notifications**: Integrate email service
5. **File uploads**: Allow resource/program images
6. **Search functionality**: Full-text search for resources
7. **Scheduling**: Calendar integration for programs
8. **Analytics**: More detailed admin analytics
9. **Dark mode**: Theme toggle
10. **Internationalization**: Multi-language support

---

## Support

For issues or questions:
1. Check the browser console for errors
2. Review the Network tab in DevTools
3. Verify all environment variables are set
4. Check backend is running if using real API
5. Review this README for troubleshooting section

Happy coding! 🎉
