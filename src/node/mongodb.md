### mongodb

1. 又叫 no Sql, 非关系型数据库， 关系数据库（MySql）
2. 基于 c++语言编写的分布式文件存储的数据库
3. 高性能，易部署，易使用， 存储数据方便
   database-database(数据库)  
   table-collection(数据库表/集合)  
   row-document(数据记录行/文档)  
   column- filed(数据字段/域)  
   index-index(索引)  
   primary key - primary key(主键)

### 安装

mac OS: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
装完以后

1. `mongod --config /usr/local/etc/mongod.conf` 出于悬停 不要关 是一个本地的服务
2. 新建一个 shell `mongo` 起一下数据库出现大于号就可以操作 mongo db 了

### 数据库的常用命令

| 命令                                                                                                             | 描述                                                                                    |                                                                    |
| :--------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| db                                                                                                               | 查询当前数据库                                                                          |                                                                    |
| show dbs                                                                                                         | 查询数据库                                                                              |                                                                    |
| use [数据库名称]                                                                                                 | 创建数据库                                                                              | show dbs 是看不到的因为还没有存文档，db 可以看到当前数据库是 music |
| db.stats                                                                                                         | 查看数据库状态                                                                          |
| db.version                                                                                                       | 查看数据的版本                                                                          |
| db.getMongo()                                                                                                    | 查看当前 db 链接的机器地址                                                              |
| db.dropDatabase                                                                                                  | 删除数据库                                                                              | 要在当前的数据库中删除当前的数据库                                 |
| db.createCollection('collectionName')                                                                            | 创建一个集合                                                                            |
| db.getCollection('collectionName')                                                                               | 得到指定名称的集合                                                                      |
| db.getCollectionNames                                                                                            | 得到当前 db 下的所有集合                                                                |
| db.printCollectionStats()                                                                                        | 显示当前 db 所有集合的状态                                                              |
| db.[collectionName].insert([{name:'1',release:'2020-12-05',publishNumber:100}，{name:'2',release:'2021-12-05'}]) | 插入数据                                                                                |
| db.[collectionName].save([{name:'3',release:'2020-12-05'}，{name:'4',release:'2021-12-05',publishNumber:100}])   | 插入数据的别名方法                                                                      |
| db.[collectionName].found                                                                                        | 查询文档数据                                                                            |
| db.[collectionName].update({name:'m1'},{\$set:{release:'2021-03-21'}})                                           | 参数 1-条件 参数 2-修改的内容 参数 3-当前记录不存在创建 参数 4-当有多条数据时只修改一个 |
| db.[collectionName].update({name:'m1'},{\$inc:{publishNumber:200}},true,true)                                    | name 为 1 的字段的 publishNumber 都加 200                                               |
| db.[collectionName].remove({name:'1'})                                                                           | 参数 1-条件                                                                             |

### 查询数据

| 命令                                                                      | 描述                                                        |                                                          |
| :------------------------------------------------------------------------ | :---------------------------------------------------------- | :------------------------------------------------------- |
| db.[collectionName].found                                                 | 查询数据                                                    |
| db.[collectionName].distinct({name:'m1'})                                 | 查询去重后的数据                                            | 所有 name 去重后的数组数据                               |
| db.[collectionName].find({release:'2021-12-05'})                          | 根据条件查询                                                | 查询发布日期是 2021-12-05 的数据                         |
| db.[collectionName].find({release:{\$gt:'2020-12-05'}})                   | 查询大于小于(\$lt）大于等于（\$gte）小于等于（\$lte）的数据 | 查询发布日期大于 2020-12-05 的数据                       |
| db.[collectionName].find({release:{\$gt:'2020-12-05',\$lt:'2021-12-05'}}) | 查询区间数据                                                | 2020-12-05 到 2021-12-05 之间的数据                      |
| db.[collectionName].find{name:/1/}                                        | 正则查询就是模糊查询                                        | 查询 name 中有 1 的， /^1/-以 1 开头的 /1\$/-以 1 结尾的 |
| db.[collectionName].found（{}, {\_id:0, publish:0}）                      | 指定列的                                                    | 只要 name 和 release 0-表示不显示                        |
| db.[collectionName].found（{name:/1\$/}, {\_id:0, publish:0}）            | 指定列并且加条件                                            | 查询 name 已 1 结尾只要两列                              |
| db.[collectionName].found().sort({release:1})                             | 排序                                                        | 0-降序, 1-升序                                           |
| db.[collectionName].found().limit(3)                                      | 前几条数据                                                  | 只要前三条数据                                           |
| db.[collectionName].found().limit(3).skip(3)                              | 跳过三条取三条                                              | 第二个三条数据                                           |
| db.[collectionName].found().sort({release:1}).limit(3).skip(3)            | 先排序再跳过三条取三条                                      | 第二个三条数据                                           |
| db.[collectionName].found().limit(3).skip(3).sort({release:1})            | 先排序再跳过三条取三条                                      | 第二个三条数据                                           |
| db.[collectionName].found({\$or: [{name:'m1'}, {name:'m3'}])              | Or 与查询                                                   | 满足一个条件就返回                                       |
| db.[collectionName].findOne()                                             | 查询第一条数据                                              |                                                          |
| db.[collectionName].find().count()                                        | 某个结果集的记录数条数                                      |                                                          |
