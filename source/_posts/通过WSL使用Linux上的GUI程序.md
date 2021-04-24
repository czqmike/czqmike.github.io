---
title: 通过WSL远程使用Linux上的GUI程序
date: 2021-03-31 20:07:04
tags: 
- WSL
- 远程
- GUI
---

## 写在前面~~水字数~~
> 好久没有水文章了，一半是因为这个学期学业繁忙，论文改的焦头烂额的。另一半就是人的惰性了。
最近沉迷于[Veritasium真理元素](https://space.bilibili.com/94742590?from=search&seid=18253544675360496862)的视频，里面讲了不少物理数学方面的有趣现象和说明，感觉质量还是挺高的，在此推销一波~

## 正题
直接进入正题。为了在远程环境上看到Python脚本画出来的图，以前我都是使用`plt.savefig(...)`保存成图像再看。
今天尝试nltk的自然语言处理库时发现其中自带的画图函数好像不支持保存，Stackoverflow上的方法要先把图画出来->保存成ps矢量图->再用工具把矢量图转化成位图，这样才能在VsCode中看到输出的图像。。
我的洁癖+懒惰症第一时间就让我打消了这个念头，而且也不优雅。

然后我就开始寻找更直接的方法--对，就是直接在Win上使用Linux的GUI程序。

之前实习的时候看师傅做过一次，也是用的WSL调用了一个GUI程序。
在网上搜了一下，发现和我一样闲并且有强迫症的人还真不少。:)
效果如下：
![在Win上直接使用WSL/Remote Linux的GUI程序](WSL_GUI.png)

大致上分为两个步骤：
- 1. 服务器端配置X11转发。
- 2. 客户端配置X11接收程序，将其转化为界面。

### 服务端配置
这里的服务端指的是Linux的桌面发行版，并且默认你已经配置好了SSH连接。
首先在服务器上将`/etc/ssh/ssh_config`中的以下参数设为下列值。
```
X11Forwarding yes
X11DisplayOffset 10
X11UseLocalhost yes
```
这样SSH就可以转发X11信号了。
注意在连接SSH的时候一定要指定`-X`参数，确认使用X11，即
`ssh -p 22 -X username@ipaddress`

### 客户端配置
客户端是Windows（Mac OS和其他Linux应该也可以）。
首先下载一个[Xming](http://www.straightrunning.com/XmingNote)，安装时把Xlaunch也装上，配置就next一把梭。此处略过。
唯一要注意的是要记得显示器编号 (默认是0)，后面会用到。

先启动Xlaunch一把梭后，系统栏里会有个小小的X图标，即代表Xming启动了。
我们只要使用
`DISPLAY=localhost:0 ssh -p 22 -X username@ipaddress`
来远程登录，登录后就可以直接输入GUI命令，比如：GVim，FireFox等。
不过远程嘛，你懂的。。延迟一般都比较高，体验被命令行完爆。

但是比较一个比较有用的做法是直接在Win上使用WSL的GUI:
`DISPLAY=0:0 gvim`
DISPLAY的前一个参数应该是local port， 后一个参数是显示器编号。
通用的命令如下：
`DISPLAY=[local port]: [monitor num] appname`
这种方法我认为比虚拟机上的体验还要好，因为不用同时跑两个系统。本质上来讲，WSL是套了Linux壳的Win，然后X11是用Linux的绘图标准来绘图，也就是说，相当于只跑了一个系统但是能够同时享受到两个系统的优势！


## Ref
- [【Linux】WSL+Xming实现gui显示](https://www.rehtt.com/index.php/archives/145/)
- [Win10 Linux 子系统安装图形化界面的两种方法及其对比](https://www.ithome.com/html/win10/353700.htm)
- [Xming +Xshell 6 实现远程打开Linux界面](https://blog.csdn.net/akuoma/article/details/82182913)
- [新手Linux子系统方案：WSL+Xming+cmder+zsh与高能物理Cern Root的安装](https://zhuanlan.zhihu.com/p/81622442)