# Fun Fortune Backend (Python)

Python FastAPI backend for the Fun Fortune personality quiz application.

## Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
- Windows (PowerShell):
  ```powershell
  .\venv\Scripts\Activate.ps1
  ```
- Windows (Command Prompt):
  ```cmd
  venv\Scripts\activate.bat
  ```
- Linux/Mac:
  ```bash
  source venv/bin/activate
  ```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file from the example:
```bash
copy .env.example .env
```

5. Add your Google Gemini API key to the `.env` file:
```
GEMINI_API_KEY=your_actual_api_key_here
```

## Running the Server

### Development Mode
```bash
python main.py
```

Or using uvicorn directly:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### API Documentation
Once the server is running, you can access:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### GET /
Health check endpoint.

**Response:**
```json
{
  "message": "Fun Fortune API is running!",
  "version": "1.0.0"
}
```

### GET /api/questions
Get all personality quiz questions.

**Response:**
```json
[
  {
    "id": 1,
    "text": "Pick your favorite tech gadget!",
    "options": ["Smartphone - Always connected", "..."],
    "emoji": "📱"
  }
]
```

### POST /api/analyze
Analyze personality based on quiz answers.

**Request Body:**
```json
{
  "answers": [
    "Smartphone - Always connected",
    "Blue & Purple - Calm and creative",
    "Problem Solving - Finding solutions",
    "Learning new things",
    "Startup - Fast-paced and innovative"
  ]
}
```

**Response:**
```json
{
  "type": "The Innovative Dreamer",
  "message": "This is my message for you: Your creative spirit...",
  "traits": [
    "Highly creative and imaginative",
    "Tech-savvy problem solver",
    "Embraces new possibilities",
    "Inspires others with ideas"
  ],
  "color": "#667eea"
}
```

## Deployment

### Production Server
For production, use a production ASGI server:

```bash
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Environment Variables
- `GEMINI_API_KEY`: Your Google Gemini API key (required)

## CORS Configuration

The API is configured to allow all origins for development. For production, update the `allow_origins` in `main.py` to include only your frontend domain.

## Notes

- The API includes fallback personality responses if the Gemini API is unavailable
- All responses are validated using Pydantic models
- Error handling is implemented for all endpoints
