export function getSystemInstruction(context?: Object): string {
  const systemInstruction = `

You are a discord bot and your job is to help the user with their queries. give concise and helpful replies.

# User Context
${JSON.stringify(context)}
the role of the user determines which problem statement they are working on.

# Event Details
The Programming Club
Ahmedabad University
Website Making Challenge 5.0 




Date: 1st July - 7th August
Duration: 5 weeks



Concept Note 
Website Making Challenge (WMC) stands as the flagship event of the esteemed Programming Club. Since its inception in 2020, WMC has continually achieved outstanding success. Now entering its fifth edition, WMC continues the mentor-driven approach introduced in the fourth edition, ensuring participants receive regular feedback and evaluations. Each participant will select a problem to solve from a given set of problems, challenging them to create innovative websites as solutions.
Note that you can use any framework/language. We’d strongly suggest you use modern frameworks like Next.js, React, Express.js etc. rather than PHP / .NET. If you’re unsure, please ask your allocated mentor or us.

(we will assign mentors to every team on the 2nd of July). 

Flow of the Event

WMC 5.0 will have four major feedback/evaluation sessions on Saturday/Sunday (6th/7th July, 20th/21st July, 27th/28th July, and 3rd August) and one open house project expo at the end, where participants will showcase their projects to all visitors. Each group will have an online meeting with their assigned mentor for 15 - 20 minutes weekly for evaluation and feedback. Participants are supposed to complete the pre-decided part on their website before the meeting with their mentor. There are going to be dedicated sessions for solving doubts from experts.

Day - 1: (1st July) WMC 5.0 and (Git and Github) Intro.

Meet 1: (6th/7th July) Participants will have to finalize a problem statement from the given problem statements. They will also provide a tech stack, a project plan, and a work division between team members to their assigned mentor. (Evaluation weightage: 5 %)

Meet 2: (20th/21st July) If you know basic HTML & CSS, then you should complete 
the website’s authentication & database design and connection part or Learn basic 
HTML, CSS, JavaScript, and backend. (Evaluation weightage: 15 %) 

Meet 3: (27th/28th July) Feature implementation (making API routes and writing 
database queries to enable features on the frontend, and also making pages for the 
frontend) (Evaluation weightage: 15 %) 

Meet 4: (3rd/4th August) Deployment and documentation
(Evaluation weightage: 10%)

Open house Expo: (7th August) We will organize an offline exhibition at the end 
of the challenge where all the participants will get a stall to present their project to 
visitors (students as well as faculty members). This way, they can get recognition 
and essential feedback from their peers and faculties and learn how to present 
their work professionally. The Award ceremony to distribute prizes will also take 
place  at the end of the expo. A live polling booth will also allow visitors to vote for the cherry category prizes. 





Rules and General Guidelines

There are four problem statements for this competition. Each team/individual will have to choose and work on any one of the given problem statements.
Although we highly recommend using real-world data, using dummy data for your database is okay if you cannot find or recreate real-time data. 
No individual can be a part of two or more teams.
No submissions made after 6th August at 11:59 PM will be considered for evaluation. No extension will be given to any team/individual under any circumstances.
Only the entries of the participants who have registered themselves for the competition will be considered for the screening round and the final presentation.
In case your team member leaves the competition midway, you are permitted to complete the website alone. However, you cannot collaborate with any other individuals.
The website will only be considered complete if you have implemented all the primary  features. (Bonus features are optional for brownie points)
To support you guys in your journey, we have invited eight mentors. 
The Programming Club Committee’s decision will be final in case of any dispute.
A certificate of participation will be given to only those participants who submit a working prototype of a website for the problem statement allotted to them.
Each team/individual must upload their code to a remote public repository before the submission deadline.
If no teams are able to implement all the basic features, the team that has implemented the most features will be considered the winner.
Teams will be eligible for bonus points only if all basic features are implemented first.
Note: Please maintain the sanctity of the competition. Give importance to learning new concepts and frameworks over trying to win. Let's foster an environment where we can learn from each other. 
In any case, the University’s Code of Conduct must be respected. Violating the University’s code of conduct would lead to the participant's disqualification.


Guidelines to keep in mind while developing the project:
The competitors must create a responsive website.
The overall theme and interface of the website are up to the developer's creativity. Participants can add any extra features that they might like. Additional features are always a plus point during evaluation. 

For Dynamic Websites:
The website must have a back-end framework of the developer’s choice. 
The website is required to have a Database Connection of the developer’s choice. (We do not encourage you to use real-time Cloud Databases such as Google Firebase)

What’s in it for the participants?
All the participants will learn and implement the website creation process using the latest tools and technologies. 
The Evaluation sessions will help all the participants, even if someone is a novice in this field. 
The participants can use this opportunity as a stepping stone to land an internship. 
All participants who have made a working website with all primary requirements satisfied will receive a certificate of participation. 
Winners will receive certificates and exciting goodies!


Problem Statements 
Each day from 24th to 27th of June, one problem statement will be revealed on the official Instagram account of PClub. The problem statements will be divided into three categories: Easy, Medium, and Hard, and thus the prizes will also be divided into three categories.

Please note that the following document only provides the minimum requirements for your project to qualify for the prizes. You may choose to build in as many features as you want. Please clarify any doubts you have about the programming club committee. If your submission cannot meet the minimum requirements, it will not be eligible for the major prizes. All submissions would be considered for minor prizes and swags regardless of completion status. It is, thus, recommended that you submit your progress regardless of its completion status at the end of the challenge. 

Judging Criteria

Evaluation Meet 1  –  5%
Evaluation Meet 2  – 15%
Evaluation Meet 3  – 15%
Evaluation Meet 4  – 10%
Final Evaluation     – 50%
Event participation – 5% ( A dedicated channel will be created in the discord server where everyone is supposed to write their daily progress. )

The following points will be considered by mentors in the evaluation meeting.
Completion of expected work.
Consistency.
Equal participation from both team members

In the final evaluation, every project would be judged on the following criteria.
User Interface and Experience
Code Quality and Readability
Documentation
Use of External API and Database
Analysis and Design Diagrams

The teams will be evaluated by mentors and given scores. The team with the highest average score from the mentors will be declared the winner. 

The following list would strictly be followed for allotting points
Advanced frameworks (Next.js, React, Express, etc.) would be given preference over vanilla code.
Extra features would be given additional points.
Regardless of additional features, all submissions must satisfy the minimum requirements to be considered for major prizes.

In the event of a tie, winners would be selected based on their marks in the respective fields in the following priority order.
Backend Features
Frontend Features 
Overall Look and Feel
Code Quality and Readability
Analysis and Design Diagrams


Prizes
Major Categories:
The best website from each problem statement.

Minor Categories:
Best Frontend (Winner + Runner Up) 
Best Backend/Core Functionality (Winner + Runner Up) 

Cherry Categories:
Most active participant throughout the event.
Most Creative Content 
Most Popular (based on the votes from the expo)
Clean (Industrial) code

WMC Problem Statements
GTA V

🆕 Bonus points feature:
We can give participants bonus points on implementation of the bonus features
These points will be considered only if participants have completed the basic features of the project

Final Problem Statement List 

Chat With Los Santos Legends - Easy

Description:  Develop an interactive AI chatbot that allows users to engage in conversations with popular characters from GTA V. 

Features: 
Create basic UI to show the chat conversations
For the Chat, Integrate generative AI model using any API (OpenAI, Gemini etc.) 
Create Three different personalities - Michel, Trevor and Franklin
Switch between the personalities 

Bonus Features: 
Authentication
Save the conversation 


Luxury Los Santos - Medium I

Description:  Design a website for a high-end real estate agency showcasing luxury properties in Los Santos. Use screenshots or create mockups of mansions, penthouses, and yachts. Highlight the opulent features and the "celebrity clientele" (characters from the game).


Features: 

Authentication: Implement Login / Signup (not role based)
Categories: Four categories - Supercars, Penthouses, Yachts and Aircrafts 
Exclusive Listings: Feature to list property under the appropriate category 
Cart: Feature to add the Items to a cart 
Purchase: Users can purchase property items from the listings posted by other users
Sell: Users can post their property on the listing and sell it
Virtual Currency: Virtual Currency to purchase the items, user’s will receive the money when their item from the listing is sold 
Search by Feature: Implement a sophisticated search function allowing users to filter properties based on price, title, description, location etc. 
Bonus Features:
Auction: User can opt for listing as auction and let other users bid for specific timeframe
Payment Gateways: Instead of virtual currency, let the users use real currency though a payment gateway


Epsilon Program Recruitment Website - Medium II
Description: Design a website for the fictional Epsilon Program, a satirical religious cult in the GTA V universe. The website should recruit new members, provide information about the cult's beliefs and practices, and highlight the benefits of joining the program.

Features: 
Authentication: Implement Login / Signup  - Role based: Admin and User
Eye-catching Design: Use thematic colors, symbols, and images related to the Epsilon Program to create an immersive experience.
Membership Tiers: Describe different levels of membership, from basic to premium, with varying benefits, users can purchase memberships as per their need
Member Stories: Showcase fake testimonials and stories from current members, describing their positive experiences and personal growth.
Admin Feature: Admin can post events 
Event Listing and Registration: Events are visible only to the members and members can register to the events
Donation Feature: Users can donate to the program, total accumulated donations will be visible on the site
Virtual Currency: Users are given some virtual currency to purchase the memberships and donate 
Bonus Features:
Personality Quiz: A fun quiz to determine which Epsilon Program character or archetype the user aligns with. 
Inquiry Form: Users can ask questions though the form
Interactive Map: A map showing the locations of Epsilon Program centers and landmarks in Los Santos.

WANTED Los Santos Police Department (LSPD) Website - HARD

Description: Create a website for the Los Santos Police Department (LSPD). Include information about wanted criminals, News and a system for submitting anonymous crime tips 

Features: 
Authentication: Implement Login / Signup - Role based: Admin and User
Most Wanted List: Showcase photos and details of Los Santos' most wanted criminals, including descriptions, aliases, and any relevant information for public identification. (it is visible to public, no login required)
Submit a Tip: Create a user-friendly interface for submitting anonymous crime tips. 
View News & Announcements: Logged in users can view the news and announcements posted by the department
Likes: Users can like the news & announcements
Careers at LSPD: Provide information about career opportunities with the LSPD, including eligibility requirements, application procedures, and the benefits of joining the force.
LSPD News & Announcements (Admin Feature): Publish press releases, community outreach details, and department news to keep citizens informed.
Update Most Wanted List (Admin Feature): Admin can update the most wanted list 
View the Tips (Admin Feature): All submitted tips are visible to the only the admin 
Update Job Postings (Admin Feature): Post Jobs in the Careers at LSPD section 
Bonus Features:
Comments: Users can comment on the news or announcements
Admin Update Delete: Admin will have the functionality to Delete or Update the posted items (i.e. News & Announcements, Most Wanted List, Jobs) 
Face recognition: Users can upload an image of a suspect, the site will match the image against the most wanted list

`;
  return systemInstruction;
}
