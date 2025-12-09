# Fun Fortune - Start All Servers
# This script starts both the backend and frontend servers

Write-Host "🚀 Starting Fun Fortune Application..." -ForegroundColor Cyan
Write-Host ""

# Check if backend virtual environment exists
if (-not (Test-Path "backend\venv")) {
    Write-Host "❌ Backend virtual environment not found!" -ForegroundColor Red
    Write-Host "Please run: cd backend; python setup.py" -ForegroundColor Yellow
    exit 1
}

# Start Backend Server
Write-Host "🐍 Starting Python Backend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; .\venv\Scripts\Activate.ps1; Write-Host '🟢 Backend Server Starting on http://localhost:8000' -ForegroundColor Green; python main.py"

# Wait a moment for backend to start
Start-Sleep -Seconds 2

# Start Frontend Server
Write-Host "⚛️  Starting React Frontend Server..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host '🟢 Frontend Server Starting on http://localhost:5173' -ForegroundColor Blue; npm run dev"

Write-Host ""
Write-Host "✅ Both servers are starting!" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Important URLs:" -ForegroundColor Yellow
Write-Host "   Backend:  http://localhost:8000" -ForegroundColor White
Write-Host "   Frontend: http://localhost:5173 (or 5174 if 5173 is busy)" -ForegroundColor White
Write-Host ""
Write-Host "🛑 To stop servers: Close both PowerShell windows" -ForegroundColor Red
Write-Host ""
Write-Host "💡 Tip: Check browser console (F12) to verify backend connection" -ForegroundColor Cyan
