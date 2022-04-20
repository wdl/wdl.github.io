---
title: Supercharge Promise Pool로 Promise 배치 실행하기
date: "2022-04-20T17:48:00.000+09:00"
description: 동시에 처리되는 최대 작업수를 제한한 Promise 배치를 실행 해보기.
tags:
    - Typescript
    - Promise
---

## 환경

- `npm 8.1.2`
- `tsc Version 4.6.3`
- `@supercharge/promise-pool 2.1.0`

## @supercharge/promise-pool 설치

```bash
npm i -s @supercharge/promise-pool
```

## 모듈 로더 작성

사용할 코드 상단에 다음과 같이 작성.

```typescript
import { PromisePool } from '@supercharge/promise-pool';
```

## Promise Pool 사용

```typescript
const { results } = await PromisePool
  .for([...Array(32).keys()]) // [0, 1, 2, 3 ... 31] 
  .withConcurrency(4) // 기본값은 10
  .process(async (value, index, pool) => {
    return value * 2;
  });

// results = [0, 2, 4, 6, ... 62];
```

`.process()`의 함수가 `.for()`의 배열 원소를 `value`로 최대 `.withConcurrency()`에서 설정된 수 만큼 동시에 실행되며 그 최종 결과가 `results`로 반환됨.

## 에러 제어

```typescript
const { results, errors } = await PromisePool
  .for(array)
  .process(async (value, index, pool) => {
    // …
  });

errors.forEach(error => {
  // `error.item` 에는 에러 사유가 들어있음
});
```