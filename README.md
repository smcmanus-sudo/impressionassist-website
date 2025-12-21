# ImpressionAssist Website

A modern, responsive website for ImpressionAssist - AI-powered radiology report translation software.

## Project Structure

```
ImpressionAssist-Website/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Stylesheet
├── js/
│   └── main.js             # JavaScript functionality
├── assets/
│   └── images/
│       └── logo.svg        # Company logo (replace with your logo)
└── README.md               # This file
```

## Setup

### Adding Your Logo

1. Replace `assets/images/logo.svg` with your own logo file
2. If using a PNG, update the references in `index.html` from `.svg` to `.png`
3. The recommended logo height is 40px for optimal display
4. SVG or PNG format with transparency is recommended

### Local Development

Simply open `index.html` in a web browser to view the site locally. No build process required.

For a local server (recommended for testing):

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (npx)
npx serve

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Deploying to GitHub Pages

### Option 1: Using GitHub Web Interface

1. Create a new repository on GitHub (e.g., `impressionassist-website` or `impressionassist.github.io` for a user/org site)

2. Upload all files to the repository:
   - Go to your repository on GitHub
   - Click "Add file" > "Upload files"
   - Drag and drop all files from this folder
   - Commit the changes

3. Enable GitHub Pages:
   - Go to repository "Settings"
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. Your site will be live at:
   - `https://yourusername.github.io/repository-name/` (for project sites)
   - `https://yourusername.github.io/` (if repo is named `yourusername.github.io`)

### Option 2: Using Git Command Line

```bash
# Navigate to the website folder
cd ImpressionAssist-Website

# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - ImpressionAssist website"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main
```

Then enable GitHub Pages in Settings as described above.

### Custom Domain Setup

To use a custom domain (e.g., `impressionassist.com`):

1. In your repository, create a file named `CNAME` with your domain:
   ```
   impressionassist.com
   ```

2. Configure your DNS provider:
   - For apex domain (`impressionassist.com`):
     - Add A records pointing to GitHub's IPs:
       - 185.199.108.153
       - 185.199.109.153
       - 185.199.110.153
       - 185.199.111.153
   - For subdomain (`www.impressionassist.com`):
     - Add a CNAME record pointing to `yourusername.github.io`

3. In GitHub Pages settings, add your custom domain and enable "Enforce HTTPS"

## Customization

### Updating Content

- **Text content**: Edit `index.html` directly
- **Pricing**: Update the pricing cards in the `#pricing` section
- **Contact email**: Search for `support@impressionassist.com` and replace
- **Download link**: Replace `href="#"` in the download button with your actual MSI link

### Styling

- **Colors**: Modify CSS variables in `css/styles.css` at the top (`:root` section)
- **Fonts**: Change the Google Fonts import in `index.html`
- **Spacing**: Adjust padding/margin values in the CSS

### Form Handling

The contact form currently shows a success message but doesn't send data anywhere. To add actual form handling:

1. **Formspree** (easiest):
   - Sign up at formspree.io
   - Update the form action: `<form action="https://formspree.io/f/yourformid" method="POST">`

2. **Netlify Forms** (if hosting on Netlify):
   - Add `netlify` attribute: `<form name="contact" netlify>`

3. **Custom backend**:
   - Modify the JavaScript in `main.js` to send data to your API

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## Performance

- No build process required
- Minimal dependencies (only Google Fonts)
- Optimized CSS with minimal specificity
- Lazy loading animations via Intersection Observer

## License

Copyright 2024 ImpressionAssist LLC. All rights reserved.
