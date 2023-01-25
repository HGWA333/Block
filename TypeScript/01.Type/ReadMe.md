#TypeScript(타입 스크립트)

- 기본 설치 방법 : npm i -D typescript

- 마이크로소프트에서 만든 Javascipt 기반 프로그래밍 언어

  -"슈퍼셋" 이라고 부른다.

- 타입 스크립트는 Javascript에 Type, 자료형 확인을 추가한 것이다.

- 자료형 : number, string, boolean, null, undefined, Array, Object

- 타입 스크립트는 바로 실행하는 것이 아닌 Compiler를 사용한다.

- 컴파일러는 작업자가 작성한 코드를 컴퓨터가 알 수 잇는 언어로 변환하는 것으로 대표적인 언어는 C++, C#, Java 등에서 사용

- 타입 스크립트는 브라우저, node.js에서 바로 사용할 수 없다.

- 명령어 tsc(TypeScript Compiler)를 사용한다.
- tsc -v : 버전을 확인
- tsc 파일 이름 : Javascript로 파일을 변환시킨다. (ts파일을 js파일로 변환) // 예) npx tsc index.ts
- tsc와 npx의 차이
- npx tsc : npm i -D typescript (현재 프로젝트에서만 사용 가능)
  -tsc : npm i -g typescript (전역으로 설치되어서 어디서든 사용 가능)

# interface

- TypeScript에서의 interface는 Type을 미리 정의해두는 것
- 일반적인 변수 등등에 사용 가능하며 class에 상속이 가능하다.
- 설계도 비슷
