import React from 'react';
import projectArchiveQr from '../assets/images/project-archive-qr.png';

export const PROJECT_ARCHIVE_URL = 'https://drive.google.com/drive/folders/1fIMSEkOIx8lvU0MhXMaXHkvKGgUYc80C';

interface ProjectDriveQRProps {
  className?: string;
}

export const ProjectDriveQR: React.FC<ProjectDriveQRProps> = ({ className = '' }) => (
  <a
    href={PROJECT_ARCHIVE_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={`project-drive-qr ${className}`}
    aria-label="Scan or open the QR code to access the Google Drive project archive"
  >
    <img src={projectArchiveQr} alt="QR code for the Google Drive project archive" loading="lazy" />
    <span>Scan to open archive</span>
  </a>
);
