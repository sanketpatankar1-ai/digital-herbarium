import React, { useEffect, useRef } from 'react';
import { ArrowDown, ArrowRight, X } from 'lucide-react';
import meghdootVisitOne from '../assets/images/meghdoot-garden-visit-01.jpg';
import meghdootVisitTwo from '../assets/images/meghdoot-garden-visit-02.jpg';
import jainVisitOne from '../assets/images/jain-nursery-visit-01.jpg';
import jainVisitTwo from '../assets/images/jain-nursery-visit-02.jpg';
import jainVisitThree from '../assets/images/jain-nursery-visit-03.jpg';
import gardenBalsamPhoto from '../assets/images/balsam_leaf_macro_1791213523904.jpg';

interface InvestigationJourneyModalProps {
  onClose: () => void;
}

const journeySections = [
  ['case-beginning', 'Beginning'],
  ['case-001', 'Case 001'],
  ['case-002', 'Case 002'],
  ['case-research', 'Research'],
  ['case-herbarium', 'Herbarium'],
  ['case-digital', 'Digital'],
];

const evidenceObservations = [
  ['Leaf arrangement', 'We observed how leaves were arranged on different plants.'],
  ['Leaf structure', 'We compared shapes, margins and surface textures.'],
  ['Stem characteristics', 'We noticed differences in stems and overall plant structure.'],
  ['Plant diversity', 'We discovered how many different species could exist within a relatively small area.'],
  ['Field photography', 'We photographed plants and recorded observations for later research.'],
];

const researchFields = [
  'Common name',
  'Scientific name',
  'Family',
  'Identifying characteristics',
  'Habitat',
  'Uses',
  'Importance',
  'Other relevant botanical information',
];

const fieldDaySteps = ['Travel', 'Search', 'Observe', 'Collect', 'Photograph', 'Record', 'Compare'];
const researchPath = ['Field sample', 'Observation', 'Research', 'Verification', 'Identification'];
const herbariumRoles = ['Field work', 'Research', 'Photography', 'Herbarium', 'Design', 'Digital experience'];
const lessons = [
  ['Observation', 'We learned to notice details that we normally overlook.'],
  ['Research', 'We learned how to investigate unfamiliar plant species.'],
  ['Documentation', 'We learned the importance of recording and organizing information.'],
  ['Teamwork', 'We learned how different contributions come together into one project.'],
  ['Technology', 'We learned how a traditional academic project can become a digital experience.'],
];
const completeJourney = ['Field', 'Collection', 'Observation', 'Research', 'Documentation', 'Physical herbarium', 'Digital herbarium'];

const visitPhotos = {
  jain: [
    { src: jainVisitOne, alt: 'Jain Nursery field visit photograph 1' },
    { src: jainVisitTwo, alt: 'Jain Nursery field visit photograph 2' },
    { src: jainVisitThree, alt: 'Jain Nursery field visit photograph 3' },
  ],
  meghdoot: [
    { src: meghdootVisitOne, alt: 'Meghdoot Garden field visit photograph 1' },
    { src: meghdootVisitTwo, alt: 'Meghdoot Garden field visit photograph 2' },
  ],
};

const JourneyGallery: React.FC<{
  photos: typeof visitPhotos.jain;
  label: string;
}> = ({ photos, label }) => (
  <div className="journey-gallery" aria-label={label}>
    {photos.map((photo, index) => (
      <figure key={photo.src}>
        <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
        <figcaption>FIELD EVIDENCE {String(index + 1).padStart(2, '0')}</figcaption>
      </figure>
    ))}
  </div>
);

export const InvestigationJourneyModal: React.FC<InvestigationJourneyModalProps> = ({ onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousOverflowRef = useRef('');

  useEffect(() => {
    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        const dialog = dialogRef.current;
        const focusable = dialog?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable?.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflowRef.current;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const content = dialog?.querySelector('.journey-modal-content');
    if (!content) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const chapters = content.querySelectorAll<HTMLElement>('.journey-chapter');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      chapters.forEach((chapter) => chapter.classList.add('is-in-view'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { root: content, threshold: 0.08 }
    );
    chapters.forEach((chapter) => observer.observe(chapter));
    return () => observer.disconnect();
  }, []);

  const scrollToCase = (id: string) => {
    dialogRef.current?.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      className="journey-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        id="journey-modal-dialog"
        className="journey-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="journey-modal-title"
      >
        <header className="journey-modal-header">
          <div>
            <span className="journey-modal-kicker">CASE FILE // BOTANICAL INVESTIGATION</span>
            <h2 id="journey-modal-title">Our Herbarium Investigation Journey</h2>
            <p>From field exploration to a complete digital herbarium.</p>
          </div>
          <div className="journey-modal-header-actions">
            <span className="journey-status-badge">Case status: Completed</span>
            <button ref={closeButtonRef} type="button" className="journey-close-button" onClick={onClose}>
              <X aria-hidden="true" />
              <span>Close case</span>
            </button>
          </div>
        </header>

        <nav className="journey-progress-nav" aria-label="Investigation journey sections">
          <span>CASE FILE INDEX</span>
          {journeySections.map(([id, label]) => (
            <button key={id} type="button" onClick={() => scrollToCase(id)}>{label}</button>
          ))}
        </nav>

        <div className="journey-modal-content">
          <section id="case-beginning" className="journey-chapter">
            <div className="journey-chapter-heading">
              <span>01 // THE BEGINNING</span>
              <h3>The Case Begins</h3>
            </div>
            <div className="journey-two-column">
              <div className="journey-prose">
                <p>Our journey began with a simple objective: to explore, collect, identify, research, and document the plants around us.</p>
                <p>What started as a herbarium assignment gradually became a complete investigation involving exploration, teamwork, research, creativity, and practical learning.</p>
                <p>We wanted our project to be more than a collection of dried leaves and plant names. We wanted every plant to have a story.</p>
              </div>
              <div className="journey-objective-card">
                <span>CASE OBJECTIVE</span>
                <div>Explore <ArrowRight /> Collect <ArrowRight /> Identify</div>
                <div>Research <ArrowRight /> Document</div>
              </div>
            </div>
          </section>

          <section id="case-001" className="journey-chapter">
            <div className="journey-chapter-heading">
              <span>02 // FIRST INVESTIGATION</span>
              <h3>Case 001 — Jain Nursery</h3>
            </div>
            <div className="journey-location-card">
              <div className="journey-location-meta">
                <div><span>LOCATION</span><b>Jain Nursery</b></div>
                <div><span>MISSION</span><b>Search, observe, identify and collect plant species.</b></div>
              </div>
              <div className="journey-prose">
                <p>Our first field visit took us to Jain Nursery, where we began searching for different plant species.</p>
                <p>Instead of simply collecting samples, we carefully observed leaves, shapes, structures, sizes and other visible characteristics.</p>
                <p>During the visit, we collected nearly 30+ different plant species.</p>
              </div>
              <div className="journey-evidence-tags">
                {['30+ species', 'Field observation', 'Photography', 'Sample collection'].map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <blockquote>“Every new plant felt like another piece of evidence.”</blockquote>
              <JourneyGallery photos={visitPhotos.jain} label="Jain Nursery visit photographs" />
            </div>
          </section>

          <section className="journey-chapter">
            <div className="journey-chapter-heading">
              <span>03 // FIELD NOTES</span>
              <h3>Examining the Evidence</h3>
            </div>
            <div className="journey-observation-grid">
              {evidenceObservations.map(([title, description], index) => (
                <article className="journey-paper-note" key={title}>
                  <span>EVIDENCE {String(index + 1).padStart(2, '0')}</span>
                  <h4>{title}</h4>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="case-002" className="journey-chapter">
            <div className="journey-chapter-heading">
              <span>04 // THE INVESTIGATION CONTINUES</span>
              <h3>Case 002 — Meghdoot Garden</h3>
            </div>
            <div className="journey-location-card">
              <div className="journey-location-meta">
                <div><span>LOCATION</span><b>Meghdoot Garden, Indore</b></div>
                <strong>10+ additional species</strong>
              </div>
              <div className="journey-prose">
                <p>After completing our first collection, our investigation continued at Meghdoot Garden.</p>
                <p>The landscaped areas, lawns, trees, flowering plants and greenery provided us with a completely different environment for exploration.</p>
                <p>We searched for species that were different from those we had already collected and learned that plant diversity can be found across different environments.</p>
              </div>
              <p className="journey-collection-total">Together with our Jain Nursery collection, our overall collection crossed <b>40+ plant species.</b></p>
              <JourneyGallery photos={visitPhotos.meghdoot} label="Meghdoot Garden visit photographs" />
            </div>
          </section>

          <section className="journey-chapter">
            <div className="journey-chapter-heading">
              <span>05 // FIELD DAY</span>
              <h3>The Work Behind the Case</h3>
            </div>
            <div className="journey-timeline journey-timeline--field">
              {fieldDaySteps.map((step, index) => (
                <div key={step}><span>{String(index + 1).padStart(2, '0')}</span><b>{step}</b></div>
              ))}
            </div>
            <div className="journey-prose">
              <p>Collecting more than 40 plant species was not something we could complete within a few minutes.</p>
              <p>Our fieldwork took almost an entire day, including travelling between locations, searching for suitable plants, observing characteristics, collecting samples, taking photographs and recording information.</p>
              <p>The day was tiring, but it became one of the most memorable parts of our project.</p>
            </div>
          </section>

          <section id="case-research" className="journey-chapter">
            <div className="journey-chapter-heading">
              <span>06 // FROM COLLECTION TO RESEARCH</span>
              <h3>The Real Investigation Begins</h3>
            </div>
            <div className="journey-two-column">
              <div className="journey-prose">
                <p>Once our field collection was complete, the real research work began.</p>
                <p>Knowing only the common names was not enough. We researched the collected species and gathered relevant botanical information.</p>
                <p>Some plants were easy to identify, while others required additional investigation and comparison.</p>
              </div>
              <div className="journey-research-fields">
                <span>RESEARCH RECORD // SPECIMEN DETAILS</span>
                {researchFields.map((field) => <b key={field}>{field}</b>)}
              </div>
            </div>
            <div className="journey-process-line">
              {researchPath.map((step, index) => (
                <React.Fragment key={step}>
                  {index > 0 && <ArrowRight aria-hidden="true" />}
                  <span>{step}</span>
                </React.Fragment>
              ))}
            </div>
          </section>

          <section id="case-herbarium" className="journey-chapter">
            <div className="journey-chapter-heading">
              <span>07 // BUILDING THE PHYSICAL HERBARIUM</span>
              <h3>Evidence Becomes the Herbarium</h3>
            </div>
            <div className="journey-two-column">
              <div className="journey-prose">
                <p>After collecting and researching the plants, we began creating our physical herbarium book.</p>
                <p>The samples were carefully prepared, arranged and placed in the book along with their corresponding information.</p>
                <p>Each plant became its own small case file containing its sample and research information.</p>
              </div>
              <article className="journey-specimen-page">
                <header><span>SPECIMEN // FIELD COLLECTION</span><b>PRESSED LEAF RECORD</b></header>
                <img src={gardenBalsamPhoto} alt="Botanical specimen photograph for a herbarium record" loading="lazy" />
                <div className="journey-specimen-details">
                  {['Plant name', 'Scientific name', 'Family', 'Characteristics', 'Research'].map((field) => (
                    <div key={field}><span>{field}</span><i>Recorded in specimen file</i></div>
                  ))}
                </div>
                <small>“Every specimen became a case.”</small>
              </article>
            </div>
          </section>

          <section className="journey-chapter">
            <div className="journey-chapter-heading">
              <span>08 // WHY THE INVESTIGATION THEME?</span>
              <h3>The Case-File Concept</h3>
            </div>
            <div className="journey-prose">
              <p>Instead of creating a traditional-looking herbarium, we wanted our project to have its own identity.</p>
              <p>We chose a CID/CBI-inspired investigation theme with a small touch of mystery because we wanted identifying plants to feel like an investigation rather than simply reading a textbook.</p>
            </div>
            <div className="journey-clue-map">
              {[
                ['Plant sample', 'Evidence'],
                ['Photograph', 'Field record'],
                ['Research', 'Investigation report'],
                ['Characteristics', 'Clues'],
                ['Identification', 'Case solution'],
              ].map(([item, meaning]) => <div key={item}><span>{item}</span><ArrowRight aria-hidden="true" /><b>{meaning}</b></div>)}
              <span className="journey-solved-stamp">CASE SOLVED ✓</span>
            </div>
            <p className="journey-academic-note">The investigation theme is a creative presentation layer; the project remains academically focused on actual plant information and research.</p>
          </section>

          <section id="case-digital" className="journey-chapter">
            <div className="journey-chapter-heading">
              <span>09 // FROM PHYSICAL TO DIGITAL</span>
              <h3>The Investigation Goes Digital</h3>
            </div>
            <div className="journey-prose">
              <p>While creating the physical herbarium, we realized that a physical book has a limitation: only people who have access to the book can explore all of its contents.</p>
              <p>That led us to create our Digital Herbarium.</p>
              <p>The website extends our physical project into a digital platform where visitors can explore plants, view photographs, read information and understand the investigation process.</p>
            </div>
            <div className="journey-digital-flow">
              {['Physical herbarium', 'Digital herbarium', 'More accessible', 'More interactive'].map((step, index) => (
                <React.Fragment key={step}>
                  {index > 0 && <ArrowDown aria-hidden="true" />}
                  <span>{step}</span>
                </React.Fragment>
              ))}
            </div>
          </section>

          <section className="journey-chapter">
            <div className="journey-chapter-heading">
              <span>10 // TEAMWORK</span>
              <h3>The Team Behind the Case</h3>
            </div>
            <div className="journey-prose">
              <p>This investigation was a team effort. Different tasks were handled throughout the project — field collection, photography, identification, research, sample preparation, page design, decoration, documentation and digital presentation.</p>
              <p>We discussed observations, divided research work, checked information and worked together on the final presentation.</p>
            </div>
            <div className="journey-role-grid">
              {herbariumRoles.map((role, index) => <span key={role}><b>{String(index + 1).padStart(2, '0')}</b>{role}</span>)}
            </div>
          </section>

          <section className="journey-chapter">
            <div className="journey-chapter-heading">
              <span>11 // WHAT WE LEARNED</span>
              <h3>Lessons from the Investigation</h3>
            </div>
            <div className="journey-lessons-grid">
              {lessons.map(([title, description]) => <article key={title}><b>{title}</b><p>{description}</p></article>)}
            </div>
          </section>

          <section className="journey-chapter journey-final-chapter">
            <div className="journey-chapter-heading">
              <span>12 // THE COMPLETE JOURNEY</span>
              <h3>The Complete Investigation</h3>
            </div>
            <div className="journey-complete-timeline">
              {completeJourney.map((step, index) => <div key={step}><span>{String(index + 1).padStart(2, '0')}</span><b>{step}</b></div>)}
            </div>
            <div className="journey-final-stats">
              {[
                ['40+', 'Plant species'],
                ['2', 'Field locations'],
                ['1', 'Physical herbarium'],
                ['1', 'Digital experience'],
                ['∞', 'Observations'],
              ].map(([value, label]) => <div key={label}><b>{value}</b><span>{label}</span></div>)}
            </div>
            <div className="journey-final-panel">
              <span>CASE CONCLUSION // BOTANICAL INVESTIGATION</span>
              <h4>We started with a simple assignment.<br />We ended with an investigation.</h4>
              <p>Every plant has a story. Every leaf has clues. And every investigation begins with observation.</p>
              <button type="button" onClick={() => { onClose(); window.setTimeout(() => document.getElementById('access')?.scrollIntoView({ behavior: 'smooth' }), 80); }}>
                Continue the Investigation <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
