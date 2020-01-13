# Rstudio command

>  ctrl + Enter :실행
>
> ※패키지중 datasets는 R에서 기본으로 제공하는 샘플데이터이다.
>
> 변수명에 . 을 사용할 수 있다.

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



