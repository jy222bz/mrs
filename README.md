# MRS - Movie Review System WITH MySQL Database
## Installation and Configurations:
1. ### Clone the repo:

~~~
clone https://github.com/jy222bz/movie-review-system-with-sql.git
~~~

2. ### Install the dependencies:
~~~
npm install
~~~

3. ### MySQ Installation and ConfigurationsL:
~~~
You need to install the MySQL package on your local environment and configure the five 
tables that are required for this application according to the columns and you need to
create the VIEW as well. All the tables have an ID column and it is the primary key
and it MUST be Auto-Incremental.

Tables:
     1. users 
           Columns: id, email, password, firstName, lastName and fullName
     2. directors
           Columns: id, age, origin, firstName, lastName and fullName 
     3. movies
           Columns: id, name, category, director, note, year, price, language, 
           ageLimit, directorID, length and origin.
     4. serieses
           Columns: id, name, category, director, note, year, price, language, 
           ageLimit, directorID, episodes, seasons and origin. 
     5. reviews
           Columns: id, movieName, author, authorID, gross, goofs, story, 
           review, movieID, rating, awards, quotes, createdAT and updatedAT.

VIEW:
CREATE VIEW `mms_db`.`top_films_view` AS
    SELECT 
        `r`.`rating` AS `rate`,
        `r`.`id` AS `id`,
        `m`.`name` AS `movie`,
        `m`.`category` AS `mcategory`,
        `m`.`price` AS `mprice`,
        `m`.`director` AS `mdirector`,
        `s`.`name` AS `series`,
        `s`.`category` AS `scategory`,
        `s`.`price` AS `sprice`,
        `s`.`director` AS `sdirector`
    FROM
        ((`mms_db`.`reviews` `r`
        LEFT JOIN `mms_db`.`movies` `m` ON ((`m`.`id` = `r`.`movieID`)))
        LEFT JOIN `mms_db`.`serieses` `s` ON ((`s`.`id` = `r`.`movieID`)))
    WHERE
        (`r`.`rating` > 79)
    ORDER BY `r`.`rating` DESC

Furthermore, you need to configure the connection to connect the application with the database. 
That is by providing an environment variable file (.env) and put the following credentials: 

1. DB_HOST = localhost.
2. DB_USER = Your database root user.
3. DB_PASSWORD = Your database password.
4. DB_NAME = The name of the database.
5. DB_PORT = The databse port.
6. SECERT = Secert text for the session.
7. PORT = The port for the server.
~~~

4. ### Run the application:
~~~
npm start
~~~
4. ### To run the eslint, run one of the following commands:
~~~
npm test
~~~
~~~
npm run lint
~~~
<br><br><br>
_____

## Technologies, Frameworks and Libraries:
1. JavaScript ES6: Applying Object-Orientation Paradigm.
2. Node.js: To conduct server-side programming.
3. Express.js: To create the APIs of the application.
4. HTML
5. CSS
6. Handlebars (HBS): To serve data and HTML markups dynamically.
7. bcrypt: To apply security by hashing passwords before storing them.
8. csurf: To apply security by injecting secert tockens.
9. Bootstrap: To make the application nice, fast and responsive.
10. MySQL: To provide data storage and queries and to support authentication and CRUD functionalities.

___

## Information:
Author: Jacob Yousif <br>
Email: jy222bz@ystudent.lnu.se <br>
Student ID: jy222bz <br>
Course: Database Threory <br>
Course Code: 2DV315 <br>
Linnaeus University <br>



