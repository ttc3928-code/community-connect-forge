import { supabase } from "@/integrations/supabase/client";

// The imported app's schema migration is being carried forward separately.
// Keep its existing data calls operational while Cloud regenerates local types.
export const communityClient = supabase as any;