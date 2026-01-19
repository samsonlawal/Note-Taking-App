import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = "https://vvnkuthktilcuilgkobc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2bmt1dGhrdGlsY3VpbGdrb2JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNDc2MDIsImV4cCI6MjA0ODcyMzYwMn0.DdnGrx2nTg4ew3CitIfWaQUs-g4DYLYtY_hhFRABAow";

const supabase = createBrowserClient(supabaseUrl, supabaseKey);

export default supabase;
