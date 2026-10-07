import React from 'react';

export const OriginalQRCode: React.FC<{ className?: string }> = ({ className = 'w-48 h-48' }) => {
  return (
    <div
      className={`bg-[#f4efe2] rounded-xl p-3 shadow-2xl flex items-center justify-center ${className}`}
      role="img"
      aria-label="QR code linking to the Google Drive project archive"
    >
      <svg
        viewBox="0 0 41 41"
        shapeRendering="crispEdges"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full block"
      >
        <path fill="#f4efe2" d="M0 0h41v41h-41z" />
        <path
          className="qrline"
          stroke="#0b0f0d"
          d="M2 2.5h7m1 0h3m3 0h2m2 0h2m3 0h1m2 0h1m3 0h7m-37 1h1m5 0h1m1 0h1m1 0h1m3 0h1m5 0h3m5 0h1m1 0h1m5 0h1m-37 1h1m1 0h3m1 0h1m1 0h1m1 0h2m2 0h2m2 0h1m1 0h2m3 0h3m2 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m2 0h5m1 0h1m1 0h1m1 0h3m2 0h2m1 0h2m1 0h1m1 0h3m1 0h1m-37 1h1m1 0h3m1 0h1m1 0h1m2 0h1m3 0h1m1 0h3m4 0h1m1 0h1m1 0h1m1 0h1m1 0h3m1 0h1m-37 1h1m5 0h1m3 0h1m1 0h1m2 0h1m1 0h2m1 0h1m1 0h2m6 0h1m5 0h1m-37 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-25 1h2m8 0h1m2 0h1m1 0h2m-29 1h1m2 0h7m3 0h4m1 0h1m1 0h1m2 0h1m1 0h5m2 0h1m1 0h3m-36 1h1m2 0h1m2 0h1m1 0h2m1 0h1m7 0h1m1 0h1m2 0h1m3 0h1m1 0h5m-36 1h1m1 0h1m3 0h3m2 0h3m3 0h1m3 0h3m1 0h1m1 0h1m2 0h1m1 0h1m3 0h1m-37 1h2m1 0h2m4 0h1m2 0h2m1 0h1m1 0h2m3 0h1m3 0h1m1 0h9m-37 1h4m2 0h1m3 0h5m1 0h1m2 0h2m2 0h2m3 0h1m1 0h2m1 0h1m2 0h1m-37 1h1m1 0h1m4 0h2m1 0h4m2 0h3m3 0h2m2 0h4m2 0h2m2 0h1m-37 1h2m2 0h1m1 0h4m1 0h1m3 0h3m1 0h1m2 0h1m2 0h1m1 0h4m1 0h5m-37 1h1m1 0h1m2 0h1m1 0h2m2 0h1m1 0h3m1 0h3m3 0h1m2 0h2m3 0h1m1 0h3m-33 1h2m1 0h1m1 0h4m1 0h5m2 0h1m3 0h1m3 0h1m1 0h1m3 0h3m-36 1h1m2 0h2m2 0h1m1 0h1m2 0h1m2 0h3m1 0h1m9 0h2m-32 1h1m2 0h4m4 0h3m1 0h1m1 0h1m2 0h1m1 0h2m3 0h6m3 0h1m-37 1h5m2 0h3m1 0h1m1 0h2m8 0h1m1 0h1m5 0h1m1 0h1m2 0h1m-37 1h1m1 0h2m2 0h2m4 0h1m2 0h3m6 0h1m1 0h1m1 0h7m-35 1h2m1 0h3m1 0h5m1 0h1m1 0h1m3 0h1m1 0h3m1 0h4m3 0h1m1 0h3m-35 1h2m1 0h3m3 0h1m1 0h1m1 0h4m2 0h1m1 0h1m2 0h3m1 0h2m1 0h1m2 0h1m-33 1h2m1 0h1m1 0h1m4 0h1m1 0h2m1 0h2m1 0h1m1 0h1m5 0h5m1 0h1m-37 1h2m1 0h1m1 0h2m1 0h1m1 0h1m1 0h7m1 0h1m1 0h3m2 0h4m-31 1h1m1 0h2m1 0h1m1 0h3m1 0h1m4 0h1m2 0h4m3 0h4m1 0h4m-35 1h4m1 0h3m3 0h2m3 0h4m1 0h2m2 0h3m3 0h1m3 0h2m-37 1h1m1 0h2m4 0h2m3 0h1m1 0h1m2 0h1m1 0h1m2 0h2m1 0h1m2 0h2m2 0h2m1 0h1m-37 1h1m1 0h1m2 0h10m1 0h1m3 0h1m1 0h1m1 0h2m2 0h6m1 0h1m-28 1h1m1 0h1m1 0h1m2 0h2m2 0h1m5 0h1m2 0h1m3 0h1m1 0h3m-37 1h7m1 0h1m1 0h1m2 0h3m3 0h1m1 0h4m1 0h1m1 0h1m1 0h1m1 0h1m3 0h1m-37 1h1m5 0h1m1 0h1m2 0h1m3 0h5m3 0h1m1 0h1m1 0h2m3 0h1m2 0h2m-37 1h1m1 0h3m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m4 0h1m1 0h1m1 0h2m1 0h7m-33 1h1m1 0h3m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h6m2 0h5m1 0h1m-37 1h1m1 0h3m1 0h1m2 0h1m1 0h1m3 0h2m1 0h1m3 0h3m7 0h1m3 0h1m-37 1h1m5 0h1m9 0h2m1 0h1m2 0h1m3 0h1m1 0h3m1 0h5m-37 1h7m1 0h2m1 0h3m1 0h2m1 0h3m2 0h2m1 0h1m1 0h4m4 0h1"
        />
      </svg>
    </div>
  );
};
