

# AWS 구축 방법

## 1.  AWS 계정 생성 및 인스턴스 생성

### 	1.1 계정생성

> 페이지 상단에 회원가입을 실시한다 단 반드시 해외결제가 가능한 카드가 있어야함

### 	1.2 인스턴스 생성

> 먼저 검색창에 EC2로 검색을 하여 인스턴스 생성페이지로 들어간다.
>
> 
>
> 생성 전에 항상 지역을 설정 해주도록 하자 (아래 그림 참조)

![지역 변경](https://user-images.githubusercontent.com/57747689/74001300-72f4bb80-49ae-11ea-8ab3-cd793ff75c17.png)



![인스턴스 OS](https://user-images.githubusercontent.com/57747689/74001298-71c38e80-49ae-11ea-8549-51347e8e355a.png)

OS는 프리웨어 태그가 붙은것만 사용 가능하다.

![인스턴스 페어키 생성](https://user-images.githubusercontent.com/57747689/74001299-725c2500-49ae-11ea-80f4-71fbaa73ff97.png)

그 후 계속 다음을 눌러서 생성이 완료되면 페어키를 생성하라는 페이지가 나온다

### 1.3 탄력적 ip 설정

> 로컬에서 뿐만 아니라 외부에서 접속 하려면 탄력적 ip설정을 해주어야한다.

![탄력적 ip 설정전](https://user-images.githubusercontent.com/57747689/74001301-72f4bb80-49ae-11ea-82d9-e3a5588b1b76.png)



네트워크 및 보안 탭의 탄력적 IP 클릭



![탄력적 ip 주소 할당](https://user-images.githubusercontent.com/57747689/74001306-74be7f00-49ae-11ea-824b-dd8401490276.png)

할당 버튼 클릭

![탄력적 ip 주소 연결창](https://user-images.githubusercontent.com/57747689/74001305-7425e880-49ae-11ea-8ef3-48e4caa57250.png)

네트워크 인터페이스 레디오버튼 클릭후  생성한 인스턴스의 인터페이스와 프라이빗 IP 주고 설정

![탄력적 ip 주소 연결](C:\Users\student\Desktop\AWS image\탄력적 ip 주소 연결.png)

탄력적 IP 주소 연결 클릭



### 1.4 보안그룹 설정

> 모든ip에서 접속가능하도록 보안 규칙을 추가해준다.

![](https://user-images.githubusercontent.com/57747689/74001468-104fef80-49af-11ea-8237-766f21b3e2b3.png)

보안그룹의 실행 마법사 클릭

![](https://user-images.githubusercontent.com/57747689/74001469-104fef80-49af-11ea-834d-82f28a494399.png)

나온 화면의 편집 클릭

![](https://user-images.githubusercontent.com/57747689/74001307-74be7f00-49ae-11ea-9d61-67feef13eb76.png)

인바운드 규칙에 외부에서 모두 접속할수 있도록 설정 해당 설정을 해놓아야 브라우저로 인스턴스에 접근할 수 있다.



## 2. AWS 인스턴스 접속

### 	2.1 git bash 창에 명령어를 입력하여 접속

> 상단에서 진행했던 과정을 끝내면 pem 파일을 다운받는 창이 나오는데 이것을 다운로드 하고 아래의 명령어는 pem 파일이 있는 경로에서 명령어를 실행해야한다.

```bash
chmod 400 yhsyhs121.pem(pem 파일이름) // 외부에서 접근하지 못하도록 설정

ssh -i "yhsyhs121.pem" root@ec2- ....  

// 위의 명령을 실행하면 ssh 환경으로 git bash에 리눅스 터미널이 열린다.(원격)
```

### 2.2 브라우저로 접속

![브라우저에서 터미널 연결1](https://user-images.githubusercontent.com/57747689/74001470-10e88600-49af-11ea-8a55-f2690ca11cb9.png)

EC2 화면에서 연결버튼을 누른다

![브라우저에서 터미널 연결2](https://user-images.githubusercontent.com/57747689/74001471-10e88600-49af-11ea-9df5-f52ed9aea3c7.png)

인스턴스 연결을 선택하고 연결을 누른다 해당 화면은 인스턴스의 OS에 root 계정으로 들어간다는 뜻이다. 

![image-20200207132602117](https://user-images.githubusercontent.com/57747689/74001336-8dc73000-49ae-11ea-8adb-0846542874f4.png)



연결을 누르면 해당화면처럼 브라우저를 터미널로 사용할 수 있다.



## 3.AWS 인스턴스 환경설정

### 	3.1 java 버전 확인 및 설치

> 위와같이 입력하면 ssh통신으로 인스턴스에 접속된다. git bash창이 인스턴스의 리눅스 터미널과 같은 역할이 되는데 이제부터는 리눅스 명령어를 실행한다(exit를 치면 종료되거 git bash로 돌아옴)
>
> 인스턴스 생성때 OS 선택에서 Java가 포함되어 있는 OS를 선택할 시 설치되어 있는 Java의 버젼을 확인한다.
>
> 기본적으로 7버젼이 설치되어있을텐데 이를 삭제하고 jdk1.8.0버젼을 설치하거나 아무것도 설치되어 있지 않은 OS를 선택하여 jdk1.8.0버젼을 설치해 준다.
>
> 설치가 끝난 후에 버젼을 확인해주자

```
java -version// 버젼을 확인하고 있으면 삭제하고 없으면 바로 설치 command를 실행한다.
rm java// 기존에 깔려있단 자바의 소프트링크 삭제
whereis java// 실행하면 보통 usr/bin 아래에 있는데 이를 지워준다.
rm -rf /usr/bin/java// 기존 자바 삭제
sudo yum install -y java1.8.0-openjdk-devel.x86_64 // jdk1.8.0설치 
```

### 3.2 Tomcat 9.0 설치

> 기존에 yum에서 지원하는 버젼이 8.0버젼 밖에 없기때문에 9.0을 bash창을 실행하고있는
>
>  윈도우에서 9.0을 다운받은 후 1에서 설치한 .pem 파일과 같은 경로에 apache-tomcat9.0.tar.gz
>
>  파일을 저장한다. 파일을 저장한 뒤 그 파일을 AWS 인스턴스에 저장해야하는데 이는 
>
> 예전 hadoop에서 배웠던 scp commad를 사용한다.

```
scp -i "yhsyhs121.pem" apache-tomcat-9.0.30.tar.gz ec2-user@ip-172-31-43-254:~/
//scp pem 파일참조 복사할 파일 hostname:복사할 장소
```

> 복사된 압축파일을 풀고 압축을 푼 곳()에 소프트링크를 걸어준다. 그리고 WAR파일도 위와같은 방법으로 복사하여

```
 ln -s apache-tomcat-9.0.30/bin/start.sh  starttomcat // 톰캣 시작 소프트링크 걸기
 
 ln -s apache-tomcat-9.0.30/bin/shutdown.sh  stoptomcat// 톰캣 종료 소프트링크 걸기
 
 ./starttomcat //톰캣 시작
 ./stoptomcat //톰캣 종료
```

```
scp -i "yhsyhs121.pem" ***.WAR ec2-user@ip-172-31-43-254:~/apache-tomcat-9.0.30/webapp
```

> apache-tomcat-9.0.30/webapp 아래에 넣어서 톰캣을 실행시킨다.