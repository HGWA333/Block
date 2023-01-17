# jest를 사용해보자

- jset는 TDD 개발에 용이하다.
- 테스트 코드를 작성할 수 있다.
- 페이스북에서 만든 프레임워크

# jset 설치 방법

- npm i --save-dev jest
- --save-dev는 개발용으로만 설치 할 때 사용
- 테스트 할 때는 js 파일이 아니라 test.js 파일로 만들어 준다. (merkle.js -> merkle.test.js 식으로 바꿔줌) 이것은 테스트 코드를 사용하는 파일이라고 명시 해주는 것이다.
- package.json 파일 중 기존 script에 "scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
  } 이런 식으로 작성이 되어있다. 이걸 "scripts": {
  "test": "파일 경로"
  }식으로 바꿔준다.
- 이후 npm test 로 사용을 하면 된다.
