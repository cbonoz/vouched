import { createClient } from "@supabase/supabase-js"

import { requireEnv } from "../envutil"

const SUPABASE_URL = requireEnv("NEXT_PUBLIC_SUPABASE_URL")
const SUPABASE_ANON_KEY = requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY")

// Create a new Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
