module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const serviceKey = process.env.PARK_API_KEY;

  if (!serviceKey) {
    return res.status(500).json({
      error: 'PARK_API_KEY 환경변수가 없습니다.',
      hint: 'Vercel > Settings > Environment Variables 에서 등록 후 Redeploy 해주세요.'
    });
  }

  const { numOfRows = 20, pageNo = 1 } = req.query;

  const url = `https://data.sisul.or.kr/AutoAPI/service/OpenDB/EnterCount/getEnterCountQry` +
    `?serviceKey=${encodeURIComponent(serviceKey)}&numOfRows=${numOfRows}&pageNo=${pageNo}`;

  try {
    const response = await fetch(url, {
      headers: { 'Accept': 'application/xml' }
    });

    const text = await response.text();

    if (!response.ok) {
      return res.status(500).json({
        error: `외부 API 오류: HTTP ${response.status}`,
        apiResponse: text.slice(0, 500)
      });
    }

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.status(200).send(text);

  } catch (err) {
    res.status(500).json({
      error: '외부 API 호출 실패: ' + err.message,
      url: url.replace(serviceKey, '[KEY_HIDDEN]')
    });
  }
};
