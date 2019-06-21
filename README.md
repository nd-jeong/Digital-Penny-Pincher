# Group-2-Project-3

# Project Overview

## Project Schedule

This schedule will be used to keep track of your progress throughout the week and align with our expectations.  

You are **responsible** for scheduling time with your squad to seek approval for each deliverable by the end of the corresponding day, excluding `Saturday` and `Sunday`.

|  Day | Deliverable | Status
|---|---| ---|
|Day 1| Project Proposal / Project Start | Complete
|Day 2| Database / React Components | Complete
|Day 3| Database / React Components | Complete
|Day 4| Initial Clickable Model | Complete
|Day 5| MVP  | Complete
|Day 6| Post-MVP | Incomplete
|Day 7| Present | Incomplete


## Project Description

This application makes tracking a user's spending simpler, more organized, and will help keep them under their monthly budget. After a user creates an account, they can add their credit and/or debit cards. They then set their maximum budget limit for the month.

The app will automatically notify the user via SMS text message and/or email when they have exceeded 50% of their monthly budget limit. The user can also edit when and how they receive alerts. Such as being alerted when their budget has hit a different threshold (25%, or 1/3rd etc.). User can also input the charge in their dashboard, with a user friendly UI to choose whether or not that transaction is Personal, Business, Charity, or Other.  Choosing "other" will allow user to input a description for that charge.

This last feature will allow users to easily separate other types of non-personal spending (business expenses, reimbursable expenses etc.)

## Wireframes

https://ga-students.slack.com/files/UHJMTP4EM/FKMBF71HT/wire_frame_for_projet_3.png

## Priority Matrix

https://drive.google.com/open?id=1-E5_11Z1PpvB6PRFp225O1GjYy8j6Wi- 

### MVP/PostMVP - 5min

The functionality will then be divided into two separate lists: MPV and PostMVP.  Carefully decided what is placed into your MVP as the client will expect this functionality to be implemented upon project completion.  

#### MVP 

- Create and seed database
- Render data on page
- Create requests and links for a specific user's data: credit cards, transactions, and limits
- Create forms for user to create credit card and transaction info
- Create ability for user's to edit credit card and transaction info
- Find and implement texting app
- Styling

#### PostMVP 

- Add authentication
- Create User component

## React Architectural Design

https://drive.google.com/open?id=1-GmLXoniWp4VhqBZxDZLgAFRCUR4cujk

## ERD

https://www.lucidchart.com/invitations/accept/81714e62-86e8-44c1-b460-671404b0d2fd

## Functional Components

Based on the initial logic defined in the previous sections try and breakdown the logic further into stateless/stateful components. 

| Component | Description | 
| --- | :---: |  
| Header | This will render the header include the nav | 
| Footer | This will render the footer at the bottom of the page |
| Landing Page | This will render login/signup link | 
| Nav | This will render all the links to navigate the app | 
| Dashboard | This will render keypad to enter a new transaction and transaction type | 
| Activity | This will render the current balance, balance limit, and recent transactions | 
| Credit Cards | This will render the credit cards tied to the account | 
| Settings/Profile | This will render the user's account info and a form to edit that information | 

Time frames are also key in the development cycle.  You have limited time to code all phases of the game.  Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted. It's always best to pad the time by a few hours so that you account for the unknown so add and additional hour or two to each component to play it safe.

| Component | Priority | Estimated Time | Actual Time |
| --- | :---: |  :---: | :---: |
| Adding Forms | H | 5hrs| 0 |
| Create and Seed Database | H | 6hrs| 4 |
| Create Nav Component | H | 3hrs| 0 |
| Create Header/Footer Component | H | 3hrs| 0 |
| Create Landing Page Component | H | 4hrs| 5 |
| Create Dashboard Component | H | 6hrs| 0 |
| Create Activity Component | H | 6hrs| 0 |
| Create Credit Cards Component inside Profile/Settings | H | 6hrs| 0 |
| Find and Work with API | H | 4hrs| 0 |
| Styling | H | 5hrs| 0 |
| Authentication | M | 7hrs| 0 |
| Create User Component | M | 4hrs| 0 |
| Total | H | 59hrs| 9hrs | 

## Helper Functions
Helper functions should be generic enought that they can be reused in other applications. Use this section to document all helper functions that fall into this category.

#### SAMPLE.....
| Function | Description | 
| --- | :---: |  
| Capitalize | This will capitalize the first letter in a string of text | 

## Additional Libraries

| Library | What it Does | 
| --- | :---: |  
| Twilio | API used to send out text messages | 
| React Minimal Pie Chart | Used to create pie chart https://www.npmjs.com/package/react-minimal-pie-chart |
| React Burger Menu | Used to create hamburger menu https://github.com/negomi/react-burger-menu | 

## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of an a brief description  

#### SAMPLE.....
```
function reverse(string) {
	// here is the code to reverse a string of text
}
```

## Change Log
We decided to remove the credit cards component and table. Instead we will add a transaction component.

#### SAMPLE.....
| Original Plan | Outcome | 
| --- | :---: |  
| Have one Book component | Split that component into BookInfo and BookInteraction as the component grew too complicated | 

## Issues and Resolutions

**ERROR**: Post request did not add foreign key to table automatically                       
**RESOLUTION**: Set relationship in post request
