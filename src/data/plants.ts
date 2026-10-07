export interface GrowthStageInfo {
  stage: 'seedling' | 'mature';
  leafShape: string;
  leafColor: string;
  leafMargin: string;
  leafTexture: string;
  description: string;
  adaptiveNote: string;
}

export interface PlantRecord {
  id: string;
  common: string;
  vernacular?: string;
  sci: string;
  family: string;
  conf: 'High' | 'High (genus)' | 'Medium-High' | 'Medium';
  type: string;
  leafShape: string;
  leafColor: string;
  leafMargin: string;
  leafVenation: string;
  leafArrangement: string;
  leafTexture: string;
  desc: string;
  habitat: string;
  uses: string;
  trivia: string;
  seedling: GrowthStageInfo;
  mature: GrowthStageInfo;
}

export const PLANTS: PlantRecord[] = [
  {
    id: "P-001",
    common: "Garden Balsam",
    vernacular: "Gulmehendi / Touch-Me-Not",
    sci: "Impatiens balsamina L.",
    family: "Balsaminaceae",
    conf: "High",
    type: "Annual flowering herb",
    leafShape: "Lanceolate",
    leafColor: "Vibrant Green",
    leafMargin: "Deeply Serrate",
    leafVenation: "Pinnate",
    leafArrangement: "Alternate / Spiral",
    leafTexture: "Papery & Glabrous",
    desc: "Narrowly lanceolate leaves with sharply serrated margins, prominent lighter central midrib, and glandular petiole bases. Translucent green foliage releasing earthy sap when crushed.",
    habitat: "Tropical riverbanks, moist garden soils, and subtropical forest clearings.",
    uses: "Traditional Ayurvedic medicine for burns, natural henna nail staining, and anti-inflammatory poultices.",
    trivia: "The seed pods burst explosively at maturity upon the slightest touch, dispersing seeds up to several meters.",
    seedling: {
      stage: 'seedling',
      leafShape: 'Ovato-orbicular cotyledons, transition to shallow-toothed ovate',
      leafColor: 'Tender Lime Green with translucent petiole',
      leafMargin: 'Sub-entire to sparsely denticulate',
      leafTexture: 'Delicate, membranous, high moisture content',
      description: 'Emerges with twin rounded cotyledons followed by first true leaves that are smaller, broader, and have blunt teeth compared to mature foliage.',
      adaptiveNote: 'Juvenile tender foliage optimizes rapid light harvesting while minimizing initial structural biomass investment.'
    },
    mature: {
      stage: 'mature',
      leafShape: 'Elongated Lanceolate to Oblanceolate (8–15 cm)',
      leafColor: 'Deep Vibrant Forest Green',
      leafMargin: 'Sharply & Uniformly Serrate with gland-tipped teeth',
      leafTexture: 'Crisp, papery, prominently veined',
      description: 'Fully elongated lanceolate blades arranged spirally along thick succulent stems, bearing extrafloral nectaries at petiole base.',
      adaptiveNote: 'Sharply serrated margins increase edge turbulence for enhanced gas exchange during high-humidity monsoons.'
    }
  },
  {
    id: "P-002",
    common: "Purple / Ruby Alternanthera",
    vernacular: "Lal Madranga / Calico Plant",
    sci: "Alternanthera brasiliana (probable)",
    family: "Amaranthaceae",
    conf: "Medium",
    type: "Perennial subshrub",
    leafShape: "Ovate / Elliptic",
    leafColor: "Purple & Ruby",
    leafMargin: "Entire to Slightly Undulate",
    leafVenation: "Pinnate Reticulate",
    leafArrangement: "Opposite Decussate",
    leafTexture: "Velvety & Herbaceous",
    desc: "Vivid reddish-purple to deep burgundy opposite leaves. The petioles and stems share the same intense anthocyanin pigmentation, providing year-round contrast.",
    habitat: "Sunny garden borders, urban landscapes, and tropical ground covers.",
    uses: "High-contrast border bedding, folk herbal infusions for respiratory ailments, and soil stabilization.",
    trivia: "Anthocyanin pigments mask the chlorophyll in bright sunlight, protecting the cellular photosynthetic machinery from UV photodamage.",
    seedling: {
      stage: 'seedling',
      leafShape: 'Small elliptic cotyledons with rounded apex (1–2 cm)',
      leafColor: 'Olive-bronze with magenta underflush',
      leafMargin: 'Entire',
      leafTexture: 'Soft, tender herbaceous',
      description: 'Young sprouts display higher chlorophyll ratio with green-bronze topsides before full purple anthocyanin accumulation.',
      adaptiveNote: 'Initial higher green chlorophyll levels allow maximum early photosynthesis before developing dense protective ruby sunscreens.'
    },
    mature: {
      stage: 'mature',
      leafShape: 'Broadly Elliptic to Oblong-ovate (5–10 cm)',
      leafColor: 'Deep Saturated Ruby-Burgundy',
      leafMargin: 'Distinctly wavy-undulate',
      leafTexture: 'Coriaceous, velvety with prominent violet midvein',
      description: 'Opposite decussate leaves forming dense shrubby mounds with intense wine-red coloration extending through all petioles.',
      adaptiveNote: 'High anthocyanin concentration shields mature foliage under intense full-sun subtropical exposure.'
    }
  },
  {
    id: "P-003",
    common: "Bamboo",
    vernacular: "Bans / Golden Bamboo",
    sci: "Bambusa sp.",
    family: "Poaceae",
    conf: "Medium",
    type: "Arborescent perennial grass",
    leafShape: "Linear / Narrow",
    leafColor: "Emerald Green",
    leafMargin: "Scabrous / Micro-serrate",
    leafVenation: "Parallel",
    leafArrangement: "Alternate Distichous",
    leafTexture: "Silica-sheathed & Tough",
    desc: "Narrow linear-lanceolate leaf blades arising from distinct culm sheaths. Blades feature finely barbed micro-serrations along margins and rigid parallel venation.",
    habitat: "Riverine terraces, moist tropical forests, and cultivated groves.",
    uses: "Structural timber, scaffolding, paper pulp, eco-friendly textiles, windbreaks, and erosion control.",
    trivia: "Bamboo leaves contain microscopic silica phytoliths that wear down the teeth of herbivores, acting as an evolutionary defense mechanism.",
    seedling: {
      stage: 'seedling',
      leafShape: 'Short lanceolate blades (3–6 cm) on slender shoots',
      leafColor: 'Pale Bright Lime Green',
      leafMargin: 'Smooth to faint roughness',
      leafTexture: 'Flexible, low silica content',
      description: 'Sprouts from rhizome buds with soft, pliable grasslike blades lacking the razor-sharp micro-serrations of adult culms.',
      adaptiveNote: 'Soft juvenile tissues allow rapid shoot elongation before energy is expended on heavy silica biomineralization.'
    },
    mature: {
      stage: 'mature',
      leafShape: 'Elongated Linear-Lanceolate (15–25 cm)',
      leafColor: 'Deep Resilient Emerald Green',
      leafMargin: 'Sharply Scabrous (micro-serrated cutting edges)',
      leafTexture: 'Stiff, fibrous, dense silica deposition',
      description: 'Tough distichous blades with well-developed ligules and persistent culm sheaths, withstanding high winds and monsoons.',
      adaptiveNote: 'Heavily lignified cell walls and silica spines deter both mammalian and insect herbivory.'
    }
  },
  {
    id: "P-004",
    common: "Water Lily",
    vernacular: "Kamal / Nilofar",
    sci: "Nymphaea sp.",
    family: "Nymphaeaceae",
    conf: "High (genus)",
    type: "Aquatic rhizomatous herb",
    leafShape: "Orbicular / Peltate",
    leafColor: "Dark Emerald",
    leafMargin: "Entire with V-shaped Cleft",
    leafVenation: "Palmate / Radiating",
    leafArrangement: "Basal Rosette (Floating)",
    leafTexture: "Coriaceous & Hydrophobic",
    desc: "Large circular peltate floating pads with a deep radial sinus cleft. The upper surface is coated in a waxy, water-repellent epicuticular layer with stomata on top.",
    habitat: "Freshwater ponds, slow-moving streams, and ornamental aquatic gardens.",
    uses: "Aquatic ecosystem oxygenation, pond shade to suppress algae, and traditional calming herbal infusions.",
    trivia: "Water lily pads feature a superhydrophobic surface: water droplets roll across gathering dust, keeping the leaf clean via the lotus effect.",
    seedling: {
      stage: 'seedling',
      leafShape: 'Arrowhead-shaped to sagittate submerged leaves',
      leafColor: 'Translucent Reddish-Green',
      leafMargin: 'Delicate, wavy entire',
      leafTexture: 'Thin, flaccid, submerged membranous',
      description: 'Initial juvenile leaves are submerged, thin, and arrow-shaped, lacking the thick waxy cuticle of floating adult pads.',
      adaptiveNote: 'Submerged juvenile leaves absorb dissolved gases directly across their thin epidermis before reaching the surface.'
    },
    mature: {
      stage: 'mature',
      leafShape: 'Expansive Orbicular-Peltate Pad (20–40 cm wide)',
      leafColor: 'Glossy Deep Emerald with purple underside',
      leafMargin: 'Crisp with sharp V-cleft to petiole insertion',
      leafTexture: 'Thick, leathery, superhydrophobic waxy coat',
      description: 'Expansive floating pads supported by spongy, air-chambered petioles, with stomata located strictly on the upper exposed face.',
      adaptiveNote: 'Internal aerenchyma (air channels) provide buoyancy and transport atmospheric oxygen down to submerged rhizomes.'
    }
  },
  {
    id: "P-005",
    common: "Variegated Ficus",
    vernacular: "Safed Chilkan / Weeping Fig Variegata",
    sci: "Ficus microcarpa cultivar (probable)",
    family: "Moraceae",
    conf: "Medium",
    type: "Evergreen woody tree / shrub",
    leafShape: "Ovate / Elliptic",
    leafColor: "Variegated Cream & Green",
    leafMargin: "Entire",
    leafVenation: "Pinnate Reticulate",
    leafArrangement: "Alternate",
    leafTexture: "Glossy & Coriaceous",
    desc: "Thick, leathery ovate leaves featuring bold marginal variegation of ivory-white and creamy yellow framing a deep green core. Contains white milky latex.",
    habitat: "Subtropical landscapes, atrium planters, and indoor specimen containers.",
    uses: "Indoor air purification (absorbs formaldehyde), formal hedge sculpting, and architectural landscaping.",
    trivia: "The variegation is caused by genetic chimerism where outer cell layers lack chloroplasts, leaving them bright cream.",
    seedling: {
      stage: 'seedling',
      leafShape: 'Small rounded-ovate blades (2–4 cm)',
      leafColor: 'Predominantly Pale Green with faint ivory margin',
      leafMargin: 'Entire',
      leafTexture: 'Tender, pliable, thin wax',
      description: 'Young rooted cuttings or seedlings have smaller leaves with less defined variegation patterns and softer petioles.',
      adaptiveNote: 'Higher green surface ratio in juvenile leaves provides critical energy needed for root establishment.'
    },
    mature: {
      stage: 'mature',
      leafShape: 'Broadly Ovate with blunt pointed apex (6–10 cm)',
      leafColor: 'High-contrast Cream-Yellow and Forest Green',
      leafMargin: 'Smooth, entire, thickened',
      leafTexture: 'Heavy, glossy, thick leathery cuticle',
      description: 'Dense canopy of glossy variegated leaves secreting thick latex when snapped, highly resistant to indoor dry air.',
      adaptiveNote: 'Thick waxy cuticle prevents moisture loss in fluctuating urban and indoor microclimates.'
    }
  },
  {
    id: "P-006",
    common: "Croton (Gold Dust)",
    vernacular: "Croton Patta",
    sci: "Codiaeum variegatum",
    family: "Euphorbiaceae",
    conf: "High",
    type: "Evergreen ornamental shrub",
    leafShape: "Elliptic / Oblanceolate",
    leafColor: "Yellow-Green Speckled",
    leafMargin: "Entire to Slightly Undulate",
    leafVenation: "Pinnate",
    leafArrangement: "Alternate",
    leafTexture: "Thick, Waxy & Leathery",
    desc: "Broad, stiffly coriaceous elliptic leaves densely speckled with bright sunshine-yellow spots over a rich forest-green background.",
    habitat: "Humid tropical open woodlands, garden shrubberies, and decorative container planters.",
    uses: "Accent foliage in landscape design, ceremonial tropical floral displays, and hedge barriers.",
    trivia: "Croton leaves adjust their pigment ratios dynamically depending on light intensity, displaying brighter yellow speckling in direct morning sun.",
    seedling: {
      stage: 'seedling',
      leafShape: 'Small oblong-elliptic blades (3–5 cm)',
      leafColor: 'Solid Lime Green with faint yellow freckles',
      leafMargin: 'Entire',
      leafTexture: 'Supple, herbaceous',
      description: 'Seedlings start with primarily green foliage; characteristic gold dust speckles appear progressively as leaves expand.',
      adaptiveNote: 'Initial solid green chlorophyll maximizes photosynthetic output during the vulnerable early rooting phase.'
    },
    mature: {
      stage: 'mature',
      leafShape: 'Bold Oblanceolate-Elliptic (12–20 cm)',
      leafColor: 'Densely Sprayed Golden-Yellow on Dark Green',
      leafMargin: 'Firm, entire, gently waved',
      leafTexture: 'Stiff, leathery, shiny waxy upper epidermis',
      description: 'Mature foliage forms dense tropical sprays with intense constellation-like golden dots covering over 50% of the leaf surface.',
      adaptiveNote: 'Carotenoid-rich yellow patches protect underlying photosynthetic cells from photoinhibition under tropical noon sun.'
    }
  },
  {
    id: "P-007",
    common: "Confederate Rose / Changeable Rose",
    vernacular: "Sthal Padma / Cotton Rosemallow",
    sci: "Hibiscus mutabilis L.",
    family: "Malvaceae",
    conf: "High",
    type: "Deciduous multi-stemmed shrub",
    leafShape: "Palmate (5-Lobed)",
    leafColor: "Vibrant Green",
    leafMargin: "Crenate / Dentate",
    leafVenation: "Palmate (3–7 basal veins)",
    leafArrangement: "Alternate",
    leafTexture: "Pubescent & Velvety",
    desc: "Large broad heart-shaped leaves with 5 distinct shallow lobes and velvety stellate hairs on both surfaces. Prominent palmate basal veins radiate from the petiole junction.",
    habitat: "Moist riparian banks, cottage gardens, and subtropical parks.",
    uses: "Traditional treatment for swellings and skin lesions, fiber production from bark, and ornamental color-changing blossom display.",
    trivia: "While famous for blossoms that shift from white to crimson by twilight, its velvety leaves are prized for high mucilage content.",
    seedling: {
      stage: 'seedling',
      leafShape: 'Cordate (heart-shaped) with minimal or no lobes (3–5 cm)',
      leafColor: 'Bright Apple Green',
      leafMargin: 'Lightly crenate',
      leafTexture: 'Soft, sparsely hairy',
      description: 'Seedling leaves are simple heart-shaped; distinct 5-lobed palmate geometry develops only after the 4th or 5th node.',
      adaptiveNote: 'Simple unlobed juvenile leaves capture diffuse light efficiently close to the ground.'
    },
    mature: {
      stage: 'mature',
      leafShape: 'Broadly 5-Lobed Palmate (15–25 cm wide)',
      leafColor: 'Rich Forest Green, paler velvety underside',
      leafMargin: 'Coarsely Dentate-Crenate',
      leafTexture: 'Densely tomentose (felted with stellate hairs)',
      description: 'Expansive maple-like leaves with prominent radiating primary veins and a velvety texture that repels water and pests.',
      adaptiveNote: 'Dense stellate pubescence reduces boundary layer transpirational moisture loss in hot dry winds.'
    }
  },
  {
    id: "P-008",
    common: "Norfolk Island Pine",
    vernacular: "Christmas Tree Pine",
    sci: "Araucaria heterophylla (probable)",
    family: "Araucariaceae",
    conf: "Medium",
    type: "Evergreen pyramidal conifer",
    leafShape: "Scale / Needle-like",
    leafColor: "Emerald Green",
    leafMargin: "Entire",
    leafVenation: "Single Central Strand",
    leafArrangement: "Spiral / Overlapping",
    leafTexture: "Rigid & Awl-shaped",
    desc: "Dense whorled branches bearing two distinct foliage types: juvenile leaves are soft incurved needles, while adult foliage forms dense overlapping scalelike plates.",
    habitat: "Coastal subtropical bluffs, windward coastal gardens, and indoor potted specimens.",
    uses: "Coastal windbreaks, coastal park architecture, holiday potted Christmas trees, and timber.",
    trivia: "Araucaria is a living botanical fossil lineage dating back to the Jurassic period, having coexisted with dinosaurs.",
    seedling: {
      stage: 'seedling',
      leafShape: 'Incurved Awl-like Needles (1–1.5 cm)',
      leafColor: 'Bright Emerald Green, soft sheen',
      leafMargin: 'Entire',
      leafTexture: 'Pliable, soft to the touch, non-prickly',
      description: 'Young plants exhibit juvenile heterophylly with soft, four-angled needles projecting outwards from horizontal tier branches.',
      adaptiveNote: 'Soft spreading needles maximize surface area for low-intensity understory light interception.'
    },
    mature: {
      stage: 'mature',
      leafShape: 'Incurved Scale-like Rhomboid Plates (4–6 mm)',
      leafColor: 'Deep Dark Green, dull waxy bloom',
      leafMargin: 'Entire, densely imbricate',
      leafTexture: 'Rigid, woody-coriaceous, armor-like',
      description: 'Mature crown foliage transitions to tightly overlapping curved scales appressed closely against heavy wind-firm branches.',
      adaptiveNote: 'Compact imbricate scales minimize salt-spray abrasion and wind resistance on exposed ocean cliffs.'
    }
  },
  {
    id: "P-009",
    common: "Sweet Potato Vine (Blackie / Purple)",
    vernacular: "Shakarkand Bel",
    sci: "Ipomoea batatas cultivar (probable)",
    family: "Convolvulaceae",
    conf: "Medium",
    type: "Vining perennial tuber",
    leafShape: "Cordate (Heart-shaped)",
    leafColor: "Purple & Ruby",
    leafMargin: "Entire to 3-Lobed",
    leafVenation: "Palmate Reticulate",
    leafArrangement: "Alternate",
    leafTexture: "Herbaceous & Smooth",
    desc: "Lush trailing heart-shaped leaves ranging from deep midnight purple to bronze-green. The underside exhibits prominent violet-red veins supporting vigorous cascading stems.",
    habitat: "Tropical agricultural ridges, hanging baskets, and ornamental patio containers.",
    uses: "Cascading container spillers, groundcover weed suppression, edible tuber cultivation, and vitamin-rich tender greens.",
    trivia: "Ornamental sweet potato vines produce edible tubers identical in genetics to grocery sweet potatoes, though bred for leaf pigmentation.",
    seedling: {
      stage: 'seedling',
      leafShape: 'Broadly cordate to deltoid simple leaves (4–6 cm)',
      leafColor: 'Olive Green with faint purple edges',
      leafMargin: 'Entire',
      leafTexture: 'Thin, tender herbaceous',
      description: 'Sprouts from seed or eye buds with simple heart-shaped leaves that gradually darken and develop deeper lobes.',
      adaptiveNote: 'Rapid ground-level spreading shades out competitive weed seedlings.'
    },
    mature: {
      stage: 'mature',
      leafShape: 'Deeply 3- to 5-Lobed Palmate-Cordate (10–18 cm)',
      leafColor: 'Midnight Purple to Dark Bronze-Black',
      leafMargin: 'Deeply incised pointed lobes',
      leafTexture: 'Satiny, smooth, succulent petioles',
      description: 'Expansive cascading vines with deeply cut hand-shaped purple foliage creating dramatic ground or wall coverage.',
      adaptiveNote: 'Rich anthocyanin pigments deter generalist insect herbivores that target bright green foliage.'
    }
  },
  {
    id: "P-010",
    common: "Xanadu Philodendron",
    vernacular: "Xanadu / Winterbourn",
    sci: "Thaumatophyllum xanadu",
    family: "Araceae",
    conf: "High",
    type: "Clumping evergreen perennial",
    leafShape: "Pinnatifid (Deeply Lobed)",
    leafColor: "Dark Emerald",
    leafMargin: "Deeply Undulate Lobes",
    leafVenation: "Pinnate with Thick Midrib",
    leafArrangement: "Spiral Rosette",
    leafTexture: "Coriaceous & Glossy",
    desc: "Dramatic deeply dissected leaf blades with 15–20 distinct wavy lobes. Leaves are glossy, thick, and supported by long rigid grooved petioles emerging from a woody clumping trunk.",
    habitat: "Tropical rainforest understories, shaded courtyard landscapes, and architectural planters.",
    uses: "Low-maintenance landscape accent, air filtration, erosion control in shaded slopes, and commercial interior plantscaping.",
    trivia: "Originally believed to be a cultivated hybrid, field botanists eventually discovered wild populations in Brazil, reclassifying it into genus Thaumatophyllum.",
    seedling: {
      stage: 'seedling',
      leafShape: 'Simple Sagittate (arrowhead) to Cordate (4–8 cm)',
      leafColor: 'Bright Glossy Apple Green',
      leafMargin: 'Entire to shallowly scalloped (no deep lobes)',
      leafTexture: 'Smooth, flexible',
      description: 'Juvenile Xanadu plants produce solid arrow-shaped leaves without any lobes; the signature pinnatifid cuts appear after 1–2 years.',
      adaptiveNote: 'Solid juvenile blades maximize light interception on dim rainforest floor litter.'
    },
    mature: {
      stage: 'mature',
      leafShape: 'Deeply Pinnatifid with 15–20 Ruffled Lobes (30–45 cm)',
      leafColor: 'Lustrous Midnight Emerald Green',
      leafMargin: 'Crisply undulate, finger-like divisions',
      leafTexture: 'Thick, leathery, heavily grooved petiole',
      description: 'Magnificent architectural rosettes with deeply cut finger lobes that allow heavy tropical downpours to pass without tearing.',
      adaptiveNote: 'Dissected lobe architecture prevents wind drag and mechanical water damage during tropical monsoon storms.'
    }
  },
  {
    id: "P-011",
    common: "Geranium-leaf Aralia",
    vernacular: "Variegated Aralia",
    sci: "Polyscias guilfoylei",
    family: "Araliaceae",
    conf: "High",
    type: "Evergreen woody shrub",
    leafShape: "Crenate Compound",
    leafColor: "Variegated Cream & Green",
    leafMargin: "Coarsely Dentate / Fringed",
    leafVenation: "Pinnate",
    leafArrangement: "Alternate Pinnately Compound",
    leafTexture: "Glossy & Frilled",
    desc: "Odd-pinnately compound foliage featuring 5–7 rounded leaflets. Each leaflet is edged with an irregular creamy-white serrated fringe resembling geranium foliage.",
    habitat: "Pacific tropical islands, tropical hedge lines, and indoor terrariums.",
    uses: "Living privacy screens, topiary hedges, traditional Pacific island medicinal dressings, and indoor bonsai.",
    trivia: "The botanical name Polyscias translates from Greek as 'many shadows', referencing the plant's remarkably dense, multi-layered foliage canopy.",
    seedling: {
      stage: 'seedling',
      leafShape: 'Simple trifoliate leaves with rounded leaflets (3–5 cm)',
      leafColor: 'Chartreuse green with pale border',
      leafMargin: 'Lightly crenate',
      leafTexture: 'Tender, glossy',
      description: 'Young cuttings start with only 3 small leaflets per stem before developing the elaborate 5–7 leaflet frilled compound leaf.',
      adaptiveNote: 'Simpler juvenile leaves require less vascular energy while the initial woody stem hardens.'
    },
    mature: {
      stage: 'mature',
      leafShape: 'Imparipinnate Compound with 5–7 Frilled Leaflets (15–30 cm)',
      leafColor: 'Emerald Green with Bright White Lace Fringe',
      leafMargin: 'Coarsely and irregularly laciniate-dentate',
      leafTexture: 'Stiff, glossy, aromatic when crushed',
      description: 'Mature compound leaves create dense, textured clouds of variegated foliage with intricate ruffled white margins.',
      adaptiveNote: 'Frilled serrations help shed excess rainwater droplets to discourage fungal spore germination.'
    }
  },
  {
    id: "P-012",
    common: "Croton (Variegated Fiery)",
    vernacular: "Rangeen Croton",
    sci: "Codiaeum variegatum",
    family: "Euphorbiaceae",
    conf: "High",
    type: "Evergreen shrub",
    leafShape: "Elliptic / Oblanceolate",
    leafColor: "Multi-colored (Bronze/Red/Yellow)",
    leafMargin: "Entire / Undulate",
    leafVenation: "Pinnate with Colored Ribs",
    leafArrangement: "Alternate",
    leafTexture: "Stiff & Leathery",
    desc: "Exotic kaleidoscope foliage combining crimson, canary yellow, burnt orange, and deep forest green across the same leaf blade. The central midrib is brightly saturated.",
    habitat: "Tropical rainforest edges, full sun to partial shade gardens, and atrium displays.",
    uses: "Vibrant tropical garden focal points, ceremonial garland foliage, and specimen container accents.",
    trivia: "Every single seed from a Croton produces a genetically distinct seedling with unpredictable leaf shapes and color configurations.",
    seedling: {
      stage: 'seedling',
      leafShape: 'Small ovate-elliptic leaves (4–6 cm)',
      leafColor: 'Predominantly Green with faint yellow vein lines',
      leafMargin: 'Smooth entire',
      leafTexture: 'Herbaceous, flexible',
      description: 'Young Croton shoots begin with mostly green leaves; red and orange carotenoid pigmentation develops as the shoot matures in sunlight.',
      adaptiveNote: 'High green chlorophyll ratio powers fast juvenile root and stem development.'
    },
    mature: {
      stage: 'mature',
      leafShape: 'Broadly Oblanceolate (15–25 cm long)',
      leafColor: 'Fiery Crimson, Amber Gold, and Midnight Green',
      leafMargin: 'Thickened, undulate, glossy',
      leafTexture: 'Stiff, leathery, robust vascular midrib',
      description: 'Fully matured leaves exhibit intense pigment stratification with deep ruby petioles and vivid yellow-orange reticulate veins.',
      adaptiveNote: 'Dense multi-pigment layers allow absorption of multiple wavelengths of sunlight while reflecting excess thermal radiation.'
    }
  },
  {
    id: "P-013",
    common: "Peregrina / Spicy Jatropha",
    vernacular: "Chhoti Lal Kaner",
    sci: "Jatropha integerrima",
    family: "Euphorbiaceae",
    conf: "High",
    type: "Evergreen flowering shrub",
    leafShape: "Panduriform (Fiddle-shaped)",
    leafColor: "Vibrant Green",
    leafMargin: "Entire with Basal Teeth",
    leafVenation: "Pinnate to Sub-palmate",
    leafArrangement: "Alternate",
    leafTexture: "Glossy & Glabrous",
    desc: "Distinctive panduriform (violin-shaped) to ovate leaves, frequently bearing 1–2 sharp triangular points near the base. Accompanied by clusters of scarlet flowers.",
    habitat: "Dry to mesic tropical woodland, butterfly gardens, and ornamental streetscapes.",
    uses: "Continuous nectar source for tropical swallowtail butterflies, drought-tolerant hedging, and container accent.",
    trivia: "The Latin specific epithet 'integerrima' means completely entire, though paradoxically many leaves on the same branch develop sharp fiddle lobes.",
    seedling: {
      stage: 'seedling',
      leafShape: 'Simple Ovate to Elliptic without fiddle waist (3–5 cm)',
      leafColor: 'Pale Bright Green, bronze-flushed petiole',
      leafMargin: 'Entire (basal teeth not yet formed)',
      leafTexture: 'Soft, tender, thin',
      description: 'Juvenile foliage lacks the distinctive violin constriction and basal sharp points seen on mature flowering branches.',
      adaptiveNote: 'Simple ovate shape minimizes vascular resistance during initial shoot elongation.'
    },
    mature: {
      stage: 'mature',
      leafShape: 'Distinctly Panduriform (Violin/Fiddle-shaped, 8–15 cm)',
      leafColor: 'Glossy Deep Emerald with bronze undertone',
      leafMargin: 'Entire with 1–2 sharp triangular teeth at base',
      leafTexture: 'Smooth, coriaceous, lustrous upper surface',
      description: 'Classic fiddle-shaped foliage with distinct waist constriction and sharp basal lobes, contrasting with bright crimson flowers.',
      adaptiveNote: 'Waist constriction reduces wind drag around terminal flowering cymes while preserving surface area.'
    }
  },
  {
    id: "P-014",
    common: "Sword / Boston Fern",
    vernacular: "Fern Patta",
    sci: "Nephrolepis exaltata (probable)",
    family: "Nephrolepidaceae",
    conf: "Medium-High",
    type: "Perennial epiphytic / terrestrial fern",
    leafShape: "Pinnate Frond",
    leafColor: "Emerald Green",
    leafMargin: "Finely Serrulate",
    leafVenation: "Free Forked Veins",
    leafArrangement: "Tufted Arching Fronds",
    leafTexture: "Papery & Delicate",
    desc: "Long graceful arching fronds up to 1.5 meters long, bearing two neat rows of alternating sessile pinnae (leaflets). Underside bears kidney-shaped spore indusia.",
    habitat: "Humid tropical rainforests, swamp forest tree trunks, and hanging porch baskets.",
    uses: "Top-ranked indoor plant for removing airborne toxins, humidifying dry rooms, and classical hanging greenery.",
    trivia: "Nephrolepis gets its botanical name from the Greek 'nephros' (kidney) and 'lepis' (scale), describing the kidney-shaped protective spore flaps.",
    seedling: {
      stage: 'seedling',
      leafShape: 'Circinate Crozier (Fiddlehead) uncurling into short fronds (5–12 cm)',
      leafColor: 'Tender Lime Green with golden-brown scales',
      leafMargin: 'Finely crenulate',
      leafTexture: 'Extremely soft, delicate, succulent stipe',
      description: 'Sprouts as a tightly coiled spiral fiddlehead (crozier) covered in protective scales that gently unfurls upward.',
      adaptiveNote: 'Circinate vernation (spiral coiling) protects the delicate growing tip from desiccation and mechanical injury.'
    },
    mature: {
      stage: 'mature',
      leafShape: 'Expansive Pinnate Frond with 50+ pairs of pinnae (80–150 cm)',
      leafColor: 'Rich Vibrant Emerald Green',
      leafMargin: 'Crisply serrulate with auricled base',
      leafTexture: 'Firm, papery, arching gracefully',
      description: 'Long cascading fronds lined with tightly spaced oblong pinnae, bearing distinct rows of reniform spore-bearing sori on reverse.',
      adaptiveNote: 'Feathery divided frond architecture maximizes humid microclimate capture within dense canopy understories.'
    }
  },
  {
    id: "P-015",
    common: "Chinese Juniper",
    vernacular: "Morpankhi Juniper",
    sci: "Juniperus chinensis cultivar (probable)",
    family: "Cupressaceae",
    conf: "Medium",
    type: "Evergreen conifer / compact tree",
    leafShape: "Scale / Needle-like",
    leafColor: "Blue-Grey Glaucous",
    leafMargin: "Entire Appressed",
    leafVenation: "Reduced to Central Gland",
    leafArrangement: "Opposite Decussate",
    leafTexture: "Aromatic & Scale-like",
    desc: "Compact aromatic conifer foliage bearing tiny overlapping scale-like needles with an attractive blue-grey glaucous bloom. Emits a pleasant cedar fragrance.",
    habitat: "Temperate to subtropical rocky slopes, formal courtyard gardens, and classical bonsai.",
    uses: "Architectural topiary spirals, aromatic evergreen hedges, rockery focal points, and historic bonsai culture.",
    trivia: "The silvery blue-grey color comes from microscopic wax crystals that reflect harsh UV sunlight and reduce transpirational water loss in dry seasons.",
    seedling: {
      stage: 'seedling',
      leafShape: 'Prickly Acicular Needles in whorls of 3 (6–10 mm)',
      leafColor: 'Pale Blue-Green with prominent white stomatal bands',
      leafMargin: 'Entire with sharp spiny tip',
      leafTexture: 'Rigid, spiny, needle-sharp',
      description: 'Juvenile growth consists entirely of sharp, needle-like spreading leaves with conspicuous white stomatal lines on the inner face.',
      adaptiveNote: 'Sharp juvenile needles protect young seedlings against grazing rabbits and browsing ungulates.'
    },
    mature: {
      stage: 'mature',
      leafShape: 'Tightly Appressed Decussate Scales (1.5–3 mm)',
      leafColor: 'Silvery Powder Blue-Grey (Glaucous wax bloom)',
      leafMargin: 'Blunt, overlapping tightly against twig',
      leafTexture: 'Smooth, aromatic, scaled armored cord',
      description: 'Adult branches transition into rope-like sprays of smooth, scale-like needles with a dorsal resin gland emitting cedar fragrance.',
      adaptiveNote: 'Scale morphology and thick wax bloom provide extreme drought, frost, and wind resistance.'
    }
  },
  {
    id: "P-016",
    common: "Copperleaf / Jacob's Coat",
    vernacular: "Lal Jhari / Beefsteak Plant",
    sci: "Acalypha wilkesiana",
    family: "Euphorbiaceae",
    conf: "High",
    type: "Evergreen tropical shrub",
    leafShape: "Ovate / Cordate",
    leafColor: "Bronze & Copper",
    leafMargin: "Coarsely Serrate",
    leafVenation: "Pinnate Reticulate",
    leafArrangement: "Alternate",
    leafTexture: "Papery & Mottled",
    desc: "Broad, heart-shaped ovate leaves with coarsely serrated margins. Foliage displays copper-bronze, rose-pink, and olive-green marbling with distinct reddish veins.",
    habitat: "Pacific tropical islands, full sun garden borders, and tropical boundary hedges.",
    uses: "High-visibility boundary hedging, landscape contrast, antifungal traditional remedies for skin conditions, and ornamental bouquets.",
    trivia: "Named after Admiral Charles Wilkes, who explored the South Pacific in 1838–1842 and documented its extensive cultivation as living property boundaries.",
    seedling: {
      stage: 'seedling',
      leafShape: 'Small rounded-ovate leaves (4–6 cm)',
      leafColor: 'Olive Green with faint coppery-pink margin',
      leafMargin: 'Finely serrate',
      leafTexture: 'Thin, soft herbaceous',
      description: 'Young rooted stems start with predominantly olive-green leaves; signature mottled copper, cream, and pink marbling intensifies in sunlight.',
      adaptiveNote: 'Higher early chlorophyll concentration supports rapid root system establishment.'
    },
    mature: {
      stage: 'mature',
      leafShape: 'Large Broadly Ovate to Cordate (12–20 cm)',
      leafColor: 'Mottled Copper-Bronze, Rose-Pink, and Dark Olive',
      leafMargin: 'Coarsely and sharply serrate with pink-edged teeth',
      leafTexture: 'Crisp, papery-leathery, prominent red reticulate veins',
      description: 'Spectacular canopy of cupped, marbled leaves with vivid copper hues and undulating serrated margins glowing in direct sunlight.',
      adaptiveNote: 'High anthocyanin and carotenoid pigments absorb excess solar radiation while protecting deep leaf tissue.'
    }
  },
  {
    id: "P-017",
    common: "Purple Orchid Tree / Butterfly Tree",
    vernacular: "Kachnar / Kaniar",
    sci: "Bauhinia purpurea (probable)",
    family: "Fabaceae",
    conf: "Medium",
    type: "Deciduous flowering tree",
    leafShape: "Bilobed (Butterfly-shaped)",
    leafColor: "Vibrant Green",
    leafMargin: "Entire with Deep Apical Cleft",
    leafVenation: "Palmate (9–11 radiating veins)",
    leafArrangement: "Alternate",
    leafTexture: "Coriaceous & Sub-glabrous",
    desc: "Unmistakable bilobed leaves divided one-third of the way from the apex into two equal rounded halves, strongly mimicking resting butterfly wings.",
    habitat: "Subtropical deciduous foothill forests, urban avenues, and garden lawns.",
    uses: "Culinary use of young buds in pickles and curries, Ayurvedic treatment for digestive disorders and ulcers, and valuable avenue shade.",
    trivia: "The genus Bauhinia was named by Carl Linnaeus in honor of the 16th-century twin botanist brothers Johann and Gaspard Bauhin, symbolizing the twin-lobed leaf blades.",
    seedling: {
      stage: 'seedling',
      leafShape: 'Sub-orbicular with shallow apical notch (3–5 cm)',
      leafColor: 'Tender Bright Yellow-Green',
      leafMargin: 'Entire',
      leafTexture: 'Membranous, translucent in light',
      description: 'Seedlings emerge with large fleshy cotyledons, followed by first leaves showing only a shallow notch rather than the deep mature butterfly cleft.',
      adaptiveNote: 'Shallower juvenile notch preserves continuous leaf blade area for initial seedling light capture.'
    },
    mature: {
      stage: 'mature',
      leafShape: 'Deeply Bilobed Twin-Leaf Butterfly Shape (10–18 cm)',
      leafColor: 'Deep Resilient Kelly Green',
      leafMargin: 'Smooth entire, deep cleft 1/3 to 1/2 of blade depth',
      leafTexture: 'Firm, coriaceous, 9–11 prominent radiating palmate ribs',
      description: 'Iconic twin rounded lobes resembling a perched butterfly, folding slightly along the midrib in extreme mid-day heat.',
      adaptiveNote: 'The deep cleft reduces leaf surface drag during monsoon windstorms, preventing branch snapping.'
    }
  },
  {
    id: "P-018",
    common: "Gulmohar / Flame Tree",
    vernacular: "Gulmohar / Royal Poinciana",
    sci: "Delonix regia",
    family: "Fabaceae",
    conf: "High",
    type: "Large spreading umbrella tree",
    leafShape: "Bipinnate (Feathery)",
    leafColor: "Vibrant Green",
    leafMargin: "Entire Small Leaflets",
    leafVenation: "Micro-pinnate",
    leafArrangement: "Alternate Bipinnate",
    leafTexture: "Delicate & Nyctinastic",
    desc: "Exquisitely fine, feathery bipinnate leaves up to 50 cm long, composed of 20–40 pairs of pinnae, each divided into hundreds of tiny oblong leaflets. Exhibits nyctinastic leaf folding.",
    habitat: "Dry deciduous tropical forests, broad urban avenues, and public parklands.",
    uses: "Expansive canopy shade for urban heat reduction, soil nitrogen fixation, timber for local tool handles, and spectacular seasonal floral display.",
    trivia: "Gulmohar leaflets exhibit 'sleep movements' (nyctinasty): as twilight approaches, the hundreds of tiny leaflets fold inward together to minimize nighttime heat and moisture loss.",
    seedling: {
      stage: 'seedling',
      leafShape: 'Simply Pinnate with 4–8 pairs of leaflets (6–12 cm)',
      leafColor: 'Pale Bright Lime Green',
      leafMargin: 'Entire',
      leafTexture: 'Extremely soft, fragile',
      description: 'First true seedling leaves are simply pinnate with only a few pairs of oval leaflets; the complex bipinnate feathery branching develops on later nodes.',
      adaptiveNote: 'Simpler juvenile leaves develop rapidly with minimal initial nitrogen and carbohydrate expenditure.'
    },
    mature: {
      stage: 'mature',
      leafShape: 'Elaborate Bipinnate with 1000+ tiny leaflets (30–60 cm long)',
      leafColor: 'Vibrant Light Fern Green',
      leafMargin: 'Smooth entire, oblong-rounded (4–8 mm each)',
      leafTexture: 'Feathery, lightweight, nyctinastic',
      description: 'Enormous fern-like canopy fronds with 10–25 pinnae pairs holding over a thousand tiny folding leaflets that create dappled light underneath.',
      adaptiveNote: 'Thousands of micro-leaflets fold tightly together at sunset (nyctinasty) to prevent nighttime radiative heat loss and water evaporation.'
    }
  }
];
