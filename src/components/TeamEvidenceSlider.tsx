import React, { useEffect, useState } from 'react';
import { UserRound } from 'lucide-react';
import taniyaImage from '../assets/images/taniya-investigator.png';
import rishikImage from '../assets/images/rishik-investigator.png';
import sarthakImage from '../assets/images/sarthak-investigator.png';
import sanketImage from '../assets/images/sanket-investigator.png';
import shrimImage from '../assets/images/shrim-investigator.png';
import shubhImage from '../assets/images/shubh-investigator.png';

const teamMembers = [
  { name: 'TANIYA', image: taniyaImage, role: 'Team Lead', imagePosition: 'center 18%' },
  { name: 'RISHIK', image: rishikImage, role: 'Architect Behind the Solution', imagePosition: 'center' },
  { name: 'SARTHAK', image: sarthakImage, role: 'Field Investigation', imagePosition: 'center' },
  { name: 'SANKET', image: sanketImage, role: 'Data & Systems', imagePosition: 'center' },
  { name: 'SHRIM', image: shrimImage, role: 'Research & Botany', imagePosition: 'center' },
  { name: 'SHUBH', image: shubhImage, role: 'Visualization & Presentation', imagePosition: 'center' },
];

export const TeamEvidenceSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  const [reducedMotion, setReducedMotion] = useState(false);
  const activeMember = teamMembers[activeIndex];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);

    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % teamMembers.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [activeIndex, reducedMotion]);

  return (
    <aside
      className="team-evidence-card"
      aria-label="Automatically rotating investigator photographs"
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#e3c56b]">
          Evidence Photo #{String(activeIndex + 1).padStart(2, '0')}
        </span>
        <span className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[#afd7b9]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#7fc29b]" />
          Case File // Team
        </span>
      </div>

      <div className="team-evidence-photo">
        {teamMembers.map((member, index) => (
          <div
            key={member.name}
            className={`team-evidence-slide ${index === activeIndex ? 'is-active' : ''}`}
            aria-hidden={index !== activeIndex}
          >
            {failedImages[index] ? (
              <div className="team-evidence-placeholder">
                <UserRound aria-hidden="true" className="h-14 w-14 text-[#7fc29b]/70" />
                <span>Photograph unavailable</span>
              </div>
            ) : (
              <img
                src={member.image}
                alt={`Team member - ${member.name}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                style={{ objectPosition: member.imagePosition }}
                onError={() => setFailedImages((previous) => ({ ...previous, [index]: true }))}
              />
            )}
          </div>
        ))}

      </div>

      <div className="team-evidence-caption" aria-live="polite">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#e3c56b]">
            Investigator
          </span>
          <h3 className="mt-1 font-mono text-xl font-bold tracking-[0.12em] text-[#f5f3f3]">
            {activeMember.name}
          </h3>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#d6dfd7]">
            Role: {activeMember.role}
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#afd7b9]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#7fc29b]" />
          Active
        </span>
      </div>

      <div className="team-evidence-indicators" role="group" aria-label="Choose investigator photo">
        {teamMembers.map((member, index) => (
          <button
            key={member.name}
            type="button"
            className={`team-evidence-dot ${index === activeIndex ? 'is-active' : ''}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${member.name}`}
            aria-current={index === activeIndex ? 'true' : undefined}
          />
        ))}
      </div>
    </aside>
  );
};
