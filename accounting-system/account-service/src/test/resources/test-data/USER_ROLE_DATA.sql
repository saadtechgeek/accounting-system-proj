INSERT INTO CLIENT (ID,NAME,ACTIVE) VALUES (1,'School',1);
-- password = pass
INSERT INTO USER (username,clientid,PASSWORD,Firstname,lastname,fullname,ACTIVE) VALUES ('amunawar@outlook.com',1,'yQYU3jo4iLUaS3kS7puCbQ==','Munawar','Ali','Munawar Ali',1);
INSERT INTO ROLE (ID,NAME) VALUES (1,'ADMIN');
INSERT INTO USER_ROLE VALUES ('amunawar@outlook.com',1);
commit;
