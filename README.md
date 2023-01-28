# czqmike.github.io
## Introduce
本Git保存库与分发页面采用[双分支设计](https://www.jianshu.com/p/57b5a384f234):   
`hexo_source`存放hexo源文件与主题、插件config文件。  
`master`分支保存编译后的静态页面文件。  

## Usage 
> 直接使用`pm2`和`hexo`跑Server上的网站，根目录为 *czqmike.github.io*

- Server  
	1. 更新 Server 上的静态页面文件，在根目录下执行

	```bash
	# hexo -h
	# hexo clean
	cd $HOME/hexo_root
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
	3. 在Server上生成静态页面，并同步至GithubPage（Server上的blog由pm2和hexo自动同步，更新`hexo_source`中的源文件即可）  

	```bash
	hexo g -d
	```
