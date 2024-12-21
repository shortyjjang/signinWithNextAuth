# Next.js Authentication with NextAuth

이 프로젝트는 Next.js와 NextAuth를 사용하여 인증 기능을 구현한 예제입니다. 다양한 소셜 로그인 제공자와 사용자 인증을 지원합니다.

## 프로젝트 설정

### 요구 사항

- Node.js 14 이상
- npm 또는 Yarn

## 주요 기능

- **소셜 로그인**: Kakao, Google, Naver를 통한 소셜 로그인 지원
  - 구현 경로: `src/app/auth/signin/index.tsx`
- **이메일/비밀번호 로그인**: 사용자 인증을 위한 이메일 및 비밀번호 로그인
  - 구현 경로: `src/app/auth/signin/index.tsx`
- **세션 관리**: JWT를 사용한 세션 관리
  - 구현 경로: `src/auth/index.ts`
- **사용자 정보 업데이트**: 사용자 프로필 정보 업데이트 기능
  - 구현 경로: `src/auth/serverActions/index.ts`
- **로그아웃**: 사용자 로그아웃 기능
  - 구현 경로: `src/app/auth/signout/index.ts`

## 환경 변수 설정

`.env` 파일을 생성하고 다음과 같은 환경 변수를 설정합니다:

```
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_API_KEY=your_api_key
KAKAO_CLIENT_ID=your_kakao_client_id
KAKAO_CLIENT_SECRET=your_kakao_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NAVER_CLIENT_ID=your_naver_client_id
NAVER_CLIENT_SECRET=your_naver_client_secret
```

## 사용된 주요 패키지

- [Next.js](https://nextjs.org/): React 기반의 서버 사이드 렌더링 프레임워크
- [NextAuth.js](https://next-auth.js.org/): 인증을 위한 라이브러리
- [React](https://reactjs.org/): 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리
- [path-to-regexp](https://github.com/pillarjs/path-to-regexp): 경로 매칭을 위한 라이브러리

## 스크립트

- `dev`: 개발 서버를 실행합니다.
- `build`: 프로덕션 빌드를 생성합니다.
- `start`: 프로덕션 서버를 시작합니다.
- `lint`: 코드 린트를 실행합니다.