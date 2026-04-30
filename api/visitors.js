export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // 서비스 키: Vercel 환경변수(PARK_API_KEY)에서 읽음
  // 로컬 개발 시 .env 파일에 PARK_API_KEY=... 설정
  const serviceKey = process.env.PARK_API_KEY;

  if (!serviceKey) {
    return res.status(500).json({ error: 'PARK_API_KEY 환경변수가 설정되지 않았습니다.' });
  }

  const { numOfRows = 20, pageNo = 1 } = req.query;

  const url = `https://data.sisul.or.kr/AutoAPI/service/OpenDB/EnterCount/getEnterCountQry?serviceKey=${encodeURIComponent(serviceKey)}&numOfRows=${numOfRows}&pageNo=${pageNo}`;

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
