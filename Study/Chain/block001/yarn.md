# yarn build란?

- jsx, css, js, html 파일 등등을 하나로 합쳐서 Front 에서 인식할 수 있는 파일로 생성해준다.
- Front에서 인식할 수 있는 파일 html, css, js ,png 등등등..
- webpack, babel 라이브러리를 사용하게 된다.
- webpack이란 js 모듈 번들러로 파일을 하나로 묶어주는 기능
- bable이란 js 컴파일러
- 기존 es6등 최신 js문법을 지원하지 않는 브라우저는 es5 이하 문법으로 수정 해줌
- 하나로 완성된 build 폴더 파일들을 Front의 파일로 배포
- 코드 난독화, 코드 압축 등을 진행한다.
- 컴파일러는 개발자가 작성하는 프로그래밍 언어를 컴퓨터가 읽고 실행할 수 있는 언어로 바꿔준다.
- react로 개발된 프로젝트는 yarn build (npm bulid) 명령어를 실행해서 bulid 폴더에 생성되는 파일로 웹 페이지를 배포한다.
- AWS EC2 인스턴스에 build 폴더 내에 있는 파일, 폴더를 모두 올려 웹페이즈를 출력 할 수 있다.



