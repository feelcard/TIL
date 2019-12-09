# 마크다운(MarkDown)

> 일반 텍스트 형식 구문을 사용하는 마크업 언의 일종으로 사용이 쉽고 간결하다
>
> 단 모든 HTML 마크업을 대체하지 않는다( > 하고 스페이스)

## 1. 문법

### 1.1 Header

> 헤더는 제목을 표현할 떄 사용한다.
>
> 단순히 글자의 크기를 나타낼 때 사용하는 것이 아니라 의미론적인 중요도를 갖습니다.

- h1~h6 까지 표현이 가능합니다.
- #의 갯수로 표현하거나 <h1></h1>과 같은 형태로 표현 가능합니다

### 1.2 List

> 목록을 나열할 때 사용합니다.
>
> 순서가 필요한 항목과 그렇지 않은 항목으로 구분할 수 있습니다.
>
> 순서/순서x 항목을 같이 사용할 수 있습니다.

- 순서가 없는 항목
  - 순서가 없는 하위 항목

1. 순서가 있는 항목
2. 순서가 있는 항목
   1. 순서가 있는 하위 항목
   2. 순서가 있는 하위 항목

- 순서가 없는 항목
  1. 순서가 있는 하위 항목
  2. 순서가 있는 하위 항목

### 1.3 Code Block

> 코드 블럭은 작성한 코드를 정리하거나 강조하고 싶을 때 사용합니다.
>
> 코드 블럭은 인라인과 블럭 단위로 구분할 수 있습니다.

- Inline
  - 인라인으로 처리하고 싶은 부분을 `(백틱)으로 감싸줍니다.
- Block
  - (백틱)을 3번 입력하고 `Enter` 를 눌러서 생성합니다. 그 뒤에 각 블럭에 입력할 코드의 이름을 적으면 해당 코드에 맞게 컬러프린팅을 해준다.

```Bash
$ git add .
$ git commit -m "commit message"
$ git push origin master
```

### 1.4 Image

> 로컬에 있는 이미지를 삽입하거나 이미지 링크를 활용하여 표시합니다.
>
> - ![ ]() 느낌표 대괄호 소괄호 
> - 이때 대괄호 안에는 이미지 이름을 입력합니다.
> - 로컬에 있는 있는 파일을 로드할 때는 절대 경로가 아닌 상대 경로를 입력합니다.
>
> 
>
> ![github](data:image/png;base64,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)
>
> 

> ![](.\images\p2.jpg)
>
> 
>
> 
>
> 
>
> 
>
> 

### 1.5Link

> 특정 주소로 링크를 걸 때 사용합니다.

- []() 를 장성하고 () 안에 링크를 걸 주소를 입력합니다.

[vscode](https://code.visualstudio.com/docs/?dv=win)

### 1.6Table

> 표를 작성하여 요소를 구분할 수 있습니다.

- | (파이프) 사이에 컬럽을 작성하고 `Enter` 를 입력합니다.
- 마지막 컬럼을 작성하고 뒤에` | `를 붙여줍니다.

| Working Directory | Staging Area | Remote |
| ----------------- | ------------ | ------ |
| working tree      | Index        |        |
| working copy      | cache        |        |





### 1.7 기타

**인용문**

- `>`를 입력하고 `엔터` 키를 누릅니다.

  > $git addd
  >
  > > $ git commit -m "frist commit"

**수평선**

- `---`,`***`,`___`를 입력하여 작성합니다

Working Directory

---

Staging Area

---

Remote Repository(Github)

---



**강조**

- 이텔릭체는 해당부분을 `*`,`_`1개로 감싸줍니다.
- 보드체는 해당 부분을 `**`,`__`2개로 감싸줍니다.
- 취소선은 `~~`2개로 감싸줍니다.

*이것은 이텔릭체입니다.*

**이것은 보드체입니다.**

~~이것은 취소선입니다.~~

