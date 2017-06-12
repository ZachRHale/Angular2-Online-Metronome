CREATE DATABASE onlinemetronome;

USE onlinemetronome;

CREATE TABLE IF NOT EXISTS Users (
	UserID int NOT NULL AUTO_INCREMENT,
    UserName varchar(255) NOT NULL, 
    UserFirstName varchar(255),
    UserLastName varchar(255),
    PRIMARY KEY (UserID)
 );
 
CREATE TABLE IF NOT EXISTS Pieces (
	PieceID int NOT NULL AUTO_INCREMENT, 
    PieceName varchar(255) NOT NULL,
    PieceComposer varchar(255) NOT NULL,
    PieceOwner int NOT NULL, 
    PRIMARY KEY (PieceID),
    FOREIGN KEY (PieceOwner) REFERENCES Users(UserID)
);

CREATE TABLE IF NOT EXISTS Measures (
	PieceID int NOT NULL, 
    Top int NOT NULL, 
    Bottom int NOT NULL, 
    Tempo int,
    MeasureNumber int NOT NULL,
    FOREIGN KEY (PieceID) REFERENCES Pieces(PieceID)
);