import React, { useState, useRef, useEffect } from "react";
import QrScanner from "./components/QrScanner";

import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WavyDiv from "./components/WavyDive";
import HeaderWavyDiv from "./components/HeaderWavyDiv";
  


const App = () => {
  const [scannedData, setScannedData] = useState([]); // Store scanned QR data with status
  const scannedSet = useRef(new Set()); // Tracks unique QR codes
  const isProcessingRef = useRef(false); // Debounce mechanism

  let isTelegramInitialized = false;

useEffect(() => {
  if (isTelegramInitialized) {
    console.log("Telegram Web App is already initialized.");
    return;
  }

  isTelegramInitialized = true;
  console.log("Initializing Telegram Web App...");
  
  const script = document.createElement("script");
  script.src = "https://telegram.org/js/telegram-web-app.js";
  script.async = true;

  script.onload = () => {
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      console.log("Telegram Web App initialized:", tg.initDataUnsafe);
      toast.success(`Telegram Web App initialized`, {
        position: "bottom-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  script.onerror = () => {
    console.error("Failed to load Telegram Web App SDK.");
  };

  document.body.appendChild(script);

  return () => {
    if (script.parentNode) {
      script.parentNode.removeChild(script);
    }
  };
}, []);




  const checkInTicket = async (id) => {
    console.log("Sending check-in request for:", id);
    try {
      const response = await fetch(`https://boatpass.afraaz.xyz/api/booking${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Check-in successful:", result.message);

        // Show success toast notification
        toast.success(`${result.message}`, {
          position: "bottom-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: "colored",
          transition: Bounce,
        });
        setScannedData((prevData) => [
          ...prevData,
          { qrCode: id, status: "success", message: result.message },
        ]);
      } else {
        console.error("Check-in failed:", result.message);
        // Show error toast notification
        toast.error(`${result.message}`, {
          position: "bottom-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: "colored",
          transition: Bounce,
        });
        setScannedData((prevData) => [
          ...prevData,
          { qrCode: id, status: "error", message: result.message },
        ]);
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error(`Network error: ${error}`, {
        position: "bottom-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
        transition: Bounce,
      });
      setScannedData((prevData) => [
        ...prevData,
        { qrCode: id, status: "error", message: "Network error. Please try again." },
      ]);
    }
  };

  const handleScanSuccess = (decodedText) => {
    console.log("QR Code scanned:", decodedText);

    if (isProcessingRef.current || scannedSet.current.has(decodedText)) return;

    isProcessingRef.current = true;
    scannedSet.current.add(decodedText);

    checkInTicket(decodedText);

    setTimeout(() => {
      isProcessingRef.current = false;
    }, 2000);
  };

  const handleScanFailure = (errorMessage) => {
    console.warn("Scan failure:", errorMessage); // Optional logging
  };

  return (
    
    <div style={{ textAlign: "center", backgroundColor: "#008F82" }}>
      <HeaderWavyDiv/>
      <div style={{ textAlign: "center", marginTop: -100, marginBottom: 0, padding: "20px",height: "50vh", backgroundColor: "#008F82", display: "flex", flexDirection: "column"  }}>
        <QrScanner onScanSuccess={handleScanSuccess} onScanFailure={handleScanFailure} />
      </div>
      <WavyDiv/>
      <ToastContainer />
    </div>
  );
};

export default App;
