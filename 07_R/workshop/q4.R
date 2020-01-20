library(ggplot2)

#Q1. "audi"에서 생산한 자동차 중 어떤 자동차 모델의 hwy가 높은지 알아보자.
#hwy가 1~5위에 해당하는 자동차의 데이터를 출력하시오.

mm<-mpg[mpg$manufacturer=="audi", c(1,9)]

#mm의 목차 갯수 
dim(mm)

mm[order(mm$hwy,decreasing = T),]

#mm의 순위를 보기 위해 내림차순 정렬
hwy_rank<-mm[order(mm$hwy,decreasing = T),]

#mm의 목차 갯수에 맞게 순위를 매겨줌
hwy_rank$level <- c(1:18)
#그 중 5위까지 조회
hwy_rank[hwy_rank$level <= 5,]