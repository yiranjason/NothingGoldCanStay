以下为我遇到过的git Problem

### 2019.1.3

git pull  报错：filename too  long

可能导致的原因，上传了node_modules;

解决办法:打开git bash

```
git config --global core.longpaths true
```
我以后上传代码之前都先删一下node_modules