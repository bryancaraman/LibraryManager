LOAD DATA LOCAL INFILE '/users/bcaraman/workspace/LibraryManagement/data/Users.csv'
INTO TABLE Users
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/users/bcaraman/workspace/LibraryManagement/data/Users_name.csv'
INTO TABLE Users_name
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/users/bcaraman/workspace/LibraryManagement/data/Books.csv'
INTO TABLE Books
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/users/bcaraman/workspace/LibraryManagement/data/Checkouts.csv'
INTO TABLE Checkouts
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/users/bcaraman/workspace/LibraryManagement/data/Librarians.csv'
INTO TABLE Librarians
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/users/bcaraman/workspace/LibraryManagement/data/Librarians_name.csv'
INTO TABLE Librarians_name
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/users/bcaraman/workspace/LibraryManagement/data/Genres.csv'
INTO TABLE Genres
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/users/bcaraman/workspace/LibraryManagement/data/Belongs.csv'
INTO TABLE Belongs
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;