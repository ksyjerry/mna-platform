import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// 서버용 Supabase 클라이언트
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
