import { createClient } from 'next-sanity';
import { SANITY_CONFIG } from './sanityServerConfig.js';

export const sanityClient = createClient(SANITY_CONFIG);

