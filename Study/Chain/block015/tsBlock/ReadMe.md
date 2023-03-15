# BlockChain TypeScript

- 블록체인 생성시 설치 할 기본 명령어

```터미널
npm i -D typescript ts-node @types/node
npm i crypto-js hex-to-binary merkle
npm i -D @types/crypto-js @types/merkle
```

- 타입에 대한 전역 초기화

  - @types에 모두 모아둔다.
  - tsconfig.json 파일에 아래 내용을 추가한다.

  ```json
  {
    "compilerOptions": {
      "typeRoots": ["./node_modules/@types", "./@types"]
    }
  }
  ```

- 파일에 대한 별칭 설정
  - import시 별칭으로 짧게 불러올 수 있다.

```json
{
  "compilerOptions": {
    "paths": {
      "@core/*": ["src/core/*"],
      "*": ["@types/*"]
    }
  }
}
```

```js
// "paths":{"@core/*": ["src/core/*"]} 사용시
import a from "src/core/a.ts";
// 위 코드를 아래와 같이 사용할 수 있음
import a from "@core/a.ts";
```

# declare

- declare는 TypeScript Compiler에게 타입이 선언되었음을 알려준다.
- 컴파일(변환)할 때 포함되지 않는다.

# .d.ts 파일 불러오기 오류 해결 방법 (ts-node 에러 해결 됨)

- npm i -D tsconfig-paths
- 이후 tsconfig.json 파일에 아래 내용을 추가한다.

```json
{
  "ts-node": {
    "files": true,
    "require": ["tsconfig-paths/register"]
  }
}
```

- "ts-node"는 "compilerOptions"와 같은 선상에 위치

- 설치 경로는 가장 최상단 루트 폴더

- ts-node :ts-node 실행 시 설정
- files : declare 가져올 시 발생하는 에러 해결로 전역에서 사용할 수 있게 한다.
- require : 터미널에서 ts-node 실행 시 필요한 라이브러리를 설정하고 없으면 아래와 같이 실행한다.

- require가 있을 때

```터미널
npx ts-node src/core/block/block.ts
```

- require가 없을 때

```터미널
npx ts-node -r tsconfig-paths/register src/core/block/block.ts
```
