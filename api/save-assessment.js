export default async function handler(req, res) {
  // Make sure we're handling POST requests only
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Import Supabase client
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
    
    // Get data from request
    const userData = req.body;
    console.log('Received user data:', userData);
    
    // Insert data into Supabase
    const { data, error } = await supabase
      .from('user_answers')
      .insert([userData])
      .select('id, created_at')
      .single();
    
    // Handle Supabase errors
    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }
    
    // Return success
    console.log('Data saved successfully:', data);
    return res.status(200).json(data);
  } catch (error) {
    // Handle unexpected errors
    console.error('Error in API route:', error);
    return res.status(500).json({ error: error.message });
  }
}
