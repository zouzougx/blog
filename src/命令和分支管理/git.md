### git 命令

### 1.配置

git config --list 查看当前配置

git config --global user.name '' 设置用户名

git config --global user.email '' 设置用户邮箱

### 2.分支管理

git fetch --all 同步远程所有分支

git fetch origin dev 同步 dev 分支

git checkout dev 切换到 dev

git checkout -b 分支名 新建+切换分支

git checkout -b 分支名 commit ID 从当前 commit 版本新建+切换分支

git branch 查看本地分支

git branch -r 查看远程分支

git branch -a 查看本地 & 远程分支

git branch -D 分支名 删除本地分支

git merge xxx 分支名 合并 xxx 分支

git cherry-pick commit ID 选择一个 commit 合并进当前分支

### 3.代码提交

git add . 添加所有更改

git add 文件名 添加更改文件

git commit -m 'commit info' commit 已添加的文件

git commit -am 'commit info' 合并 add & commit

git pull 拉取远程分支代码

git push 提交到远程分支

git status 查看状态

git diff 查看更改

git log 查看提交记录

git reset --hard HEAD~1 重置 commit 提交，删除更改 （1 为版本指针）

git reset --soft HEAD~1 回退 commit 提交 ，待提交状态
