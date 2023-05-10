USE [Recomp_Resource]
GO




INSERT INTO [UserType] ([Type]) VALUES ('Admin'), ('User') ;


INSERT INTO [Category] (Goal) VALUES ('Fat Loss'), ('Weight Gain') ;


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
FirstName, LastName, DisplayName, Birthday, Weight, Height, BFPercentage, BMR, CurrentFocus, CategoryId, ImageAddress, Bio, Email, UserTypeId, FirebaseUserId, Deactivated
)
VALUES
  ('John', 'Doe', 'JohnDoe', '1990-01-01', '180', '6''0"', '20.0', '1800', 'Nutrition', 1,'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80', 'Fitness enthusiast', 'rradmin@rra.com', 1, '60IvmNEepXafDJZZmZTEKTuvDPA2', 0),
  ('Jane', 'Doe', 'JaneDoe', '1992-02-02', '160', '5''5"', '18.0', '1500', 'Cardio', 1,'https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGZhY2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60', 'Yoga lover', 'rruser@rra.com', 2, 'MLvmv9xtWgbgsf4oiqPcp35jGRm1', 0),
  ('Michael', 'Smith', 'MikeSmith', '1985-03-03', '290', '6''2"', '22.0', '2300', 'Lifting', 2,'https://images.unsplash.com/photo-1608549036505-ead5b1de5417?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGZhY2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60', 'Gym rat', 'rruser2@rra.com', 2, 'JbIAN7IJMMZtQmOSwlH3KObaXiE2', 0),
  ('Emily', 'Johnson', 'EmilyJohnson', '1990-04-04', '155', '5''6"', '17.0', '1400', 'Cardio', 1,'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZmFjZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=1400&q=60', 'Pilates fan', 'rruser3@rra.com', 2, 'yDJ9VDPaPsPL3afEyi6hHNv1oAJ2', 0),
  ('David', 'Brown', 'DaveBrown', '1980-05-05', '185', '6''1"', '23.0', '1900', 'Running', 1,'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=900&q=60', 'Running addict', 'david.brown@email.com', 2, '5YC4BXmCggQcezIu9HEGOcWTnYl2', 0),
  ('Jessica', 'Miller', 'JessMiller', '1993-06-06', '158', '5''4"', '19.0', '1450', 'Nutrition', 1,'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=900&q=60', 'Zumba instructor', 'jessica.miller@email.com', 2, 'Ki9Vbb0MNnSNDLyW6vNZ56x5JSQ2', 0),
  ('Daniel', 'Davis', 'DanDavis', '1988-07-07', '178', '5''11"', '21.0', '1700', 'Weight lifting', 2, 'https://images.unsplash.com/photo-1610186594416-2c7c0131e35d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60', 'Crossfit lover', 'daniel.davis@email.com', 2, 'H1hRZThYqFX7qk2ZFTsyJbIL9oG3', 0),
  ('Sarah', 'Garcia', 'SarahGarcia', '1996-08-08', '150', '5''3"', '16.0', '1300', 'Nutrition', 1,'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60', 'Healthy foodie', 'sarah.garcia@email.com', 2,  'YwWRUErMqhOd451Iqw0Rl0cKq2p1', 0),
  ('James', 'Martinez', 'JimMartinez', '1982-09-09', '195', '6''4"', '24.0', '2100', 'Nutrition', 2, 'https://images.unsplash.com/photo-1615813967515-e1838c1c5116?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60', 'Powerlifter', 'james.martinez@email.com', 2, 'YCxTnilGCzZZbZrGZTMnDcw4PXA3', 0),
  ('Elizabeth', 'Gonzalez', 'LizGonzalez', '1994-10-10', '154', '5''2"', '18.0', '1350', 'Cardio', 1, 'https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=900&q=60', 'Dance enthusiast', 'elizabeth.gonzalez@email.com', 2, 'DR0qDCoIvrVg4WHRimgchEsDQ7H3', 0);




INSERT INTO [Resource] ([Title], [CategoryId], [Topic], [DateAdded], [Content]) VALUES 
	('calories of food', 1, 'Fat loss', 2023-05-01, 'content'),
	('carb cycling', 1, 'Nutrition', 2023-02-11, 'content'),
	('Walkling Calories', 1, 'Cardio', 2023-01-21, 'content'),
	('Protein Sources', 1, 'Nutrition', 2022-05-10, 'content'),
	('Lifting for Weightloss', 1, 'Lifting', 2023-05-01, 'content'),
	('How many reps is right for you?', 2, 'Gym', 2023-04-21, 'content'),
	('What is a good workout split', 2, 'Workouts', 2022-11-01, 'content'),
	('Eating for weight Gain', 2, 'Nutrition', 2023-08-25, 'content'),
	('Hypertrophy vs strength training', 2, 'Lifting', 2030-05-01, 'content'),
	('Stress and Fat loss', 1, 'Hormones', 2022-04-11, 'content');



INSERT INTO [SavedResource] (UserId, ResourceId, SaveDate) VALUES 

	(2, 3, '2023-05-03'),
	(2, 1, '2023-05-03'),
	(2, 3, '2023-05-03'),
	(2, 4, '2023-05-03'),
	(3, 3, '2023-05-03'),
	(3, 5, '2023-02-03'),
	(3, 6, '2023-03-03'),
	(4, 7, '2023-01-03'),
	(4, 8, '2023-01-03'),
	(4, 9, '2023-05-03'),
	(3, 10, '2022-05-03'),
	(3, 1, '2022-05-03'),
	(3, 2, '2023-05-03'),
	(3, 7, '2022-05-03'),
	(2, 5, '2020-05-03'),
	(2, 10, '2021-05-03'),
	(3, 4, '2022-05-22'),
	(2, 3, '2023-05-13'),
	(5, 6, '2023-04-03'),
	(6, 4, '2022-10-03'),
	(7, 7, '2022-11-03'),
	(8, 1, '2023-03-03'),
	(7, 6, '2023-01-03'),
	(9, 10, '2023-03-03'),
	(5, 2, '2023-02-03');


INSERT INTO [Comment] (UserId, ResourceId, Content, DateSent) VALUES 
	(2, 3,'I really learned a lot from this. Gonna have to supplement as a vegan', '2023-05-03'),
	(2, 1, 'Cycling carbs is challenging','2023-05-03'), 
	(8, 3, 'It will be hard to get my body Weight in grams of protein!','2023-05-03'),
	(2, 4, 'Great content', '2023-05-03'),
	(3, 3, 'Where has this app being all my life. So much great information', '2023-05-03'),
	(3, 5, 'I have left so many gains on the table with reps!', '2023-02-03'),
	(3, 6, 'I used to only do the bro split. So much more variations out there. hahaha', '2023-03-03'),
	(4, 7, 'Gaining weight the right way is just as hard as loosing, in my opinion', '2023-01-03'),
	(4, 8, 'The tow are very similar but it really depends on reps and focus', '2023-01-03'),
	(4, 9, 'It is so hard to balance work stress and get in the gym too. Just thinking about it stesses me out! lol', '2023-05-03'),
	(3, 10, 'hormones, hormones, hormones! My period really does a number on my focus sometimes', '2022-05-03'),
	(3, 1, 'I am going to tell my friend about this. This video is so informative', '2022-05-03'),
	(3, 2, 'I just got an apple watch. Gotta close those rings!', '2023-05-03'),
	(3, 7, 'I was just curios about the diffences in gaining and losing. This helps alot even though I am not trying to gain at the moment', '2022-05-03'),
	(2, 5, 'But it hurts. lol. It is hard to push pass that initinial burn', '2020-05-03'),
	(2, 10, 'The body is soo cool. Thanks for sharing this',  '2021-05-03'),
	(3, 4, 'That seems like a lot to eat if I am trying to loose weight. I hope it makes more sense after I finish this',  '2022-05-22'),
	(2,  3, 'So that is what is meant by incomplete protein source!! mind blown', '2023-05-13'),
	(5, 6, 'I am gonna try out the 4 days a week full body split. Muscles are on the way',  '2023-04-03'),
	(6, 4, 'Yeash! I love this because I hate cardio!!!!',  '2022-10-03'),
	(7, 7, 'I hear the rock puts down over 5000 calories. Thats crazy. I can barely do 3000', '2022-11-03'),
	(8, 1, 'My sister is prediabetic. I am gonna share this with her', '2023-03-03'),
	(7, 6, 'I work a lot so this information is great. I needed more options so I can be successful', '2023-01-03'),
	(9, 10, 'This will come in handy when I am trying to shred in the future',  '2023-03-03'),
	(5, 2, 'I can walk for days!! Lets get the happy body of mine to be happy and leaner!', '2023-02-03');
