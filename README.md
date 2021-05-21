![custom-video-player](https://socialify.git.ci/sanjay270899/custom-video-player/image?description=1&forks=1&issues=1&language=1&owner=1&pattern=Plus&pulls=1&stargazers=1&theme=Dark)

## About Project

I have built a react video player with custom controls. One can search and add videos by a key word. All fetched videos will be shown in video queue.

![image](https://user-images.githubusercontent.com/43892590/118876863-5c584680-b90b-11eb-863c-2c3abd38e4aa.png)

## Basic structure of the project repository 📂

```terminal
|
|- public             # Any files within this directory will not be processed by Webpack but copied directly to the build folder.
|- src:               # Contains all source code for the React application.
    |
    |- api
        |-pexels.js   # Axios configuration for PEXELS APIs.
    |- assets         # Contains icons and helper functions.
    |- components     # Contains all the components used within the app.
    |- pages          # Contains all the pages of the app.
        |- Home.js
    |- styles         # Contains sass files.
    |- App.js
    |- index.js
```

## Custom controls made till date:

- Play/Pause
- Replay/Forward 10 Seconds
- Volume
- Playback Speed
- Fullscreen

## Tech Stack

<img alt="React" src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/><img alt="HTML5" src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/><img alt="React" src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"><img alt="PEXELS" src="https://user-images.githubusercontent.com/43892590/118880854-f9b57980-b90f-11eb-97dc-80c6e804e2b1.png" height="35px"/>

### Task:

Create a video player with custom controls like one below.

1. You can either have it play a YouTube video or local video (pick one of them).
2. When `hovering` over the video it should `show just the controls`.
3. When user `pauses` the video it should `show the title, channel name, video views and description of video (3 lines only)`.
4. The controls and details should auto hide after certain time.
5. Use emojis in your git commit message

- Clean code and structure is top priority.

![image](https://user-images.githubusercontent.com/43892590/118407372-1d718900-b69e-11eb-8027-c4734604ce75.png)

### Bonus points for:

These are just for you to try out, it wont be held against you if you decide to not do these.

- Showing a queue next to the player.
- Adding responsive layout for mobile.
- Adding option for user to load a playlist/video.
