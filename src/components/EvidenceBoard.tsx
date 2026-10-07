import React from 'react';
import { PlantRecord } from '../data/plants';
import { PLANT_IMAGES } from '../data/plantImages';
import locationPlantOne from '../assets/images/location-stamped-plant-01.jpg';
import locationPlantTwo from '../assets/images/location-stamped-plant-02.jpg';

interface EvidenceBoardProps {
  plants: PlantRecord[];
  onSelectPlant: (id: string) => void;
}

const BOARD_WIDTH = 1200;
const BOARD_HEIGHT = 690;
const COLUMNS = 6;

export const EvidenceBoard: React.FC<EvidenceBoardProps> = ({ plants, onSelectPlant }) => {
  const hub = { x: BOARD_WIDTH / 2, y: BOARD_HEIGHT / 2 };

  return (
    <div className="crime-evidence-board">
      <div className="evidence-board-heading">
        <span>ACTIVE CASE // BOTANICAL EVIDENCE NETWORK</span>
        <span className="evidence-classification">TOP SECRET // FIELD FILE</span>
        <span>{String(plants.length).padStart(2, '0')} RECORDS • THREADS CONNECT FAMILIES</span>
      </div>

      <div className="evidence-board-scroll">
        <div className="evidence-corkboard" role="group" aria-label="Botanical investigation chart">
          <div className="board-corner-note board-note-one" aria-hidden="true">#01<br /><small>FIELD LOG</small></div>

          <svg
            className="evidence-threads"
            viewBox={`0 0 ${BOARD_WIDTH} ${BOARD_HEIGHT}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {plants.map((plant, index) => {
              const column = index % COLUMNS;
              const row = Math.floor(index / COLUMNS);
              const x = ((column + 0.5) / COLUMNS) * BOARD_WIDTH;
              const y = ((row + 0.5) / 3) * BOARD_HEIGHT;
              const rotation = ((index * 37) % 17) - 8;

              return (
                <g key={`thread-${plant.id}`}>
                  <path
                    d={`M ${hub.x} ${hub.y} L ${x} ${y}`}
                    className="thread-line"
                    style={{ animationDelay: `${index * -0.25}s` }}
                  />
                  <circle cx={x} cy={y} r="4" className="thread-pin" />
                  <text
                    x={x + 18}
                    y={y - 38}
                    className="thread-marker"
                    transform={`rotate(${rotation} ${x + 18} ${y - 38})`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="evidence-photo-grid">
            {plants.map((plant, index) => (
              <button
                key={plant.id}
                type="button"
                className="evidence-photo-card"
                style={{
                  ['--card-turn' as string]: `${((index * 13) % 9) - 4}deg`,
                  ['--card-delay' as string]: `${index * 0.08}s`,
                }}
                onClick={() => onSelectPlant(plant.id)}
                aria-label={`Open evidence record ${plant.id}: ${plant.common}`}
              >
                <span className="evidence-photo-pin" aria-hidden="true" />
                <span className="evidence-photo-number">{plant.id}</span>
                <img src={PLANT_IMAGES[plant.id]} alt="" loading="lazy" />
                <span className="evidence-photo-caption">
                  <b>{plant.common.split(' / ')[0]}</b>
                  <small>{plant.family}</small>
                  <small className={`evidence-confidence${plant.conf === 'Medium' ? ' is-provisional' : ''}`}>
                    {plant.conf === 'Medium' ? 'Provisional ID' : `${plant.conf} confidence`}
                  </small>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="evidence-field-records">
        <div className="evidence-field-heading">
          <span>Field photographs</span>
          <span>Location details visible in original images</span>
        </div>
        <div className="evidence-field-grid">
          <figure className="evidence-field-photo">
            <img src={locationPlantOne} alt="Variegated Ficus photographed with visible location details" loading="lazy" />
            <figcaption>
              <span>FIELD PHOTO 01</span>
              <b>Variegated Ficus</b>
              <small>Location-stamped field record</small>
            </figcaption>
          </figure>
          <figure className="evidence-field-photo">
            <img src={locationPlantTwo} alt="Gold Dust Croton foliage photographed with visible location details" loading="lazy" />
            <figcaption>
              <span>FIELD PHOTO 02</span>
              <b>Gold Dust Croton</b>
              <small>Location-stamped field record</small>
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="evidence-board-legend">
        <span><i className="legend-pin legend-verified" /> High confidence</span>
        <span><i className="legend-pin legend-provisional" /> Provisional ID</span>
        <span><i className="legend-thread" /> Archive connection</span>
        <span className="evidence-board-hint">Select a pinned photo to open its case file</span>
      </div>
    </div>
  );
};
