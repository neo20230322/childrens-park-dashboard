# 어린이대공원 입장객 현황 대시보드 (Render.com)

## 파일 구조

```
childrens-park-render/
├── server.js          ← Express 서버 (API 프록시)
├── public/
│   └── index.html     ← 대시보드 UI
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## Render.com 배포 방법

### 1단계: GitHub에 올리기

```bash
git init
git add .
git commit -m "어린이대공원 대시보드"
git remote add origin https://github.com/본인아이디/childrens-park-render.git
git push -u origin main
```

### 2단계: Render에서 서비스 생성

1. https://render.com 에서 GitHub 계정으로 가입/로그인
2. **"New +"** → **"Web Service"** 클릭
3. GitHub 저장소 연결
4. 아래 설정 입력:

| 항목 | 값 |
|---|---|
| **Name** | childrens-park-dashboard |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | Free |

5. **"Advanced"** 펼치기 → **"Add Environment Variable"**:
   - Key: `PARK_API_KEY`
   - Value: 개발계정 상세보기 > **일반 인증키** 붙여넣기

6. **"Create Web Service"** 클릭 → 2~3분 후 배포 완료

### 3단계: 고정 IP 확인 후 등록

배포 후 Render 대시보드에서 **Static Outbound IP**를 확인:
- 서비스 선택 → **Settings** → **Static Outbound IP Address**

이 IP를 공공데이터포털 또는 서울시설공단에 IP 허용 요청하면 됩니다.

> ⚠️ Free 플랜은 Static IP가 지원되지 않을 수 있습니다.
> 이 경우 Starter 플랜($7/월) 사용 필요.

## 로컬 개발

```bash
cp .env.example .env
# .env 파일에 실제 키 입력

npm install
npm start
# http://localhost:3000 접속
```
