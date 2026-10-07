// High-resolution local botanical image assets for all 18 specimens + team case file
import teamCaseImg from '../assets/images/hero-investigation-photo.png';

import p001 from '../assets/images/balsam_leaf_macro_1791213523904.jpg';
import p002 from '../assets/images/P-002.jpg';
import p003 from '../assets/images/bamboo_leaf_macro_1791215179528.jpg';
import p004 from '../assets/images/waterlily_leaf_macro_1791213538009.jpg';
import p005 from '../assets/images/ficus_leaf_macro_1791215190212.jpg';
import p006 from '../assets/images/croton_gold_leaf_1791215200461.jpg';
import p007 from '../assets/images/confederate_rose_leaf_1791213549080.jpg';
import p008 from '../assets/images/norfolk_pine_macro_1791215211644.jpg';
import p009 from '../assets/images/sweet_potato_leaf_1791213559823.jpg';
import p010 from '../assets/images/xanadu_leaf_macro_1791213570455.jpg';
import p011 from '../assets/images/aralia_leaf_macro_1791213582498.jpg';
import p012 from '../assets/images/fiery_croton_leaf_1791215224166.jpg';
import p013 from '../assets/images/peregrina_leaf_macro_1791213592781.jpg';
import p014 from '../assets/images/boston_fern_frond_1791215236418.jpg';
import p015 from '../assets/images/juniper_needle_macro_1791215248593.jpg';
import p016 from '../assets/images/copperleaf_macro_1791215261583.jpg';
import p017 from '../assets/images/bauhinia_leaf_macro_1791213604455.jpg';
import p018 from '../assets/images/gulmohar_leaf_macro_1791215272533.jpg';

export const TEAM_IMAGE = teamCaseImg;

export const PLANT_IMAGE_CREDITS: Record<string, {
  attribution: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
}> = {
  'P-002': {
    attribution: 'Satin66Flower / Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Alternanthera_%27Purple_Knight%27_PAra.jpg',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  },
};

export const PLANT_IMAGES: Record<string, string> = {
  'P-001': p001,
  'P-002': p002,
  'P-003': p003,
  'P-004': p004,
  'P-005': p005,
  'P-006': p006,
  'P-007': p007,
  'P-008': p008,
  'P-009': p009,
  'P-010': p010,
  'P-011': p011,
  'P-012': p012,
  'P-013': p013,
  'P-014': p014,
  'P-015': p015,
  'P-016': p016,
  'P-017': p017,
  'P-018': p018,
};
