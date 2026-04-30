export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { serviceKey, numOfRows = 20, pageNo = 1 } = req.query;

  if (!serviceKey) {
    return res.status(400).json({ error: '서비스 키가 필요합니다.' });
  }

  const url = `http://data.sisul.or.kr/AutoAPI/service/OpenDB/EnterCount/getEnterCountQry?serviceKey=${encodeURIComponent(serviceKey)}&numOfRows=${numOfRows}&pageNo=${pageNo}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const xml = await response.text();
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.status(200).send(xml);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
