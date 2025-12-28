# JS Bookmarklet Creator - Setup & Deployment

This project is a React-based web application that allows users to convert JavaScript code into browser bookmarklets instantly.

## Local Development

### Prerequisites
- Node.js (v18 or higher)
- npm

### Steps to Run
1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

## Deployment to Netlify

This project is pre-configured for Netlify using the `netlify.toml` file.

### Option 1: Using Netlify CLI
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Deploy: `netlify deploy --prod`

### Option 2: Continuous Deployment (Recommended)
1. Push this code to a GitHub/GitLab/Bitbucket repository.
2. Log in to [Netlify](https://app.netlify.com/).
3. Click **"Add new site"** > **"Import an existing project"**.
4. Select your repository.
5. Netlify will automatically detect the settings:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
6. Click **"Deploy site"**.

## Project Structure
- `src/components/BookmarkletCreator.jsx`: Main logic and UI.
- `src/data/templates.js`: Pre-defined JavaScript templates.
- `src/main.jsx`: Entry point with Bootstrap integration.
- `netlify.toml`: Configuration for Netlify builds and routing.
