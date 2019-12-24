$ git remote add origin https://github.com/kyhoon001/TIL.git(이건 github에서 확인)
$ git remote -v => 이름 확인
$ git remote rename origin(원래이름) change(바꿀 이름)
$ git remote rm origin(삭제 대상)


git bash에서 실행
$ git clone https://github.com/nanayunn/endgame.git(github에서 확인)
$ code .


add에 올렸던거 떨구는 법
$ git reset HEAD
$ git rm --cached 

vim
:wq 종료
i = insert

커밋 삭제
$ git commit --amend



branch


$ git branch (feature/test 이건 예시임) -> branch 생성
$ git checkout (feature/test) -> 이동
$ git branch --d (feature/test) -> 삭제
$ git checkout -b (feature/test) -> 생성하고 해당 branch로 이동
$ git branch -D (feature/test) -> 강제로 삭제

$ git merge (feature/test) -> 해당 작업공간에서 작업한 것을 merge해서 옴


stash

$ git add . 하고 나서
$ git stash -> 저장함
$ git stash list -> 리스트 보기
$ git stash apply -> 다시 데려옴 다시 데려와도 add상태는 유지됨.
$ git stash drop -> apply로 꺼내고 난 뒤에는 남아있는거 지워야함.
$ git stash pop -> apply와 drop을 한번에 해줌.



