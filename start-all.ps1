# Fun Fortune - Complete Startup Script
# This script starts both backend and frontend servers

Write-Host @"

╔════════════════════════════════════════════════════╗
║     Fun Fortune - Starting Application             ║
║     Backend (Python) + Frontend (React)            ║
╚════════════════════════════════════════════════════╝

"@ -ForegroundColor Cyan

# Function to start backend
function Start-Backend {
    Write-Host "`n🐍 Starting Backend Server..." -ForegroundColor Yellow
    
    Push-Location backend
    
    if (-Not (Test-Path ".\venv")) {
        Write-Host "❌ Backend not set up! Run setup first:" -ForegroundColor Red
        Write-Host "   cd backend" -ForegroundColor Yellow
        Write-Host "   python setup.py" -ForegroundColor Yellow
        Pop-Location
        return $false
    }
    
    if (-Not (Test-Path ".\.env")) {
        Write-Host "❌ Backend .env not configured!" -ForegroundColor Red
        Pop-Location
        return $false
    }
    
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; .\venv\Scripts\Activate.ps1; python main.py"
    Write-Host "✅ Backend starting on http://localhost:8000" -ForegroundColor Green
    
    Pop-Location
    return $true
}

# Function to start frontend
function Start-Frontend {
    Write-Host "`n⚛️  Starting Frontend Server..." -ForegroundColor Yellow
    
    if (-Not (Test-Path ".\node_modules")) {
        Write-Host "❌ Frontend not set up! Run:" -ForegroundColor Red
        Write-Host "   npm install" -ForegroundColor Yellow
        return $false
    }
    
    Start-Sleep -Seconds 3  # Wait for backend to start
    
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev"
    Write-Host "✅ Frontend starting on http://localhost:5173" -ForegroundColor Green
    
    return $true
}

# Start both servers
$backendOk = Start-Backend
$frontendOk = Start-Frontend

if ($backendOk -and $frontendOk) {
    Write-Host @"

╔════════════════════════════════════════════════════╗
║     ✨ Fun Fortune is Running! ✨                  ║
╚════════════════════════════════════════════════════╝

🌐 Frontend: http://localhost:5173
🔧 Backend:  http://localhost:8000
📚 API Docs: http://localhost:8000/docs

Two PowerShell windows have been opened.
Close them to stop the servers.

"@ -ForegroundColor Green
} else {
    Write-Host "`n❌ Failed to start servers. Please check the setup." -ForegroundColor Red
}
