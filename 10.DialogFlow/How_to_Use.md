# DialogFlow

## 1.주요기능

> 구글에서 제공하는 챗봇이며 `intent`를 통해서 문장의 의미를 분석하고 `Fulfilment`기능을 이용해서 intent들을 mapping 시켜서 기능을 구현할 수 있다. `intent`의 이름(`String`)와 기능을( `function ooo(agent)` 을 `Map`형태로 저장시켜 기능을 구현한다. 여기서 `agent`는 해당 챗봇 프로젝트의 이름을 말한다(` firebase`의 `collection`과 비슷한 의미)

## 2.세부기능

> 어떠한 `app`에서 `dialogflow`에서 생성한 챗봇의 기능을 이용하고 싶다면 외부 서버에 업로드를 해야 하는데 이를 `deploy`라 한다. 방법은 2가지가 있으면 첫번쨰는 `firebase`에서 제공하는 deploy기능을 사용하기위해 기능적인 부분 즉 `function`부분만 `deploy` 시켜서 `webapp`처럼 사용하는것이다. 2번째는 `dialogflow` 에서 기본적으로 제공하는 `webhook`을 통해 deploy 하는 것이다. 그 외 에는 `inline editer`를 사용해 볼 수 있으나 이는 기능을 구현하기 위한 코드 줄 수가 한정되어 있기 때문에 test용에 적합하다.(`webhook`에 대해서는 조금 더 공부해보아야 한다고 생각)



>  기본적인 구조를 통해서 특정한 문장에 나올 단어를 `intent`에 `case`를 등록하고 이를 통해 답변을 불러오는 `response`를 할 수 있는데 이외에 사용자의 입력을 받아올 경우 `slot filling` 이라는 기능 사용한다. 이 기능은 `intent`에서 추가할 수 있는데 `intent` 내부에 파라미터를 추가하고 특정 질문에 대한 답변을 이 파라미터에 넣을수 있다 이때 `entity`를 요구하는데 기본적으로 구글에서 case를 제공하고 있으며 적당한 string의 값을 넣고싶다면 `@sys.any`를 사용한다.( 내부적으로는 `sys.any:파라미터_이름` 과 같은 형태로 저장되기 때문에 겹치지 않는다. )  위와 같이 저장된 것을 `intent`안의 `response` 에서는 파라미터를 설정했을때 호출할 이름을 정하는데 그 이름으로 호출하여 쓸 수 있다.( ex) 파라미터 이름을 `name`이라고 지었을 경우 일반적으로 `$name`이라 짓는다. 즉 what is your name 이라는 질문후 이름을 입력하면 `name` 안에 이름이 들어가고 그 후 response에서 `hi! $name !`  와 같은 형태로 사용 ) `fulfilment`에서 해당 파라미터를 불러 오려면 먼저 `js`내부에 `webhookclient` 를 통해 불러온 챗봇 `agent` 가 선언과 생성이 되어있는지 확인한다. 그러면 변수를 받아들이는 `intent`에 그 `agent`가 파라미터로 들어가 있을 것이다.(`agent`는 `webhookclient` 접속 시 단 한번만 생성되므로 `const` 로 선언한다.)  함수 내부에서 `agent.parameters.파라미터_이름`과 같은형태로 해당 변수를 사용할 수있다.

