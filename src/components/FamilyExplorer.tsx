import React from 'react';
import { PlantRecord } from '../data/plants';

interface FamilyExplorerProps {
  plants: PlantRecord[];
  onSelectFamily: (family: string) => void;
  selectedFamily: string;
}

export const FamilyExplorer: React.FC<FamilyExplorerProps> = ({
  plants,
  onSelectFamily,
  selectedFamily,
}) => {
  const familyMap: Record<string, PlantRecord[]> = {};
  plants.forEach((p) => {
    if (!familyMap[p.family]) familyMap[p.family] = [];
    familyMap[p.family].push(p);
  });

  const sortedFamilies = Object.keys(familyMap).sort(
    (a, b) => familyMap[b].length - familyMap[a].length || a.localeCompare(b)
  );

  return (
    <div className="family-explorer-grid">
      {sortedFamilies.map((fam) => {
        const count = familyMap[fam].length;
        const isSelected = selectedFamily === fam;
        const specimenNames = familyMap[fam].map((plant) => plant.common.split(' / ')[0]);

        return (
          <button
            key={fam}
            onClick={() => onSelectFamily(isSelected ? '' : fam)}
            aria-pressed={isSelected}
            className={`family-explorer-card${isSelected ? ' is-selected' : ''}`}
          >
            <span className="family-explorer-card-top">
              <span className="family-explorer-name">{fam}</span>
              <span className="family-explorer-count">{count}</span>
            </span>
            <span className="family-explorer-specimens" aria-label={`Specimens: ${specimenNames.join(', ')}`}>
              {specimenNames.map((name) => <span key={name}>{name}</span>)}
            </span>
          </button>
        );
      })}
    </div>
  );
};
