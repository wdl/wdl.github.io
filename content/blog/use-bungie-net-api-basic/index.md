---
title: Bungie.Net API 사용하기 기초
date: "2022-04-21T19:10:00.000+09:00"
description: Destiny와 관련된 서비스 개발을 위해 Bungie.Net API를 사용하는 법을 간단하게 알아보자.
tags:
    - Bungie
    - OAuth
---

## Bungie.Net 홈페이지에서 App 등록하기

[https://www.bungie.net/en/Application/](https://www.bungie.net/en/Application/)에서 App 정보를 등록한다.

등록할 때 작성하는 데이터들은 모두 나중에 수정할 수 있다.

## 사용자 OAuth 인증 시키기

위에서 등록한 앱으로 들어오면 OAuth Authorization URL이 있다.

OAuth Authorization URL에 OAuth `client_id`와 `response_type`을 Query string으로 GET 요청한다.

이 때, `response_type`은 `code`로 고정한다.

필요시 `state` 도 사용할 수 있다(요청과 콜백 사이의 상태를 유지하기 위해 클라이언트가 사용하는 임의값).

```url
https://www.bungie.net/en/OAuth/Authorize?client_id=[내 App의 OAuth client_id]&response_type=code
```

이 주소를 사용자에게 띄우면 사용자가 Bungie.Net 인증을 할 수 있다.

인증 후에는 아래 예시처럼 App 등록 때 설정한 `Redirect URL`로 `code`와 함께 돌아온다.

```url
https://[내 서비스 주소]?code=[코드]
```

## OAuth Access Token 받기

OAuth Token 엔드포인트는 다음과 같다.

```
https://www.bungie.net/Platform/App/OAuth/token/
```

OAuth Token 엔드포인트에 다음 데이터를 `x-www-form-urlencoded`(Query string 형식)로 POST 요청낸다.

- `grant_type`: `authorization_code`(`code`로 Access Token을 받아야하므로)
- `code`: 위에서 인증을 받아 가져온 사용자의 `code`
- `client_id`: 내 App의 OAuth `client_id`

OAuth Client Type이 Confidential이라면 `Authorization` 헤더를 사용하거나 `client_secret` 데이터를 보내 자격 증명을 해야한다.

```typescript
// 예시 코드
// import axios from 'axios';
// import querystring from 'query-string';

// ...

const oAuthBody = {
  grant_type: 'authorization_code',
  code: __CODE, // 사용자의 code
  client_id: __CLIENT_ID, // 내 App의 OAuth client_id
};

const response = await axios.post(
  'https://www.bungie.net/Platform/App/OAuth/token/',
  querystring.stringify(oAuthBody)
);
```

그럼 아래와 같은 형식의 데이터가 온다.

```json
// 예시 응답
{
    "access_token": "2YotnFZFEjr1zCsicMWpAA",
    "token_type": "Bearer",
    "expires_in": 3600,
    "refresh_token": "tGzv3JOkF0XG5Qx2TlKWIA", // Refresh Token은 Confidential Client App에만 옴
    "refresh_expires_in": 7776000, // Refresh Token은 Confidential Client App에만 옴
    "membership_id": "4352344"
}
```

## GetBungieNetUserById 요청 해보기

이제 [GetBungieNetUserById](https://bungie-net.github.io/multi/operation_get_User-GetBungieNetUserById.html#operation_get_User-GetBungieNetUserById) 요청을 날려보자.

API 문서에 따르면 GetBungieNetUserById 요청은 GET 메소드를 사용하고 주소는 `/User/GetBungieNetUserById/:id/`이다.

루트 엔드포인트가 `https://www.bungie.net/Platform`이므로, 이 요청의 엔드포인트는 다음과 같다.

```
https://www.bungie.net/Platform/User/GetBungieNetUserById/:id/
```

여기서 Path의 `:id`는 `membership_id`를 말한다.

인증을 위해 `Authorization` 헤더에는 위에서 받은 사용자의 `access_token`을 `token_type`대로(Bearer) 넣어주고, `X-API-Key` 헤더에는 내 App의 API Key를 넣어줘야 한다.

```typescript
// import axios from 'axios';

// 예시 코드 
const response = await axios.get(
  `https://www.bungie.net/Platform/User/GetBungieNetUserById/${__MEMBERSHIP_ID}/`, // 정보를 가져올 사용자의 membership_id
  {
    headers: {
      Authorization: `Bearer ${__ACCESS_TOKEN}`, // 사용자의 OAuth Access Token
      'X-API-Key': __API_KEY, // 내 App의 API Key
  }
});
```

그럼 아래와 같은 형식의 데이터가 온다.

```json
// 예시 응답
{
    "Response": {
        "membershipId": "24118779",
        "uniqueName": "Elenchus#5501",
        "displayName": "Elenchus",
        "profilePicture": 70507,
        "profileTheme": 1131,
        "userTitle": 0,
        "successMessageFlags": "0",
        "isDeleted": false,
        "about": "",
        "firstAccess": "2019-12-02T11:44:05.075Z",
        "lastUpdate": "2020-11-02T22:44:57.408Z",
        "context": {
            "isFollowing": false,
            "ignoreStatus": {
                "isIgnored": false,
                "ignoreFlags": 0
            }
        },
        "showActivity": true,
        "locale": "en",
        "localeInheritDefault": false,
        "showGroupMessaging": true,
        "profilePicturePath": "/img/profile/avatars/Destiny16.jpg",
        "profileThemeName": "d2_31",
        "userTitleDisplay": "Newbie",
        "statusText": "",
        "statusDate": "0001-01-01T00:00:00Z",
        "steamDisplayName": "Elenchus",
        "cachedBungieGlobalDisplayName": "Elenchus",
        "cachedBungieGlobalDisplayNameCode": 5501
    },
    "ErrorCode": 1,
    "ThrottleSeconds": 0,
    "ErrorStatus": "Success",
    "Message": "Ok",
    "MessageData": {}
}
```

## 그리고...

[bungie-api-ts](https://www.npmjs.com/package/bungie-api-ts)라는 패키지도 있다. 써보자.