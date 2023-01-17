# TCTP를 이용한 서버 구축

# OSI 7 Layer

- 통신을 진행하는 과정을 단계로 나눈 규칙
- 이름처럼 7 단계로 나누어져 있으며 하드웨어부터 프로그램까지 정보를 주고받는 과정

# TCP/IP 4 layer

- OSI 7 Layer와 마찬가지로 통신의 과정을 단계로 나눈 규칙
- OSI 7 Layer보다 많이 사용
- IP는 TCP/IP의 2단계인 Internet Protocol의 약어
- 3단계는 TCP / UDP를 포함
- 4단계는 HTTP(HTML,브라우저), FTP(FileZilla), SSH(Putty)를 포함

# TCP/IP Protocol 4단계

- 1. Network Interface

  - 데이터(패킷)를 주고 받는 과정
  - 에러 확인, 패킷 생성 등을 작업

- 2. Internet

  - 목적지에 연결한다.
  - IP 주소(어디에 요청을 보낼 것인가 하는 목적지)

- 3. Transport

  - 통신 연결을 제어한다.
  - TCP / UDP 방식이 있다.

- 4. Application
  - 프로그램(브라우저)에 데이터를 전달한다.
  - telnet, FTP, DHCP, TFTP, HTTP, SMTP, DNS, SNMP 등등

# 프로토콜

- 프로토콜은 통신 규약
- 인터넷 상에서 정보를 주고 받기 위한 규칙

# TCP

- 통신을 연결 방식

  - 출발지 (요청을 보낸 곳)와 목적지(서버)를 미리 연결하고 정보를 전달한다.

장점

- 연결로 정보를 제대로 받았는지 확인한다.(신뢰도가 높은 장점이 있음 )

단점

- 단점은 UDP 보다 느리다. (연결하고 검사하는 과정들 때문)

특징

- 3-way handshaking 과정을 통해 연결

SYN = Synchronize sequence numbers (동기화된 순차 번호)

ACK = ACKnowledgment (승인)

순서

- 1. 클라이언트(브라우저)가 서버에 요청을 보낸다. (SYN)
- 2. 서버는 브라우저에게 요청 수락을 보낸다. (SYN / ACK)
- 3. 브라우저는 요청 수락을 잘 받았다고 서버에 보낸다. (ACK)
- 4. 데이터를 주고 받는다.
- EX 순서 1~3번 과정이 3-way handshaking 과정

# UDP

- 통신을 연결하지 않는 방식

장점

- 정보를 보낼 뿐 자세한 점검은 하지 않는다.

단점

- 단점은 데이터 누락 시 (요청을 보냈는데 받지 못했을 때)에 대한 처리가 없음

# OSI 7 Layer TCP/IP Protocol 4단계 비교
