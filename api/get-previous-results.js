export default async function handler(req, res) {
  // Get parameters from the URL
  const { email, currentId } = req.query;
  
  // Create a Supabase client using environment variables (secret keys)
  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
  
  try {
    // Get previous results from Supabase
    let { data, error } = await supabase
      .from('user_answers')
      .select('id, created_at, answer_1, answer_2, answer_3, answer_4, answer_5, answer_6, answer_7, answer_8, answer_9, answer_10, answer_11, answer_12, answer_13, answer_14, answer_15, answer_16, answer_17, answer_18, answer_19, answer_20')
      .eq('email', email)
      .order('created_at', { ascending: true });
    
    if (currentId && data) {
      data = data.filter(entry => entry.id !== currentId);
    }
    
    if (error) throw error;
    
    // Return the data
    return res.status(200).json(data);
  } catch (error) {
    // Return error
    return res.status(500).json({ error: error.message });
  }
}
