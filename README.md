# CampusCOVID-19ManagementSystem
校园疫情防控系统,本人的毕业设计项目
技术栈为 vue+nodejs+mysql

## 注意事项
- 项目启动需要本地mysql数据库并存入一些用户数据
- 需要本地启动redis
- 在backEnd_node中的public文件夹下新建一个upload文件夹（git上传自动忽略空文件夹）

## 启动
``` 
$ git clone git@github.com:fengyulong113/CampusCOVID-19ManagementSystem.git
或
$ git clone https://github.com/fengyulong113/CampusCOVID-19ManagementSystem.git

$ cd backEnd_node
$ npm init
$ npm start

$ cd .. //一定要返回上级目录
$ cd frontEnd_vue
$ npm init
$ npm start
```
此时项目运行会报错，因为还没有数据库，接下来准备一个本地MySQL数据库VUESTORE(建议用这个名字，因为我在nodejs中连接的database为这个名字。也可以改成你喜欢的，但是要在`backEnd_node -> model -> model.js`中的database改成你设置的名字)

## 准备数据库

[mysql使用教程](https://www.runoob.com/mysql/mysql-install.html)

执行下列建表语句

1. 切到VUESTORE下
>```sql
> use vuestore;
>```

2. 创建user(用户)表
>```sql
>DROP TABLE IF EXISTS `user`;
>CREATE TABLE `user` (
>  `id` int(11) NOT NULL COMMENT '用户id',
>  `token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
>  `username` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT '用户',
>  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '密码',
>  `head` mediumtext CHARACTER SET utf8 COMMENT '头像',
>  `mailbox` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '邮箱',
>  `address` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '地址',
>  `sex` varchar(20) CHARACTER SET utf8 DEFAULT NULL COMMENT '性别',
>  `modifytime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '最近一次修改时间',
>  `createtime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '存入时间',
>  `classes` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '所属班级',
>  `type` int(11) NOT NULL,
>  PRIMARY KEY (`id`)
>) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
>```

3. 创建health(健康)表
>```sql
>DROP TABLE IF EXISTS `health`;
>CREATE TABLE `health` (
> `h_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '健康表id',
> `u_id` int(11) NOT NULL COMMENT '用户id',
> `u_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '用户名',
> `u_classes` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '用户班级',
> `temperature` float(11,1) DEFAULT NULL COMMENT '当前体温',
> `isHot` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '是否发热',
> `isLeave` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '是否离开学校',
> `PCR` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '核酸检测是否为阴性',
> `createtime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '存入时间',
> PRIMARY KEY (`h_id`)
>) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
>```

4. 创建material(物资)表
>```sql
>DROP TABLE IF EXISTS `material`;
>CREATE TABLE `material` (
>  `m_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '物资表id',
>  `apart` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '地点',
>  `dorm` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '寝室',
> `delivery` boolean NOT NULL COMMENT '是否急需',
> `mask` int(3) NOT NULL COMMENT '口罩',
> `disi` int(3) NOT NULL COMMENT '消毒液',
> `water` boolean NOT NULL COMMENT '饮用水',
> `remarks` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '备注',
>  `createtime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '存入时间',
>  PRIMARY KEY (`m_id`)
>) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
>```

5. 创建notice(通知)表
>```sql
>DROP TABLE IF EXISTS `notice`;
>CREATE TABLE `notice` (
>  `n_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '公告id',
>  `title` mediumtext COLLATE utf8_unicode_ci COMMENT '公告标题',
>  `content` mediumtext COLLATE utf8_unicode_ci,
>  `createtime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
>  `class` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '通知的班级',
>  PRIMARY KEY (`n_id`)
>) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
>```

6. 创建volunteer(志愿者)表
>```sql
>DROP TABLE IF EXISTS `volunteer`;
>CREATE TABLE `volunteer` (
>  `u_id` int(11) NOT NULL COMMENT '用户id',
>  `u_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '用户名',
>  `address` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '服务地点',
>  `group` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '服务小组',
>  `createtime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '存入时间',
>  PRIMARY KEY (`u_id`)
>) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
>```

7. 创建read(阅读)表
>```sql
>DROP TABLE IF EXISTS `read`;
>CREATE TABLE `read` (
>  `r_id` int(11) NOT NULL AUTO_INCREMENT,
>  `u_id` int(11) NOT NULL,
>  `n_id` int(11) DEFAULT NULL,
>  `readtime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '已读时间',
>  PRIMARY KEY (`r_id`)
>) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
>```

8. 设置删除更新的权限
>```sql
>SET FOREIGN_KEY_CHECKS=0;
>```
>
>此处不设置的话,可能在进行删除或者更新操作时会报错

9. 插入测试数据
>```sql
> insert into `user`
> (id, username, password, sex, classes, type)
> values
> (111111, 'studentTest','123','男','计科18401',2);
>```

>```sql
> insert into `user`
> (id, username, password, sex, type)
> values
> (111111, 'teacherTest','123','男', 3);
>```

还需要准备redis
按照[redis教程](https://www.runoob.com/redis/redis-install.html)操作即可
或

```
进入redis目录
redis-server.exe

新开一个cmd窗口，进入redis目录
redis-cli.exe -h 127.0.0.1 -p 6379
```

