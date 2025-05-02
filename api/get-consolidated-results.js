export default async function handler(req, res) {
  // Create a Supabase client using environment variables
  const { createClient } = require('@supabase/supabase-js');
  
  // Check if environment variables exist
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    console.error('Missing environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }
  
  // Create Supabase client
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
  
  try {
    // Fetch data from Supabase
    const { data, error } = await supabase
      .from('user_answers')
      .select('nickname, event, show_on_graph, created_at, answer_1, answer_2, answer_3, answer_4, answer_5, answer_6, answer_7, answer_8, answer_9, answer_10, answer_11, answer_12, answer_13, answer_14, answer_15, answer_16, answer_17, answer_18, answer_19, answer_20');
      
    if (error) throw error;
    
    // Return the data
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ error: error.message });
  }
}
