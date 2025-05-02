export default function handler(req, res) {
  res.status(200).json({ 
    message: 'API is working!',
    env: {
      hasUrl: !!process.env.SUPABASE_URL,
      hasKey: !!process.env.SUPABASE_SERVICE_KEY
    }
  });
}
