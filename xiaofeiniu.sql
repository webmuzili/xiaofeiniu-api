SET NAMES UTF8;
DRAP DATABASE IF EXISTS xfn;
CREATE DATABASE xfn CHARSET=UTF8;
USE xfn;

-- 管理员信息表
CREATE TABLE xfn_admin(
    aid INT,
    aname VARCHAR(32),
    apwd  VARCHAR(64)
)
-- 项目全局设置
CREATE TABLE xfn_settinngs(
    sid INT,
    appName VARCHAR(64),
    apiUrl VARCHAR(64),
    adminUrl VARCHAR(64),
    appUrl VARCHAR(64),
    icp VARCHAR(64),
    copyright VARCHAR(64)
)
-- 桌面信息表
CREATE TABLE xfn_table(
    tid INT,
    tname VARCHAR(64),
    type VARCHAR(16),
    status INT
)