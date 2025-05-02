// api/save-assessment.js
export default async function handler(req, res) {
  // Get the data sent from the browser
  const userData = req.body;
  
  // Create a Supabase client using environment variables (secret keys)
  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
  
  try {
    // Save data to Supabase
    const { data, error } = await supabase
      .from('user_answers')
      .insert([userData])
      .select('id, created_at')
      .single();
    
    if (error) throw error;
    
    // Return success
    return res.status(200).json(data);
  } catch (error) {
    // Return error
    return res.status(500).json({ error: error.message });
  }
}
