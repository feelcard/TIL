library(ggplot2)

#Q1

#(조건, 데이터, 실행할 함수)
#aggregate(en~class,df1,mean)
#class별 english의 평균 구할 것이라는 말.
#aggregate((en+ma)/2~name,df1,mean)
#name별 english와 match의 평균 구할 것이라는 말.

mm<-aggregate(cty~class,mpg,mean)

#Q2
mm[order(mm$cty,decreasing = T),]

#Q3
m2<-aggregate(hwy~manufacturer,mpg,mean)
m3<-m2[order(m2$hwy,decreasing = T),]
dim(m2)
m3$level<-c(1:15)
m3[m3$level<=3,]

#Q4
#aggregate(class~manufacturer,mpg, )

m3<-mpg[mpg$class=="compact",c(1,11)]
View(m3)
m4<-table(m3)
df<-data.frame(m4)
df2<-rename(df, count=Freq)
df2[order(df2$count,decreasing = T),]