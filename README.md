# 안전 표지판 마을 탐험

청각장애 아동을 위한 태블릿 기반 안전 표지판 학습 콘텐츠입니다.
마을 지도를 탐험하며 숨겨진 표지판을 찾고, 드래그 앤 드롭으로 문장을 완성하는 인터랙티브 학습 앱입니다.

---

## 화면 흐름

```
인트로 → 지도 탐험 → 미션 (드래그 앤 드롭)
```

| 씬 | 설명 |
|----|------|
| **IntroScene** | 캐릭터 WebM 영상이 루프 재생되며 안내 메시지 표시. 화면 터치 시 다음 단계 |
| **MapScene** | 마을 지도 위에 핫스팟(map-marker) 표시. 클릭/터치 시 미션 진입 |
| **MissionScene** | 공사장 표지판 이미지와 함께 9개 단어 중 정답 3개를 드래그 앤 드롭으로 문장 완성 |

---

## 기술 스택

- React 19 (Create React App)
- 순수 CSS (vw/vh 기반 반응형)
- HTML5 Drag & Drop API + Touch Events (터치 디바이스 대응)
- WebM (VP9) 영상 애니메이션
- Pretendard 폰트

---

## 프로젝트 구조

```
public/
└── character.webm               # 인트로 캐릭터 영상 (VP9, 1920x1080, 30fps)

src/
├── assets/
│   ├── woman-compressed/        # 원본 프레임 시퀀스 (woman-0000.webp ~ woman-0120.webp, 121프레임)
│   ├── character-smile.png      # 미션 가이드 캐릭터
│   ├── sign-construction.png    # 공사장 표지판
│   └── town-map.png             # 마을 지도 배경
├── components/
│   ├── IntroScene/
│   │   └── IntroScene.jsx       # WebM 영상 루프 재생
│   ├── MapScene/
│   │   └── MapScene.jsx
│   └── MissionScene/
│       └── MissionScene.jsx     # 드래그 앤 드롭 미션 (non-passive 터치 이벤트)
├── App.jsx                      # 씬 상태 관리
├── App.css                      # 전역 스타일
└── index.js
```

---

## 시작하기

```bash
npm install
npm start
```

브라우저에서 `http://localhost:3000` 접속

---

## 캐릭터 영상 재생성

원본 프레임 시퀀스(`src/assets/woman-compressed/`)로부터 WebM 영상을 생성합니다.
ffmpeg이 필요합니다.

```bash
# ffmpeg 설치 (WSL/Ubuntu)
sudo apt install ffmpeg

# 영상 생성 (투명 배경 유지)
ffmpeg -r 30 -i src/assets/woman-compressed/woman-%04d.webp -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 0 -crf 20 -an public/character.webm
```

---

## 반응형

- 기준 해상도: 태블릿 가로형 (768px ~ 1024px)
- 모든 크기 값을 `vw` / `vh` 단위로 처리하여 화면 크기에 따라 자동 스케일
- 터치 드래그 지원 (`touch-action: none` + Touch Events)
- 사파리 하단 safe area 대응 (`env(safe-area-inset-bottom)`)
- 크롬/사파리 모바일 뷰포트 호환 (`-webkit-fill-available`, `position: fixed`)

| 구간 | breakpoint |
|------|-----------|
| 모바일 | ~ 767px |
| 태블릿 | 768px ~ 1024px |
| 데스크탑 | 1025px ~ |
