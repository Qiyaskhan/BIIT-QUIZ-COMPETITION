Use [Master]
Create Database [BQC]
Use [BQC]

Create Table Teacher
(
	email varchar(30) primary key,
	tName varchar(30),
	tPassword varchar(30),
	Role varchar (30) default ('Teacher')
)

--Teacher
insert into teacher (email, tName, tPassword) values ('zahidahmed@biit.edu.pk', 'Zahid Ahmed', '123')

Create Table MCQS 
(
	questionID int Identity (1,1) primary key,
	question varchar(MAX),
	opt1 varchar(30),
	opt2 varchar(30),
	opt3 varchar(30),
	opt4 varchar(30),
	answer varchar (30),
	subject varchar(30),
	difficultyLevel varchar (30),
)



--select m.* From MCQS m, QuizHasMCQS qhs, Quiz q where qhs.questionID = m.questionID and qhs.quizID = q.quizID and q.quizID = 1018 


--Create Table TeacherCreateMCQS
--(
--	email varchar(30),
--	questionID int,
--	foreign key (email) references Teacher (email),
--	foreign key (questionID) references MCQS (questionID)
--)

Create Table Subjects
(
	subjectID int Identity (1,1) primary key,
	subject varchar (30),
)

--Subjects
insert into subjects (subject) values ('PF')
insert into subjects (subject) values ('OOP')
insert into subjects (subject) values ('Database')
insert into subjects (subject) values ('Web Technologies')
insert into subjects (subject) values ('Web Engineering')
insert into subjects (subject) values ('ICT')
insert into subjects (subject) values ('Java')
insert into subjects (subject) values ('C++')
insert into subjects (subject) values ('C#')
insert into subjects (subject) values ('Java Script')
insert into subjects (subject) values ('React Native')
insert into subjects (subject) values ('Flutter')
insert into subjects (subject) values ('Android')
insert into subjects (subject) values ('IOS')
insert into subjects (subject) values ('PHP')
insert into subjects (subject) values ('Dart')
insert into subjects (subject) values ('AI')
insert into subjects (subject) values ('PDC')
insert into subjects (subject) values ('CC')

--Create Table MCQSHasSubject
--(
--	questionID int,
--	subjectID int,
--	foreign key (questionID) references MCQS (questionID),
--	foreign key (subjectID) references Subjects (subjectID)
--)

create table Quiz 
(
	quizID int Identity (1,1) primary key,
	title varchar(30),
	date Date, -- 0000-00-00
	totalTime int,
	totalQuestions int,
	Easy int ,
	Medium int,
	Hard int,
	subject varchar(30),
)

select * from Quiz

--Create Table TeacherCreateQuiz
--(
--	email varchar(30),
--	quizID int,
--	foreign key (email) references Teacher (email),
--	foreign key (quizID) references Quiz (quizID)
--)

--Create Table QuizHasSubject
--(
--	subjectID int,
--	quizID int,
--	foreign key (subjectID) references Subjects (subjectID),
--	foreign key (quizID) references Quiz (quizID)
--)
 

Create Table QuizHasMCQS
(
	quizID int,
	questionID int,
	foreign key (quizID) references Quiz (quizID),
	foreign key (questionID) references MCQS (questionID)
)

Insert Into QuizHasMCQS (quizID, questionID) Values (1008, 2)

Create Table Semesters 
(
	semesterID Int Identity (1,1) primary key,
	semester varchar (10),
)

--Semesters
Insert Into Semesters (semester) Values ('1st')
Insert Into Semesters (semester) Values ('2nd')
Insert Into Semesters (semester) Values ('3rd')
Insert Into Semesters (semester) Values ('4th')
Insert Into Semesters (semester) Values ('5th')
Insert Into Semesters (semester) Values ('6th')
Insert Into Semesters (semester) Values ('7th')
Insert Into Semesters (semester) Values ('8th')

Create Table QuizHasAllowedSemesters
(
	quizID int,
	semesterID int,
	foreign key (quizID) references Quiz (quizID),
	foreign key (semesterID) references Semesters (semesterID)
)

Create Table Student
(
	regNo varchar(30) primary key,
	sName varchar(30),
	sPassword varchar(30),
	semester varchar(10),
	Role varchar (30) default ('STUDENT')
)

-- Student
INSERT into student (regNo, sName, sPassword, semester) values ('2018-ARID-1078', 'Osama', '123', '8th')
INSERT into student (regNo, sName, sPassword, semester) values ('2018-ARID-0000', 'Gul', '123', '7th')

select * from student

Create Table StudentAttemptQuiz 
(
	quizID int,
	regNo varchar(30),
	foreign key (quizID) references Quiz (quizID),
	foreign key (regNo) references Student (regNo),
)

Create Table StudentRateQuiz 
(
	quizRating int, -- Rate 1-5
	regNo varchar(30),
	quizID int,
	foreign key (quizID) references Quiz (quizID),
	foreign key (regNo) references Student (regNo),
)

Create Table Results 
(
	resultID Int Identity (1,1) primary key,
	totalNumbers int,
	obtainedNumbers int,
	regNo varchar(30),
	quizTitle varchar(30),
	subject varchar(30),
	noOfEasyWrong int,
	noOfMediumWrong int,
	noOfHardWrong int,
	noOfEasyRight int,
	noOfMediumRight int,
	noOfHardRight int,
)

Create Table ResultHasMCQS(
	selectedAnswer varchar(100),
	resultID int,
	questionID int,
	foreign key (resultID) references Results (resultID),
	foreign key (questionID) references MCQS (questionID)
)

alter table Results
add noOfEasyWrong int;

select * from MCQS
select * from Quiz
select * from QuizHasMCQS

--select * from results

--Create Table StudentHasResultInQuiz
--(
--	regNo varchar(30),
--	resultID int,
--	quizID int,
--	foreign key (regNo) references Student (regNo),
--	foreign key (resultID) references Results (resultID),
--	foreign key (quizID) references Quiz (quizID)
--)

--Queries

---- Insert MCQS And Assign Subject To That Question
--Insert Into MCQS (question,opt1,opt2,opt3,opt4,answer,difficultyLevel) Values ('Question','Option1', 'Option2','Option3','Option4','Answer','Difficulty')
--Select subjectID from Subjects where subject = 'C++'
--Select questionID from MCQS where question = 'Question'
--Insert Into MCQSHasSubject (questionID,subjectID) Values ('QuestionID','SubjectID')
--Insert Into TeacherCreateMCQS (email, questionID) Values ('Email','SubjectID')

--Select * from MCQS
--Select * from MCQSHasSubject
--Select * from TeacherCreateMCQS

--delete from MCQS Where questionID = 3
--delete from MCQS Where questionID = 4

----Get MCQS With Thier Subject 
--Select m.*, s.subject from MCQS m, Subjects s, MCQSHasSubject mhs where mhs.questionID = m.questionID and mhs.subjectID = s.subjectID

----Insert Quiz Detail With MCQS And Assign Subject And Assign Allowed Semesters With Loop
--Insert Into Quiz (title, date, totalTime,totalQuestions, difficultyLevel) Values ('Title', 'Date', 'TotalTime', 'TotalQuestions', 'Difficulty')
--Select subjectID from Subjects where subject = 'Some Subject'
--Select quizID from Quiz where title = 'Title'
--Insert Into QuizHasSubject (quizID, subjectID) Values ('QuizID', 'SubjectID')
--Insert Into TeacherCreateQuiz (email, quizID) Values ('Email', 'QuizID')

--				--Loop And Get All Semester ID's
--Select semesterID from Semesters where semester = 'Semester Name'
--Insert Into QuizHasAllowedSemesters (quizID, semesterID)

	--Get Quiz ID in return and then save all MCQS in a loop
--Insert Into QuizHasMCQS (quizID, questionID) Values ('QuizID', 'QuestionID')

--select * from Quiz where quizID = 1010

--delete from Quiz where quizID =  1019


--select * from QuizHasSubject

--delete from QuizHasSubject where quizID =  1019


--select * from TeacherCreateQuiz
--delete from TeacherCreateQuiz where quizID =  1019

--Select * from QuizHasAllowedSemesters

--delete from QuizHasAllowedSemesters where quizID =  1019

--select * from QuizHasMCQS

---- Get Quiz Title And Subject For Student Dropdown List
--Select semesterID from Semesters where semester = 'Semester Name'
--Select q.title, s.subject from Quiz q, Subjects s, QuizHasSubject qhs, QuizHasAllowedSemesters qhas where qhs.quizID = qhs.subjectID and qhas.quizID = qhas.semesterID

---- Get Results For Student
--Select s.regNo, r.totalNumbers, r.obtainedNumbers from Results r, Student s, Quiz q, StudentHasResultInQuiz shriq where shriq.regNo = s.regNo and shriq.resultID = r.resultID and shriq.quizID = q.quizID

---- Get Results For Teachers
--Select r.totalNumbers, r.obtainedNumbers from Results r, Quiz q, Subjects s, 

-- Insert Values In Tables

-- Student
--INSERT into student (regNo, sName, sPassword, semester) values ('2018-ARID-1078', 'Osama', '123', '8th')
--INSERT into student (regNo, sName, sPassword, semester) values ('2018-ARID-0000', 'Gul', '123', '7th')

--select * from Student

--Teacher
--insert into teacher (email, tName, tPassword) values ('zahidahmed@biit.edu.pk', 'Zahid Ahmed', '123')

--MCQS
--insert into mcqs (qName,opt1,opt2,opt3,opt4,answer,difficultyLevel) values ('What Is Computer','Electronic Machine', 'Option2','Option3','Option4','Electronic Device','Easy')

--select * from MCQS
--Select title From Quiz

-- Get MCQS Paper For Student Against Title


-- Get All Subject
Select subject from Subjects

--Get All Titles Of Quiz
Select title from Quiz

--Get All MCQS
Select * from MCQS

--Get MCQS Base On Subject

Select * from MCQS where subject = 'C++'

--Result Of Specific Student
Select * from Results where regNo = '2018-ARID-1078' and quizTitle = 'asdas'

--Results Of All Students In Specific Subject/Title
Select * from Results where quizTitle = 'asdas'


--Insert MCQS

Insert Into MCQS (question,opt1,opt2,opt3,opt4,answer,subject,difficultyLevel) values ()

--Insert Quiz

Insert Into Quiz (title, date, totalTime,totalQuestions, Easy,Medium,Hard, subject) Values ()

--Insert QUIZ HAS MCQS

Insert Into QuizHasMCQS (quizID, questionID) ()

--
Select quizID from Quiz where title = 'Demo'

select * from Quiz


--Delete MCQS

delete from MCQS where questionID  = 1

select q.*,m.* from Quiz q, MCQS m, QuizHasMCQS qhm where qhm.quizID = q.quizID and qhm.questionID = m.questionID and q.subject = 'React Native'