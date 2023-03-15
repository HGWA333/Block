# tsc

- npm init
- npm i -g typescript 는 node.js에 전역으로 설치 하는 것
- tsc -init 은 TypeScript Compiler에 대한 기본 설정 파일을 생성

```json
{
  "compilerOptions": {

    "target": "es2016"
    "module": "commonjs"
    "esModuleInterop": true
    "forceConsistentCasingInFileNames": true
    "strict": true
    "skipLibCheck": true
  }
}
```

- compilerOptions : Complier에 적용할 설정들

  - target : 어떤 버전의 Javascript로 변환할 것인지 설정하는 것으로 es2016은 ES7문법으로 ES문법의 종류는 ES5, ES6, es2022 등등 문법들을 사용이 가능하다.

- module

  - 내보내기(export, module, exports), 가져오기(import, require)에 있어 어떤 문법을 사용할 것인지 설정
  - commonJS : ES5 이하 문법(module.export, require)를 사용하도록 설정

- esModuleInterop

  - commonJS 방식으로 module.exports 방식으로 출력된 라이브러리, 모듈에 대하여 "import \* as 이름" 방식을 사용할 수 있게 해주는 설정
  - 예) import as React from 'react'

- forceConsistentCasingInFileNames

  - 가져올 때 대소문자 구분을 확실하게 해주는 설정
  - 예) import a from 'a' vs import A from 'A'

- strict

  - 정확한 사용을 위해 모든 검사 설정을 활성화

- skipLipCheck
  - .d.ts 파일의 타입 확인을 건너뛴다.

# .d.ts 파일

- 타입 선언 파일이라고 부르며 코드에서 사용할 타입들을 미리 선언해둠
- 설정에 따라 선언해둔 타입을 전역에서 사용가능
  - number, string 등과 같이 requier, import 없이 타입을 가져와서 사용 가능

JS파일 컴파일 상황 1

```터미널
tsc
```

- tsc는 파일을 JS(Javascript)파일로 컴파일(변환)한다. 단 tsconfig.json 파일의 설정을 기준으로 컴파일 한다. tsc를 하게 되면 프로젝트 내의 파일 전체를 컴파일 해준다.

JS파일 컴파일 상황 2

```터미널
tsc index.ts
```

- index.ts 파일을 JS파일로 컴파일 하며 import 혹은 export 되어있는 것 까지 모두 컴파일 한다.
