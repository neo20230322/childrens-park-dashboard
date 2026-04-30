# 어린이대공원 입장객 현황 대시보드

서울시설공단 OpenAPI를 활용한 어린이대공원 일별 입장객 현황 대시보드입니다.

## 파일 구조

```
childrens-park-dashboard/
├── api/
│   └── visitors.js      ← Vercel 서버리스 함수 (CORS 프록시)
├── public/
│   └── index.html       ← 대시보드 UI
├── vercel.json          ← Vercel 설정
├── package.json
└── README.md
```

## Vercel 배포 방법

### 1단계: GitHub에 올리기

```bash
git init
git add .
git commit -m "어린이대공원 대시보드"
git remote add origin https://github.com/본인아이디/childrens-park-dashboard.git
git push -u origin main
```

### 2단계: Vercel 배포

1. https://vercel.com 에서 GitHub 계정으로 가입/로그인
2. **"Add New Project"** 클릭
3. 위에서 만든 GitHub 저장소 선택
4. **"Deploy"** 클릭 → 1~2분 후 자동 배포 완료
5. 발급된 URL (예: `https://childrens-park.vercel.app`) 접속

### 3단계: 환경변수(서비스 키) 설정

**Vercel 대시보드에서:**
1. 배포된 프로젝트 → **Settings** → **Environment Variables**
2. 다음 값 추가:
   - **Name**: `PARK_API_KEY`
   - **Value**: 개발계정 상세보기 > **일반 인증키**
   - **Environment**: Production, Preview, Development 모두 체크
3. **Save** 후 프로젝트 **Redeploy**

**로컬 개발 시:**
```bash
cp .env.example .env
# .env 파일 열어서 PARK_API_KEY=실제키 입력
```

### 4단계: 사용 방법

1. 배포된 URL에 접속
2. **"조회 시작"** 클릭 (서비스 키는 서버 환경변수에서 자동으로 사용됨)

## 기능

- 매 1분마다 자동으로 API 호출
- 숫자 변경 시 부드러운 카운팅 애니메이션
- 총 입장객 수 / 일반 입장객 / 조기산책객 집계
- 최근 입장 데이터 테이블

## API 정보

- **엔드포인트**: `http://data.sisul.or.kr/AutoAPI/service/OpenDB/EnterCount/getEnterCountQry`
- **서비스 ID**: EnterCount
- **제공기관**: 서울시설공단
