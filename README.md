# QR Check-In App

A React-based application that allows users to scan QR codes for seamless check-ins. This app is designed to streamline the check-in process for events, transportation, or any use case requiring QR code validation.

## Features

- **Real-Time QR Code Scanning:** Uses a live camera feed to scan QR codes.
- **Telegram Integration:** Compatible with Telegram Mini Apps for enhanced usability.
- **Wavy Header/Footer Design:** Visually appealing UI with animated waves.
- **Responsive Design:** Works across devices (mobile, tablet, desktop).
- **Zoom Feature:** Adjusts camera zoom for better QR code readability.

## Tech Stack

- **Frontend:** React
- **QR Code Scanning:** [Html5Qrcode](https://github.com/mebjas/html5-qrcode)
- **Deployment:** GitHub Pages / Vercel / Netlify
- **Styling:** CSS with custom animations

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/javaadh/qr-checkin.git
   cd qr-checkin
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Access the app in your browser at:
   ```
   http://localhost:3000
   ```

## Deployment

### Deploying to GitHub Pages

1. Add the `homepage` property to your `package.json`:

   ```json
   "homepage": "https://yourusername.github.io/qr-checkin"
   ```

2. Install the `gh-pages` package:

   ```bash
   npm install gh-pages --save-dev
   ```

3. Add the following scripts to your `package.json`:

   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

### Deploying to Vercel

1. Install the Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

### Deploying to Netlify

1. Install the Netlify CLI:

   ```bash
   npm install -g netlify-cli
   ```

2. Deploy:
   ```bash
   netlify deploy
   ```

## Usage

1. Open the app in your browser or Telegram Mini App.
2. Allow camera permissions to enable QR scanning.
3. Point the camera at a QR code to scan and process it.
4. If valid, the app displays the check-in status.

## File Structure

```
src/
├── components/
│   ├── QrScanner.js       # QR scanning logic
│   ├── HeaderWavyDiv.js   # Animated header
│   └── FooterWavyDiv.js   # Animated footer
├── App.js                 # Main app entry point
├── index.js               # React entry point
└── styles/                # CSS files
```

## Troubleshooting

- **Zoom Issues:** Ensure your device's camera supports zoom. Adjust the zoom level in `QrScanner.js`.
- **Deployment Errors:** Check the `homepage` property in `package.json` if using GitHub Pages.
- **Camera Permission Denied:** Verify browser permissions for camera access.

## License

This project is licensed under the [MIT License](LICENSE).
