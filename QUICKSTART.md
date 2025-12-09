# 🚀 Quick Start Guide

## Prerequisites
- Python 3.8+ installed
- Node.js 18+ installed
- Google Gemini API key

## Backend Setup (5 minutes)

1. **Navigate to backend directory**
   ```powershell
   cd backend
   ```

2. **Run the automated setup**
   ```powershell
   python setup.py
   ```

3. **Edit the .env file and add your Gemini API key**
   ```powershell
   notepad .env
   ```
   Replace `your_gemini_api_key_here` with your actual API key

4. **Start the backend server**
   ```powershell
   # Activate virtual environment
   .\venv\Scripts\Activate.ps1
   
   # Start server
   python main.py
   ```
   
   Backend will be running at: http://localhost:8000
   API docs available at: http://localhost:8000/docs

## Frontend Setup (2 minutes)

1. **Open a NEW terminal in the project root**

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Start the frontend**
   ```powershell
   npm run dev
   ```
   
   Frontend will be running at: http://localhost:5173

## Test the Application

1. Open http://localhost:5173 in your browser
2. Click "Start Quiz"
3. Answer the 5 personality questions
4. View your personalized personality analysis!

## Troubleshooting

### Backend Issues

**Problem**: "Virtual environment not found"
**Solution**: Run `python -m venv venv` in the backend directory

**Problem**: "Module not found" errors
**Solution**: 
```powershell
cd backend
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

**Problem**: "Gemini API key not found"
**Solution**: Make sure your .env file in the backend directory has:
```
GEMINI_API_KEY=your_actual_key_here
```

### Frontend Issues

**Problem**: "Cannot connect to backend"
**Solution**: Make sure the backend is running on port 8000

**Problem**: CORS errors
**Solution**: Backend CORS is configured for development. Make sure both servers are running.

## API Endpoints

- `GET /` - Health check
- `GET /api/questions` - Get quiz questions
- `POST /api/analyze` - Analyze personality (send answers array)

## Need Help?

Check the detailed README files:
- Main README: `README.md`
- Backend README: `backend/README.md`
