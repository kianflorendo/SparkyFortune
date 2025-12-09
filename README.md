# ✨ Fun Fortune - AI Personality Test Chatbot

An engaging, interactive personality test chatbot that uses Google's Gemini 2.0 Flash AI to analyze your answers and reveal your unique personality type with a personalized message.

## 🌟 Features

- 🤖 **AI-Powered Analysis**: Uses Gemini 2.0 Flash for intelligent personality insights
- 💬 **Interactive Chat Interface**: Smooth, engaging conversation flow
- 🎨 **Beautiful UI**: Modern gradients, animations, and responsive design
- 📱 **Mobile-Friendly**: Works perfectly on all devices
- ⚡ **Fast & Lightweight**: React frontend + Python FastAPI backend
- 🎯 **Personalized Results**: Each user gets a unique personality profile with custom message

## 🏗️ Architecture

This project uses a **Python backend** (FastAPI) with a **React frontend**:

- **Backend**: Python FastAPI server that handles Gemini AI integration
- **Frontend**: React + TypeScript + Vite for the user interface
- **API**: RESTful API for communication between frontend and backend

## 🚀 Quick Start

### Prerequisites

- **Frontend**: Node.js (v18 or higher), npm or yarn
- **Backend**: Python 3.8+, pip
- Google Gemini API key ([Get it here](https://makersuite.google.com/app/apikey))

### Easy Start (Windows PowerShell)

The fastest way to start both servers:

```powershell
# First time only - setup backend
cd backend
python setup.py
cd ..

# Install frontend dependencies (first time only)
npm install

# Start both servers with one command
.\start-dev.ps1
```

This will open two PowerShell windows:
- Backend server on http://localhost:8000
- Frontend server on http://localhost:5173

### Manual Installation

#### 1. Set up the Backend

```bash
cd backend

# Run the automated setup script
python setup.py

# Or manually:
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# On Windows (Command Prompt):
# venv\Scripts\activate.bat
# On Linux/Mac:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env
# Edit .env and add your Gemini API key:
# GEMINI_API_KEY=your_actual_gemini_api_key_here

# Run the server
python main.py
```

The backend will run at `http://localhost:8000`

#### 2. Set up the Frontend

In a new terminal:

```bash
# Install dependencies
npm install

# Create .env file (optional - defaults to localhost:8000)
copy .env.example .env

# Run the development server
npm run dev
```

The frontend will run at `http://localhost:5173`

#### 3. Open your browser
   
Navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🚢 Deployment

### Deploy Backend (Python)

#### Option 1: Railway
1. Create account at [railway.app](https://railway.app)
2. Create new project from GitHub repo
3. Select the `backend` directory
4. Add environment variable: `GEMINI_API_KEY`
5. Deploy!

#### Option 2: Render
1. Create account at [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repo, set root directory to `backend`
4. Set build command: `pip install -r requirements.txt`
5. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add environment variable: `GEMINI_API_KEY`
7. Deploy!

### Deploy Frontend (React)

#### Using Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variable: `VITE_API_URL=your-backend-url`
   - Deploy!

**Important**: After deploying the backend, update the frontend's `VITE_API_URL` environment variable in Vercel to point to your deployed backend URL.

## 🎯 How It Works

1. **Welcome Screen**: Users are greeted with an inviting introduction
2. **5 Fun Questions**: Interactive multiple-choice questions about preferences
3. **AI Analysis**: Gemini AI analyzes responses to determine personality type
4. **Personalized Result**: Users receive:
   - A creative personality type name
   - A warm, personal message
   - Key personality traits
   - Color-coded results card

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Modern CSS with gradients and animations

### Backend
- **Framework**: FastAPI (Python)
- **AI**: Google Gemini 2.0 Flash
- **Server**: Uvicorn (ASGI)

### Deployment
- **Frontend**: Vercel, Netlify, or any static hosting
- **Backend**: Railway, Render, Fly.io, Heroku, or any Python hosting

📘 **See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions**

## 📝 Environment Variables

### Backend (`backend/.env`)
| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GEMINI_API_KEY` | Your Google Gemini API key | Yes | - |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed frontend URLs | No | `http://localhost:5173,http://localhost:5174,http://localhost:5175` |
| `PRODUCTION_URL` | Your production frontend URL | No | - |

### Frontend (`.env.development` / `.env.production`)
| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_API_URL` | Backend API URL | No | `http://localhost:8000` (dev), `https://your-backend-url.com` (prod) |

## 🔌 Backend Connection

The frontend automatically connects to the backend with these features:

- **3 Retry Attempts**: Automatically retries failed connections
- **30-Second Timeout**: Prevents hanging requests
- **Fallback Mode**: Uses local personality generator if backend is unavailable
- **Connection Logging**: Check browser console (F12) to see connection status

### Verify Backend Connection

1. Open browser DevTools (F12) → Console tab
2. Complete the personality test
3. Look for these messages:
   - ✅ `Attempt 1/3: Connecting to backend at http://localhost:8000`
   - ✅ `Successfully received personality analysis from backend`

If you see "Using fallback personality generator", check:
- Backend server is running on http://localhost:8000
- GEMINI_API_KEY is set in `backend/.env`
- No firewall blocking the connection

### Test Backend Manually

```bash
# Health check
curl http://localhost:8000/

# Test analysis endpoint
curl -X POST http://localhost:8000/api/analyze \
  -H "Content-Type: application/json" \
  -d "{\"answers\":[\"test1\",\"test2\",\"test3\",\"test4\",\"test5\"]}"
```

## 🎨 Customization

### Add More Questions

Edit `src/data/questions.ts` to add or modify questions:

```typescript
{
  id: 6,
  text: "Your question here?",
  options: [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4"
  ],
  emoji: "🎯"
}
```

### Modify Personality Types

The AI generates dynamic personality types, but you can customize fallback personalities in `src/services/gemini.ts`.

### Change Colors & Styling

- **App Colors**: Edit `src/App.css` (main gradient backgrounds)
- **Component Styles**: Each component has its own CSS file in `src/components/`

## 📱 Screenshots

> Add screenshots of your deployed app here!

## 🤝 Contributing

Feel free to fork this project and make it your own! Contributions are welcome.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Powered by [Google Gemini AI](https://deepmind.google/technologies/gemini/)
- Deployed on [Vercel](https://vercel.com)

---

Made with 💜
