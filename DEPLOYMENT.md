# Deployment Guide for Fun Fortune

## Prerequisites
- Backend deployed and accessible via HTTPS URL
- Frontend deployment platform (Vercel, Netlify, etc.)
- Gemini API key

## Backend Deployment

### 1. Prepare Backend for Deployment

Your backend is in the `backend/` folder with these files:
- `main.py` - FastAPI application
- `requirements.txt` - Python dependencies
- `.env` - Environment variables (DO NOT commit this)

### 2. Environment Variables for Backend

Set these environment variables in your backend deployment platform:

```
GEMINI_API_KEY=your_actual_gemini_api_key_here
ALLOWED_ORIGINS=https://your-frontend-url.vercel.app
PRODUCTION_URL=https://your-frontend-url.vercel.app
```

### 3. Deploy Backend

**Option A: Render (Recommended)**
1. Go to https://render.com
2. Create new Web Service
3. Connect your GitHub repository
4. Set build command: `pip install -r requirements.txt`
5. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add environment variables (GEMINI_API_KEY, etc.)
7. Deploy!

**Option B: Railway**
1. Go to https://railway.app
2. New Project → Deploy from GitHub
3. Add environment variables
4. Railway auto-detects Python and deploys

**Option C: Heroku**
1. Create `Procfile` in backend folder:
   ```
   web: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```
2. Deploy using Heroku CLI or GitHub integration

### 4. Get Your Backend URL
After deployment, you'll get a URL like:
- `https://fun-fortune-backend.onrender.com`
- `https://fun-fortune-backend.up.railway.app`

**Test your backend:**
```bash
curl https://your-backend-url.com/
# Should return: {"message": "Fun Fortune API is running!"}
```

## Frontend Deployment

### 1. Update Frontend Configuration

Edit `.env.production` file:
```
VITE_API_URL=https://your-backend-url.com
```

Or update `src/services/gemini.ts` line 4:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production' 
    ? 'https://your-backend-url.com'  // ← Put your backend URL here
    : 'http://localhost:8000');
```

### 2. Deploy Frontend

**Option A: Vercel (Recommended)**
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts to deploy
4. Or connect GitHub repo at https://vercel.com

**Option B: Netlify**
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy --prod`
3. Or drag-and-drop `dist` folder at https://netlify.com

**Option C: GitHub Pages**
1. Update `vite.config.ts` with base path
2. Run: `npm run build`
3. Deploy `dist` folder to gh-pages branch

### 3. Build Commands

For deployment platforms, use these settings:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4. Environment Variables for Frontend

In your deployment platform (Vercel/Netlify), add:
```
VITE_API_URL=https://your-backend-url.com
```

## Verification Steps

### 1. Test Backend
```bash
# Health check
curl https://your-backend-url.com/

# Test analyze endpoint
curl -X POST https://your-backend-url.com/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"answers":["test1","test2","test3","test4","test5"]}'
```

### 2. Test Frontend
1. Open your deployed frontend URL
2. Click "Start Your Journey"
3. Answer all questions
4. Check browser console for connection logs:
   - Should see: "✅ Successfully received personality analysis from backend"
   - Should NOT see: "Using fallback personality generator"

### 3. Check Browser Console
Open DevTools (F12) and look for:
- ✅ `Attempt 1/3: Connecting to backend at https://...`
- ✅ `Successfully received personality analysis from backend`
- ❌ If you see errors, check CORS and API URL configuration

## Common Issues & Solutions

### Issue: CORS Error
**Solution**: Add your frontend URL to backend environment variables:
```
ALLOWED_ORIGINS=https://your-frontend-url.com
PRODUCTION_URL=https://your-frontend-url.com
```

### Issue: Backend Not Responding
**Solution**: 
1. Check if backend is running: `curl https://your-backend-url.com/`
2. Verify GEMINI_API_KEY is set correctly
3. Check backend logs for errors

### Issue: Always Using Fallback Personality
**Solution**:
1. Verify `VITE_API_URL` in frontend environment
2. Check backend URL is correct and accessible
3. Test backend endpoint directly with curl

### Issue: Build Fails
**Solution**:
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install`
3. Run `npm run build` locally to test
4. Check for TypeScript errors: `npm run type-check`

## Local Development Setup

### Start Backend:
```bash
cd backend
.\venv\Scripts\Activate.ps1  # Windows PowerShell
python main.py
```

### Start Frontend:
```bash
npm run dev
```

### Test Connection:
Open http://localhost:5173 and complete the personality test.

## Production Checklist

- [ ] Backend deployed and accessible via HTTPS
- [ ] GEMINI_API_KEY set in backend environment
- [ ] Backend health check returns 200 OK
- [ ] Frontend `.env.production` has correct VITE_API_URL
- [ ] Frontend deployed and accessible
- [ ] CORS configured with frontend URL
- [ ] Test full flow: welcome → questions → results
- [ ] Check browser console for successful backend connection
- [ ] Verify no "fallback personality" messages in console

## Support

If you encounter issues:
1. Check browser console (F12) for error messages
2. Test backend endpoint with curl
3. Verify environment variables are set correctly
4. Check CORS configuration
5. Review deployment platform logs

## Security Notes

- Never commit `.env` files to Git
- Use environment variables for API keys
- Set specific CORS origins in production (not "*")
- Use HTTPS for both frontend and backend
- Rotate API keys if exposed

---

**Your deployment is ready when:**
✅ Backend returns personality analysis (not fallback)
✅ No CORS errors in browser console
✅ All mascot animations work smoothly
✅ Test Again button returns to landing page
