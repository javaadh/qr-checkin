import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import "./QrScanner.css"; // Import your custom CSS for the scanning line

const QrScanner = ({ onScanSuccess, onScanFailure }) => {
  const qrCodeRegionRef = useRef(null);
  const html5QrCodeRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const videoElement = document.querySelector("#qr-code-region video");
    if (videoElement) {
      videoElement.style.width = "100%";
      videoElement.style.height = "auto";
      videoElement.style.objectFit = "cover";

    }
  }, []);
  
  useEffect(() => {
    html5QrCodeRef.current = new Html5Qrcode("qr-code-region");

    const startScanner = async () => {
      try {
        await html5QrCodeRef.current.start(
          { facingMode: "environment" }, // Rear-facing camera
          {
            fps: 10,
            qrbox: { width: 250, height: 250 }, // Match CSS width and height
            aspectRatio: 1, // Force square aspect ratio
          },
          (decodedText) => onScanSuccess(decodedText),
          (errorMessage) => onScanFailure(errorMessage)
        );
      } catch (error) {
        console.error("Failed to start QR Code scanner", error);
      }
    };
    
    startScanner();

    return () => {
      if (html5QrCodeRef.current && isScanning) {
        html5QrCodeRef.current.stop().then(() => {
          html5QrCodeRef.current.clear();
          setIsScanning(false);
        }).catch((error) => {
          console.warn("Error stopping scanner:", error);
        });
      }
    };
  }, [onScanSuccess, onScanFailure, isScanning]);

  return (
    <div id="qr-code-region" ref={qrCodeRegionRef} style={{ position: "relative" }}>
      <div className="scanning-line"></div>
    </div>
  );
};

export default QrScanner;
