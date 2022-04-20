---
title: Typescript에 ESLint 적용하기
date: "2022-04-19T23:19:00.000+09:00"
description: Typescript로 개발할 때 정적 코드 분석 도구 ESLint를 적용하여 코딩 컨벤션을 통일하자.
tags:
    - Typescript
    - ESLint
---

## 환경

- `npm 8.1.2`
- `tsc Version 4.6.3`
- `eslint v8.13.0`

## Node.js 프로젝트 초기 설정

```bash
npm init
```

`package.json` 파일 생성됨.

## Typescript 및 ESLint 패키지 설치

코딩컨벤션은 [eslint-config-airbnb](https://github.com/airbnb/javascript)를 사용함.

```bash
npm i -D typescript
npm i -D eslint eslint-config-airbnb eslint-plugin-import
npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

## Typescript 초기 설정

```bash
npx tsc -init
```

`tsconfig.json` 파일 생성됨.

## ESLint Config 생성

`.eslintrc` 파일을 생성하여 아래 내용 작성.

```javascript
// .eslintrc
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": [
    // Airbnb JavaScript Style Guide 적용
    "airbnb",
    // TypeScript ESLint recommanded style 적용
    "plugin:@typescript-eslint/eslint-recommended"
  ]
}
```

## Linting Script 추가

`package.json`의 `scripts` 부분에 아래와 같이 Linting script 추가

```javascript
// package.json
"scripts": {
  // ...
  "lint": "eslint src/**/*.ts",
  "lint:fix": "eslint --fix src/**/*.ts"
},
```