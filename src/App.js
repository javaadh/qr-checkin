import React, { useState, useRef, useEffect } from "react";
import QrScanner from "./components/QrScanner";

import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  


const App = () => {
  const [scannedData, setScannedData] = useState([]); // Store scanned QR data with status
  const scannedSet = useRef(new Set()); // Tracks unique QR codes
  const isProcessingRef = useRef(false); // Debounce mechanism

  useEffect(() => {
    // Dynamically add the Telegram Web App SDK script
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    script.onload = () => {
      if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;

        // Initialize the Telegram Web App
        tg.ready();

        console.log("Telegram Web App initialized:", tg.initDataUnsafe);

      } else {
        console.warn("Telegram Web App SDK not available.");
      }
    };

    script.onerror = () => {
      console.error("Failed to load the Telegram Web App SDK.");
    };

    document.body.appendChild(script);

    // Cleanup the script tag on component unmount
    return () => {
      document.body.removeChild(script);
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
    <div style={{ backgroundColor: "#008F82", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Boat Pass Check-in</h1>
        <QrScanner onScanSuccess={handleScanSuccess} onScanFailure={handleScanFailure} />
      </div>
      <div style={{ backgroundColor: "#B9BCB3", padding: "20px", flexGrow: 1, overflowY: "auto" }}>

      <ToastContainer />

      </div>
    </div>
  );
};

export default App;
