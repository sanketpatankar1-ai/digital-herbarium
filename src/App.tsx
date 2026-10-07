import React, { useState, useMemo, useEffect, useRef } from 'react';
import heroInvestigationPhoto from './assets/images/hero-investigation-photo.png';
import { PLANTS, PlantRecord } from './data/plants';
import { PLANT_IMAGE_CREDITS, PLANT_IMAGES, TEAM_IMAGE } from './data/plantImages';
import { JungleFlashScreen } from './components/JungleFlashScreen';
import { LeafModal } from './components/LeafModal';
import { EvidenceBoard } from './components/EvidenceBoard';
import { FamilyExplorer } from './components/FamilyExplorer';
import { ProjectInformation } from './components/ProjectInformation';
import { InvestigationJourneyModal } from './components/InvestigationJourneyModal';
import { PROJECT_ARCHIVE_URL, ProjectDriveQR } from './components/ProjectDriveQR';
import { TeamEvidenceSlider } from './components/TeamEvidenceSlider';
import { Search, Sprout, Leaf, RotateCcw, ExternalLink, ZoomIn, X, Camera, Database, Menu, MousePointer2, Shuffle, ArrowRight } from 'lucide-react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);
  const [activeGrowthStage, setActiveGrowthStage] = useState<'seedling' | 'mature'>('mature');
  const [cardGrowthStages, setCardGrowthStages] = useState<Record<string, 'seedling' | 'mature'>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamily, setSelectedFamily] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedShape, setSelectedShape] = useState('');
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showJourneyModal, setShowJourneyModal] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const pcardRef = useRef<HTMLDivElement>(null);
  const specimenRef = useRef<HTMLDivElement>(null);
  const readingProgressRef = useRef<HTMLSpanElement>(null);
  const [lensPosition, setLensPosition] = useState({ x: 50, y: 50, visible: false });

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollableHeight > 0
          ? Math.min(100, Math.max(0, (window.scrollY / scrollableHeight) * 100))
          : 0;
        const progressBar = readingProgressRef.current;

        if (progressBar) {
          progressBar.style.transform = `scaleX(${progress / 100})`;
          progressBar.parentElement?.setAttribute('aria-valuenow', String(Math.round(progress)));
        }
      });
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  // Parallax 3D tree tracking
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = hero.getBoundingClientRect();
      const px = ((e.clientX - r.left) / r.width - 0.5).toFixed(3);
      const py = ((e.clientY - r.top) / r.height - 0.5).toFixed(3);
      hero.style.setProperty('--px', px);
      hero.style.setProperty('--py', py);

      if (pcardRef.current) {
        const ry = (((e.clientX - r.left) / r.width - 0.5) * 14).toFixed(1);
        const rx = ((0.5 - (e.clientY - r.top) / r.height) * 10).toFixed(1);
        pcardRef.current.style.setProperty('--ry', ry);
        pcardRef.current.style.setProperty('--rx', rx);
      }
    };

    const handlePointerLeave = () => {
      if (pcardRef.current) {
        pcardRef.current.style.setProperty('--ry', '-6');
        pcardRef.current.style.setProperty('--rx', '2');
      }
    };

    hero.addEventListener('pointermove', handlePointerMove);
    hero.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      hero.removeEventListener('pointermove', handlePointerMove);
      hero.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  // Filter options
  const families = useMemo(() => Array.from(new Set(PLANTS.map(p => p.family))).sort(), []);
  const colors = useMemo(() => Array.from(new Set(PLANTS.map(p => p.leafColor))).sort(), []);
  const shapes = useMemo(() => Array.from(new Set(PLANTS.map(p => p.leafShape))).sort(), []);

  // Filtered leaf records
  const filteredPlants = useMemo(() => {
    return PLANTS.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.common.toLowerCase().includes(q) ||
        (p.vernacular && p.vernacular.toLowerCase().includes(q)) ||
        p.sci.toLowerCase().includes(q) ||
        p.family.toLowerCase().includes(q) ||
        p.leafShape.toLowerCase().includes(q) ||
        p.leafColor.toLowerCase().includes(q) ||
        p.uses.toLowerCase().includes(q);

      const matchesFamily = !selectedFamily || p.family === selectedFamily;
      const matchesColor = !selectedColor || p.leafColor === selectedColor;
      const matchesShape = !selectedShape || p.leafShape === selectedShape;

      return matchesSearch && matchesFamily && matchesColor && matchesShape;
    });
  }, [searchQuery, selectedFamily, selectedColor, selectedShape]);

  const activePlant = useMemo(
    () => PLANTS.find((p) => p.id === selectedPlantId) || null,
    [selectedPlantId]
  );

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedFamily('');
    setSelectedColor('');
    setSelectedShape('');
  };

  const openRandomSpecimen = (plants: PlantRecord[]) => {
    const randomPlant = plants[Math.floor(Math.random() * plants.length)];
    if (randomPlant) setSelectedPlantId(randomPlant.id);
  };

  const toggleCardStage = (plantId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCardGrowthStages((prev) => ({
      ...prev,
      [plantId]: (prev[plantId] || activeGrowthStage) === 'seedling' ? 'mature' : 'seedling',
    }));
  };

  return (
    <div className="relative min-h-screen text-[#f4efe2] overflow-x-hidden">
      {/* Original Sun Ray Element */}
      <div className="sun" aria-hidden="true" />

      {/* Jungle Car Animated Flash Screen */}
      {showSplash && (
        <JungleFlashScreen onFinish={() => setShowSplash(false)} />
      )}

      {/* Leaf Modal Popup */}
      <LeafModal
        plant={activePlant}
        initialGrowthStage={activePlant ? (cardGrowthStages[activePlant.id] || activeGrowthStage) : 'mature'}
        onClose={() => setSelectedPlantId(null)}
      />
      {showJourneyModal && <InvestigationJourneyModal onClose={() => setShowJourneyModal(false)} />}

      {/* Team Case File Lightbox Modal */}
      {showTeamModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setShowTeamModal(false)}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowTeamModal(false)}
              className="absolute -top-10 right-0 text-[#f4efe2] hover:text-white p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={TEAM_IMAGE}
              alt="The Botanical Detectives Team Members Case File"
              className="w-full h-auto rounded-xl border-2 border-[#d4af5a]/60 shadow-[0_0_50px_rgba(212,175,90,0.3)]"
            />
            <div className="text-center font-mono text-xs text-[#d4af5a] mt-3">
              THE BOTANICAL DETECTIVES // CASE FILE TEAM — PRESTIGE INSTITUTE OF ENGINEERING, RESEARCH AND MANAGEMENT, INDORE
            </div>
          </div>
        </div>
      )}

      <header className="site-header sticky top-0 z-40 border-b border-[#e6dcbe]/12 bg-[#080f0c]/90 backdrop-blur-xl">
        <div
          className="case-reading-progress"
          role="progressbar"
          aria-label="Case file reading progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={0}
        >
          <span ref={readingProgressRef} />
        </div>
        <div className="site-header-inner mx-auto flex items-center justify-between gap-4 px-4 sm:px-8">
          <a href="#top" className="site-brand flex items-center gap-2 font-mono text-sm tracking-[0.18em] text-[#d4af5a] uppercase">
            <span className="inline-flex h-2 w-2 shrink-0 rounded-full bg-[#d4af5a]" />
            <span>Digital Herbarium</span>
          </a>

          <nav className="site-nav hidden items-center font-mono uppercase text-[#b9b4a2] md:flex" aria-label="Main navigation">
            <a href="#intro" className="transition hover:text-[#f5efe1]">Case files</a>
            <a href="#project-info" className="transition hover:text-[#f5efe1]">Project</a>
            <a href="#archive" className="transition hover:text-[#f5efe1]">Specimens</a>
            <a href="#board" className="transition hover:text-[#f5efe1]">Evidence</a>
            <a href="#families" className="transition hover:text-[#f5efe1]">Families</a>
            <a href="#team" className="transition hover:text-[#f5efe1]">Field notes</a>
            <a href="#access" className="transition hover:text-[#f5efe1]">Research</a>
          </nav>

          <div className="site-header-actions flex items-center gap-2">
            <div className="archive-status hidden items-center gap-2 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7fc29b]" />
              <span className="font-mono text-[9px] uppercase text-[#d9dfd5]">Archive online</span>
            </div>
            <button
              type="button"
              className="site-mobile-menu-toggle"
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setMobileNavOpen((open) => !open)}
            >
              {mobileNavOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
              <span>{mobileNavOpen ? 'Close' : 'Menu'}</span>
            </button>
            <button
              onClick={() => setShowSplash(true)}
              className="site-intro-button inline-flex items-center gap-1.5 rounded-full border border-[#e6dcbe]/15 bg-white/5 px-3 py-1.5 text-[9px] font-mono uppercase tracking-[0.18em] text-[#dfe7d9] transition hover:border-[#d4af5a]/50 hover:text-[#f7e7b8]"
              title="Replay investigation intro"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Intro</span>
            </button>
          </div>
        </div>
        {mobileNavOpen && (
          <nav id="mobile-navigation" className="site-mobile-nav" aria-label="Mobile navigation">
            {[
              ['Case files', '#intro'],
              ['Project info', '#project-info'],
              ['Specimens', '#archive'],
              ['Evidence board', '#board'],
              ['Plant families', '#families'],
              ['Field notes', '#team'],
              ['Research', '#access'],
            ].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMobileNavOpen(false)}>{label}</a>
            ))}
          </nav>
        )}
      </header>

      <div className="crime-tape-banner" aria-hidden="true">
        <div>
          <span>POLICE LINE — DO NOT CROSS — BOTANICAL EVIDENCE —</span>
          <span>POLICE LINE — DO NOT CROSS — BOTANICAL EVIDENCE —</span>
          <span>POLICE LINE — DO NOT CROSS — BOTANICAL EVIDENCE —</span>
          <span>POLICE LINE — DO NOT CROSS — BOTANICAL EVIDENCE —</span>
        </div>
      </div>

      <section ref={heroRef} id="top" className="relative overflow-hidden px-4 pb-16 pt-12 sm:px-8 lg:pt-20">
        <div className="investigation-grid" aria-hidden="true" />
        <div className="crime-scene-glow" aria-hidden="true" />
        <div className="absolute inset-0 opacity-60">
          <div className="float-dust" style={{ left: '12%', top: '20%', animationDelay: '0s' }} />
          <div className="float-dust" style={{ left: '32%', top: '26%', animationDelay: '1.5s' }} />
          <div className="float-dust" style={{ left: '58%', top: '18%', animationDelay: '3s' }} />
          <div className="float-dust" style={{ left: '74%', top: '30%', animationDelay: '2s' }} />
          <div className="float-dust" style={{ left: '86%', top: '44%', animationDelay: '4.5s' }} />
        </div>

        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#d4af5a]">Case Series // Herbarium-2026</div>
            <div className="detective-stamp" aria-label="Botanical Detective Unit, field team">
              <svg viewBox="0 0 42 42" aria-hidden="true">
                <path d="M8 15h20l-3-6H12zM11 16c0 9 3 14 9 14s9-5 9-14M20 30v4" />
                <circle cx="29" cy="28" r="7" />
                <path d="m34 33 5 5" />
              </svg>
              <span>Botanical Detective Unit <i>// Field team</i></span>
            </div>
            <div className="space-y-4">
              <h1 className="font-serif text-5xl leading-[0.9] tracking-[-0.05em] text-[#f1ead5] sm:text-6xl lg:text-7xl">
                BOTANICAL
                <span className="block text-[#d4af5a]">CASE FILES</span>
              </h1>
              <p className="max-w-xl font-mono text-[11px] uppercase tracking-[0.28em] text-[#9ac5a5]">
                A field archive documenting the morphology, identity, habitat and significance of plant specimens.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-3">
              <a
                href="#archive"
                className="rounded-full border border-[#d4af5a]/60 bg-gradient-to-r from-[#1d4d35] to-[#2b6a49] px-6 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[#f5efe1] shadow-[0_12px_28px_rgba(31,92,62,0.45)] transition hover:-translate-y-0.5"
              >
                Begin Investigation
              </a>
              <a
                href="#board"
                className="rounded-full border border-[#e6dcbe]/20 bg-[#0b1712]/80 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[#f5efe1] transition hover:border-[#d4af5a]/50"
              >
                Open Evidence Board
              </a>
              <button
                type="button"
                className="hero-experience-button"
                onClick={() => setShowJourneyModal(true)}
                aria-haspopup="dialog"
                aria-expanded={showJourneyModal}
                aria-controls="journey-modal-dialog"
              >
                <span>Our Experience</span>
                <ArrowRight aria-hidden="true" />
              </button>
            </div>

            <div className="grid max-w-lg grid-cols-3 gap-3 pt-4 text-left text-[#dfe8d9]">
              <div className="rounded-2xl border border-[#e6dcbe]/12 bg-[#0d1814]/70 p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#d4af5a]">Status</div>
                <div className="mt-2 font-serif text-xl text-[#f8f3e7]">Active</div>
              </div>
              <div className="rounded-2xl border border-[#e6dcbe]/12 bg-[#0d1814]/70 p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#d4af5a]">Cases</div>
                <div className="mt-2 font-serif text-xl text-[#f8f3e7]">18</div>
              </div>
              <div className="rounded-2xl border border-[#e6dcbe]/12 bg-[#0d1814]/70 p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#d4af5a]">Archive</div>
                <div className="mt-2 font-serif text-xl text-[#f8f3e7]">Verified</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => openRandomSpecimen(PLANTS)}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#d4af5a]/30 bg-[#0d1814]/50 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[#d9c477] transition hover:border-[#d4af5a]/70 hover:bg-[#0d1814] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af5a]"
            >
              <Shuffle size={14} aria-hidden="true" />
              Open a random specimen
            </button>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="specimen-ambient" aria-hidden="true" />
            <div
              ref={pcardRef}
              className="specimen-card glass"
              onClick={() => setShowTeamModal(true)}
              onMouseMove={(event) => {
                const rect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width) * 100;
                const y = ((event.clientY - rect.top) / rect.height) * 100;
                setLensPosition({ x, y, visible: true });
              }}
              onMouseLeave={() => setLensPosition((prev) => ({ ...prev, visible: false }))}
              title="Inspect specimen evidence"
            >
              <div className="specimen-header">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#d4af5a]">Evidence 01 // Project team</div>
                  <div className="mt-2 font-serif text-2xl text-[#f5efe0]">The Botanical Detectives</div>
                </div>
                <span className="status-badge">Team record</span>
              </div>

              <div
                ref={specimenRef}
                className="specimen-image-wrap"
                onMouseMove={(event) => {
                  const rect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
                  const x = ((event.clientX - rect.left) / rect.width) * 100;
                  const y = ((event.clientY - rect.top) / rect.height) * 100;
                  setLensPosition({ x, y, visible: true });
                }}
                onMouseLeave={() => setLensPosition((prev) => ({ ...prev, visible: false }))}
              >
                <img src={heroInvestigationPhoto} alt="The Botanical Detectives project team case file" className="specimen-image" />
                <div className="specimen-grid" aria-hidden="true" />
                <div
                  className="magnifier-lens"
                  style={{
                    left: `${lensPosition.x}%`,
                    top: `${lensPosition.y}%`,
                    opacity: lensPosition.visible ? 1 : 0,
                    backgroundImage: `url(${heroInvestigationPhoto})`,
                    backgroundPosition: `${lensPosition.x}% ${lensPosition.y}%`,
                  }}
                />
                <div className="specimen-tooltip" style={{ opacity: lensPosition.visible ? 1 : 0 }}>
                  Vein structure / margin analysis
                </div>
              </div>

              <div className="specimen-meta">
                <div>
                  <div className="meta-label">Botanical Name</div>
                  <div className="meta-value">Impatiens balsamina L.</div>
                </div>
                <div>
                  <div className="meta-label">Family</div>
                  <div className="meta-value">Balsaminaceae</div>
                </div>
                <div>
                  <div className="meta-label">Confidence</div>
                  <div className="meta-value">High</div>
                </div>
                <div>
                  <div className="meta-label">Evidence</div>
                  <div className="meta-value">Field specimen</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 01 // Project Introduction & Stats */}
      <section id="intro" className="py-16 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="lbl">01 // Project introduction</div>
        <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider mt-1 mb-2">
          From field photographs to a structured herbarium
        </h2>
        <p className="text-sm sm:text-base text-[#b9b4a2] max-w-3xl mb-8">
          This project converts photographic plant observations, originally compiled in a physical case-file herbarium, into a structured, searchable digital herbarium. Each record carries its identification, morphology, leaf growth stages, habitat, and uses.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 font-mono">
          <div className="glass p-5 rounded-xl">
            <b className="block text-3xl font-bold text-[#d4af5a]">18</b>
            <span className="text-xs text-[#b9b4a2] uppercase mt-1 block">Plant Records</span>
          </div>
          <div className="glass p-5 rounded-xl">
            <b className="block text-3xl font-bold text-[#d4af5a]">18</b>
            <span className="text-xs text-[#b9b4a2] uppercase mt-1 block">Specimen Photos</span>
          </div>
          <div className="glass p-5 rounded-xl">
            <b className="block text-3xl font-bold text-[#d4af5a]">14</b>
            <span className="text-xs text-[#b9b4a2] uppercase mt-1 block">Plant Families</span>
          </div>
          <div className="glass p-5 rounded-xl">
            <b className="block text-3xl font-bold text-[#d4af5a]">2</b>
            <span className="text-xs text-[#b9b4a2] uppercase mt-1 block">Growth Stages</span>
          </div>
        </div>
      </section>

      <ProjectInformation
        isExperienceOpen={showJourneyModal}
        onOpenExperience={() => setShowJourneyModal(true)}
      />

      {/* 02 // The Investigators (Team Roles) */}
      <section id="team" className="py-16 px-4 sm:px-8 max-w-6xl mx-auto border-t border-[#e6dcbe]/10">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)]">
          <div>
            <div className="lbl">02 // The investigators</div>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider mt-1 mb-2">
              Herbarium Research Project
            </h2>
            <p className="text-sm text-[#b9b4a2] mb-6">
              Team roles as printed on the project case file.
            </p>

            {/* Institution Banner */}
            <div className="glass p-5 mb-5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <div>
                <span className="text-[#d4af5a] block uppercase text-[11px]">Institution</span>
                <span className="text-[#f4efe2]">Prestige Institute of Engineering, Research and Management, Indore</span>
              </div>
              <div>
                <span className="text-[#d4af5a] block uppercase text-[11px]">Team Name</span>
                <span className="text-[#f4efe2]">The Botanical Detectives</span>
              </div>
              <div>
                <span className="text-[#d4af5a] block uppercase text-[11px]">Submitted To</span>
                <span className="text-[#f4efe2]">Kirti Mam</span>
              </div>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="glass p-5 rounded-xl">
                <b className="block font-bold text-base font-mono text-[#f4efe2]">TANIYA</b>
                <em className="block text-xs font-mono text-[#d4af5a] uppercase not-italic tracking-wider mt-0.5">Team Lead</em>
                <p className="text-xs text-[#b9b4a2] mt-2 leading-relaxed">
                  Coordinates the team, connects every investigation thread and guides the project from evidence to solution.
                </p>
              </div>

              <div className="glass p-5 rounded-xl">
                <b className="block font-bold text-base font-mono text-[#f4efe2]">RISHIK</b>
                <em className="block text-xs font-mono text-[#d4af5a] uppercase not-italic tracking-wider mt-0.5">Architect Behind the Solution</em>
                <p className="text-xs text-[#b9b4a2] mt-2 leading-relaxed">
                  Turns the team's ideas and investigation findings into practical technology.
                </p>
              </div>

              <div className="glass p-5 rounded-xl">
                <b className="block font-bold text-base font-mono text-[#f4efe2]">SARTHAK</b>
                <em className="block text-xs font-mono text-[#d4af5a] uppercase not-italic tracking-wider mt-0.5">Field Investigation</em>
                <p className="text-xs text-[#b9b4a2] mt-2 leading-relaxed">
                  Handles field observations, plant documentation, locations and real-world evidence collection.
                </p>
              </div>

              <div className="glass p-5 rounded-xl">
                <b className="block font-bold text-base font-mono text-[#f4efe2]">SANKET</b>
                <em className="block text-xs font-mono text-[#d4af5a] uppercase not-italic tracking-wider mt-0.5">Data & Systems</em>
                <p className="text-xs text-[#b9b4a2] mt-2 leading-relaxed">
                  Organizes plant data, digital records and the systems connecting all investigation evidence.
                </p>
              </div>

              <div className="glass p-5 rounded-xl">
                <b className="block font-bold text-base font-mono text-[#f4efe2]">SHRIM</b>
                <em className="block text-xs font-mono text-[#d4af5a] uppercase not-italic tracking-wider mt-0.5">Research & Botany</em>
                <p className="text-xs text-[#b9b4a2] mt-2 leading-relaxed">
                  Researches plant species and connects field observations with reliable botanical knowledge.
                </p>
              </div>

              <div className="glass p-5 rounded-xl">
                <b className="block font-bold text-base font-mono text-[#f4efe2]">SHUBH</b>
                <em className="block text-xs font-mono text-[#d4af5a] uppercase not-italic tracking-wider mt-0.5">Visualization & Presentation</em>
                <p className="text-xs text-[#b9b4a2] mt-2 leading-relaxed">
                  Transforms complex research and findings into clear visuals, presentations and communication.
                </p>
              </div>
            </div>
          </div>
          <TeamEvidenceSlider />
        </div>
      </section>

      {/* 03 // Species Archive (Search, Filters & Growth Stage Toggle) */}
      <section id="archive" className="py-16 px-4 sm:px-8 max-w-6xl mx-auto border-t border-[#e6dcbe]/10">
        <div className="lbl">03 // Species archive</div>
        <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider mt-1 mb-2">
          Species Archive
        </h2>
        <p className="text-sm text-[#b9b4a2] mb-6">
          Search and filter all leaf records. Toggle between <b>Seedling</b> and <b>Mature</b> growth stages on any specimen card or in the modal profile.
        </p>

        {/* Global Growth Stage Switcher & Filters */}
        <div className="glass p-4 rounded-xl mb-6 space-y-3.5">
          {/* Growth Stage Master Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#e6dcbe]/15">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#d4af5a] uppercase font-bold tracking-wider">
                Display Growth Stage:
              </span>
              <span className="text-xs text-[#a2b5a7] hidden sm:inline font-mono">
                (Toggles leaf morphology & juvenile adaptations)
              </span>
            </div>

            <div className="growth-stage-switcher flex items-center gap-1.5 p-1 bg-black/40 rounded-lg border border-[#e6dcbe]/15">
              <button
                onClick={() => {
                  setActiveGrowthStage('seedling');
                  // update all individual card overrides
                  const allSeedling: Record<string, 'seedling' | 'mature'> = {};
                  PLANTS.forEach(p => { allSeedling[p.id] = 'seedling'; });
                  setCardGrowthStages(allSeedling);
                }}
                className={`growth-stage-control px-3 py-1.5 rounded-md text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeGrowthStage === 'seedling'
                    ? 'bg-[#1c4d34] text-[#8fe0ae] border border-[#7fc29b]/40 shadow'
                    : 'text-[#8fa394] hover:text-white'
                }`}
              >
                <Sprout className="w-3.5 h-3.5" />
                <span>Seedling</span>
              </button>

              <button
                onClick={() => {
                  setActiveGrowthStage('mature');
                  const allMature: Record<string, 'seedling' | 'mature'> = {};
                  PLANTS.forEach(p => { allMature[p.id] = 'mature'; });
                  setCardGrowthStages(allMature);
                }}
                className={`growth-stage-control px-3 py-1.5 rounded-md text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeGrowthStage === 'mature'
                    ? 'bg-[#2b593b] text-[#ffd56b] border border-[#d4af5a]/50 shadow'
                    : 'text-[#8fa394] hover:text-white'
                }`}
              >
                <Leaf className="w-3.5 h-3.5" />
                <span>Mature</span>
              </button>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a3b8aa]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leaves by name, scientific genus, family, leaf shape, color, or uses..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#0f1613] border border-[#bd] text-[#f4efe2] placeholder-[#819688] text-sm focus:outline-none focus:border-[#d4af5a] font-mono"
            />
          </div>

          {/* Filters: Family, Color, Shape */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div>
              <label className="block text-[11px] text-[#d4af5a] mb-1 uppercase font-semibold">
                Species Family
              </label>
              <select
                value={selectedFamily}
                onChange={(e) => setSelectedFamily(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0f1613] border border-[#bd] text-[#f4efe2] focus:outline-none focus:border-[#d4af5a] cursor-pointer"
              >
                <option value="">All Families</option>
                {families.map((fam) => (
                  <option key={fam} value={fam}>{fam}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-[#d4af5a] mb-1 uppercase font-semibold">
                Leaf Color
              </label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0f1613] border border-[#bd] text-[#f4efe2] focus:outline-none focus:border-[#d4af5a] cursor-pointer"
              >
                <option value="">All Colors</option>
                {colors.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-[#d4af5a] mb-1 uppercase font-semibold">
                Leaf Shape
              </label>
              <select
                value={selectedShape}
                onChange={(e) => setSelectedShape(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0f1613] border border-[#bd] text-[#f4efe2] focus:outline-none focus:border-[#d4af5a] cursor-pointer"
              >
                <option value="">All Shapes</option>
                {shapes.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Status & Clear Filters */}
          <div className="archive-results-row flex items-center justify-between text-xs font-mono text-[#b9b4a2] pt-1">
            <span>
              {filteredPlants.length} of {PLANTS.length} records matching
            </span>

            <div className="archive-result-actions">
              {(searchQuery || selectedFamily || selectedColor || selectedShape) && (
                <button
                  onClick={resetFilters}
                  className="text-red-300 hover:text-red-200 underline cursor-pointer"
                >
                  Clear filters
                </button>
              )}
              <button
                type="button"
                className="random-specimen-button"
                disabled={filteredPlants.length === 0}
                onClick={() => openRandomSpecimen(filteredPlants)}
              >
                <Shuffle aria-hidden="true" />
                Open random specimen
              </button>
            </div>
          </div>
        </div>

        {/* Specimen Cards Grid with Growth Stage Toggle on Each Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlants.map((p) => {
            const currentStage = cardGrowthStages[p.id] || activeGrowthStage;
            const stageData = currentStage === 'seedling' ? p.seedling : p.mature;
            const imgSrc = PLANT_IMAGES[p.id];
            const imageCredit = PLANT_IMAGE_CREDITS[p.id];

            return (
              <div
                key={p.id}
                onClick={() => setSelectedPlantId(p.id)}
                className="glass rounded-xl overflow-hidden cursor-pointer text-left transition-all duration-200 hover:-translate-y-1 hover:border-[#7fc29b] flex flex-col group"
              >
                {/* Image Section */}
                <div className="aspect-[4/3] bg-[#0c1410] relative overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={imageCredit ? 'Reference photograph of Purple Knight Alternanthera foliage' : p.common}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Record ID Chip */}
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[11px] text-[#d4af5a] font-bold">
                    {p.id}
                  </span>

                  {imageCredit && (
                    <div
                      className="absolute bottom-2 left-2 rounded bg-black/80 px-2 py-1 font-mono text-[9px] text-[#f4efe2]"
                      onClick={(event) => event.stopPropagation()}
                    >
                      Reference photo:{' '}
                      <a href={imageCredit.sourceUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                        {imageCredit.attribution}
                      </a>
                      {' · '}
                      <a href={imageCredit.licenseUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                        {imageCredit.license}
                      </a>
                    </div>
                  )}

                  {/* Individual Growth Stage Switcher on Card */}
                  <button
                    onClick={(e) => toggleCardStage(p.id, e)}
                    className="card-growth-toggle absolute top-2 right-2 px-2 py-1 rounded bg-black/85 hover:bg-black border border-white/20 text-[10px] font-mono flex items-center gap-1 transition-colors cursor-pointer"
                    title="Click to toggle Seedling vs Mature stage for this leaf"
                  >
                    {currentStage === 'seedling' ? (
                      <>
                        <Sprout className="w-3 h-3 text-[#8fe0ae]" />
                        <span className="text-[#8fe0ae] font-bold">🌱 Seedling</span>
                      </>
                    ) : (
                      <>
                        <Leaf className="w-3 h-3 text-[#d4af5a]" />
                        <span className="text-[#d4af5a] font-bold">🌿 Mature</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Card Text & Dynamic Stage Traits */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="text-base font-bold font-serif text-[#f4efe2] group-hover:text-[#d4af5a] transition-colors">
                      {p.common}
                    </h3>
                    <i className="text-xs text-[#7fc29b] block mt-0.5">{p.sci}</i>
                    <small className="block text-[#b9b4a2] mt-1 font-mono text-[11px]">
                      Family: {p.family}
                    </small>
                  </div>

                  {/* Growth Stage Traits for Current Selected Stage */}
                  <div className="p-2 rounded bg-black/30 border border-[#e6dcbe]/10 text-[11px] font-mono space-y-1">
                    <div className="flex justify-between">
                      <span className="text-[#8fe0ae]">Shape ({currentStage}):</span>
                      <span className="text-right text-[#f4efe2] truncate max-w-[130px]">{stageData.leafShape}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8fe0ae]">Color ({currentStage}):</span>
                      <span className="text-right text-[#f4efe2] truncate max-w-[130px]">{stageData.leafColor}</span>
                    </div>
                  </div>

                  {/* Confidence Badge */}
                  <div className="pt-1">
                    <span className={`badge ${
                      p.conf === 'High' ? 'c-High' : p.conf === 'High (genus)' ? 'c-HighG' : p.conf === 'Medium-High' ? 'c-MedH' : 'c-Med'
                    }`}>
                      Confidence: {p.conf}
                    </span>
                    {p.conf.includes('Medium') && (
                      <span className="badge prov ml-1">PROVISIONAL</span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedPlantId(p.id);
                    }}
                    className="leaf-details-button mt-2"
                    aria-label={`Click here to view detailed information about ${p.common}`}
                  >
                    <span>Click here for leaf details</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 04 // Investigation View (Evidence Board) */}
      <section id="board" className="py-16 px-4 sm:px-8 max-w-6xl mx-auto border-t border-[#e6dcbe]/10">
        <div className="lbl">04 // Investigation view</div>
        <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider mt-1 mb-2">
          Evidence Board
        </h2>
        <p className="text-sm text-[#b9b4a2] mb-6">
          Explore the specimen cards and select a photograph to open its plant record.
        </p>

        <EvidenceBoard
          plants={PLANTS}
          onSelectPlant={(id) => setSelectedPlantId(id)}
        />
      </section>

      {/* 05 // Botanical Families Explorer */}
      <section id="families" className="py-10 px-4 sm:px-8 max-w-6xl mx-auto border-t border-[#e6dcbe]/10">
        <div className="lbl">05 // Botanical families</div>
        <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider mt-1 mb-1">
          Family Explorer
        </h2>
        <p className="text-sm text-[#b9b4a2] mb-4">
          Choose a family to filter the archive.
        </p>

        <FamilyExplorer
          plants={PLANTS}
          selectedFamily={selectedFamily}
          onSelectFamily={(fam) => {
            setSelectedFamily(fam);
            const el = document.getElementById('archive');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </section>

      {/* 06 // Identification Confidence Guide */}
      <section id="confidence" className="py-16 px-4 sm:px-8 max-w-6xl mx-auto border-t border-[#e6dcbe]/10">
        <div className="lbl">06 // Identification confidence</div>
        <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider mt-1 mb-2">
          How to read confidence
        </h2>
        <p className="text-sm text-[#b9b4a2] mb-6">
          Confidence expresses how strongly the photographic evidence supports the identification. It is not a guarantee of species.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="glass p-5 rounded-xl">
            <span className="badge c-High mb-2">High</span>
            <p className="text-xs text-[#b9b4a2] leading-relaxed">Visible features strongly support the identification.</p>
          </div>
          <div className="glass p-5 rounded-xl">
            <span className="badge c-HighG mb-2">High (genus)</span>
            <p className="text-xs text-[#b9b4a2] leading-relaxed">The genus is clear; the species is not determined from the photograph.</p>
          </div>
          <div className="glass p-5 rounded-xl">
            <span className="badge c-MedH mb-2">Medium-High</span>
            <p className="text-xs text-[#b9b4a2] leading-relaxed">Features fit well, but the exact species is provisional.</p>
          </div>
          <div className="glass p-5 rounded-xl">
            <span className="badge c-Med mb-2">Medium</span>
            <p className="text-xs text-[#b9b4a2] leading-relaxed">Features are consistent, but similar species or cultivars could look alike.</p>
          </div>
        </div>

        <p className="mt-4 text-xs font-mono text-[#b9b4a2]">
          <span className="badge prov mr-2">PROVISIONAL IDENTIFICATION</span>
          marks records labelled “probable”. They should be verified with further photographs or authoritative references.
        </p>
      </section>

      {/* 07 // Project Methodology */}
      <section id="method" className="py-16 px-4 sm:px-8 max-w-6xl mx-auto border-t border-[#e6dcbe]/10">
        <div className="methodology-heading">
          <div>
            <div className="lbl">07 // Field to archive</div>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider mt-1">
              Project Methodology
            </h2>
          </div>
          <p>One clear path from observing plants in the field to sharing their records online.</p>
        </div>

        <div className="methodology-steps">
          <article className="methodology-step">
            <div className="methodology-step-top">
              <span className="methodology-step-number">01</span>
              <span className="methodology-step-icon"><Camera aria-hidden="true" /></span>
            </div>
            <span className="methodology-step-kicker">In the field</span>
            <h3>Observe &amp; Photograph</h3>
            <p>Visit garden and nursery sites, photograph plant specimens, and note visible field details.</p>
          </article>

          <article className="methodology-step">
            <div className="methodology-step-top">
              <span className="methodology-step-number">02</span>
              <span className="methodology-step-icon"><Search aria-hidden="true" /></span>
            </div>
            <span className="methodology-step-kicker">Examine</span>
            <h3>Identify Features</h3>
            <p>Compare visible leaf shape, arrangement, color and venation for preliminary identification.</p>
          </article>

          <article className="methodology-step">
            <div className="methodology-step-top">
              <span className="methodology-step-number">03</span>
              <span className="methodology-step-icon"><Database aria-hidden="true" /></span>
            </div>
            <span className="methodology-step-kicker">Build the record</span>
            <h3>Organize Findings</h3>
            <p>Structure the observations into specimen records with taxonomy, traits, habitat and uses.</p>
          </article>

          <article className="methodology-step">
            <div className="methodology-step-top">
              <span className="methodology-step-number">04</span>
              <span className="methodology-step-icon"><ExternalLink aria-hidden="true" /></span>
            </div>
            <span className="methodology-step-kicker">Share &amp; explore</span>
            <h3>Publish the Archive</h3>
            <p>Present the records in an interactive digital herbarium for people to search and explore.</p>
          </article>
        </div>

        <div className="methodology-note">
          <Sprout aria-hidden="true" />
          <p><b>Why make it digital?</b> A searchable archive makes field observations easier to organize, study and share, while the physical case file remains the original record.</p>
        </div>
      </section>

      {/* 08 // What Makes Our Herbarium Different */}
      <section id="what-makes-us-different" className="herbarium-difference-section">
        <div className="herbarium-difference-inner">
          <div className="herbarium-difference-heading">
            <div>
              <div className="lbl">08 // Case distinction</div>
              <h2>What Makes Our Herbarium Different?</h2>
            </div>
            <p>Five clues that make our case different.</p>
          </div>

          <div className="herbarium-difference-board">
            {[
              {
                number: '01',
                title: 'Beyond the Ordinary',
                description: 'Not just flowers & designs — we turned our Herbarium into an investigation experience.',
                icon: <Search aria-hidden="true" />,
                note: 'CASE NOTE // 01',
              },
              {
                number: '02',
                title: 'One Case File',
                description: 'Photos, videos, research, visits & website — everything is properly organised through one QR-linked Drive.',
                icon: <Database aria-hidden="true" />,
                note: 'ARCHIVE // CONNECTED',
              },
              {
                number: '03',
                title: 'Real-World Investigation',
                description: 'Garden visits, nursery exploration & on-ground learning took our project beyond the classroom.',
                icon: <Camera aria-hidden="true" />,
                note: 'FIELD RECORD // 03',
              },
              {
                number: '04',
                title: 'Science Meets Storytelling',
                description: 'Botanical knowledge meets a crime-investigation narrative to make learning more engaging.',
                icon: <Leaf aria-hidden="true" />,
                note: 'OBSERVATION // 04',
              },
              {
                number: '05',
                title: 'Every Plant Is a Clue',
                description: 'Geo-tagged field photos help document each plant and its location as clues in our journey of discovery.',
                icon: <Sprout aria-hidden="true" />,
                note: 'FINAL CLUE // 05',
              },
            ].map((item) => (
              <article className="herbarium-difference-card" key={item.number}>
                <div className="herbarium-difference-card-top">
                  <span className="herbarium-difference-number">EVIDENCE {item.number}</span>
                  <span className="herbarium-difference-icon">{item.icon}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="herbarium-difference-card-note">
                  <span>{item.note}</span>
                  <span className="herbarium-difference-stamp">PINNED</span>
                </div>
              </article>
            ))}

            <blockquote className="herbarium-difference-quote">
              <span>FINAL NOTE // CASE 08</span>
              <strong>We didn’t just collect plants.<br />We investigated them.</strong>
            </blockquote>
          </div>
        </div>
      </section>

      {/* 09 // Digital Access & Recovered Vector QR Code */}
      <section id="access" className="py-16 px-4 sm:px-8 max-w-6xl mx-auto border-t border-[#e6dcbe]/10">
        <div className="glass p-8 sm:p-12 rounded-2xl border border-[#d4af5a]/40 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-3">
            <div className="lbl">09 // Digital access</div>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-[#f4efe2]">
              Continue the Investigation
            </h2>
            <p className="text-sm text-[#b9b4a2] max-w-xl">
              Scan the QR code to access the complete project archive and additional plant information on Google Drive.
            </p>
            <a
              href={PROJECT_ARCHIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="archive-link-button mt-2 inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border border-[#d4af5a]/55 bg-gradient-to-r from-[#2f7d54] to-[#1c4d34] px-6 py-3 text-xs font-mono font-bold tracking-widest text-white shadow-lg transition hover:-translate-y-0.5 hover:border-[#f0d785] hover:from-[#3a9967] hover:to-[#256846] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e3c56b]"
              aria-label="Open the Digital Herbarium Google Drive archive in a new tab"
            >
              <span>Open Digital Archive</span>
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
            </a>
            <p className="archive-link-hint">
              <MousePointer2 aria-hidden="true" />
              <span>Tap here to open the project archive</span>
            </p>
          </div>

          {/* Supplied project archive QR code */}
          <div className="md:col-span-4 flex justify-center">
            <ProjectDriveQR className="project-drive-qr-access" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-[#e6dcbe]/15 text-center text-xs font-mono text-[#b9b4a2] space-y-2">
        <p className="max-w-2xl mx-auto">
          Plant identifications in this catalogue are based on the submitted photographic observations. Records marked probable/provisional should be verified with additional photographs or authoritative botanical references.
        </p>
        <p className="text-[#d4af5a]">
          Digital Herbarium Project — 2026 · Prestige Institute of Engineering, Research and Management, Indore
        </p>
      </footer>
    </div>
  );
}
