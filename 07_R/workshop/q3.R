library(ggplot2)


#Q1. mpg 데이터에서 class, cty 변수를 추출해 새로운 데이터를 만들어라. 

m1<-mpg[,c(8,11)]

#Q2.
m1[m1$class=="suv",c(1,2)]
m1[m1$class=="compact",c(1,2)]

s<-m1[m1$class=="suv",1]
m<-m1[m1$class=="compact",1]


mean(as.matrix(s))
#[1] 13.5
mean(as.matrix(m))
#[1] 20.12766