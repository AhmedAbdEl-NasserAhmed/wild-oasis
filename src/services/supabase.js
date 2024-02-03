import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://wesfqcwdhjpustpfelhh.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indlc2ZxY3dkaGpwdXN0cGZlbGhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkwMDM1NjAsImV4cCI6MjAxNDU3OTU2MH0.Z7UCZJISg6aKBOH_Xg3icpJ2YXW_AeHmLY0U5OB5KpY";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
