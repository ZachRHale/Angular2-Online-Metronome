CREATE DATABASE onlinemetronome;

USE onlinemetronome;

IF (EXISTS (SELECT * 
                 FROM INFORMATION_SCHEMA.TABLES 
                 WHERE TABLE_SCHEMA = 'TheSchema' 
                 AND  TABLE_NAME = 'Users'))
BEGIN
CREATE TABLE Users (
	UserID varchar(36) NOT NULL,
    UserName varchar(255) NOT NULL, 
    UserFirstName varchar(255),
    UserLastName varchar(255),
    PRIMARY KEY (UserID)
 );
END

IF (EXISTS (SELECT * 
                 FROM INFORMATION_SCHEMA.TABLES 
                 WHERE TABLE_SCHEMA = 'TheSchema' 
                 AND  TABLE_NAME = 'Pieces'))
BEGIN
CREATE TABLE Pieces (
	PieceID varchar(36) NOT NULL, 
    PieceName varchar(255) NOT NULL,
    PieceComposer varchar(255) NOT NULL,
    PieceOwner int NOT NULL, 
    PRIMARY KEY (PieceID),
    FOREIGN KEY (PieceOwner) REFERENCES Users(UserID)
);
END

IF (EXISTS (SELECT * 
                 FROM INFORMATION_SCHEMA.TABLES 
                 WHERE TABLE_SCHEMA = 'TheSchema' 
                 AND  TABLE_NAME = 'Measures'))
BEGIN
CREATE TABLE Measures (
	PieceID varchar(36) NOT NULL, 
    TopNumber int NOT NULL, 
    BottomNumber int NOT NULL, 
    Tempo int,
    MeasureNumber int NOT NULL,
    PRIMARY KEY (PieceID, MeasureNumber),
    FOREIGN KEY (PieceID) REFERENCES Pieces(PieceID)
);
END

 


