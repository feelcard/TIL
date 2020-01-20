#### 변수

- 알파벳, 숫자, _(언더스코어), .(마침표)
- -(하이픈)은 사용할 수 없다.
- 첫 글자는 알파벳 또는 .
-  .으로 시작한다면 . 뒤에는 숫자가 올 수 없다



#### 행렬 데이터 접근

> 행렬은 색인 또는 행과 열의 이름을 통해 접근할 수 있다.

- 위치로 접근하기

```R
data <- c(1:12)

m1 <- matrix(data=data, nrow=3, byrow = TRUE)
colnames(m1) <-c("A","B","C","D")
rownames(m1) <-c("R1","R2","R3")
m1[c(1),]
m1[c(-1),]
m1[,c(-2,-4)]
```

(결과값)

```R
> m1[1,1]
[1] 1
> m1[1,3]
[1] 3
> m1[c(1:3),]
   A  B  C  D
R1 1  2  3  4
R2 5  6  7  8
R3 9 10 11 12
> m1[c(1:2),]
   A B C D
R1 1 2 3 4
R2 5 6 7 8
> m1[c(1),]
A B C D 
1 2 3 4
> m1[c(-1),]
   A  B  C  D
R2 5  6  7  8
R3 9 10 11 12
> m1[,c(-2,-4)]
   A  C
R1 1  3
R2 5  7
R3 9 11
```

| 문법          | 의미                                                  |
| ------------- | ----------------------------------------------------- |
| A[ridx, cidx] | 행렬 A (ridx행, cidx열.                               |
|               | ridx나 cidx에 벡터를 사용해 여러 값을 지정            |
|               | ridx나 cidx 중 하나를 생략하면 전체 행 또는 열을 의미 |

- 열과 행의 이름으로 값 가져오기

  ```R
  m1["R1",]
  m1[, c("A","C")]
  ```

  (결과값)

```R
> m1["R1",]
A B C D 
1 2 3 4 
> m1[, c("A","C")]
   A  C
R1 1  3
R2 5  7
R3 9 11
```

- 행렬 간 연산 가능



#### 배열

> 다차원 데이터
>
> ex)행렬 = 2×3 차원의 데이터
>
>  배열=2×3×4 차원의 데이터

 

#### 데이터 프레임

> 

```R
e <- c(90,90,98,89)
m <- c(98,89,90,90)
k <- c(100,100,91,92)
s <- c(99,99,88,87)

c1<-data.frame(en=e,ma=m,ko=k,si=s)
rownames(c1)<- c("ha","na","mi","hy")

c1[c(1,4),]
c1[c("ha","hy"),]
```

```R
> c1
  en ma  ko si
1 90 98 100 99
2 90 89 100 99
3 98 90  91 88
4 89 90  92 87

> c1<-data.frame(en=e,ma=m,ko=k,si=s)
> rownames(c1 )<- c("ha","na","mi","hy")
> c1
   en ma  ko si
ha 90 98 100 99
na 90 89 100 99
mi 98 90  91 88
hy 89 90  92 87
> c1[c("ha","hy"),]
   en ma  ko si
ha 90 98 100 99
hy 89 90  92 87
> c1[c(1,4),]
   en ma  ko si
ha 90 98 100 99
hy 89 90  92 87
```

사실 이건 매트릭스..

```R
n<-c("na","hy","mi","ha")
e <- c(90,90,98,89)
m <- c(98,89,90,90)
k <- c(100,100,91,92)
s <- c(99,99,88,87)

c1<-data.frame(name = n,en=e,ma=m,ko=k,si=s)

```

```R
> n<-c("na","hy","mi","ha")
> 
> e <- c(90,90,98,89)
> m <- c(98,89,90,90)
> k <- c(100,100,91,92)
> s <- c(99,99,88,87)
> 
> c1<-data.frame(name = n,en=e,ma=m,ko=k,si=s)
> c1
  name en ma  ko si
1   na 90 98 100 99
2   hy 90 89 100 99
3   mi 98 90  91 88
4   ha 89 90  92 87
```

> 요게 데이터 프레임

- 데이터 타입 알아보기

  ```R
  c1$en[c(1,2)]
  class(c1[c(1:3),c(1:4)])
  ```

```R
> class(c1[1,2])
[1] "numeric"
> class(c1[c(1:3),c(1:4)])
[1] "data.frame"
```

- 특정 컬럼이나 row의 평균값 계산이 불가능 하다면

- **타입 변환** 필요!

  `mean(as.numeric(c2[2,]))`


***

1차원 (Vector)

2차원(Matrix)

3차원(Data Frame)

***

```R
c1<-data.frame(name = n,en=e,ma=m,ko=k,si=s, stringsAsFactors = FALSE)
c1[5,]<-c("yu",NA,NA,NA,NA)
```

> 데이터 프레임의 row에 새로운 컬럼을 추가하고 싶을 때
>
> 그냥 하면 오류남!
>
> `stringsAsFactors = FALSE` 
>
> 을 데이터 프레임 셋에 추가해주면
>
> name의 데이터 타입 변화
>
> (Factor => Character)

***

# R 프로그래밍

- R의 함수를 Java에서 실행한다?!

- `rm(list=ls())`

  > 변수 값을 저장해두는 Global Environment를 clear하는 명령어

#### 조건문 이용하기

```R
f1 <- function(a){
  result <- NULL;
  if(a%%2 == 0){
    result = "even";
  }else{
    result = "odd";
  }
  return(result);
}

me.f2 <- function(n){
  result <- 0;
  for(i in c(1:n)){
    print(i);
    result <- result + i;
  }
  return(result);
}
```

```R

```

