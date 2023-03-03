# Windows Store 터미널 미설치시

- 기초 확인 사항

1. Windows 사양에서 버전 21H2을 확인. 20H2면 설치 안됨
2. 제어판 -> 프로그램 추가 제거 -> windows 기능 켜기 / 끄기 -> Linux용 windows 하위 시스템 체크
3. Microsoft Sotre 에서 terminal 설치 (PowerShell)과 같은 걸로 나온다. WSL 사용에 있어 terminal을 설치하여 사용하는 것을 권장

# Windows Store 터미널 설치 후 Ubuntu를 사용하기 위한 기본 세팅

------------- 여기부터 터미널을 새창으로 열고 설치 시작 ----------------

1.배포 이미지 관리

```sh
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

2.가상 머신 활성화

```sh
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

위 1,2 설치 후 아래의 명령어로 설치 가능한 Linux OS를 확인할 수 있음

3.설치 가능한 리스트 확인

```sh
wsl --list --online
```

4.Ubuntu 설치

```sh
wsl --install -d Ubuntu
```

5.WSL를 사용하기 위해 아래 프로그램 설치 "x64 머신용 최신 WSL2 Linux 커널 업데이트 패키지"

```sh
https://learn.microsoft.com/ko-kr/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package
```

6.WSL의 버전을 확인하기 위해 아래의 명령어 사용

```sh
wsl -l -v
```

7.WSL 2 버전 사용하기

```sh
wsl --set-version Ubuntu 2
```

8.터미널에서 Ubuntu 여는 명령어

```sh
wsl
```

9.터미널에서 Ubuntu 나갈 때 명령어

```sh
exit
```

# WSL에서 Ubuntu를 삭제 방법

```sh
 wsl --unregister Ubuntu
```

---------------- 여기까지 터미널 설치 작업 끝 ------------------

---------------- 여기부터 Node.js 설치 작업 시작 ------------------

# Node.js NVM 설치

- NVM 설치

```sh
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install nodejs
```

- 설치 주소 : nvm https://github.com/nvm-sh/nvm
- 설치 : curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
- nvm install 18.12.1 (18.12.1 Node.js 버전 설치)
- nvm use 18.12.1 (18.12.1 버전을 사용한다는 의미)

# NVM 설치 실행 오류 시

```sh
# Ubuntu 실행 후 아래 명령어들 입력
source ~/.bashrc
nvm
 nvm install 본인nodejs 버전 # 예) nvm install 18.13.0
```

# NVM의 명령어

- nvm ls-remote : 설치 가능한 Node.js의 모든 버전을 보여줌

- node -v : 현재 버전 확인

# Ubuntu 기본 명령어

- cd

  - 폴더 이동
  - / : Root 경로(최상위 경로)
  - ~ : Home 경로(/home/사용자 이름)

- mkdir 폴더명 : mkdir 명령어를 입력하면 루트 폴더 기준 점에서 폴더 생성 예) mkdir test => test 폴더가 생성 됨

- pwd : 현재 경로 출력

- ls

  - 현재 폴더의 내용을 출력
  - 옵션으로 대표적으로 a와 l을 사용
  - ls -al : 권한 용량 등 모든 파일/폴더를 출력(숨긴 파일 포함)

- clear : 화면 초기화

- curl : 인터넷 접근 (요청) \* 자주 사용

# Geth를 사용하기 위한 기본 세팅

- Geth는 GO로 구현된 이더리움 서버

1. Golang 설치

- Google에서 개발한 프로그래밍 언어(컴파일 언어)
- 이름은 Go 이지만 검색 등 불편하여 Golang이라고 부른다.

```sh
sudo apt-get install golang
```

2. Golang 버전 확인

```sh
go version
```

3. 아래의 라이브러리들을 설치한다.

```sh
sudo apt-get install libgmp3-dev tree make build-essential
```

- libgmp3-dev : 다중 정밀도 산술 라이브러리
- tree : 디렉토리를 tree 형태로 보여준다. (잘못 사용하면 큰일이 일어남)
- make : 통합 컴파일러, 다양한 언어에 대해서 알아서 bulid를 해준다.
- bulid-essential : build에 필요한 기본 라이브러리들을 제공

4. Go-Etherreum 설치

- geth 폴더 생성후 geth 폴더 안에서 Go-Etherreum를 설치
- Go-Etherreum는 이더리움에서 제공하는 공식 소프트웨어

```sh
mkdir geth
git clone https://github.com/ethereum/go-ethereum
```

5. Go-Etherreum 설치 후 생성된 go-ethereum 폴더에서 아래 명령어 실행

```sh
make all # go-ethereum 폴더에서 실행
```

6. 생성한 geth를 위치에 상관없이 명령어로 사용할 수 있도록 설정

- pwd로 확인한 geth의 경로
- ubuntu프로그램 실행 상태에서 /home/wg86/geth/go-ethereum/build/bin 경로에 들어가 .bash_profile 이름으로 파일을 생성한다.
- 방법은 vi (텍스트를 편집하는 기능, 만들기도 할 수 있다.)

```sh
vi ~/.bash_profile # vi는 텍스트를 편집하거나 해당 파일이 없이면 새로 생성
```

- 파일이 생성 되고 파일이 열리면 아래 내용을 입력

```sh
export PATH=$PATH:/home/wg86/geth/go-ethereum/build/bin
# - 위 내용 입력 후 수정 완료 시 esc 하고 :wq! 하고 엔터
# - 여기서 wq! 중에서 w는 저장, q는 나가기, !는 강제한다.
```

- :wq!로 빠져나온 이후 아래 명령어를 입력

```sh
source ~/.bash_profile # source  ~/.bash_profile를 사용하여, 어디서든지 geth 명령어로 geth 실행가능
```

7. go-ethereum/build/bin 폴더에서 geth 실행

```sh
geth # go-ethereum/build/bin 폴더에서 실행
```

# Ubuntu 실행시 계정이 하얀색으로 표시 될 시

- 아래 명령어 입력하면 초록색으로 표시 됨

```sh
source ~/.bashrc
```

# Geth 폴더에서 설치가 안될 시 chmod로 권한 설정

- Ubuntu 로그인 된 ~(홈) /(루트)에서 명령어 ls -al 입력

```sh
ls -al
```

- 이후 상황에 따라 chmod로 권한 변경

```sh
chmod  000  파일명 # 모든 사용자가 읽고 쓰고 실행할 수 없도록 지정.
chmod  777  파일명 # 모든 사용자가 읽고 쓰고 실행할 수 있는 권한 지정.
chmod  755  파일명 # 소유자는 모든 권한, 그룹 및 그 외 사용자는 읽기와 실행만 가능.
chmod  440  파일명 # 소유자 및 그룹은 읽기 가능, 그외 사용자는 권한 없음.
```

```sh
 chmod u+x FILE                    # 파일 소유 사용자에게 실행권한 추가.
 chmod u+w FILE                    # 파일 소유 사용자에게 쓰기 권한 추가.
 chmod u=rwx FILE                  # 파일 소유 사용자에게 읽기, 쓰기, 실행 권한 지정.
 chmod u-x FILE                    # 파일 소유 사용자의 실행 권한 제거.
 chmod g+w FILE                    # 파일 소유 그룹에 쓰기 권한 추가.
 chmod g-x FILE                    # 파일 소유 그룹의 실행 권한 제거.
 chmod o=r FILE                    # 파일 소유 사용자 및 그룹을 제외한 사용자는 읽기만 가능.
 chmod a-x *                       # 현재 디렉토리의 모든 파일에서 모든 사용자의 읽기 권한 제거.
 chmod a-w FILE                    # 모든 사용자에 대해 쓰기 권한 제거.
 chmod u=rwx,g=r FILE              # 파일 소유 사용자는 모든 권한, 그룹은 읽기만 가능.
 chmod ug=rw FILE                  # 파일 소유 사용자와 그룹이 읽기, 쓰기 가능.
 chmod g=rw,o=r FILE               # 파일 소유 그룹은 읽기, 쓰기 가능, 그 외 사용자는 읽기만 가능.
 chmod ug=rw,o=r FILE              # 파일 소유 사용자 및 그룹은 일기, 쓰기 가능, 그외 사용자는 읽기만 가능.
 chmod 000 FILE                    # 모든 사용자의 모든 권한 제거. = ---------
 chmod 664 FILE                    # 사용자(읽기+쓰기), 그룹(읽기+쓰기), 그외 사용자(읽기) = rw-rw-r--
 chmod 755 FILE                    # 사용자(읽기+쓰기+실행), 그룹(읽기+실행), 그외 사용자(읽기+실행) = rwxr-xr-x
 chmod 777 FILE                    # 모든 사용자에 모든 권한 추가.
 chmod -R g+x DIR                  # DIR 디렉토리 하위 모든 파일 및 디렉토리에 그룹 실행(x) 권한 추가.
 chmod -R o-wx *                   # 현재 디렉토리의 모든 파일에서 그외 사용자의 쓰기, 실행 권한 제거
 chmod -R a-x,a+X *                # 현재 디렉토리 기준 모든 파일 읽기 권한 제거, 디렉토리 실행 권한 추가.
 chmod -R a-x+X *                  # 위(chmod -R a-x,a+X *)와 동일.
 chmod u=g FILE                    # FILE의 그룹 권한 값을 사용자 권한으로 적용.
   $ ls -l
   -rwxr--r-- 1 ppotta manager   23 Mar 26 04:13 FILE
   $ chmod u=g FILE
   -r--r--r-- 1 ppotta manager   23 Mar 26 04:13 FILE
 chmod u+g FILE                    # FILE의 사용자 권한에 그룹 권한 값을 추가.
    $ ls -l
    -r-x-w--w- 1 ppotta manager   23 Mar 26 04:13 FILE
    $ chmod u+g FILE
    -rwx-w--w- 1 ppotta manager   23 Mar 26 04:13 FILE
```
