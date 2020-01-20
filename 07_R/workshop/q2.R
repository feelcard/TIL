library(ggplot2)


#Q1. 자동차 배기량에 따라 고속도로 연비가 다른지 알아볼것
#displ이 4이하인 자동차와 5이상인 자동차 중 어떤 자동차의 hwy가 평균적으로 더 높은지 알아보자.

#mpg 조회
View(mpg)

#모델과 배기량 조회
mpg[mpg$displ<=4, c(2,3)]
mpg[mpg$displ>=5, c(2,3)]


#배기량을 기준으로 hwy 값을 추출, 
#matrix로 형변환 후 평균값 구함
mean(as.matrix(mpg[mpg$displ<=4, 9]))
#[1] 25.96319

mean(as.matrix(mpg[mpg$displ>=5, 9]))
#[1] 18.07895


#Q2. 자동차 제조 회사에 따라 도시 연비가 다른지 알아볼 것.
#"audi"와 "toyota" 중 어느 manufacturer의 cty가 평균적으로 더 높은가?

mpg[mpg$manufacturer=="audi", c(1,8)]
mpg[mpg$manufacturer=="toyota", c(1,8)]

mean(as.matrix(mpg[mpg$manufacturer=="audi", 8]))
# [1] 17.61111
mean(as.matrix(mpg[mpg$manufacturer=="toyota", 8]))
#[1] 18.52941


#Q3. "chevrolet","ford","honda" 자동차의 고속도로 연비 평균을 알아볼것. 이 회사들의 데이터 추출 후 hwy 전체 평균을 구하라.

mpg[mpg$manufacturer=="chevrolet", c(1,9)]
mpg[mpg$manufacturer=="ford", c(1,9)]
mpg[mpg$manufacturer=="honda", c(1,9)]

c<-mean(as.matrix(mpg[mpg$manufacturer=="chevrolet", 9]))
#[1] 21.89474
f<-mean(as.matrix(mpg[mpg$manufacturer=="ford", 9]))
#[1] 19.36
h<-mean(as.matrix(mpg[mpg$manufacturer=="honda", 9]))
#[1] 32.55556

mean(c,f,h)
#[1] 21.89474