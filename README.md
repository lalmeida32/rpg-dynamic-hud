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

- The system's home screen must show currently user status if logged in
- The system's home screen must show a text 
- The system must allow any person, over 13 years old, to create an account
- The system must allow a user to change it's settings
- The system must allow a user to create a room
- The system must allow a user to join a room given it's Room Code
- The system must allow the game master to kick/ban another user from it's room
- The system must allow the game master to change the room settings
- The system must allow the game master to lock/unlock a room
- The system must allow the game master to delete the room
- Each room must have dice options (i.e. D6, D12, D20...) 
- Each room must have a room's members list
- The game master's view must show all players status and dices, in real-time
- The player's view must show all players status, dices and their character sheets, in real-time
- Each player's character sheet must show character's name, character's photo, status bars and attributes 


### Project Description

The navigation diagram below will help us describing how we will implement the requirements funcionalities.

![](https://raw.githubusercontent.com/lalmeida32/rpg-dynamic-hud/repo/docs/milestone-1/docs/assets/mockups/readme/diagram.png)

The mockups can be found here: <a href="https://github.com/lalmeida32/rpg-dynamic-hud/tree/repo/docs/milestone-1/docs/assets/mockups" target="_blank">Mockups</a>

The user will see a landing page that can navigate over static pages like "About" or "Contact us". Then, the user can logging in or sign up to enter the application.
The application is made of rooms, each user can create their own rooms, which make them GMs for that particular rooms. When creating a room, an user can choose the character information that can be manipulated by the players, like stat bars and attributes. He can also choose which dices players can toss.
The players can enter the room via an auto-generated code. The GM can lock or unlock a room, and can kick/ban players.
Players can enter rooms using a code, create and update their own character.
The information of all characters will change in real-time, using WebSockets technology.

We will save on the server database: the users register information, the rooms information and the user characters for each room information.


### Mockups

Note: All mockups are not responsive. The recommended resolution to display them is 1366x768.

![](https://raw.githubusercontent.com/lalmeida32/rpg-dynamic-hud/repo/docs/milestone-1/docs/assets/mockups/readme/img.png)
![](https://raw.githubusercontent.com/lalmeida32/rpg-dynamic-hud/repo/docs/milestone-1/docs/assets/mockups/readme/img2.png)
![](https://raw.githubusercontent.com/lalmeida32/rpg-dynamic-hud/repo/docs/milestone-1/docs/assets/mockups/readme/img3.png)
![](https://raw.githubusercontent.com/lalmeida32/rpg-dynamic-hud/repo/docs/milestone-1/docs/assets/mockups/readme/img4.png)


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
- Socket.io

On project building:

- Vercel Pkg

### Development Suggestions
### Test Plans
### Test Results
### Build Procedures

---

<br/>
<br/>

## 🤔 Extra

---

### Problems
### Comments

---

