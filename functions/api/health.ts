export const onRequestGet = async () => {
  return new Response(
    JSON.stringify({
      status: 'online',
      system: 'Purnima S Exteriors & Interiors Cloudflare Serverless Engine',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    }),
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    }
  );
};
