## Git 기본 로직
### git 초기 설정
```
$ git config --global --list
$ git config --global user.name "edujustin"
$ git config --global user.email "edujustin.hphk@gmail.com"
```

### git - github 연결
```
$ git init // 초기 폴더 생성시 
$ git remote add origin [remote repo URL]
```

### git add, commit, push
```
$ git pull origin master //기존 파일에 변경된 사항이 있거나 깃허브에 있던 파일을 가져올때 사용
$ git add [파일/폴더명]
$ git commit -m "커밋 메시지"
$ git push origin master
```

