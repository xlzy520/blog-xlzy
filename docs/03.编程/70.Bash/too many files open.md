---
title: too many files open
date: 2021-06-02 14:08:53
permalink: /pages/9b4688/
categories:
  - 前端
  - Bash
tags:
  - 
---
### 背景

运行公司项目的时候，由于项目文件数量过多，都需要watch，这个数量很容易超过Mac系统的最大文件监听数量，造成Chrome崩溃

<!-- more -->

### 提高最大监听数量

在用户目录下的.bash_profile中的末尾加入`ulimit -n 10240`
保存后再执行 `source ～/.bash_profile` 即可

#### 可能出现的问题

假如设置的数字特别大，会提示下面的错误

```bash
ulimit:124: setrlimit failed: invalid argument
```

使用下面两个命令看下系统最大数

```bash
sysctl kern.maxfiles
sysctl kern.maxfilesperproc
```


假如系统最大数字不满足你的要求，就修改下系统最大数，命令如下(数字自己设定，但是不要太大，有的电脑系统貌似有限定)：

```bash
sudo sysctl -w kern.maxfiles=65536
sudo sysctl -w kern.maxfilesperproc=65536
```


然后再设置 ulimit 即可



### 查看各个进程监听的文件数量

```bash
lsof -n|awk '{print $2}'|sort|uniq -c|sort -nr
```





### 查看所有进程的文件打开数

```bash
lsof |wc -l
```



