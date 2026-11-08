# 🍴 Delicious Bites Catering - Website Prototype

A modern, responsive catering website prototype built with HTML, CSS, JavaScript, Bootstrap 5, and various UI enhancements.

## 📁 Project Structure

```
catering-prototype/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Custom styles with CSS variables
├── js/
│   └── main.js         # Interactive functionality
└── README.md           # This file
```

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic structure |
| **CSS3** | Custom styling with variables |
| **Bootstrap 5** | Responsive grid and components |
| **Material Design Icons** | Beautiful iconography |
| **Google Fonts** | Playfair Display + Poppins |
| **AOS** | Animate On Scroll effects |
| **Swiper** | Touch-friendly carousels |

## 🎨 Features

### Sections
- ✅ Navigation (fixed, scrollspy)
- ✅ Hero section with stats counter
- ✅ About section with image layout
- ✅ Services (6 card layout)
- ✅ Menu with filter functionality
- ✅ Gallery with lightbox
- ✅ Testimonials carousel
- ✅ CTA section
- ✅ Contact form with validation
- ✅ Footer with newsletter

### Responsive Breakpoints
- 📱 Mobile: < 576px
- 📱 Tablet: 576px - 991px
- 💻 Desktop: 992px+

## 🚀 How to Run Locally

### Option 1: Direct Open
Simply double-click `index.html` to open in your browser.

### Option 2: Live Server (Recommended)
```bash
# If you have Node.js installed
npx serve .

# Or use VS Code Live Server extension
```

### Option 3: Python Server
```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000
```

## 🌐 Free Hosting Options

### 1. **Vercel** (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```
- Free SSL, custom domain support
- Instant deployments

### 2. **Netlify**
- Drag and drop the folder to [netlify.com/drop](https://app.netlify.com/drop)
- Or connect to Git repo

### 3. **GitHub Pages**
1. Push to GitHub
2. Go to Settings > Pages
3. Select branch and folder
4. Free hosting at `username.github.io/repo`

### 4. **Cloudflare Pages**
- Connect Git repo
- Automatic deployments
- Free with generous limits

### 5. **Surge.sh**
```bash
npm install -g surge
cd catering-prototype
surge
```

## 🔧 Customization

### Colors (in style.css)
```css
:root {
    --primary-color: #d4a373;      /* Main brand color */
    --secondary-color: #2c3e50;    /* Dark accent */
    --accent-color: #e76f51;       /* Highlight color */
}
```

### Fonts
The site uses:
- **Playfair Display** for headings
- **Poppins** for body text

## 📱 Responsive Design

The site is fully responsive with:
- Mobile-first approach
- Flexible grid layouts
- Readable text at all sizes
- Touch-friendly interactions

## 🔄 Future Enhancements

- [ ] Add more pages (Menu details, About page)
- [ ] Integrate real form submission (Formspree/EmailJS)
- [ ] Add image optimization
- [ ] Implement service worker for offline support
- [ ] Add loading skeleton screens

## 📝 License

This is a prototype/learning project. Feel free to use and modify.

---

Built with ❤️ for learning purposes
