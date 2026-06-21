// Real space photography, sourced from Wikimedia Commons via the
// Special:FilePath hotlink endpoint (the method Commons documents for
// external reuse). All public domain (NASA) or CC BY 4.0 (ESA/Hubble) —
// credited in the site footer.

const FILEPATH = 'https://commons.wikimedia.org/wiki/Special:FilePath/';

export const SPACE_PHOTOS = {
  // Pillars of Creation — Hubble Space Telescope, 2014 (NASA, ESA — public domain)
  pillars: `${FILEPATH}Pillars_of_creation_2014_HST_WFC3-UVIS_full-res.jpg?width=2400`,

  // "Cosmic Cliffs" in the Carina Nebula — James Webb Space Telescope, 2022 (NASA, ESA, CSA, STScI — public domain)
  cosmicCliffs: `${FILEPATH}NASA%E2%80%99s_Webb_Reveals_Cosmic_Cliffs,_Glittering_Landscape_of_Star_Birth.jpg?width=2400`,

  // The Blue Marble — Apollo 17 crew, 1972 (NASA — public domain)
  blueMarble: `${FILEPATH}The_Blue_Marble,_AS17-148-22727.jpg?width=2400`,

  // Falcon 9 liftoff, Cape Canaveral Air Force Station (public domain)
  rocketLaunch: `${FILEPATH}The_SpaceX_Falcon_9_rocket_lifts_off_from_Cape_Canaveral_Air_Force_Station.jpg?width=2400`,

  // Andromeda Galaxy (M31) — Hubble panoramic mosaic (ESA/Hubble — CC BY 4.0)
  andromeda: `${FILEPATH}Andromeda_Galaxy_M31_-_Heic1502a_Full_resolution.jpg?width=2400`,

  // Seamless deep-space star field texture (CC BY 4.0, Solar System Scope)
  starTexture: `${FILEPATH}Solarsystemscope_texture_8k_stars_milky_way.jpg?width=2400`,

  // Aurora Australis seen from the ISS (NASA — public domain)
  aurora: `${FILEPATH}Aurora_Australis_From_ISS.JPG?width=2400`,
} as const;

export const PHOTO_CREDITS = [
  { label: 'Pillars of Creation', credit: 'NASA, ESA, Hubble Heritage Team' },
  { label: 'Cosmic Cliffs (Carina Nebula)', credit: 'NASA, ESA, CSA, STScI' },
  { label: 'The Blue Marble', credit: 'NASA / Apollo 17 crew' },
  { label: 'Falcon 9 launch', credit: 'U.S. Air Force / SpaceX, public domain' },
  { label: 'Andromeda Galaxy', credit: 'ESA/Hubble, CC BY 4.0' },
  { label: 'Star field texture', credit: 'Solar System Scope, CC BY 4.0' },
  { label: 'Aurora Australis from ISS', credit: 'NASA, public domain' },
];

// Real CSDCMS / CanSat photography — local assets in /public/images
export const CANSAT_PHOTO = '/images/cansat-2022-winners.webp';

export const SUPPORTER_LOGOS = [
  { src: '/images/supporters/bchydro.svg',  alt: 'BC Hydro' },
  { src: '/images/supporters/calian.svg',   alt: 'Calian' },
  { src: '/images/supporters/mda-space.svg', alt: 'MDA Space' },
  { src: '/images/supporters/trottier.png', alt: 'Trottier Family Foundation' },
  { src: '/images/supporters/telesat.svg',  alt: 'Telesat' },
  { src: '/images/supporters/css.png',      alt: 'Canadian Space Society' },
];
