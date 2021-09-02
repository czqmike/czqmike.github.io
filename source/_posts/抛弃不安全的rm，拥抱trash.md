---
title: 抛弃不安全的rm，拥抱trash
date: 2021-09-02 14:49:26
tags: 
    - Linux
    - 奇技淫巧
---

> 起因：晕头转向忙了一天之后，发现工作保存的文件放错了文件夹，于是乎想`mv *.jpg ../parent_folder`到正确的文件夹，结果手滑输入成了`rm *.jpg ../parent_folder`，而rm又没有回收站功能。。啪的一下一下午的工作白费了:(
我开始寻找恢复的方法，最后因为wsl和真正的Linux还是有区别的，不能直接复用，再加上嫌麻烦最后只好重新做了一遍。

经过这番折腾，我终于意识到了“老生常谈”的`rm`删库跑路离我们并不遥远，遂开始寻找替代方案。

## 方案1：`alias rm="rm -iv"`
`rm`的设计者肯定也考虑过安全性这个问题，但是笔者认为在这个命令的传播过程中，太多的人图简单，使用`rm -rf`一把梭，照成了很多人的误用。  
翻看手册后，我发现`rm`其实是有安全选项的，一个是`-i`，一个是`-I`，就是说在进行多个删除操作或是递归删除子文件夹时，会有确认步骤。`-i`与`-I`的区别在于：`-i`总是确认，`-I`是只有重要或异常情况才确认（具体的说明可以`man rm`，此处就不再赘述）。  
`-v`则是打印`rm`所做的所有操作，做到心知肚明。
> -i    prompt before every removal.  
  -I    prompt once before removing more than three files, or when removing recursively; less  intrusive  than  -i,  while still giving protection against most mistakes.  
   -v, --verbose     explain what is being done.  

所以第一个解决方案就是`alias rm="rm -iv"`，即每次`rm`就执行`rm -iv`，这种方案安全性最高，每次操作都会要求确认并且有操作回显，但是就是及其麻烦，麻烦到什么地步呢？你想象一下你有一位仆人，不管干啥都要请示你一番，洗个衣服都要拿着一堆衣服挨个问你，是不是很崩溃的一种体验。。

## 方案2：构建回收站
第二种方案就是模仿GUI桌面中的做法，建一个“回收站”，`rm`的时候就先放到回收站中，然后再配合定时清除回收站功能，就可以达到比较安全地删除的目的。  
[这篇博文](https://segmentfault.com/a/1190000018464527)自己实现了这个回收站，但是功能方面可能还有欠缺的地方。 （比方说当删除的文件和回收站的文件重命名时需要更改文件名使其不重复，而如果要恢复又要再改回来，这显然不是很方便）  
这里笔者推荐`trash-cli`这个工具，它提供**回收站**、**显示回收站**、**清空回收站**、**记录删除的文件信息**（这样就可以避免重命名的问题）、**恢复指定文件**，除了命令行冗长之外几乎没有缺点。  

### 安装
以Ubuntu为例，直接apt install即可。
```bash
sudo apt install trash-cli
```

### 用法
trash-cli 提供以下命令  
`trash-put`： 将文件或目录放到回收站中  
`trash-list` ：列出回收站中的文件或目录
`trash-restore`：从回收站中恢复文件或目录  （实测是`restore-trash`）  
`trash-rm`：删除回收站中的文件  
`trash-empty`：清空回收站  

可以看到用起来还是很简单的，但是由于笔者是究极懒癌，能用2个字母完成的命令就不想用2个单词做，所以写了个简单的替换脚本[rm2ts.sh](https://github.com/czqmike/LinuxTools/blob/master/rm2ts.sh)，可以实现一键替换并且定时清空回收站。
脚本重命名了`ts`, `lt`, `rt`这三个命令，分别表示删除（移至回收站）、显示回收站、从回收站恢复文件。  
另外`trash-cli`没有提供一键恢复功能，只能一项一项手动点，这里给出一个替代方案，终端执行如下命令：  
```bash
$ while ( echo 0 | rt ); do true; done;
```
这里放出代码，需要请自取。
```bash
#!/bin/bash

set -Eeu
set -o pipefail
# set -x

config_file="$HOME/.bashrc"  # or .zshrc

sudo apt-get install -y trash-cli
## !! Don't alias rm to trash, it may break some scripts. 
if [ $(grep -c 'alias rm=' ${config_file}) -eq '0' ]; then
    echo 'alias rm="rm -I"' >> $config_file
fi
if [ $(grep -c "alias ts=" ${config_file}) -eq '0' ]; then
    echo 'alias ts=trash-put' >> $config_file
fi
if [ $(grep -c "alias lt=" ${config_file}) -eq '0' ]; then
    echo 'alias lt=trash-list' >> $config_file
fi
## The moved files are in `~/.local/share/Trash/files`
## Use `while ( echo 0 | rt ); do true; done;` or cp to restore files more efficiently.
if [ $(grep -c "alias rt=" ${config_file}) -eq '0' ]; then
    echo 'alias rt=restore-trash' >> $config_file # or trash-restore, the former works in my own env :)
fi
## Disable clearing trash manually.
# echo 'alias ct=trash-empty' >> $config_file

source $config_file

## Clear trash each monday 12 A.M. automatically.
conf=".tempconf"_$(date "+%Y%m%d-%H%M%S")
crontab -l > $conf
if [ $(grep -c "trash-empty" ${conf}) -eq '0' ]; then
    echo "0 12 * * 1 trash-empty" >> $conf && crontab $conf
fi
rm -f $conf

echo 
echo '[info] cmd `rm` has been replaced with `ts`, `lt`, `rt` and auto trash clearing has been set.'
```
需要注意的是，我这里并没有并没有直接把`rm` alias 成`trash-put`，而只是换成了安全性更高的`rm -i`，原因在于这样做[可能会破坏其他脚本的行为，出现不可预料的错误](https://github.com/andreafrancia/trash-cli#can-i-alias-rm-to-trash-put)，所以还是推荐在想`rm`的时候用`ts`代替，这样用户也清楚自己在做什么，也不会产生安全问题，我认为是一种比较好的折中方案了。

## 总结
因为吃了次苦头，笔者以后将使用`ts`替换系统自带的`rm`，并且写了个简单的脚本完成一键替换。大家以后也请务必小心`rm`的使用。