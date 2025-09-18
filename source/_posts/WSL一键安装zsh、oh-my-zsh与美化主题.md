---
title: WSL一键安装zsh、oh-my-zsh与美化主题
date: 2025-09-18 17:11:38
tags: 
    - WSL 
    - 脚本
    - 备忘
---

> 本来一直就想做这个一键脚本，但是每次都想着反正也没有很麻烦，手动操作下凑合凑合得了。但是经过了 n 次的换机、安装wsl、安zsh之后，终于是忍不住了。   
这里尽量把所有步骤能一键集成的都集成下，给之后的自己以及屏幕前的你节省几十分钟的生命。   
P.S. 可以配合 [Windows Terminal折腾记](./Windows-Terminal下的WSL配置Vim光标.md)使用

## TL;DR
```bash
## 0. 安装好windows terminal & wsl ubuntu后：
## 1. 安装zsh并切换
sudo apt-get update
sudo apt-get install -y zsh
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
chsh -s /bin/zsh

## 2. 安装zsh拓展
# syntax highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
# zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
sed -i 's/^plugins=.*/plugins=(git zsh-autosuggestions zsh-syntax-highlighting)/' ~/.zshrc
echo 'export TERM=xterm-256color  # 使autosuggestions半透明' >> ~/.zshrc
echo 'export HOMEBREW_NO_AUTO_UPDATE=true  # no update when use brew' >> ~/.zshrc

## 3. 修改 on-my-zsh主题 & windows terminal主题 
sed -i 's/^ZSH_THEME=.*/ZSH_THEME="ys"/' ~/.zshrc

## 3.1 手动执行 ↓↓↓
# [WindowsTerminal->Settings->OpenJsonFile] 复制如下内容到 schemes:[]
{
  "name": "Dracula",
  "black": "#21222c",
  "red": "#ff5555",
  "green": "#50fa7b",
  "yellow": "#f1fa8c",
  "blue": "#bd93f9",
  "purple": "#ff79c6",
  "cyan": "#8be9fd",
  "white": "#f8f8f2",
  "brightBlack": "#6272a4",
  "brightRed": "#ff6e6e",
  "brightGreen": "#69ff94",
  "brightYellow": "#ffffa5",
  "brightBlue": "#d6acff",
  "brightPurple": "#ff92df",
  "brightCyan": "#a4ffff",
  "brightWhite": "#ffffff",
  "background": "#282a36",
  "foreground": "#f8f8f2",
  "cursorColor": "#f8f8f2",
  "selectionBackground": "#44475a"
}
# [WindowsTerminal->Settings->Ubuntu 2x.xx.xx LTS->Appearance->Corol scheme] 修改为Dracula
```

## 0. 安装好windows terminal & wsl ubuntu
windows terminal 这个基本上win11都自带了，如果是 win10 可以去 Windows Store 或者手动安装下，这里就不再赘述。
而且我看最新版的 terminal 在你切换至 ubuntu 22 的页面时如果没有安装也会直接帮你安装，也是十分便捷了。

## 1. 安装zsh并切换
```bash
sudo apt-get update
sudo apt-get install -y zsh
sh -c "$(curl -fsSLhttps://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
chsh -s /bin/zsh
```

## 2. 安装zsh拓展
### syntax highlighting
```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```
### zsh-autosuggestions
```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
sed -i 's/^plugins=.*/plugins=(git zsh-autosuggestions zsh-syntax-highlighting)/' ~/.zshrc
echo 'export TERM=xterm-256color  # 使autosuggestions半透明' >> ~/.zshrc
echo 'export HOMEBREW_NO_AUTO_UPDATE=true  # no update when use brew' >> ~/.zshrc
```

## 3. 修改 on-my-zsh主题 & windows terminal主题 
```bash
sed -i 's/^ZSH_THEME=.*/ZSH_THEME="ys"/' ~/.zshrc
```

## 3.1 【手动执行】
由于windows terminal路径后缀有随机性，这里只能手动...
1. 【WindowsTerminal->Settings->OpenJsonFile】 复制如下内容到 schemes:[]
```
{
  "name": "Dracula",
  "black": "#21222c",
  "red": "#ff5555",
  "green": "#50fa7b",
  "yellow": "#f1fa8c",
  "blue": "#bd93f9",
  "purple": "#ff79c6",
  "cyan": "#8be9fd",
  "white": "#f8f8f2",
  "brightBlack": "#6272a4",
  "brightRed": "#ff6e6e",
  "brightGreen": "#69ff94",
  "brightYellow": "#ffffa5",
  "brightBlue": "#d6acff",
  "brightPurple": "#ff92df",
  "brightCyan": "#a4ffff",
  "brightWhite": "#ffffff",
  "background": "#282a36",
  "foreground": "#f8f8f2",
  "cursorColor": "#f8f8f2",
  "selectionBackground": "#44475a"
}
```
2. 【WindowsTerminal->Settings->Ubuntu 2x.xx.xx LTS->Appearance->Corol scheme】 修改为 **Dracula**

## Over