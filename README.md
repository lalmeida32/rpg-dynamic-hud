# RPG Dynamic HUD

**This project is an open source (and free software) implementation of a RPG HUD, that you can use from casual gameplays to livestreams.**

This is an open source project, but it's also a college subject final project. The name and code of the students involved are required.

- Guilherme Ramos Costa Paixão - 11796079
- Lucas Ferreira de Almeida - 11262063

---

<br/>
<br/>

## 📜 Summary

--- 

Using
- [Overview](#overview)
- [Use Cases](#use-cases)
- [How to Use](#how-to-use)
- [How to Host](#how-to-host)

Specification
- [Requirements](#requirements)
- [Project Description](#project-description)
- [Mockups](#mockups)

Contributing
- [Project Structure](#project-structure)
- [Tools and Libraries Used](#tools-and-libraries-used)
- [Development Suggestions](#development-suggestions)
- [Test Plans](#test-plans)
- [Test Results](#test-results)
- [Build Procedures](#build-procedures)

Extra
- [Problems](#problems)
- [Comments](#comments)

---

<br/>
<br/>

## 🎲 Using

---

### Overview

A role-playing game (RPG) is a very popular game genre. The most traditional way to play it is in person, where each player has its own character sheet and the game master (GM) usually owns the game rules book, and guides the session. Dices and boards are other important elements of this type of game.

The main goal of this project is to facilitate remote RPG sessions, where players and the GM are connected by internet. More than that, it provides features that cannot be possible at a physical environment, and provides a good support for livestreams.

The GM creates a room and adapt character stats and status bars to the story. When opened, the players can enter this room and set their characters' characteristics. The characters' stats are also available for everyone, online and in real-time. A character's image can change accordingly with its current health, in real-time too. Dices can be tossed and everyone in the room can see the results.

When the gameplay finishes, the GM can close the room, but the program keeps the data stored for the next gameplay session.

### Use Cases

- You want to see your friend's stats while playing.
- You want to show dice results to all players.
- You want to have an immersive experience with dynamic character images, that changes accordingly with their current health.
- You want to livestream your game in an easy and straightforward way.

### How to Use

<!--
First, you must host the server or find an host.
-->

<!-- TODO -->

### How to Host

<!--
First things first, it's **highly recommended talking with an IT student or professional** before following the instructions below.

This project is designed to be easy to host, but there are unavoidable considerations to take. To host this project you must:

- Download the executable available in the GitHub repository releases. Opt for the LTS version.
- Download a MongoDB database.
- Find a way to provide this server a internet connection.

-->

<!-- TODO EXECUTABLE -->

<!-- TODO DATABASE -->
<!-- 
There are many ways to provide a internet connection, but many of them are not that simple and free. Aside from that, **security is a very important thing be aware when hosting any application on the internet**.

Using localtunnel is quite simple and free, but it's unstable and it exposes a port of your personal computer to the world.

Despite that, for many cases localtunnel should be worth to use. Here is a 
-->
<!-- TODO HOST -->

<!-- In a professional environment, deploy server, cloud services aws azure google cloud heroku -->

---

<br/>
<br/>

## 📋 Specification

---

### Requirements

- The system's home screen must show information about the program
- The system must allow any person to create an account, given the username, e-mail and password
- The system must allow authenticated users to update their information
- The system must allow authenticated users to delete their account
- The system must allow authenticated users to create a room
- The system must allow authenticated users to search a room by name, code or owner
- The system must allow game masters to update their rooms settings
- The system must allow game masters to open/close their rooms
- The system must allow game masters to delete their rooms
- Each room must have dice options (i.e. D6, D12, D20...)
- The game master's view must show all players status and dices, in real-time
- The player's view must show all players status, dices and their character sheets, in real-time
- Each player's character sheet must show character's name, character's photo, status bars and attributes 


### Project Description

The navigation diagram below will help us describing how we will implement the requirements funcionalities.

![](https://raw.githubusercontent.com/lalmeida32/rpg-dynamic-hud/main/docs/assets/mockups/readme/diagram.png)

The mockups can be found here: <a href="https://github.com/lalmeida32/rpg-dynamic-hud/tree/main/docs/assets/mockups" target="_blank">Mockups</a>

The user will see a landing page that can navigate over static pages like "About" or "Contact us". Then, the user can logging in or sign up to enter the application.
The application is made of rooms, each user can create their own rooms, which make them GMs for that particular rooms. When creating a room, an user can choose the character information that can be manipulated by the players, like stat bars and attributes. He can also choose which dices players can toss.
The players can search and enter a room. The GM can lock or unlock a room.
Players can enter rooms using a code, create and update their own character.
The information of all characters will change in real-time, using WebSockets technology.


### Mockups

Note: All mockups are not responsive. The recommended resolution to display them is 1366x768.

![](https://raw.githubusercontent.com/lalmeida32/rpg-dynamic-hud/main/docs/assets/mockups/readme/img.png)
![](https://raw.githubusercontent.com/lalmeida32/rpg-dynamic-hud/main/docs/assets/mockups/readme/img2.png)
![](https://raw.githubusercontent.com/lalmeida32/rpg-dynamic-hud/main/docs/assets/mockups/readme/img3.png)
![](https://raw.githubusercontent.com/lalmeida32/rpg-dynamic-hud/main/docs/assets/mockups/readme/img4.png)

### Database Planning

- Rooms
    - Unique code
    - Owner
    - Name
    - Opened
    - Status bars
    - Character attributes
    - Dices
- Users
    - Username
    - E-mail
    - Encrypted Password
- Characters
    - Owner
    - Room
    - State
    - Image blobs

---

<br/>
<br/>

## 💻 Contributing

---

### Project Structure
### Tools and Libraries Used

On the client-side:

- Node JS with Yarn
- Typescript
- React JS
- Vite

On the server-side:

- Node JS with Yarn
- Typescript
- Express JS
- Webpack
- Nodemon
- Mongoose
- Socket.io

On project building:

- Vercel Pkg

On database:

- MongoDB

### Development Suggestions
### Test Plans

- All tests are manual.
- An user enter the auth page and try to log in with a not registered user, but fail.
- An user enter the auth page and register, log in and logout, successfully .
- An user enter the auth page and try to register with password and confirm password fields that does not match, but fails.
- An user enter the auth page, log in, and see his rooms with pagination.
- An user enter the auth page, log in, and search rooms by name, successfully.
- The same user search rooms by name, successfully.
- The same user search rooms by username, successfully.
- The same user search rooms by code, successfully.
- The same user try to create a room, successfully.
- The same user try to enter a room that is opened.

### Test Results

- All tests passed.

### Build Procedures

On the client-side:

- run `node --version` to check if node is installed. Upgrade it to version 18.x.x if necessary.
- run `yarn --version` to check if yarn is enabled.
    - if not, run `corepack enable` with administration privileges to enable it.
- enter the client directory and run `yarn install` or `yarn` to install the dependencies.
- run `yarn run dev` to run it in the development mode.


On the server-side:

- run `node --version` to check if node is installed. Upgrade it to version 18.x.x if necessary.
- run `yarn --version` to check if yarn is enabled.
    - if not, run `corepack enable` with administration privileges to enable it.
- enter the client directory and run `yarn install` or `yarn` to install the dependencies.
- run `yarn run dev` to run it in the development mode.

- You must have a mongodb instance running on port 27017, and a database called "rpg" in that instance.

---

<br/>
<br/>

## 🤔 Extra

---

### Problems

No problems.

### Comments

No comments.

---

