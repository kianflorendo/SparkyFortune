# Fun Fortune - Start Backend Script
# This script starts the Python FastAPI backend server

Write-Host "🚀 Starting Fun Fortune Backend..." -ForegroundColor Cyan

# Check if virtual environment exists
if (-Not (Test-Path ".\venv")) {
    Write-Host "❌ Virtual environment not found!" -ForegroundColor Red
    Write-Host "Please run setup first:" -ForegroundColor Yellow
    Write-Host "  python -m venv venv" -ForegroundColor Yellow
    Write-Host "  .\venv\Scripts\Activate.ps1" -ForegroundColor Yellow
    Write-Host "  pip install -r requirements.txt" -ForegroundColor Yellow
    exit 1
}

# Check if .env exists
if (-Not (Test-Path ".\.env")) {
    Write-Host "⚠️  .env file not found!" -ForegroundColor Yellow
    Write-Host "Creating .env from .env.example..." -ForegroundColor Yellow
    Copy-Item ".\.env.example" ".\.env"
    Write-Host "✅ Please edit .env and add your GEMINI_API_KEY" -ForegroundColor Green
    exit 1
}

# Activate virtual environment and start server
Write-Host "✅ Activating virtual environment..." -ForegroundColor Green
& ".\venv\Scripts\Activate.ps1"

Write-Host "✅ Starting server on http://localhost:8000" -ForegroundColor Green
Write-Host "📚 API docs available at http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host "" 
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

python main.py
