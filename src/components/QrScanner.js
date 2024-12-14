import React, { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import "./QrScanner.css";

const QrScanner = ({ onScanSuccess, onScanFailure }) => {
  const html5QrCodeRef = useRef(null);
  const lastScannedRef = useRef(null); // Tracks the last scanned QR code
  const isScannerRunning = useRef(false); // Tracks scanner state

  useEffect(() => {
    const initializeScanner = async () => {
      try {
        if (!html5QrCodeRef.current) {
          html5QrCodeRef.current = new Html5Qrcode("qr-code-region");
        }

        if (!isScannerRunning.current) {
          await html5QrCodeRef.current.start(
            { facingMode: "environment" }, // Use rear-facing camera
            {
              fps: 10,
              qrbox: { width: 250, height: 350 }, // Adjust scanning box
            },
            (decodedText) => {
              if (decodedText !== lastScannedRef.current) {
                lastScannedRef.current = decodedText; // Update last scanned QR code
                onScanSuccess(decodedText);

                // Allow continuous scanning by resetting the last scanned QR code after a timeout
                setTimeout(() => {
                  lastScannedRef.current = null;
                }, 2000);
              }
            },
            (errorMessage) => {
              onScanFailure(errorMessage);
            }
          );

          isScannerRunning.current = true; // Mark scanner as running
          console.log("QR scanner started.");

          // Apply zoom functionality
          const videoTrack = html5QrCodeRef.current.getVideoElement().srcObject.getVideoTracks()[0];
          if (videoTrack && videoTrack.getCapabilities) {
            const capabilities = videoTrack.getCapabilities();
            if (capabilities.zoom) {
              // Set a zoom level (e.g., 50% of the maximum zoom)
              await videoTrack.applyConstraints({
                advanced: [{ zoom: capabilities.zoom.max / 2 }],
              });
              console.log("Zoom applied:", capabilities.zoom.max / 2);
            } else {
              console.warn("Zoom is not supported on this device.");
            }
          }
        }
      } catch (error) {
        console.error("Failed to start QR Code scanner:", error);
      }
    };

    initializeScanner();

    // Cleanup logic for when the component unmounts
    return () => {
      console.log("Keeping the camera session active on all browsers.");
      // No cleanup performed here to keep the scanner active across all browsers
    };
  }, [onScanSuccess, onScanFailure]);

  return (
    <div>
      <div id="qr-code-region" style={{ position: "relative" }}></div>
    </div>
  );
};

export default QrScanner;
