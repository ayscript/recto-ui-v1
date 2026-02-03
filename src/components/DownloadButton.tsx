import React, { useRef, useState, RefObject } from "react";

// Define the supported mime types
type ImageFormat = "image/png" | "image/jpeg" | "image/webp";

interface DownloadProps {
  iframeRef: RefObject<HTMLIFrameElement | null>;
}

const CanvasDownloader: React.FC<DownloadProps> = ({
  iframeRef,
}) => {
  const [format, setFormat] = useState<ImageFormat>("image/png");

  const handleDownload = (): void => {
    const iframe = iframeRef.current;
    if (!iframe) {
      console.warn("Iframe reference not found.");
      return;
    }

    // Access the document inside the iframe
    const innerDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!innerDoc) {
      console.error("Could not access iframe content.");
      return;
    }

    // Explicitly cast the element to HTMLCanvasElement
    const canvas = innerDoc.querySelector('canvas') as HTMLCanvasElement | null;

    if (!canvas) {
      console.error("No canvas found inside the iframe.");
      return;
    }

    try {
      // quality (0.92) is ignored for PNG but used for JPEG/WebP
      const dataURL = canvas.toDataURL(format, 0.92);

      const extension = format.split("/")[1];
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `canvas-export.${extension}`;

      // Append to body for compatibility with some browsers
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(
        "Export failed. This is likely a CORS 'tainted canvas' issue.",
        error,
      );
    }
  };

  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <select
        value={format}
        onChange={(e) => setFormat(e.target.value as ImageFormat)}
        style={{
          padding: "4px 8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      >
        <option value="image/png">PNG</option>
        <option value="image/jpeg">JPEG</option>
        <option value="image/webp">WebP</option>
      </select>

      <button
        onClick={handleDownload}
        style={{
          padding: "6px 12px",
          backgroundColor: "#2ea44f",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Export Image
      </button>
    </div>
  );
};

export default CanvasDownloader;