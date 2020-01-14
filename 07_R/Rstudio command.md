# Rstudio command

>  ctrl + Enter :실행
>
>  ※패키지중 datasets는 R에서 기본으로 제공하는 샘플데이터이다.
>
>  변수명에 . 을 사용할 수 있다.
>
>  https://thebook.io/006723/ 공부할때 참조
>
>  RHive? https://www.slideshare.net/SeonghakHong/r-hive-tutorial-1-14445845
>
>  리눅스에서 R을 사용할 경우 리눅스를 최신버젼으로 사용해야한다.
>
>  
>
>  

```R
library() #현재 사용가능한 라이브러리

library(패키지명) # 해당 패키지를 메모리에 올리는것

search() # 메모리에 올라와있는 패키지목록

install.packages("ggplot2") # install.packages("패키지명")  , 패키지 설치 
 library(help=패키지 이름) #  패키지내 함수 살펴보기

data(iris) # iris를 로드하기
 class(iris) # 데이터 타입
 str(iris) # 데이터의 구조
 names(iris) # 변수의 이름
 head(iris) # 앞 6개의 관측치
 tail(iris) # 마지막 6개의 관측치
 dim(iris) # 데이터의 크기
 length(iris) # 변수의 갯수
 colnames(iris) # 변수의 이름
 summary(iris)
 hist(iris$Sepal.Length)
 boxplot(iris$Sepal.Length)
```

# 변수



```R
 a <- 10
 b <- 80
 c <- 100
 d <- NA # null 과 NA 는 다르다. NA는 결측치가 없는것 input이 들어오지 않은것 ex) 시험을 응시하지 않은 것
 e <- NULL #null 은 아직 값을 어떤 값을 쓸지 지정하지 않은것 NA는 값이 들어오지 않은 것

# 이처럼 구분 지어진 이유는 모든 값의 부모가 될 수 있는 형태가 없기 떄문 ex) 자바스크립트처럼 Object의 개념이 없기때문

mean(a,b,c,d,na.rm=TRUE) # mean은 해당 값들중 중간값을 의미 평균과 다르다 na.rm=true NA의 값을 지우고 사용하시겠습니까? 라는 의미

#TRUE,FALSE,NULL,NA 등의 값들은 항상 대문자를 사용한다.

c(TRUE, TRUE) & c(TRUE, FALSE) #  TRUE, TRUE가 저장된 벡터와 TRUE, FALSE가 저장된 벡터 간에 &(AND) 연산을 수행했다. 그 결과 두 벡터의 첫 번째 요소끼리의 연산 결과는 TRUE && TRUE = TRUE, 두 번째 요소끼리의 연산 결과는 TRUE && FALSE = FALSE가 되었다.

#c() 는 Vector를 의미한다.

c(TRUE, TRUE) && c(TRUE, FALSE) #  &&는 벡터의 요소 간 계산을 하기 위함이 아니라 TRUE && TRUE 등의 경우와 같이 두 개의 진릿값끼리 연산을 하기 위한 연산자다.

factor(
   X,       # 팩터로 표현하고자 하는 값(주로 문자열 벡터로 지정)
   levels,  # 값의 레벨
   ordered  # TRUE면 순서형, FALSE면 명목형 데이터를 뜻한다. 기본값은 FALSE>다.
)

Vector # 일반적인 프로그래밍의 배열과 같지만 조금더 세부적인 기능이 추가되어있다. 자바의 ArrayList와 비슷한 기능이 있는듯

v1 <-c(1:3)
names(v1) <- c("a","b","c")

v2 <- v1[1:2]
x3 <- c(1:10)
x4 <-x3[-c(4:7)]# x3 에서 4~7만큼을 제외한 것
w1 <- c(1:5)
w2 <- c(6:10)
w3 <- w1+w2

w4 <- seq(1,10,3)


rep(
   x,      # 반복할 값이 저장된 벡터 
   times,  # 전체 벡터의 반복 횟수 
   each    # 개별 값의 반복 횟수 
)


list(
   key1=value1, 
   key2=value2, 
   ... 
)

(x <- list(name="foo", height=70))
$ name
[1] "foo"

$ height
[1] 70

> list (a=list(val=c(1, 2, 3)), b=list(val=c(1, 2, 3, 4)))



matrix( 
   data,          # 행렬을 생성할 데이터 벡터 
   nrow,          # 행의 수 
   ncol,          # 열의 수 
   byrow=FALSE,   # TRUE로 설정하면 행우선, FALSE일 경우 열 우선으로 데이터를 채운다. 
   dimnames=NULL  # 행렬의 각 차원에 부여할 이름 
)

Data Frame



rm(list=ls()) # 메모리에 떠있는 변수들 모두 삭제


exam.R

re <- function(n){
  w <- data.frame(nation=c("ko","jp","en"),
                  Q1=c(10,20,30),
                  Q2=c(20,30,40),
                  Q3=c(15,30,50),
                  stringAsFactors  = FALSE)
  if(n==1){
    n1 <- rowMeans(w[,-1,-5]);
    names(n1)<-(w$nation)
    return(n1)
  }
  
  if(n==2){
    n2 <-colMeans(w[2:4]);
    print((w$nation))
    names(n2)<-(w$nation)
 
    return(n2)
  }
  
  return(w);
 
}

re(1)
re(2)


```

