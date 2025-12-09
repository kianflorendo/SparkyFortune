# Production Deployment Checklist

Use this checklist to ensure your Fun Fortune app is properly deployed and connected.

## Pre-Deployment

### Backend Preparation
- [ ] Gemini API key is working (test locally first)
- [ ] `backend/.env` has `GEMINI_API_KEY` set
- [ ] Backend runs locally without errors: `python main.py`
- [ ] Test backend endpoints: `.\test-backend.ps1`
- [ ] Review `backend/requirements.txt` - all dependencies listed

### Frontend Preparation
- [ ] Frontend builds successfully: `npm run build`
- [ ] Test locally with production build: `npm run preview`
- [ ] All mascot images are in `src/assets/`
- [ ] No console errors in browser DevTools (F12)

## Backend Deployment

### Choose Your Platform
- [ ] Selected hosting: ☐ Render ☐ Railway ☐ Fly.io ☐ Heroku ☐ Other: _______

### Deploy Backend
- [ ] Created new web service on hosting platform
- [ ] Connected GitHub repository (or uploaded code)
- [ ] Set build command: `pip install -r requirements.txt`
- [ ] Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- [ ] Added environment variable: `GEMINI_API_KEY`
- [ ] Backend deployed successfully
- [ ] Got backend URL: ________________________________________

### Test Backend Deployment
- [ ] Visit backend URL in browser (should show welcome message)
- [ ] Test health endpoint: `curl https://your-backend.com/`
- [ ] Test analyze endpoint with sample data
- [ ] No errors in deployment logs

## Frontend Deployment

### Update Configuration
- [ ] Updated `.env.production` with backend URL
- [ ] OR updated `src/services/gemini.ts` line 4 with backend URL
- [ ] Backend URL uses HTTPS (not HTTP)

### Choose Your Platform
- [ ] Selected hosting: ☐ Vercel ☐ Netlify ☐ GitHub Pages ☐ Other: _______

### Deploy Frontend
- [ ] Created new project on hosting platform
- [ ] Connected GitHub repository (or uploaded build)
- [ ] Set build command: `npm run build`
- [ ] Set output directory: `dist`
- [ ] Added environment variable: `VITE_API_URL` = your backend URL
- [ ] Frontend deployed successfully
- [ ] Got frontend URL: ________________________________________

### Update CORS
- [ ] Added frontend URL to backend environment variables:
  - `ALLOWED_ORIGINS=https://your-frontend.com`
  - `PRODUCTION_URL=https://your-frontend.com`
- [ ] Redeployed backend with new CORS settings

## Testing Production

### Functionality Tests
- [ ] Frontend loads without errors
- [ ] Welcome screen appears with Sparky Thinking mascot
- [ ] Click "Start Your Journey" → Sparky Sitting appears
- [ ] Sparky slides smoothly to lower left corner
- [ ] First question appears in chat
- [ ] Can select answers and progress through all questions
- [ ] Results modal appears with personality analysis
- [ ] Sparky Flying mascot appears next to results
- [ ] "Test Again" button works and returns to landing page

### Backend Connection Tests
- [ ] Open browser DevTools (F12) → Console tab
- [ ] Complete personality test
- [ ] See: "Attempt 1/3: Connecting to backend at https://..."
- [ ] See: "✅ Successfully received personality analysis from backend"
- [ ] Do NOT see: "Using fallback personality generator"
- [ ] Results show AI-generated personality (not generic fallback)

### Browser Tests
- [ ] Tested on Chrome/Edge
- [ ] Tested on Firefox
- [ ] Tested on Safari (if available)
- [ ] Tested on mobile device
- [ ] No console errors in any browser

### Performance Tests
- [ ] Page loads quickly (< 3 seconds)
- [ ] Animations are smooth
- [ ] No lag when answering questions
- [ ] Backend responds within 10 seconds

## Common Issues

### CORS Errors
- [ ] If CORS error: Check `ALLOWED_ORIGINS` in backend
- [ ] Verify frontend URL is exactly correct (with https://)
- [ ] Redeploy backend after changing CORS settings

### Backend Not Responding
- [ ] Verify backend URL in frontend config
- [ ] Check backend is running (visit URL in browser)
- [ ] Review backend deployment logs for errors
- [ ] Verify `GEMINI_API_KEY` is set correctly

### Always Using Fallback
- [ ] Check browser console for connection errors
- [ ] Test backend URL directly with curl
- [ ] Verify CORS is configured correctly
- [ ] Check backend logs for request errors

### Build Errors
- [ ] Delete `node_modules` and reinstall: `npm install`
- [ ] Clear build cache: `rm -rf dist`
- [ ] Check for TypeScript errors: `npm run type-check`
- [ ] Verify all imports are correct

## Security Checklist

- [ ] `.env` files are in `.gitignore`
- [ ] Never committed API keys to Git
- [ ] CORS set to specific origins (not "*") in production
- [ ] Both frontend and backend use HTTPS
- [ ] API keys are environment variables, not hardcoded

## Documentation

- [ ] Updated README.md with deployment URLs
- [ ] Documented any custom configuration
- [ ] Created backup of environment variables
- [ ] Noted deployment credentials in secure location

## Final Verification

- [ ] Sent test link to friend → they can complete test successfully
- [ ] Monitored backend logs → no errors during friend's test
- [ ] Verified personality results are AI-generated (unique each time)
- [ ] All mascot animations working correctly
- [ ] Mobile experience is smooth and responsive

## Post-Deployment

- [ ] Added frontend URL to README
- [ ] Added backend URL to documentation (if public)
- [ ] Set up monitoring/alerts (optional)
- [ ] Documented deployment process for future updates
- [ ] Backed up final configuration

---

## Quick Reference

**Backend URL**: _______________________________________________

**Frontend URL**: ______________________________________________

**Deployment Date**: ___________________________________________

**Platform**: Backend: _____________ Frontend: _____________

**Status**: ☐ Development ☐ Staging ☐ Production

---

✨ **Congratulations!** Your Fun Fortune app is deployed and ready to discover personalities!

🎯 **Share your link**: https://your-frontend-url.com

💡 **Monitor**: Check backend logs regularly for any issues

🔄 **Updates**: To deploy updates, push to Git and hosting platforms will auto-deploy
