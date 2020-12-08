# 软件

## 终端相关

### 终端 hyper

#### 问题：

1. 安装后找不到 hyper 命令
    - 找到桌面快捷方式，右键，使用管理员运行。（单次）
    - 找到桌面快捷方式，右键，属性>兼容性>(勾选)以管理员身份运行此程序。（永久）

### NVM node 管理器

### yarn （npm 安装）

#### 问题：

1. yarn 全局安装软件后，运行命令时提示找不到命令
    - 原因是因为 PATH 环境变量中没有 yarn 的路径。
    - 输入命令`yarn global bin`查看 yarn 的可执行文件路径。
    - 在 PATH 中添加上面输出的路径。(可在`.bashrc`中添加)
    - 编辑`.bashrc`文件，添加`export PATH="$PATH:${yarn global bin}"`
