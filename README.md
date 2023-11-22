# Slot Machine Demo

Simple Slot Machine Development

![alt text](https://github.com/robextrem/slot-machine/blob/main/src/assets/images/screenshot.png?raw=true)

## Technology Used 🛠️

This project was built using the following technologies:

- PIXI.js: To manage assets designed with Spine.
- ~~Babylon.js: For buttons and scene manager.~~
- Gsap: To manage tweening.
- TypeScript: Main programming language.
- Prettier & ESlint: Code quality and formatting.
- Vite: A build tool that provides a fast and efficient development experience by leveraging native ES modules in modern browsers. It includes features such as hot module replacement (HMR), which allows for instant updates to the browser as you make changes to your code.

## Running the Project 🚀

To run the project, you will need to have Node.js and pnpm installed on your machine. Once you have these dependencies installed, follow these steps:

### Frontend

1. Clone this repository to your local machine.
2. Open a terminal and navigate to the root directory of the project.
3. Run `pnpm install` to install all of the project's dependencies.
4. Run `pnpm dev` to start the development server.
5. The project should now be running at `http://localhost:8080`.

### Backend

To run the project, you will need to have Node.js and pnpm installed on your machine. Once you have these dependencies installed, follow these steps:

1. Open a terminal and navigate to the root directory of the project.
2. Run `pnpm server` to start the development server.
3. The project should now be running at `http://localhost:3000`.

## Paylines

![alt text](https://github.com/robextrem/slot-machine/blob/main/src/assets/images/paylines.png?raw=true)

## Environment Variables 📝

For streamlined testing and iteration, set predefined default values for the game configurations. This ensures consistency during the development phase. In order to change those values, feel free to modify the .env file within this project, with the following considerations:

| Variable | Type     | Description                | Value     |
| :-------- | :------- | :------------------------- | :---------|
| `VITE_APP_USE_WEB_SOCKET`    | `string` | Enable/Disable Web Socket usage | **on** or **off** |
| `VITE_APP_FPS`       | `string` | Enable/Disable PFS Counter          | **on** or **off**       |
| `VITE_APP_BACKEND_URL`       | `string` | Backend URL connection         | ws://localhost:3000      |
| `VITE_APP_BACKEND_PORT`       | `number` | Backend Port connection          | 3000       |
| `VITE_APP_NUM_REELS` | `number` | Number of reels in the slot machine | number        |
| `VITE_APP_NUM_SLOTS` | `number` | Number of slots inside each reel | number        |
| `VITE_APP_NUM_SLOT_SYMBOLS` | `number` | Maximum number of slots symbols availables | number        |
| `VITE_APP_SLOT_SIZE` | `number` | Size of each slots symbol | number        |
| `VITE_APP_REEL_SPEED` | `number` | Speed of the reel | number        |
| `VITE_APP_SPIN_DURATION` | `number` | How long each spin lasts in seconds | number        |
| `VITE_APP_SPIN_DELAY` | `number` | Delay Between Reels Spin in seconds | number        |
| `VITE_APP_INITIAL_BALANCE`       | `number` | Balance Amount at the start of the game         | 12000       |
| `VITE_APP_WIDTH` | `number` | Canvas width | number        |
| `VITE_APP_HEIGHT` | `number` | Canvas height | number        |

## Deployment

`pnpm build`

### Notes

The balance is intentionally allowed to become negative for testing purposes, particularly during scenarios when the backend or WebSocket is unavailable.

## Questions ❓

If you have any questions about the project, please send an email to roberto@playjeuxstudios.com. I'll be happy to help!
