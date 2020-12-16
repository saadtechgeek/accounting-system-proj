Write an endpoint that will allow an existing user to open a savings account. The account can only be opened between 8 AM and 5 PM and the user can have only one savings account.
The data can be stored however you see fit (e.g. database, in memory, file) and you can use any JVM language and framework.
Optional: Create a web form that will provide the data to the backend application.
Add a readme file that will explain how to run the application and any other information that you may see relevant.
Share the application through github or bitbucket or as zip archive to my e-mail (daniela.anton@ing.com) .
For this exercise you have 7 working days to provide an answer


Program overview
----------------
This progress addresses both backend and front-end implementation of system requirement. This system addresses following areas

1) Authentication and authorization of user using spring security using backend and front end code.
2) Framework is written to support mock-server for frontend application
3) Framework that support e2e execution of code
4) Architect the code in the way that it support micro-service architecture where front-end code can be dockerized using nginx server and backend code can be dockerized to provide services
5) Just if user want to run the code in tomcat, support has been provided so localhost:8080 will land the user to login screen. However use http://localhost:5200 for UI Display 
6) Swagger support has been added in the application so to view custom end-points
7) Application support hal-browser to view jpa endpoints. you can check all the end-point through following endpoints
http://localhost:8080/accountmanagement
8) All the validation check has been applied at front-end. 

Following validation has been applied. 
a) User can only be created between 9 am to 5pm. Code currently check system date. this can be change by supporting UTC timezone. 
b) Only one saving account can be created. Right now user is not given option to create account if one saving account is already created. Improvement can be done that user could create other account like current account but cannot create saving account.

9) User is given option to create new user.
10) Main feature such as user registration, user authentication, user list, account type in dropdown and create account everything functionality is running with backend services.
11) Liquibase support is added so to version the schema changes.
15) lombok has been used in code to reduce boiler plate code.












Steps to run the program
--------------------------

Persistent layer creation
-------------------------
create schema with name accountmanagement in mysql databases. you can use following command

CREATE DATABASE accountmanagement;


Front end
---------
Follow the step as given below
cd application-ui\src\main\frontend

npm install
npm run start

UI will launch with following endpoint

http://localhost:5200


Backend
-------
Execute following command from root of repo

mvn clean install -DskipTests=true 


cd application-server

mvn spring-boot:run


you can access hal-browser through following endpoint
http://localhost:8080/accountmanagement


Step by step guide of running the program is given in seperate document file


Assumption/Limitation
---------------------
1) User land with with some alignment out. Ctrl+F5 will fix the problem.
2) if service is down, user will be shown user already exist as common error message of application
3) User currently reads local-storage 2nd time to validadte if user is present. This should be changed
4) Dashboard of screen is only shown for display purpose
5) Account-list tag is not implemented as that was not required
6) User can be associated with account by pressing action icon. 
7) If any saving account is created. user cannot create other account



