import React, { useEffect, useRef, useState } from 'react';
import { Sprout } from 'lucide-react';
import meghdootVisitOne from '../assets/images/meghdoot-garden-visit-01.jpg';
import meghdootVisitTwo from '../assets/images/meghdoot-garden-visit-02.jpg';
import jainVisitOne from '../assets/images/jain-nursery-visit-01.jpg';
import jainVisitTwo from '../assets/images/jain-nursery-visit-02.jpg';
import jainVisitThree from '../assets/images/jain-nursery-visit-03.jpg';
import locationPlantOne from '../assets/images/location-stamped-plant-01.jpg';
import locationPlantTwo from '../assets/images/location-stamped-plant-02.jpg';
import gardenBalsamPhoto from '../assets/images/balsam_leaf_macro_1791213523904.jpg';
import { PLANTS } from '../data/plants';
import { PLANT_IMAGES } from '../data/plantImages';
import { ProjectDriveQR } from './ProjectDriveQR';
import { ArrowRight } from 'lucide-react';

type EvidenceKind = 'meghdoot' | 'jain' | 'location' | 'archive' | 'qr';

interface EvidenceRecord {
  number: string;
  title: string;
  description: string;
  label: string;
  status: string;
  kind: EvidenceKind;
}

interface EvidencePhoto {
  src: string;
  alt: string;
}

const EvidenceSlideshow: React.FC<{
  photos: EvidencePhoto[];
  fit?: 'contain' | 'cover' | 'cover-bottom';
}> = ({ photos, fit = 'cover' }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (photos.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % photos.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [activeIndex, photos.length]);

  const activePhoto = photos[activeIndex];

  return (
    <div className={`project-evidence-slideshow project-evidence-photo-${fit}`}>
      <img
        key={activePhoto.src}
        src={activePhoto.src}
        alt={activePhoto.alt}
        loading="lazy"
        decoding="async"
      />
      <div className="project-evidence-slideshow-controls">
        <span>PHOTO {String(activeIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span>
        <div className="project-evidence-slideshow-dots" aria-label="Choose a field photograph">
          {photos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              className={index === activeIndex ? 'is-active' : ''}
              aria-label={`Show photo ${index + 1}: ${photo.alt}`}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const evidenceRecords: EvidenceRecord[] = [
  {
    number: '01',
    title: 'Meghdoot Garden Visit',
    description: 'Explored plant species in the field, observed their characteristics and documented specimens through photographs and notes.',
    label: 'Field investigation',
    status: 'Completed',
    kind: 'meghdoot',
  },
  {
    number: '02',
    title: 'Jain Nursery Visit',
    description: 'Visited the nursery to explore plant species and learn about their identification, growth and practical uses.',
    label: 'Field research',
    status: 'Completed',
    kind: 'jain',
  },
  {
    number: '03',
    title: 'Location-stamped plant photos',
    description: 'Photographs show location details and coordinates in the image; embedded GPS metadata was not present in the supplied files.',
    label: 'Field evidence',
    status: 'Documented',
    kind: 'location',
  },
  {
    number: '04',
    title: 'Digital Herbarium Website',
    description: 'Built an interactive archive to explore plant records, families, characteristics, growth stages and uses.',
    label: 'Digital archive',
    status: 'Online',
    kind: 'archive',
  },
  {
    number: '05',
    title: 'QR / Google Drive Access',
    description: 'Connected the physical project record to its Google Drive resources with a scannable QR code.',
    label: 'Digital access',
    status: 'Verified',
    kind: 'qr',
  },
];

const EvidenceVisual: React.FC<{ kind: EvidenceKind }> = ({ kind }) => {
  if (kind === 'meghdoot') {
    return (
      <EvidenceSlideshow
        fit="cover-bottom"
        photos={[
          { src: meghdootVisitOne, alt: 'Meghdoot Garden field visit photograph 1' },
          { src: meghdootVisitTwo, alt: 'Meghdoot Garden field visit photograph 2' },
        ]}
      />
    );
  }

  if (kind === 'jain') {
    return (
      <EvidenceSlideshow
        fit="cover-bottom"
        photos={[
          { src: jainVisitOne, alt: 'Jain Nursery field visit photograph 1' },
          { src: jainVisitTwo, alt: 'Jain Nursery field visit photograph 2' },
          { src: jainVisitThree, alt: 'Jain Nursery field visit photograph 3' },
        ]}
      />
    );
  }

  if (kind === 'location') {
    return (
      <EvidenceSlideshow
        fit="cover-bottom"
        photos={[
          { src: locationPlantOne, alt: 'Plant photograph with location details visibly stamped on image 1' },
          { src: locationPlantTwo, alt: 'Plant photograph with location details visibly stamped on image 2' },
        ]}
      />
    );
  }

  if (kind === 'archive') {
    return (
      <div className="project-evidence-archive" aria-label="Visual preview of the Digital Herbarium plant archive">
        <div className="project-evidence-browser">
          <span />
          <span />
          <span />
          <small>digital-herbarium / specimens</small>
        </div>
        <div className="project-evidence-specimen">
          <img src={gardenBalsamPhoto} alt="" loading="lazy" decoding="async" />
          <div>
            <span>SPECIMEN P-001</span>
            <b>{PLANTS[0].common}</b>
            <i>{PLANTS[0].sci}</i>
            <small>Family · {PLANTS[0].family}</small>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-evidence-qr">
      <ProjectDriveQR />
    </div>
  );
};

interface ProjectInformationProps {
  isExperienceOpen: boolean;
  onOpenExperience: () => void;
}

export const ProjectInformation: React.FC<ProjectInformationProps> = ({ isExperienceOpen, onOpenExperience }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
    <section
      ref={sectionRef}
      id="project-info"
      className={`project-information-section py-16 px-4 sm:px-8 max-w-6xl mx-auto border-t border-[#e6dcbe]/10 ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="project-information-heading">
        <div className="lbl">Project Information 01</div>
        <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider mt-1 mb-2">
          What We Have Done
        </h2>
        <p className="max-w-3xl text-sm sm:text-base text-[#b9b4a2]">
          From field visits and specimen documentation to botanical research and digital archiving, our investigation brought real-world plant observations into an interactive digital herbarium.
        </p>
      </div>

      <div className="project-evidence-track" aria-label="Project investigation evidence timeline">
        {evidenceRecords.map((record, index) => (
          <article
            key={record.number}
            className={`project-evidence-card project-evidence-card--${record.kind}`}
            style={{ '--evidence-index': index } as React.CSSProperties}
          >
            <header className="project-evidence-card-header">
              <span className="project-evidence-number">{record.number}</span>
              <span className="project-evidence-label">Case evidence {record.number}</span>
            </header>

            <EvidenceVisual kind={record.kind} />

            <div className="project-evidence-copy">
              <h3>{record.title}</h3>
              <p>{record.description}</p>
              <div className="project-evidence-status">
                <span>{record.label}</span>
                <b><span aria-hidden="true">✓</span> {record.status}</b>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="project-investigation-summary">
        <div>
          <b>02</b>
          <span>Field visits</span>
        </div>
        <div>
          <b>{PLANTS.length}</b>
          <span>Specimens studied</span>
        </div>
        <div>
          <b>{Object.keys(PLANT_IMAGES).length}</b>
          <span>Specimen photos</span>
        </div>
        <div>
          <b>01</b>
          <span>Digital archive</span>
        </div>
        <div className="project-research-complete">
          <Sprout aria-hidden="true" />
          <span>Research completed</span>
        </div>
      </div>

      <p className="project-journey-line">Field evidence <span>→</span> Research <span>→</span> Digital archive</p>
      <button
        type="button"
        className="project-experience-button"
        onClick={onOpenExperience}
        aria-label="Open our investigation journey experience"
        aria-haspopup="dialog"
        aria-expanded={isExperienceOpen}
        aria-controls="journey-modal-dialog"
      >
        <span>Our Experience</span>
        <ArrowRight aria-hidden="true" />
      </button>
    </section>
    </>
  );
};
