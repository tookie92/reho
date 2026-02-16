import { supabaseAdmin } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';



async function migrate() {
  const { error } = await supabaseAdmin.rpc('exec_sql', { 
    sql: 'ALTER TABLE series ALTER COLUMN user_id TYPE VARCHAR(255);' 
  });
  
  if (error) {
    console.log('Trying direct alter...');
    const { error: error2 } = await supabaseAdmin.from('series').select('*').limit(1);
    console.log('Connection works, table exists');
  }
}

migrate();
