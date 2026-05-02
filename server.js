const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 정적 파일 제공 (public 폴더)
app.use(express.static(path.join(__dirname, 'public')));

// API 프록시 - 서울시설공단 어린이대공원 입장객 API
app.get('/api/visitors', async (req, res) => {
  const serviceKey = process.env.PARK_API_KEY;

  if (!serviceKey) {
    return res.status(500).json({
      error: 'PARK_API_KEY 환경변수가 설정되지 않았습니다.',
      hint: 'Render 대시보드 > Environment 에서 PARK_API_KEY를 등록해주세요.'
    });
  }

  const { numOfRows = 20, pageNo = 1 } = req.query;

  // API 문서 기준 http:// 사용
  const url = `http://data.sisul.or.kr/AutoAPI/service/OpenDB/EnterCount/getEnterCountQry` +
    `?serviceKey=${encodeURIComponent(serviceKey)}&numOfRows=${numOfRows}&pageNo=${pageNo}`;

  try {
    const response = await fetch(url);
    const text = await response.text();

    if (!response.ok) {
      return res.status(500).json({
        error: `외부 API 오류: HTTP ${response.status}`,
        apiResponse: text.slice(0, 500)
      });
    }

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(text);

  } catch (err) {
    res.status(500).json({
      error: '외부 API 호출 실패: ' + err.message
    });
  }
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`서버 시작: http://localhost:${PORT}`);
});
