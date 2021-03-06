CREATE DATABASE onlinemetronome;

USE onlinemetronome;

CREATE TABLE IF NOT EXISTS Users (
	UserID varchar(36) NOT NULL,
    UserName varchar(255) NOT NULL, 
    UserFirstName varchar(255),
    UserLastName varchar(255),
    PRIMARY KEY (UserID)
 );
 
CREATE TABLE IF NOT EXISTS Pieces (
	PieceID varchar(36) NOT NULL, 
    PieceName varchar(255) NOT NULL,
    PieceComposer varchar(255) NOT NULL,
    PieceOwner int NOT NULL, 
    PRIMARY KEY (PieceID),
    FOREIGN KEY (PieceOwner) REFERENCES Users(UserID)
);

CREATE TABLE IF NOT EXISTS Measures (
	PieceID varchar(36) NOT NULL, 
    TopNumber int NOT NULL, 
    BottomNumber int NOT NULL, 
    Tempo int,
    MeasureNumber int NOT NULL,
    PRIMARY KEY (PieceID, MeasureNumber),
    FOREIGN KEY (PieceID) REFERENCES Pieces(PieceID)
);