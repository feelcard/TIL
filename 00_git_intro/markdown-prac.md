# 과제

---

> 아래의 제시문을 마크다운 문법을 활용하여 작성해주세요.
>
> 글을 어떻게 구조화 시켜서 작성할 지 곰곰이 생각해보고 작성해주세요



# 제시문

## Git



### 1. Git의 개념

> git은 컴퓨터 파일의 변경사항을 추적하고 여러 명의 사용자들간의 해당 파일들을 조율하기 위한 분산 버젼 관리 시스템이다.

### 2. Git 설정

> 전역 역영에서 commit 기록의 주인을 등록
>
> ```bash
> $git config -globlal user.name "username"
> 
> $git config -globlal user.email "example@gmail.com"
> ```
>
> 
>
> 

### 3.git의 기본

1. git init 해당 디렉토리를 GIt이 관리하도록 초기화
2. add 파일명 커밋할 목록에 추가
3. commot -m "커밋 메시지" (히스토리의 한 단위 ) 만들기
4. git push origin master 현재까지의 역사(commits)가 기록되어 있는 곳에 새로 생성한 커밋 반영

### 4. Git 저장소

| working directory | staging area | remote repository           |
| ----------------- | ------------ | --------------------------- |
| 로컬              | cache        | (github, bitbucket, gitlab) |



~~로컬(working directory) - staging area - remote repository(github, bitbucket, gitlab)~~

로컬 컴퓨터 저장소 해당 버전의 스냅샷(기록). 원격 저장소

### 5.Git [branch]([http://www.drinkndessertshow.com/2018/05/17/%EC%B9%B4%EB%93%9C%EB%89%B4%EC%8A%A4-%EB%B6%80%EB%93%9C%EB%9F%BD%EA%B2%8C-%ED%95%98%EB%A3%A8%EB%A5%BC-%EA%B9%A8%EC%9A%B0%EB%8A%94-%EB%B8%8C%EB%9F%B0%EC%B9%98-%EC%B9%B4%ED%8E%98-%EC%B6%94%EC%B2%9C/](http://www.drinkndessertshow.com/2018/05/17/카드뉴스-부드럽게-하루를-깨우는-브런치-카페-추천/)) 

*같은 작업물을 기반으로 동시에 다양한 작업을 할 수 있게 만들어 주는 기능*

- **독립적인 작업 영역 안에서 마음대로 소스코드를 변경할 수 있다. **

- **분리된 작업 영역에서 변경된 내용은 추후에 기존 버전과 비교해서 새로운 하나의 버전을 만들어 낼 수 있다.**

- ![github](data:image/png;base64,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)

  



