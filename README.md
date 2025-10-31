# The Essex Way Clinic Website

Award-winning aesthetic clinic website featuring advanced treatments including HIFU, CO2 Laser, 3D EMLift, and more.

## 🚀 Quick Deploy to Vercel

### Prerequisites
- GitHub account
- Vercel account (free at vercel.com)

### Deployment Steps

#### 1. Push to GitHub
```bash
cd /Users/marktaylor/Desktop/Essex-Way
git init
git add .
git commit -m "Initial commit: Essex Way Clinic website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/essex-way-clinic.git
git push -u origin main
```

#### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect it's a static site
5. Click "Deploy"

Your site will be live at: `your-project-name.vercel.app`

#### 3. Custom Domain (Optional)
To use a custom domain like `clinic.theessexwayclinic.com`:
1. In Vercel project settings → Domains
2. Add your domain
3. Update DNS records as shown by Vercel

### WordPress Redirect Setup

After deploying to Vercel, redirect from your WordPress site:

**Option A: Using Redirection Plugin**
1. Install "Redirection" plugin in WordPress
2. Add redirect: `/co2laser` → `https://your-vercel-url.vercel.app/co2-laser.html`

**Option B: Using .htaccess**
Add to your WordPress .htaccess file:
```apache
# Redirect CO2 Laser page to Vercel
RedirectMatch 301 ^/co2laser$ https://your-vercel-url.vercel.app/co2-laser.html
```

**Option C: Using functions.php**
Add to your theme's functions.php:
```php
add_action('template_redirect', function() {
    if (is_page('co2laser')) {
        wp_redirect('https://your-vercel-url.vercel.app/co2-laser.html', 301);
        exit;
    }
});
```

## 📁 Project Structure

```
Essex-Way/
├── index.html              # Homepage
├── about.html              # About page
├── price-guide.html        # Pricing page
├── styles.css              # Main stylesheet
├── script.js               # Main JavaScript
├── cryopen-widgets.js      # CryoPen interactive widgets
├── vercel.json            # Vercel configuration
│
├── Treatment Pages:
│   ├── hifu.html
│   ├── co2-laser.html
│   ├── emlift.html
│   ├── cryopen.html
│   ├── dermal-fillers.html
│   ├── lip-enhancement.html
│   ├── skin-boosters.html
│   ├── microneedling.html
│   ├── prp-therapy.html
│   ├── body-sculpting.html
│   └── anti-wrinkle.html (hidden)
│
└── images/                 # All images
    ├── hifu/
    └── before-after/
```

## ✨ Features

- ✅ Glassmorphic navigation with scroll effects
- ✅ WhatsApp floating button (07414 452441)
- ✅ Booking form integrated with GHL webhook
- ✅ Responsive design for all devices
- ✅ Interactive widgets on CryoPen page
- ✅ Full viewport hero sections
- ✅ SEO optimized

## 🔗 Important Links

- **WhatsApp:** +447414452441
- **Email:** support@theessexwayclinic.com
- **Phone:** 07414 452441
- **GHL Webhook:** https://services.leadconnectorhq.com/hooks/Sm8uk9iJCYQXWnTkvYpa/webhook-trigger/699d9874-5df6-4ff8-9209-f238635fd859

## 🛠️ Local Development

Simply open `index.html` in a browser. No build process needed!

For a local server:
```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx serve
```

Then visit: `http://localhost:8000`

## 📝 Notes

- Anti-wrinkle injections page is hidden (requires prescriber)
- Primary treatments are HIFU, CO2 Laser, and 3D EMLift
- All forms submit to GHL for lead tracking
- Images optimized for web performance

---

Built with ❤️ for The Essex Way Clinic
