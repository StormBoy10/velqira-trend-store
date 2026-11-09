let clients = [];

export const addClient = (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const clientId = Date.now();
  const newClient = { id: clientId, res };
  clients.push(newClient);

  req.on('close', () => {
    clients = clients.filter((c) => c.id !== clientId);
  });
};

export const broadcastEvent = (eventType, payload) => {
  const data = JSON.stringify({ type: eventType, data: payload, timestamp: new Date().toISOString() });
  clients.forEach((client) => {
    client.res.write(`data: ${data}\n\n`);
  });
};
