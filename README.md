# czqmike.github.io
## Introduce
本Git保存库与分发页面采用[双分支设计](https://www.jianshu.com/p/57b5a384f234):   
`hexo_source`存放hexo源文件与主题、插件config文件。  
`master`分支保存编译后的静态页面文件。  

## Usage 
- `hexo_source`
更新blog源文件  
``bash  
git add .    
git commit -m "description"    
git push -u origin hexo_source    
``
- `master`
同步至GithubPage（Server上的blog由pm2和hexo自动同步，更新第一步中的源文件即可）  
``bash  
hexo g -d  
``
