SET NAMES UTF8;
DROP DATABASE IF EXISTS xfn;
CREATE DATABASE xfn CHARSET=UTF8;
USE xfn;

-- 管理员信息表
CREATE TABLE xfn_admin(
    aid INT PRIMARY KEY AUTO_INCREMENT,
    aname VARCHAR(32) UNIQUE,
    apwd  VARCHAR(64)
);
-- 管理员
INSERT INTO xfn_admin VALUES
(Null,'admin',PASSWORD(123456)),
(Null,'boss',PASSWORD(9999));
-- 项目全局设置
CREATE TABLE xfn_settinngs(
    sid INT PRIMARY KEY AUTO_INCREMENT,
    appName VARCHAR(64),
    apiUrl VARCHAR(64),
    adminUrl VARCHAR(64),
    appUrl VARCHAR(64),
    icp VARCHAR(64),
    copyright VARCHAR(64)
);

INSERT INTO xfn_settinngs VALUES
(NULL,'小肥牛','http://127.0.0.1:8090','http://127.0.0.1:8091','http://127.0.0.1:8092','京ICP备12003709号-3','Copyright © 2002-2019 北京达内金桥科技有限公司版权所有');
-- 桌面信息表
CREATE TABLE xfn_table(
    tid INT PRIMARY KEY AUTO_INCREMENT,
    tname VARCHAR(64),
    type VARCHAR(16),
    status INT
);
INSERT INTO xfn_table VALUES
(NULL,'福满堂','6-8人桌',1),
(NULL,'金镶玉','6-8人桌',1),
(NULL,'寿启天','6-8人桌',1),
(NULL,'小时代','6-8人桌',1),
(NULL,'全家福','6-8人桌',1);


-- 桌面预定信息表
-- 菜品分类表
CREATE TABLE xfn_reservation(
    rid  INT PRIMARY KEY AUTO_INCREMENT,
    contactName VARCHAR(64),
    phone VARCHAR(16),
    contacTime BIGINT,
    dinnerTime BIGINT
    -- tableId INT
    -- FOREIGN KEY(tableId) REFERENCES xfn_category(cid)
);
INSERT INTO xfn_reservation VALUES
(NULL,'丁丁','135012455678',1548404891997,1548404891997),
(NULL,'当当','135012455678',1548404891997,1548404891997),
(NULL,'丫丫','135012455678',1548404891997,1548404891997);

CREATE TABLE xfn_category(
    cid INT PRIMARY KEY AUTO_INCREMENT,
    cname VARCHAR(32)
);

INSERT INTO xfn_category VALUES
(NULL,'肉类'),
(NULL,'丸滑类'),
(NULL,'海鲜'),
(NULL,'菌菇类');


CREATE TABLE xfn_dish(
    did INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(32),
    imgUrl VARCHAR(128),
    price DECIMAL(6,2),
    detail VARCHAR(128),
    categoryId  INT,
    FOREIGN KEY(categoryId) REFERENCES xfn_category(cid)
);

INSERT INTO xfn_dish VALUES
(100000,'草鱼片','sdfsd.png',35,'选鲜活草鱼',1),
(Null,'脆皮肠','sdfsd.png',25,'开锅即食',1);

CREATE TABLE xfn_order(
    oid INT PRIMARY KEY AUTO_INCREMENT,
    startTime BIGINT,
    endTime BIGINT,
    customerCount INT,
    tableId INT,
    FOREIGN KEY(tableId) REFERENCES xfn_table(tid)
);
INSERT INTO xfn_order VALUES
(1,1548404891997,1548404891997,3,1);

CREATE TABLE xfn_order_detail(
    oid INT PRIMARY KEY AUTO_INCREMENT,
    dishId INT,
    dishCount INT,
    CustomerName VARCHAR(64),
    orderId INT,
    FOREIGN KEY(dishId) REFERENCES xfn_dish(did),
    FOREIGN KEY(orderId) REFERENCES xfn_order(oid)
);
INSERT INTO xfn_order_detail VALUES
(NULL,100000,1,'丁丁',1);