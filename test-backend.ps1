# Backend Connection Test Script
# This script verifies that the backend is running and responding correctly

Write-Host "🔍 Testing Fun Fortune Backend Connection..." -ForegroundColor Cyan
Write-Host ""

$backendUrl = "http://localhost:8000"

# Test 1: Health Check
Write-Host "Test 1: Health Check" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$backendUrl/" -Method GET -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Backend is running!" -ForegroundColor Green
        Write-Host "   Response: $($response.Content)" -ForegroundColor Gray
    }
} catch {
    Write-Host "❌ Backend health check failed!" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Make sure backend is running:" -ForegroundColor Yellow
    Write-Host "   cd backend" -ForegroundColor White
    Write-Host "   .\venv\Scripts\Activate.ps1" -ForegroundColor White
    Write-Host "   python main.py" -ForegroundColor White
    exit 1
}

Write-Host ""

# Test 2: Questions Endpoint
Write-Host "Test 2: Questions Endpoint" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$backendUrl/api/questions" -Method GET -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Questions endpoint working!" -ForegroundColor Green
        $questions = $response.Content | ConvertFrom-Json
        Write-Host "   Found $($questions.Count) questions" -ForegroundColor Gray
    }
} catch {
    Write-Host "❌ Questions endpoint failed!" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 3: Analysis Endpoint
Write-Host "Test 3: Analysis Endpoint" -ForegroundColor Yellow
try {
    $testData = @{
        answers = @("test1", "test2", "test3", "test4", "test5")
    } | ConvertTo-Json

    $response = Invoke-WebRequest -Uri "$backendUrl/api/analyze" -Method POST `
        -ContentType "application/json" `
        -Body $testData `
        -TimeoutSec 30

    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Analysis endpoint working!" -ForegroundColor Green
        $result = $response.Content | ConvertFrom-Json
        Write-Host "   Personality Type: $($result.type)" -ForegroundColor Gray
        Write-Host "   Traits Count: $($result.traits.Count)" -ForegroundColor Gray
    }
} catch {
    Write-Host "❌ Analysis endpoint failed!" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Check:" -ForegroundColor Yellow
    Write-Host "   - GEMINI_API_KEY is set in backend/.env" -ForegroundColor White
    Write-Host "   - Backend logs for error messages" -ForegroundColor White
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "🎯 Backend Status Summary:" -ForegroundColor Cyan
Write-Host "   URL: $backendUrl" -ForegroundColor White
Write-Host ""
Write-Host "✨ If all tests passed, your backend is ready!" -ForegroundColor Green
Write-Host "   Start frontend with: npm run dev" -ForegroundColor White
Write-Host ""
