// SiteTrack Configuration
// Your Supabase credentials
const SUPABASE_URL = 'https://ffjqrireooybhmmstsvp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_8UCsx7YwSXG1KOf1aFOFyw_vyqVf8cR';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// App settings
const CONFIG = {
  overdueThresholdDays: 7,   // Flag items checked out longer than this
  appName: 'SiteTrack',
  companyName: 'Your Company', // Change this
};
