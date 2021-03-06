# Towers of Hanoi Game
## By William Grigor
![image](https://user-images.githubusercontent.com/39464343/166842529-76a2c3f8-92b9-4012-8a33-0a20b0ac8111.png)
## About
A retro styled game inspired from the [Tower of Hanoi puzzle](https://en.wikipedia.org/wiki/Tower_of_Hanoi). It has a simple user interface that allows you to change the height of the towers to make it more or less difficut to your taste. The game tracks the elapsed time as well as the moves. When you solve the puzzle, you are presented with your final score, and a nice confetti show!
## How to play
* Visit the live site on [GitHub Pages](https://frostbyte266.github.io/towers-of-hanoi/)
* Select the number of towers you'd like to play with (minimum 2, maximum 6) and click "Start Game"
* All disks start on the first tower. The objective is to move all of them to either the second or third tower using the following ruleset:
  * Only one disk may be moved at a time
  * You may only move the disk that is at the top of the stack
  * Disks must always be stacked from largest to smallest (i.e. you can't place a large disk on top of a small disk)
* You may click on any top disk to bring up the move dialog box. Clicking the associated number will move the disk to that tower. If a move is invalid, the button will not be clickable, and will have a "X" over it.
## Running the app
### Option 1: GitHub pages (Recommended)
Simply naviage to the [GitHub Pages hosted app](https://frostbyte266.github.io/towers-of-hanoi/)
### Option 2: Manual build
1. Clone this repo
```sh
# Via HTTPS
git clone https://github.com/FrostByte266/towers-of-hanoi.git
# Via SSH
git clone git@github.com:FrostByte266/towers-of-hanoi.git
# Via GH CLI
gh repo clone FrostByte266/towers-of-hanoi
```
2. Navigate to the clone directory
```sh
cd towers-of-hanoi/
```
3. Install Dependencies
```sh
npm install --include=dev
```
4. Run via Webpack live server (will auto open default browser)
```sh
npm start
```
## Technologies Used
* HTML
* SASS
* JavaScript
* Webpack
    * This handles the bundling of the app.
    * It Takes the SASS, converts to plain CSS, and then automatically links the CSS into the page
    * It also converts ES module JS files into plain JS files the browser natively understands
    * It takes JavaScript files and bundles them all into one file that is also minified (removing whitespace and new lines, shortening identifiers). This helps the page load faster by reducing the file size and the amount of files that need to be loaded
    * Handles linking images, css, and JS bundles into your HTML pages automatically
* GitHub Actions
  * This handles taking the source code and invoking the webpack bundler to translate it into the final minified, static files that are served with GitHub Pages
  * Whenever a commit is pushed to the `master` branch, this build and deployment process is carried out automatically.
## User Stories
### MVP Goals
* As a player, I want to be able to play the game with a mouse or touch screen device, so that I can play it anywhere
* As a player, I want to be able to have my moves and time tracked, and used to calculate a score at the end, so I can compete with my friends
* As a player, I want to see a game over screen, so I can know when I have beaten the level
* As a player, I want to be able to change the number of disks on the towers, so I can make the difficulty easier or harder to feel challenged

### Stretch Goals
* As a player, I want to have some kind of celebratory effect when I win, so I can feel accomplished
* As a player, I want visual and auditory queues when I move a piece, to feel more immersed in the game
* As a player, I want to have undo and redo buttons, in case I mess up and want to go back

## Wire Frames
### Start screen
![start_page](https://user-images.githubusercontent.com/39464343/167233702-62064640-aaff-4250-892a-d380639a418a.png)

### Moving
![moving_a_piece](https://user-images.githubusercontent.com/39464343/167233701-515951e2-9e33-4ed8-af55-afada8740f14.png)

### Making an Invalid move
![invalid_move](https://user-images.githubusercontent.com/39464343/167233700-259d5d7a-0ae9-4a79-b7ec-c1b6021b7b94.png)

### Ending Screen
![victory_screen](https://user-images.githubusercontent.com/39464343/167233703-92680fcd-2476-4010-9b9c-0c6f77a818b6.png)

## Major Hurdles
* One of my biggest hurdles was rendering SVG content inline. I had a lot of trouble with getting the SVG elements to scale correctly within their containers. It took me a while, but I eventually figured out that it was a result of a badly set viewBox. Once I fixed that, it worked great.
* Another hurdle I had to get over was the correct scaling and margins for the SVGs of the disks. Since each svg element would stack on top of one another, I needed a way to displace the content slightly downward so it looked like they were actually stacked and not floating above one another. I eventually solved this by using negative margins. Not my proudest work, but for now it (mostly) works.

## Unsolved Issues
* On larger displays, the font doesn't scale very well, would like it to be a bit more responsive.
* When using larger stacks of disks, the spacing can get a little weird.

## Things to Improve
* As far as the code goes I think it could be a bit more organized. I would like all the logic of rendering towers and moving disks to be abstracted away to a class for organization.
* I also dislike the use of global variables, I would like to refactor it so that all the elements are passed in as attributes to the event object, so there are no globals.
* Some functions were not documented because of the time crunch of the project, would like to go back and document every function
