#  1 vmware 사용법



## 1.1vmware 설치

> vmware 공식 홈페이지에 들어가서 설치 최신버젼 사용시 network 설정할 때 vmnetcfg파일이 없어서 설정이 불가능한 경우가 생기기 떄문에 항상 해당파일을 확인한다.

## 1.2 vmware 실행

> 처음 실행시 create를 이용해서 생성하고 디렉토리 설정과 메모리 프로세스 등을 설정할수 있다. iso파일을 이용해 OS설치



# 2 자주 쓰는 코드



## 2.1 mac주소 설정

```
cd /etc/sysconfig/network-scripts --해당 환경의 네트워크 설정이 담긴 곳

systemclt restart network --설정사항 변셩후 네트워크 재시작

hostname -- 호스트 이름보기

hostnamectl set-hostname 이름 --호스트 이름 설정

gedit /etc/hosts --호스트 목록들 ip와 hostname입력

♧(화면 청소는 clear 라고 소문자로 입력하면 됨 혹은 ctrl+l)

```



## 2.2 터미널/콘솔 시스템 종료 명령

```
현업에서 ui가 존재하지 않는 리눅스가 있을 수 있기 때문에 숙지

poweroff

halt -p

init 0

shotdown -P +10 --10분 후에 종료 (P: poweroff)
shotdown -r 22:00 --오후 10시에 재부팅(r: reboot)
shotdown -c --예약된 showdown 취소(c: cencel)
shotdown -k +15 --현재 접속한 사용자에게 15분 후에 종료된다는 메세지를 보내지만 실제로 종료는 안 됨
```



## 2.3 사용자 전환

```
pwd -- 현재 사용자의 home directory

su centos --centos 로 사용자 변경

whoami --현재 사용자

해당 상태에서 cd 라고 하면 해당 사용자의 home directory로 이동

su - centos --위 과정을 한번에 실행

su - 라고만 적을 시 root 계정으로 들어감

logout 
exit --사용 종료


```

## 2.3 화면 전환

> ctrl +alt +F5를 누르면 화면전체가 cmd 창으로 바뀜  ctrl +alt +F1 은 원상복구



## 2.4 파일 관리

> 폴더경로에 한글이 들어갈 경우 드래그 해서 복사 붙여넣기를 이용한다.

```
cat 파일 이름 --파일 내용확인 
ls - l --상세정보
ls - a --hidden file 까지 확인 가능
mkdir 폴더이름 --폴더생성
cp 파일 경로 .(복사해서 사용할 파일이름 생략가능) --경로에 존재하는 파일을 현재 디렉토리에 복사
diretory를 복사할경우 cp -r (복사할 파일) (rename) 와 같은 형태로 사용
mv 파일이름 변경할 이름 --파일 이름 수정
vi 파일이름 --파일 내용 수정 
방향키로 이동

i,a 해당위치에서 insert 모드 (I,A는 맨앞과 맨뒤로 이동)

s 해당위치에 있는 문자를 삭제하며 insert 모드 

x 그냥 삭제

o enter키와 같은기능

u undo

gg 제일 앞으로 이동

GG 제일 뒤로 이동

dd 행 삭제

yy 행 복사

set nu 라인 숫자 나오게하기

/검색할 내용  --검색기능 n을 누르면 다음 같은 단어

/%s/바꾸고싶은내용/바꿀내용 -- 검색된 목록 전체 수정

shift + ` uppercase


esc를 누르고 : 을 입력한뒤 q를 입력해 나갈 수 있다. 
q!를 입력하면 강제 종료하고 이전 상태로 돌아간다
```

## 2.5 cd/usb 관리

```
cd /dev/ -- 해당 디렉토리에서 cdrom 또는 usb 가 물리적으로 존재하는곳

root 아래에 usb나 cdrom을 마운트할 dir를 생성하고 마운트한다

mount /dev/cdrom /root/mycdrom 메모리에 cdrom에 있는 정보를 root아래 mycdrom 폴더에 올린다.

작업이 끝난 후 umount /dev/cdrom를 통해 메모리를 닫아준다.


```

## 2.6 tomcat을 이용해 서버열기

> 생성한 프로젝트를 tomcat이 설치된 폴더에 war파일 형태로 etc/apache-tomcat-9.0.22/webapps 폴더에 넣어주고 브라우저에서 해당 서버의 ip/프로젝트명 으로 접속한다.



# 3 CentOS 7 에 자바 및 이클립스 설치



## 3.1 자바 설치

> jdk파일을 직접 다운 받거나 wget을 이용해 다운 받은 후 tar xvf 를 이용해 압축을 푼다. 그 후 다운받은 파일을 etc 폴더에 옮긴다. 그 후 기존에 있단 usr/bin 아래의 java 심볼릭을 삭제하고 설치한 etc /jdk1.8.0/bin 아래의 자바에 심볼릭 링크를 해준다.

## 3.2 eclipse 설치

> 그냥 다운 받고 압축 풀면 된다. (최신버젼은 왜 안되는지 아직 모르겠음)

## 3.2 tomcat 설치

> 자바와 동일하게 다운받고 etc 폴더로 옮긴다. 그 후 firewall-config 에 들어가서 http포트를 열어준다. 또한 톰캣 폴더의 conf 폴더 안에 server.xml 파일의 내용을 보면 디폴트로 http 포트를 8080 으로 설정해 놨는데 이를 80으로 수정해준다. 그후 톰캣 폴더 안의 bin 에 startup.sh 와 shoudown.sh를 각각 starttomcat, stoptomcat으로 심볼릭 링크를 걸어준다.

