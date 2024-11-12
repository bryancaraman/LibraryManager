CREATE TABLE Users (
    User_ID INT PRIMARY KEY,
    UEmail VARCHAR(100) NOT NULL,
    PhoneNum VARCHAR(15) NOT NULL,
    Address VARCHAR(255) NOT NULL
);

CREATE TABLE Users_name (
    User_ID INT,
    FName VARCHAR(50) NOT NULL,
    MInit CHAR(1),
    LName VARCHAR(50) NOT NULL,
    FOREIGN KEY (User_ID) REFERENCES Users(User_ID) ON DELETE CASCADE
);

CREATE TABLE Books (
    Book_ID INT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Author VARCHAR(100) NOT NULL,
    CopiesInStock INT NOT NULL CHECK (CopiesInStock >= 0)
);

CREATE TABLE Checkouts (
    Checkout_ID INT PRIMARY KEY,
    User_ID INT,
    Book_ID INT,
    Checkout_Date DATE NOT NULL,
    Due_Date DATE NOT NULL,
    Date_Returned DATE,
    FOREIGN KEY (User_ID) REFERENCES Users(User_ID),
    FOREIGN KEY (Book_ID) REFERENCES Books(Book_ID)
);

CREATE TABLE Librarians (
    Librarian_ID INT PRIMARY KEY,
    LibEmail VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Librarians_name (
    Librarian_ID INT,
    L_FName VARCHAR(50) NOT NULL,
    L_MInit CHAR(1),
    L_LName VARCHAR(50) NOT NULL,
    FOREIGN KEY (Librarian_ID) REFERENCES Librarians(Librarian_ID) ON DELETE CASCADE
);

CREATE TABLE Genres (
    Genre_ID INT PRIMARY KEY,
    GName VARCHAR(50) NOT NULL,
    Librarian_ID INT NOT NULL,
    FOREIGN KEY (Librarian_ID) REFERENCES Librarians(Librarian_ID)
);

CREATE TABLE Belongs (
    Book_ID INT,
    Genre_ID INT,
    PRIMARY KEY (Book_ID, Genre_ID),
    FOREIGN KEY (Book_ID) REFERENCES Books(Book_ID) ON DELETE CASCADE,
    FOREIGN KEY (Genre_ID) REFERENCES Genres(Genre_ID) ON DELETE CASCADE
);