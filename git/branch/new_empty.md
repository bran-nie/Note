# 新建一个空白分支

## 需求来源

---

在 Git 仓库中，通常我们会使用`git branch <name>`或`git checkout -b <name>`命令，基于现分支，新建一个新的分支。
但有时我们会需要一个新的空白的分支，使用上面的方式呢，就会带上历史版本信息（历史提交）

## 解决方式

### 使用 --orphan 参数

命令：`git checkout --orphan <name>`
eg：

-   `git checkout --orphan empty`，这时会创建并切换到 empty 分支，使用`git log`，你会发现并没有历史提交。
    > \$ git log
    > fatal: your current branch 'empty' does not have any commits yet
-   `git rm -rf .`，移除所有的内容，创建空白分支

    -   如果你的项目.gitignore 有忽略的文件或文件夹，如 `node_modules`，在使用`git rm -rf .`命令以后，由于删除了仓库下的`.gitignore`文件，则`node_modules`会被 git 跟踪。
    -   解决方式：1. 手动删除所有文件或文件夹。2. 新建`.gitignore`文件，将之前被忽略的文件添加进去。（复制其他分支的`.gitignore`即可）

-   `git add .`和`git commit -m <message>`，添加代码到暂存及提交。
-   `git branch -a` 查看本地分支。
    -   如果新建的分支没有`commit`，则在本地是看不到的。

### 最后

-   参考链接
    -   [在 GIT 中创建一个空分支](https://segmentfault.com/a/1190000004931751)
    -   [Git 官方文档 checkout --orphan](https://git-scm.com/docs/git-checkout#Documentation/git-checkout.txt---orphanltnewbranchgt)
