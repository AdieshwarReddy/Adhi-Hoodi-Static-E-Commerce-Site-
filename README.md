# ADHIHOODI

**OWN THE COMFORT. WEAR THE ATTITUDE.**

A premium, interactive, and responsive fashion e-commerce frontend.

## Features
- **Premium Design:** Modern aesthetic with a dark charcoal/black theme, bold white typography, and selective red accents.
- **Dynamic Product Rendering:** Products are rendered dynamically from a Javascript object array.
- **Category Filtering:** Filter products dynamically without page reload.
- **Interactive Cart:** Slide-out cart drawer with add, remove, quantity update, and clear functionalities.
- **Cart Persistence:** The cart state is saved in `localStorage` and persists across browser refreshes.
- **Toast Notifications:** Custom toast notifications for user interactions (adding items, removing, form validation).
- **Responsive Layout:** fully optimized for mobile, tablet, and desktop devices.
- **Demo Checkout & Contact Form:** Frontend-only demonstration modes for checkout and contact validation.

## Technology Stack
Built strictly using:
- HTML5
- CSS3
- Vanilla JavaScript

*No external frameworks, libraries, or npm packages are used.*

## Folder Structure
```
ADHIHOODI/
│
├── index.html        # Main HTML file structure
├── styles.css        # Custom CSS styles (CSS variables, flexbox, grid)
├── script.js         # Core Javascript logic (products, cart, DOM interactions)
├── README.md         # Project documentation
│
└── assets/
    └── images/       # All project visuals
        ├── hero-hoodie.png
        ├── hoodie-01.jpg
        ├── hoodie-02.jpg
        ├── hoodie-03.jpg
        ├── hoodie-04.jpg
        ├── hoodie-05.jpg
        ├── hoodie-06.jpg
        └── new_arrivals/     # Extended collection (hoodies 07 to 11)
```

## Recent Updates / Changelog
- **Brand Name Update:** Renamed project from `ADHIHOOD` to `ADHIHOODI` across the entire codebase.
- **Extended Catalog:** Generated a new `new_arrivals/` folder and added 5 new colorways (dark grey, mustard yellow, dark green, pink, purple).
- **Hero Image Upgrade:** Swapped the main hero image to a custom user `.png` file (`hero-hoodie.png`).
- **Social Links:** Updated the footer with live links to GitHub, Instagram, and a `mailto:` for Email.
- **Cart UX Fix:** Updated JavaScript to automatically select the first size (`S`) for every product to prevent the cart from silently failing if a user forgot to choose a size manually.

## How to Run

**Option 1:** Simply open `index.html` in your web browser. It will run perfectly as a static file.
**Option 2:** Run a simple local HTTP server (e.g., using VS Code Live Server, or Python `python -m http.server`).

## How to Replace Images
All images are located in the `assets/images/` directory. To replace an image, simply overwrite the existing file with your new image, ensuring the filename remains exactly the same (e.g., `hoodie-01.jpg`). No code changes are required.

## How the Cart and LocalStorage Work
The cart logic is handled in `script.js`. When an item is added, removed, or updated, the `cart` array is modified and immediately serialized to JSON and saved to the browser's `localStorage` under the key `adhihoodi_cart`. On page load, the script reads this key from `localStorage`, parses it back into an array, and populates the cart drawer automatically.

## Known Limitations
- **Frontend-Only:** This application is completely frontend-only.
- **Demo Checkout:** The checkout feature is a demonstration modal and does not process real payments or handle backend data.
- **Contact Form Validation:** The contact form validates locally on the client-side but does not send an actual email or data to a server.
