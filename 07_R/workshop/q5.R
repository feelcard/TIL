library(ggplot2)
library(dplyr)
#Q1. mpg() 데이터의 복사본을 만들고, cty와 hwy를 합산한 합산 연비 변수 추가하기
c1[5,]<-c("yu",NA,NA,NA,NA)

mpg2<- mpg
mpg_new<-mpg
mpg2[,"cty"]
mpg_new$plus<-apply(mpg_new[,c(8,9)],1,sum)

View(mpg_new)

#Q2. 합산 연비변수를 2로 나누어 평균 연비변수 추가.

mpg2$avg<-apply(mpg2[,12],1,mean)

mpg_new$avg<-mpg_new$plus /2

#Q3.
dim(mpg_new)
rank<-mpg_new[order(mpg_new$avg,decreasing = T),]
rank$level <- c(1:234)

rank[rank$level <= 3,]


#Q4
mpg%>%mutate(sum=mpg$cty+mpg$hwy,avg=(mpg$cty+mpg$hwy)/2)%>%arrange(desc(avg))%>%head(3)

