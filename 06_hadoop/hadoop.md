# 1. Hadoop 시작전 배경지식

## 1.1 빅데이터 

> 3V +a 형태
>
> 양(대용량 데이터), 입출력속도, 다양성 ,정확성(분석 목적에 맞는 데이터), 가치(문제해결능력)



## 1.2 관계형 데이터베이스와의 차이점 (RDBMS)

> 공개 소프트웨어이기 때문에 무료이며 오라클과 같은 RDBMS 보다 비용이 저렴하며 linux의 RAID 방식에 착안하여 분산형 DBMS형태를 갖고있다.

## 1.3 하둡 에코시스템



# 2. 하둡 환경설정

## 2.1 Network Setting 

## 2.2 hostanme, etc/hosts  설정

## 2.3 JDK  설치

## 2.4  /etc/profile 수정

```
JAVA_HOME=/usr/local/jdk1.8.0
CLASSPATH=/usr/local/jdk1.8.0/lib
HADOOP_HOME=/usr/local/hadoop_1.2.1

PATH=.:$JAVA_HOME/bin:$HADOOP_HOME/bin:$PATH

export JAVA_HOME CLASSPATH HADOOP_HOME

```

​	수정이 끝난 훙에는 . /etc/profile 을 cmd에 입력해서 해당사항을 실행시켜준다

## 2.5 ssh 설정

```
ssh-keygen -t rsa
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
```

## 2.6  hadoop-env.sh 설정



## 2.7  hadoop-1.2.1/conf/*.xml 설정



