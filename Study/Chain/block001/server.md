# md 확장자는

- Markdown의 약자로 HTML과 비슷한 언어
- 주로 Git에서 많이 사용

# Server는

- 외부에서 접근하는 컴퓨터
- Server는 제공하는 것으로 (사람, 물건, 컴퓨터)
- 컴퓨터일 때 제공하는 것은 파일, 정보(데이터), 서비스를 제공한다.

# AWS

1.  putty를 사용해서 ip주소와 키 파일을 입력한다. (putty는 원격 프로그램이고 주로 22 port를 사용)
2.  putty는 ip 주소에 해당하는 server에 22 port로 접속을 시도
3.  server 컴퓨터는 22 port에 대한 방화벽이 열려있을 때 putty에서 보내온 키를 확인하여 접속을 허락
4.  꼭 putty를 사용해야 하는 것은 아닌다. CMD, PowerShell 등을 사용하여 접속 해도 된다.

# AWS EC2 Apache에서 접속 방법

1.  server 컴퓨터(EC2의 인스턴스)의 정보를 요청할 때 Apache에서 해당 요청을 받게 된다. Apache는 설정된 모든 port에 대해서 요청을 받음
2.  VirtualHost에 설정된 Port와 Root 폴더에 맞춰서 요청에 응답한다. Root 폴더에 연결하여 파일을 응답한다. VirtualHost란 Apache에서 연결할 port를 설정하는 것이다.

# AWS EC2 Apache에서 접속 방법 예시

1. naver.com 의 주소로 요청을 보냈을 때 (클라이언트)
2. 도메인 주소에 해당하는 ip주소의 컴퓨터(EC2)에 요청을 보낸다. server 컴퓨터는 해당 주소에 대하여 어디를 시작점을 잡을 것인지를 확인 해야 된다.시작점은 C:\ , D:\ (폴더) 윈도우에서 어떤 하드디스크에 접속할 건지를 설정 해줘야 된다.
3. Apache에서 Root (폴더)로 설정된 폴더의 파일을 응답한다. server의 시작점은 apache에서 설정된 Root 폴더이다. 만약 /var/www/html 폴더가 기본 설정으로 되어있으면 Root 폴더에 해당한다.

