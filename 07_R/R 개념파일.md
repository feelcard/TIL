#### 변수

- 알파벳, 숫자, _(언더스코어), .(마침표)
- -(하이픈)은 사용할 수 없다.
- 첫 글자는 알파벳 또는 .
-  .으로 시작한다면 . 뒤에는 숫자가 올 수 없다

#### 스칼라

- 단일 차원의 값 (예) 1, 2, 3,...

- 즉, 길이가 1인 배열

  - 숫자

  - NA(not Available) : 데이터 값이 없음

  - NULL

    - > NA : 값이 빠져있는 경우
      >
      > NULL : 프로그래밍의 편의를 위해 미정된 값
      >
      > (undefined)

  - 문자열

  - 진릿값(TRUE/FALSE)

    > 연산자 사용이 가능하다.

  - 팩터

    > 범주형 데이터
    >
    > => 사전에 정해진 특정 유형으로만 분류되는 데이터 타입
    >
    > * level
    >
    >   > 범주형 변수가 담을 수 있는 값의 목록
    >
    > 1. 명목형
    >
    >    값의 크기 비교가 불가능한 경우
    >
    >    예)정치적 성향 좌파, 우파
    >
    > 2. 순서형
    >
    >    값의 순서를 둘 수 있는 경우
    >
    >    예)대, 중, 소
    >
    >    ```R
    >    factor(
    >       X,       # 팩터로 표현하고자 하는 값(주로 문자열 벡터로 지정)
    >       levels,  # 값의 레벨
    >       ordered  # TRUE면 순서형, FALSE면 명목형 데이터를 뜻한다. 기본값은 FALSE(명목형)>다.
    >    )
    >    ```



#### 벡터

> - 배열의 개념
>
> - **한 가지** 타입의 스칼라 데이터를 저장할 수 있다.
>
> - 슬라이스 제공
>   - 배열의 일부를 잘라낸 뒤 다시 배열처럼 다루는 개념
>
> - 각 셀에 이름을 부여할 수 있다.

- `c( )`를 사용해 생성하고, `names( )`를 사용해 이름을 부여
- 벡터 데이터 접근법

| 문법          | 의미                                         |
| ------------- | -------------------------------------------- |
| x[n]          | 벡터 x의 n번째 요소                          |
| x[-n]         | 벡터 x에서 n번째 요소를 제외한 나머지        |
| x[idx_vector] | 벡터 x로부터 idx_vector에 지정된 요소를 출력 |
| x[start:end]  | 벡터 x의 start부터 end까지의 값을 반환       |



| 벡터 연산                                                    |
| ------------------------------------------------------------ |
| `identical(x,y)`반환 값은 x와 y가 동일하면 TRUE, 그렇지 않으면 FALSE다. |
| `union(x,y)`반환 값은 x와 y의 합집합이다.                    |
| `intersect(x,y)`반환 값은 x와 y의 교집합이다.                |
| `setdiff(x,y)`반환 값은 x와 y의 차집합이다.                  |
| `setequal(x,y)`반환 값은 x와 y가 같은 집합인지 여부다.       |

| 벡터 연산자    | 의미                                                         |
| -------------- | ------------------------------------------------------------ |
| `value %in% x` | 벡터 x에 value가 저장되어 있는지 판단                        |
| `x + n`        | 벡터 x의 모든 요소에 n을 더한 벡터를 구함. 마찬가지로 *, /, -, == 등의 연산자를 적용 가능함 |

| 벡터 시퀀스 생성 함수                                        |
| ------------------------------------------------------------ |
| seq : 시퀀스를 생성한다.                                     |
| `seq(  from,  # 시작 값   to,    # 끝 값   by     # 증가치  )`from부터 to까지의 값을 by 간격으로 저장한 숫자 벡터를 반환한다. |
| seq_along : 주어진 객체의 길이만큼 시퀀스를 생성한다.        |
| `seq_along(  along.with  # 이 인자 길이만큼 시퀀스를 생성한다.  )`반환 값은 along.with의 길이가 N일 때, 1부터 N까지의 숫자를 저장한 벡터다. |

| 중복된 값을 저장한 벡터 생성 함수                            |
| ------------------------------------------------------------ |
| rep : 주어진 값을 반복한다.                                  |
| `rep(   x,      # 반복할 값이 저장된 벡터    times,  # 전체 벡터의 반복 횟수    each    # 개별 값의 반복 횟수  )`반환 값은 반복된 값이 저장된 x와 같은 타입의 객체다. |
| 숫자 1, 2에 대해 times=5를 지정하면 1, 2의 나열이 5회 반복된다. |
| each=5를 지정하면 개별 값이 5회 반복된다. 즉, 1이 5회 반복된 후 2가 5회 반복된다. |
| each=5, times=2를 지정하면 개별 값의 5회 반복을 총 2회 반복한다. |

#### 리스트

> - ‘(키, 값)’ 형태의 데이터를 담는 연관 배열(Associative Array)
>
> - 벡터와 달리 값이 서로 다른 데이터 타입을 담을 수 있음

| list : 리스트 객체를 생성한다.                               |
| ------------------------------------------------------------ |
| `list(   key1=value1,    key2=value2,    ...  )`반환 값은 key1에 value1, key2에 value2 등을 저장한 리스트다. |