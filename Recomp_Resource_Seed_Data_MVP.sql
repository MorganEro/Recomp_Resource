USE [Recomp_Resource]
GO




INSERT INTO [UserType] ([Type]) VALUES ('Admin'), ('User') ;




INSERT INTO [Category] (Goal) VALUES ('FatLoss'), ('WeightGain') ;


INSERT INTO [Quote] ([Content]) VALUES 
	('All progress takes place outside the comfort zone.- Michal Joan Bobak'),
	('Look in the mirror. That’s your competition. – John Assaraf '),
	('Put all excuses aside and remember this: You are capable. – Zig Ziglar'),
	('The only place where success comes before work is in the dictionary.- Vidal Sassoon '),
	('The clock is ticking. Are you becoming the person you want to be? - Greg Plitt'),
	('Whether you think you can, or you think you can’t, you’re right. - Henry Ford '),
	('Success is what comes after your stop making excuses. – Luis Galarza '),
	('Discipline is the bridge between goals and accomplishment.– Jim Rohn'),
	('The pain you feel today will be the strength you feel tomorrow. – Arnold Schwarzenegger'),
	('Action is the foundational key to all success.- Pablo Picasso '),
	('Get comfortable with being uncomfortable! – Jillian Michaels '),
	('If something stands between you and your success, move it. Never be denied.- Dwayne Johnson '),
	('Number one, like yourself. Number two, you have to eat healthy. And number three, you have to squeeze your buns. That is my formula.- Richard Simmons '),
	('Sometimes you don’t realize your own strength until you come face to face with your greatest weakness. – Susan Gale '),
	('You must do the thing you think you cannot do. – Eleanor Roosevelt '),
	('If you want something you’ve never had, you must be willing to do something you’ve never done. —Thomas Jefferson '),
	('Nothing will work unless you do. —Maya Angelou'),
	('Our greatest glory is not in never failing, but in rising every time we fall. – Confucius '),
	('Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine. – Roy T. Bennett '),
	('Don’t count the days, make the days count. —Muhammad Ali '),
	('Do what you have to do until you can do what you want to do. —Oprah Winfrey'),
	('No matter how many mistakes you make or how slow you progress, you are still way ahead of everyone who isn’t trying.—Tony Robbins '),
	('All great achievements require time. —Maya Angelou'),
	('Your current body is the only body that can take you to your new body — so be kind to it. - Elaine Moran'),
	('Fitness is not about being better than someone else. It’s about being better than you used to be.- Khloe Kardashian'),
	('If it doesn’t challenge you, it won’t change you. - Fred Devito'),
	('Living a healthy lifestyle will only deprive you of poor health, lethargy, and fat.– Jill Johnson'),
	('The best way to predict the future is to create it.-Abraham Lincoln'),
	('What seems impossible today will one day become your warm-up.'),
	('Go the extra mile. It’s never crowded. '),
	('If you change the way you look at things, the things you look at change.-Wayne Dyer'),
	('Do something today that your future self will thank you for.-Sean Patrick Flanery'),
	('Push harder than yesterday if you want a different tomorrow.'),
	('You can either suffer the pain of discipline or the pain of regret.-Jim Rohn '),
	('No matter how slow you go you’re still lapping everyone on the couch.'),
	('The mind is the most important part of achieving any fitness goal. Mental change always comes before physical change.-Matt McGorry '),
	('I will beat her. I will train harder. I will eat cleaner. I know her strengths and weaknesses. She is going down. I have the advantage because I know her well. She is the old me '),
	('Believe in yourself and all that you are. Know that there is something inside of you that is greater than any obstacle. -Christian D. Larson '),
	('The only person you are destined to become is the person you decide to be. '),
	('Well done is better than well said.~ Benjamin Franklin '),
	('Sweat is fat crying.~ Anonymous '),
	('Tough times don’t last. Tough people do.~ Robert H. Schuller '),
	('You’re only one workout away from a good mood. ~ Anonymous '),
	('The groundwork for all happiness is good health. ~ Leigh Huntfs ');




INSERT INTO [User] (
[FirstName], [LastName], [DisplayName], [Birthday], [Weight], [Height],[BFPercentage], [BMR], [CurrentFocus], [CategoryId],[ImageAddress], [Bio], [Email], [UserTypeId], [FirebaseUserId], [Deactivated]
)
VALUES
  ('John', 'Doe', 'JohnDoe', '1990-01-01', 180.0, '6''0"', 20.0, 1800, 'Nutrition', 1,'https://example.com/image1.jpg', 'Fitness enthusiast', 'rradmin@rra.com', 1, '60IvmNEepXafDJZZmZTEKTuvDPA2', 0),
  ('Jane', 'Doe', 'JaneDoe', '1992-02-02', 160.0, '5''5"', 18.0, 1500, 'Cardio', 1,'https://example.com/image2.jpg', 'Yoga lover', 'rruser@rra.com', 2, 'MLvmv9xtWgbgsf4oiqPcp35jGRm1', 0),
  ('Michael', 'Smith', 'MikeSmith', '1985-03-03', 290.0, '6''2"', 22.0, 2300, 'Lifting', 2,'https://example.com/image3.jpg', 'Gym rat', 'rruser2@rra.com', 2, 'JbIAN7IJMMZtQmOSwlH3KObaXiE2', 0),
  ('Emily', 'Johnson', 'EmilyJohnson', '1995-04-04', 155.0, '5''6"', 17.0, 1400, 'Cardio', 1,'https://example.com/image4.jpg', 'Pilates fan', 'rruser3@rra.com', 2, 'yDJ9VDPaPsPL3afEyi6hHNv1oAJ2', 0),
  ('David', 'Brown', 'DaveBrown', '1980-05-05', 185.0, '6''1"', 23.0, 1900, 'Running', 1,'https://example.com/image5.jpg', 'Running addict', 'david.brown@email.com', 2, '5YC4BXmCggQcezIu9HEGOcWTnYl2', 0),
  ('Jessica', 'Miller', 'JessMiller', '1993-06-06', 158.0, '5''4"', 19.0, 1450, 'Nutrition', 1,'https://example.com/image6.jpg', 'Zumba instructor', 'jessica.miller@email.com', 2, 'Ki9Vbb0MNnSNDLyW6vNZ56x5JSQ2', 0),
  ('Daniel', 'Davis', 'DanDavis', '1988-07-07', 178.0, '5''11"', 21.0, 1700, 'Weight lifting', 2, 'https://example.com/image7.jpg', 'Crossfit lover', 'daniel.davis@email.com', 2, 'H1hRZThYqFX7qk2ZFTsyJbIL9oG3', 0),
  ('Sarah', 'Garcia', 'SarahGarcia', '1996-08-08', 150.0, '5''3"', 16.0, 1300, 'Nutrition', 1,'https://example.com/image8.jpg', 'Healthy foodie', 'sarah.garcia@email.com', 2,  'YwWRUErMqhOd451Iqw0Rl0cKq2p1', 0),
  ('James', 'Martinez', 'JimMartinez', '1982-09-09', 195.0, '6''4"', 24.0, 2100, 'Nutrition', 2, 'https://example.com/image9.jpg', 'Powerlifter', 'james.martinez@email.com', 2, 'YCxTnilGCzZZbZrGZTMnDcw4PXA3', 0),
  ('Elizabeth', 'Gonzalez', 'LizGonzalez', '1994-10-10', 154.0, '5''2"', 18.0, 1350, 'Cardio', 1, 'https://example.com/image10.jpg', 'Dance enthusiast', 'elizabeth.gonzalez@email.com', 2, 'DR0qDCoIvrVg4WHRimgchEsDQ7H3', 0);

