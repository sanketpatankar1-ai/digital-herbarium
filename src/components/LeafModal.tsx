import React, { useEffect, useState } from 'react';
import { PlantRecord } from '../data/plants';
import { PLANT_IMAGE_CREDITS, PLANT_IMAGES } from '../data/plantImages';
import { X, Download, Printer, BookOpen, ExternalLink, Layers, Sparkles, Sprout, Leaf } from 'lucide-react';

interface LeafModalProps {
  plant: PlantRecord | null;
  onClose: () => void;
  initialGrowthStage?: 'seedling' | 'mature';
}

export const LeafModal: React.FC<LeafModalProps> = ({
  plant,
  onClose,
  initialGrowthStage = 'mature',
}) => {
  const [activeTab, setActiveTab] = useState<'morphology' | 'botany' | 'uses' | 'growth'>('growth');
  const [growthStage, setGrowthStage] = useState<'seedling' | 'mature'>(initialGrowthStage);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
    setGrowthStage(initialGrowthStage);
    if (plant) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [plant, initialGrowthStage, onClose]);

  if (!plant) return null;

  const imgSrc = PLANT_IMAGES[plant.id];
  const imageCredit = PLANT_IMAGE_CREDITS[plant.id];
  const stageData = growthStage === 'seedling' ? plant.seedling : plant.mature;
  const wikipediaSearch = new URL('https://en.wikipedia.org/w/index.php');
  wikipediaSearch.searchParams.set(
    'search',
    `${plant.common} ${plant.sci.replace(/\s*\([^)]*\)/g, '')}`
  );

  // Download printable botanical factsheet
  const handleDownloadResource = () => {
    const factsheetHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${plant.id} - ${plant.common} (${plant.sci}) | Botanical Educational Resource</title>
  <style>
    body { font-family: 'Times New Roman', Georgia, serif; line-height: 1.6; color: #1a241e; background: #faf8f3; margin: 40px auto; max-width: 800px; padding: 25px; }
    .header { border-bottom: 3px double #2f7d54; padding-bottom: 15px; margin-bottom: 25px; }
    .title { font-size: 28px; margin: 0 0 5px; color: #133a22; }
    .sci { font-size: 20px; font-style: italic; color: #2f7d54; margin: 0 0 10px; }
    .meta-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; background: #eef5f0; padding: 15px; border-radius: 8px; margin-bottom: 20px; font-size: 14px; }
    .meta-item b { color: #1c4d34; font-family: monospace; text-transform: uppercase; font-size: 12px; display: block; }
    .growth-box { background: #fdfbf7; border: 2px solid #d4af5a; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
    .section { margin-bottom: 20px; border-left: 3px solid #7fc29b; padding-left: 15px; }
    .section h3 { margin: 0 0 8px; font-family: monospace; color: #b8860b; text-transform: uppercase; font-size: 14px; letter-spacing: 0.1em; }
    .footer { margin-top: 40px; padding-top: 15px; border-top: 1px solid #c2d6c9; font-size: 12px; color: #687e70; text-align: center; font-family: monospace; }
    @media print { body { background: white; margin: 0; padding: 0; } }
  </style>
</head>
<body>
  <div class="header">
    <div style="font-family: monospace; font-size: 12px; color: #b8860b; letter-spacing: 0.2em; text-transform: uppercase;">HERBARIUM EDUCATIONAL RESOURCE // SPECIMEN ${plant.id}</div>
    <h1 class="title">${plant.common} ${plant.vernacular ? `(${plant.vernacular})` : ''}</h1>
    <div class="sci">${plant.sci}</div>
    <div style="font-size: 14px; color: #405548;">Family: <b>${plant.family}</b> · Specimen Type: <b>${plant.type}</b></div>
  </div>

  <div class="growth-box">
    <h3 style="margin-top:0; color:#856404; font-family: monospace; text-transform: uppercase;">Growth Stage Morphogenesis Comparison</h3>
    <p><b>🌱 Seedling / Juvenile Stage:</b> ${plant.seedling.description}</p>
    <p><i>Adaptive Function:</i> ${plant.seedling.adaptiveNote}</p>
    <hr style="border:0; border-top:1px dashed #d4af5a; margin: 10px 0;">
    <p><b>🌿 Mature Specimen Stage:</b> ${plant.mature.description}</p>
    <p><i>Adaptive Function:</i> ${plant.mature.adaptiveNote}</p>
  </div>

  <div class="meta-grid">
    <div class="meta-item"><b>Leaf Shape</b>${plant.leafShape}</div>
    <div class="meta-item"><b>Leaf Coloration</b>${plant.leafColor}</div>
    <div class="meta-item"><b>Leaf Margin</b>${plant.leafMargin}</div>
    <div class="meta-item"><b>Venation Pattern</b>${plant.leafVenation}</div>
    <div class="meta-item"><b>Phyllotaxy</b>${plant.leafArrangement}</div>
    <div class="meta-item"><b>Leaf Texture</b>${plant.leafTexture}</div>
  </div>

  <div class="section">
    <h3>Botanical Foliage Diagnostics</h3>
    <p>${plant.desc}</p>
  </div>

  <div class="section">
    <h3>Ecological Niche & Habitat</h3>
    <p>${plant.habitat}</p>
  </div>

  <div class="section">
    <h3>Medicinal & Economic Significance</h3>
    <p>${plant.uses}</p>
  </div>

  <div class="section">
    <h3>Botanical Detective Clue & Trivia</h3>
    <p>${plant.trivia}</p>
  </div>

  <div class="footer">
    The Botanical Detectives · Prestige Institute of Engineering, Research and Management, Indore (2026)<br>
    Educational Resource for Botany & Field Biology Studies
  </div>
</body>
</html>`;

    const blob = new Blob([factsheetHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${plant.id}_${plant.common.replace(/[^a-z0-9]/gi, '_')}_Educational_Resource.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-[#040906]/92 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-4xl my-auto bg-[#0b160f]/95 border border-[#e6dcbe]/20 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_50px_rgba(212,175,90,0.14)] text-[#f4efe2] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e6dcbe]/15 bg-[#0e2417]/90">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#d4af5a]/20 border border-[#d4af5a]/40 text-[#d4af5a] font-mono text-xs font-bold tracking-wider">
              {plant.id}
            </span>
            <span className="text-xs font-mono text-[#9fc9ad] uppercase tracking-widest hidden sm:inline">
              Foliage Investigation & Growth Profile
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadResource}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1c4d34] hover:bg-[#256645] border border-[#7fc29b]/40 text-xs font-mono text-[#f4efe2] transition-colors cursor-pointer"
              title="Download printable educational botanical factsheet"
            >
              <Download className="w-3.5 h-3.5 text-[#d4af5a]" />
              <span className="hidden md:inline">Download Factsheet</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#b9b4a2] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 max-h-[82vh] overflow-y-auto space-y-6">
          {/* Top Hero: Leaf Image + Primary Taxa Lockup */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Specimen Photograph */}
            <div className="md:col-span-6 relative rounded-xl overflow-hidden border border-[#e6dcbe]/20 bg-[#061009] aspect-[4/3] group shadow-inner">
              {imgSrc && !imageError ? (
                <img
                  src={imgSrc}
                  alt={imageCredit ? 'Reference photograph of Purple Knight Alternanthera foliage' : `Botanical leaf photograph of ${plant.common}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#123120] to-[#07150c]">
                  <Leaf className="w-16 h-16 text-[#7fc29b] mb-2 stroke-[1.5]" />
                  <span className="text-xs font-mono text-[#9fc9ad] tracking-widest">
                    BOTANICAL SPECIMEN {plant.id}
                  </span>
                </div>
              )}

              {/* Dynamic Growth Stage Overlay Badge on Photo */}
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-sm border border-[#d4af5a]/40 text-[11px] font-mono flex items-center gap-1.5">
                {growthStage === 'seedling' ? (
                  <>
                    <Sprout className="w-3.5 h-3.5 text-[#8fe0ae]" />
                    <span className="text-[#8fe0ae] font-bold">Seedling / Juvenile Form</span>
                  </>
                ) : (
                  <>
                    <Leaf className="w-3.5 h-3.5 text-[#d4af5a]" />
                    <span className="text-[#d4af5a] font-bold">Mature Specimen Form</span>
                  </>
                )}
              </div>

              {/* Current Stage Traits Chip */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between p-2 rounded-lg bg-[#050e08]/90 backdrop-blur-sm border border-white/10 text-xs font-mono">
                <span className="text-[#d4af5a] font-semibold">{stageData.leafShape}</span>
                <span className="text-[#a8c9b3]">{stageData.leafColor}</span>
              </div>

              {imageCredit && (
                <div className="absolute bottom-[3.75rem] left-2.5 rounded bg-black/80 px-2 py-1 font-mono text-[9px] text-[#f4efe2]">
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
            </div>

            {/* Botanical Taxonomy & Growth Toggle */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="text-xs font-mono tracking-[0.2em] text-[#d4af5a] uppercase font-semibold">
                  Family: {plant.family}
                </div>
                <h2 id="modal-title" className="text-2xl sm:text-3xl font-serif text-[#f4efe2] mt-1 leading-tight">
                  {plant.common}
                </h2>
                {plant.vernacular && (
                  <div className="text-sm text-[#d4af5a]/90 font-serif italic mt-0.5">
                    Vernacular: {plant.vernacular}
                  </div>
                )}
                <div className="text-base text-[#7fc29b] italic mt-1 font-serif">
                  {plant.sci}
                </div>
                <a
                  href={wikipediaSearch.toString()}
                  target="_blank"
                  rel="noreferrer"
                  className="wikipedia-research-link mt-3"
                >
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  Wikipedia link
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>

              {/* INTERACTIVE GROWTH STAGE TOGGLE */}
              <div className="p-3 rounded-xl bg-[#091d12] border border-[#235334] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#d4af5a] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Interactive Growth Stage
                  </span>
                  <span className="text-[10px] font-mono text-[#a2b5a7]">Toggle morphology</span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#040e08] rounded-lg border border-[#e6dcbe]/10">
                  <button
                    onClick={() => setGrowthStage('seedling')}
                    className={`py-2 px-3 rounded-md text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      growthStage === 'seedling'
                        ? 'bg-[#1c4d34] text-[#8fe0ae] border border-[#7fc29b]/40 shadow'
                        : 'text-[#8fa394] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Sprout className="w-3.5 h-3.5" />
                    <span>🌱 Seedling</span>
                  </button>

                  <button
                    onClick={() => setGrowthStage('mature')}
                    className={`py-2 px-3 rounded-md text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      growthStage === 'mature'
                        ? 'bg-[#2b593b] text-[#ffd56b] border border-[#d4af5a]/50 shadow'
                        : 'text-[#8fa394] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Leaf className="w-3.5 h-3.5" />
                    <span>🌿 Mature</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Growth Traits Quick Matrix */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-white/[0.03] border border-[#e6dcbe]/10 p-3 rounded-xl">
                <div>
                  <span className="text-[#b9b4a2] block text-[10px] uppercase tracking-wider">Blade Geometry</span>
                  <span className="text-[#f4efe2] font-semibold">{stageData.leafShape}</span>
                </div>
                <div>
                  <span className="text-[#b9b4a2] block text-[10px] uppercase tracking-wider">Coloration</span>
                  <span className="text-[#f4efe2] font-semibold">{stageData.leafColor}</span>
                </div>
                <div>
                  <span className="text-[#b9b4a2] block text-[10px] uppercase tracking-wider">Margin Structure</span>
                  <span className="text-[#f4efe2] font-semibold">{stageData.leafMargin}</span>
                </div>
                <div>
                  <span className="text-[#b9b4a2] block text-[10px] uppercase tracking-wider">Cuticle Texture</span>
                  <span className="text-[#f4efe2] font-semibold">{stageData.leafTexture}</span>
                </div>
              </div>

              {/* Action Buttons: Educational Resource Download & Print */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                <button
                  onClick={handleDownloadResource}
                  className="flex-1 min-w-[170px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#2f7d54] to-[#1c4d34] hover:from-[#3a9967] hover:to-[#246342] text-xs font-mono font-bold tracking-[0.14em] uppercase text-white shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#d4af5a]" />
                  <span>Download Factsheet</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-[#b9b4a2] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                  title="Print specimen study card"
                >
                  <Printer className="w-3.5 h-3.5 text-[#d4af5a]" />
                  <span>Print</span>
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs for In-Depth Botanical Information */}
          <div className="border-b border-[#e6dcbe]/15 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('growth')}
              className={`pb-2.5 px-3 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                activeTab === 'growth'
                  ? 'border-[#d4af5a] text-[#d4af5a] font-bold'
                  : 'border-transparent text-[#b9b4a2] hover:text-white'
              }`}
            >
              <Sprout className="w-3.5 h-3.5" />
              <span>Growth Stages & Morphogenesis</span>
            </button>

            <button
              onClick={() => setActiveTab('morphology')}
              className={`pb-2.5 px-3 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                activeTab === 'morphology'
                  ? 'border-[#d4af5a] text-[#d4af5a] font-bold'
                  : 'border-transparent text-[#b9b4a2] hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Morphology Details</span>
            </button>

            <button
              onClick={() => setActiveTab('botany')}
              className={`pb-2.5 px-3 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                activeTab === 'botany'
                  ? 'border-[#d4af5a] text-[#d4af5a] font-bold'
                  : 'border-transparent text-[#b9b4a2] hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Habitat & Ecology</span>
            </button>

            <button
              onClick={() => setActiveTab('uses')}
              className={`pb-2.5 px-3 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                activeTab === 'uses'
                  ? 'border-[#d4af5a] text-[#d4af5a] font-bold'
                  : 'border-transparent text-[#b9b4a2] hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Uses & Detective Clues</span>
            </button>
          </div>

          {/* Tab 1: Interactive Growth Stages Morphogenesis Breakdown */}
          {activeTab === 'growth' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0e2417] border border-[#235334]">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-mono uppercase tracking-[0.16em] text-[#d4af5a] font-bold">
                    {growthStage === 'seedling' ? '🌱 Seedling / Juvenile Development' : '🌿 Mature Specimen Architecture'}
                  </h4>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/40 text-[#8fe0ae]">
                    Current View: {growthStage.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-[#ded8cb] font-serif">
                  {stageData.description}
                </p>
                <div className="mt-3 pt-3 border-t border-[#235334] text-xs font-mono text-[#a8c9b3]">
                  <b className="text-[#d4af5a]">Evolutionary Adaptation:</b> {stageData.adaptiveNote}
                </div>
              </div>

              {/* Side-by-Side Comparison Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                <div
                  onClick={() => setGrowthStage('seedling')}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    growthStage === 'seedling'
                      ? 'bg-[#143320] border-[#8fe0ae]'
                      : 'bg-white/[0.02] border-[#e6dcbe]/10 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-[#8fe0ae] mb-1">
                    <Sprout className="w-4 h-4" />
                    <span>Seedling Phase</span>
                  </div>
                  <div className="text-[#ded7c4] font-serif text-xs mb-1">
                    Shape: <b>{plant.seedling.leafShape}</b>
                  </div>
                  <div className="text-[#a1b3a6] text-[11px] line-clamp-2">
                    {plant.seedling.description}
                  </div>
                </div>

                <div
                  onClick={() => setGrowthStage('mature')}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    growthStage === 'mature'
                      ? 'bg-[#1b3d27] border-[#d4af5a]'
                      : 'bg-white/[0.02] border-[#e6dcbe]/10 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-[#d4af5a] mb-1">
                    <Leaf className="w-4 h-4" />
                    <span>Mature Specimen Phase</span>
                  </div>
                  <div className="text-[#ded7c4] font-serif text-xs mb-1">
                    Shape: <b>{plant.mature.leafShape}</b>
                  </div>
                  <div className="text-[#a1b3a6] text-[11px] line-clamp-2">
                    {plant.mature.description}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Morphology & Identification */}
          {activeTab === 'morphology' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-[#e6dcbe]/10">
                <h4 className="text-xs font-mono uppercase tracking-[0.16em] text-[#d4af5a] font-bold mb-2">
                  Diagnostic Leaf Characteristics
                </h4>
                <p className="text-sm leading-relaxed text-[#ded8cb] font-serif">
                  {plant.desc}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-[#0e2417] border border-[#235334]">
                  <span className="text-[#8fe0ae] block font-bold mb-1">Venation Architecture</span>
                  <span className="text-[#f4efe2]">{plant.leafVenation}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#0e2417] border border-[#235334]">
                  <span className="text-[#8fe0ae] block font-bold mb-1">Arrangement (Phyllotaxy)</span>
                  <span className="text-[#f4efe2]">{plant.leafArrangement}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#0e2417] border border-[#235334]">
                  <span className="text-[#8fe0ae] block font-bold mb-1">Margin Definition</span>
                  <span className="text-[#f4efe2]">{plant.leafMargin}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Habitat & Ecology */}
          {activeTab === 'botany' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-[#e6dcbe]/10">
                <h4 className="text-xs font-mono uppercase tracking-[0.16em] text-[#d4af5a] font-bold mb-2">
                  Habitat & Growing Conditions
                </h4>
                <p className="text-sm leading-relaxed text-[#ded8cb] font-serif">
                  {plant.habitat}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0d2215]/80 border border-[#1f4a2e]">
                <h4 className="text-xs font-mono uppercase tracking-[0.16em] text-[#8fe0ae] font-bold mb-1">
                  Taxonomic Classification
                </h4>
                <div className="text-xs font-mono text-[#c5dbcc] space-y-1">
                  <div>Kingdom: <i>Plantae</i> · Phylum: <i>Tracheophyta</i></div>
                  <div>Family: <b>{plant.family}</b> · Scientific: <i>{plant.sci}</i></div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Uses & Botanical Trivia */}
          {activeTab === 'uses' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-[#e6dcbe]/10">
                <h4 className="text-xs font-mono uppercase tracking-[0.16em] text-[#d4af5a] font-bold mb-2">
                  Medicinal, Ecological & Practical Applications
                </h4>
                <p className="text-sm leading-relaxed text-[#ded8cb] font-serif">
                  {plant.uses}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#172c1c]/90 border border-[#d4af5a]/30">
                <h4 className="text-xs font-mono uppercase tracking-[0.16em] text-[#d4af5a] font-bold mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af5a]" />
                  <span>Botanical Detective Clue & Trivia</span>
                </h4>
                <p className="text-xs font-serif italic text-[#f4efe2]/90 leading-relaxed">
                  {plant.trivia}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
