# AT-AT  - Aggregate Tasker Administration Tool

![alt text](https://media1.giphy.com/media/H7r5XcQccQvlXPwUOR/giphy.gif)

## Kobayashi Maru, Section 31 - Problem Statement 2: 
Distribution and completion of taskers from both internal and external organizations is too slow via the current system (TMT).

### [Instructions/Requirements](https://learn-2.galvanize.com/cohorts/2242/blocks/1131/content_files/units/instructions.md) & [Project Schedule](https://docs.google.com/spreadsheets/d/1YTrmCJHOMmBMSd7XV9xjTJuAYHYHGg7y88qxi99rLQ0/edit#gid=0)

### [Project Github Repository](https://github.com/willjantscher/SDI_Capstone)

### [Miro](https://miro.com/app/board/o9J_laKxjS0=/) - Project Outline, Web Design, & ERD

### [Trello](https://trello.com/invite/b/f0oja1MK/16d1189bcc4e505508b9bb71d2a16555/sdicapstone) - Program Management

### [Draw.io](https://app.diagrams.net/#G1jkGSQCSomfDGiqsOGYZKOYyLPRaWZflG) - Brainstorming Platform

## Project Parameters
Front End: Javascript/React - Main page only has routes to major app components -> Using React Router <- major components can have internal routing to other react components (kept seperate to keep version control management simple)

DB: PostgreSQL

API: Javascript/Express

Styling: CSS - https://www.astrouxds.com/ 

## Project Members
- William Jantscher - Tasker Creation Lead
- Alden Davidson - Tasker In-Box Lead
- Antonio Daehler - Tasker Out-Box Lead
- Brianna Tanusi - User Management Lead
- Tom Thorpe - Tasker Through Box and Notification System Lead

## Daily Ceremonies
 - Stand-up: 8:00 MST
 - Stand-down: 3:45 MST

## Application Components
- User management (MVP)
    - Log in/out (MVP)
    - User permissions/roles (MVP)
    - User Preferences/Settings (opt)
- Tasker Creation (MVP)
    - Populate tasker (MVP)
    - Workload fibonacci rating/expected task duration (opt)
    - Select route (opt)
    - Submit (MVP)
    - Attach files (opt)
    - Save drafts (opt)
    - Send to parent organization and allow that organization to further disseminate (opt)
- Tasker Viewing (MVP)
    - In box, assigned to user (MVP)
        - submit response or reject tasker with comments (MVP)
        - provide time spent/fibonacci assesment (opt)
        - attach files (MVP)
    - Through box (opt)
        - approve/deny routing with comments (opt)
    - Out box, taskers you sent out with statuses (MVP)
        - Edit taskers and resubmit (opt)
        - View sent taskers and statuses (MVP)
- Notification System (opt)
- Database (MVP)
- TMT workload report/graph (opt)
- Org Structure/Routing (opt)

## References
[Space words](https://www.teachstarter.com/us/teaching-resource/space-word-wall-vocabulary-us/)

[USSF Org Chart](https://www.militarytimes.com/opinion/commentary/2020/10/21/william-shatner-and-the-military-times-brought-america-into-the-most-important-debate-in-the-ndaa/)

[OAuth](https://oauth.net/2/browser-based-apps/)

[Fibonacci](https://www.atlassian.com/agile/project-management/estimation)

## Daily Schedule

### 1/4/2021
1. Create user stories (Trello)
2. Create ERD for database
3. React/file structure setup
4. 

### 1/5/2021

### 1/6/2021

### 1/7/2021
- MVPs due!




## Notes
### Project setup

npx create-react-app at-at

### Saving files!!!
use node fs write file/read file in express (use async)
save files in local file structure, save file location in database

### proxy?
do the same way as project 1?
use CORS middleware for express


