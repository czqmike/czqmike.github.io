# czqmike.github.io
## Introduce
本Git保存库与分发页面采用[双分支设计](https://www.jianshu.com/p/57b5a384f234):   
~~虽然目前由于服务前续费、备案麻烦等问题私人部署的页面已经挂掉了，但是GitHub Pages还能用（~~   
`hexo_source`存放hexo源文件与主题、插件config文件。  
`master`分支保存编译后的静态页面文件。  

## Usage 
> 如果是在服务器上部署页面，直接使用`pm2`和`hexo`跑Server上的网站，根目录为 *czqmike.github.io*   

正常更新博客流程：

- Create New Post  
	1. 更新 Server 上的静态页面文件，在根目录下执行

	```bash
	# hexo -h
	# hexo clean
	cd $HOME/$HEXO_ROOT
	hexo new "$POST_TITLE"
	```

- `hexo_source`  
	2. 更新blog源文件  

	```bash
	git add .  
	git commit -m "$DESCRIPTION"  
	git push -u origin hexo_source  
	```
- `master`  
	3. 在Server上生成静态页面，并同步至GithubPage   
	（Server上的blog由pm2和hexo自动同步，更新`hexo_source`中的源文件即可）  
	P.S. 先 `hexo g -d` 然后再 `git push`也可

	```bash
	hexo g -d
	```

## Recover
重装电脑后，或者在其它电脑上想修改博客：

1. 安装git；
2. 安装Nodejs和npm；
3. 使用git clone 将仓库拷贝至本地；
4. 在文件夹内执行以下命令
	```bash
	npm install hexo-cli -g   
	npm install
	npm install hexo-deployer-git
	```

