# Slot Machine v1.0

Simple Slot Machine Development

## Technology Used 🛠️

This project is built using the following technologies:

- Babylon.js: For buttons and scene manager.
- PIXI.js: To manage assets designed with Spine.
- gsap: To manage tweening.
- TypeScript: Main programming language.
- Prettier & ESlint: Code quality and formatting.
- Vite: A build tool that provides a fast and efficient development experience by leveraging native ES modules in modern browsers. It includes features such as hot module replacement (HMR), which allows for instant updates to the browser as you make changes to your code.

## Running the Project 🚀

To run the project, you will need to have Node.js and Yarn installed on your machine. Once you have these dependencies installed, follow these steps:

1. Clone this repository to your local machine.
2. Open a terminal and navigate to the root directory of the project.
3. Run `pnpm install` to install all of the project's dependencies.
4. Run `pnpm dev` to start the development server.
5. The project should now be running at `http://localhost:8080`.

## Environment Variables 📝

For streamlined testing and iteration, set predefined default values for the game configurations. This ensures consistency during the development phase. In order to change those values, feel free to modify the .env file within this project, with the following considerations:

| Variable | Type     | Description                | Value     |
| :-------- | :------- | :------------------------- | :---------|
| `VITE_APP_ENGINE`    | `string` | Web Rendering engine                | **babylon** or **pixi** |
| `VITE_APP_FPS`       | `string` | Enable/Disable PFS Counter          | **on** or **off**       |
| `VITE_APP_NUM_REELS` | `number` | Number of reels in the slot machine | number        |
| `VITE_APP_NUM_SLOTS` | `number` | Number of slots inside each reel | number        |
| `VITE_APP_NUM_SLOT_SYMBOLS` | `number` | Maximum number of slots symbols availables | number        |
| `VITE_APP_SLOT_SIZE` | `number` | Size of each slots symbol | number        |
| `VITE_APP_REEL_SPEED` | `number` | Speed of the reel | number        |
| `VITE_APP_SPIN_DURATION` | `number` | How long each spin lasts in seconds | number        |
| `VITE_APP_SPIN_DELAY` | `number` | Delay Between Reels Spin in seconds | number        |
| `VITE_APP_WIDTH` | `number` | Canvas width | number        |
| `VITE_APP_HEIGHT` | `number` | Canvas height | number        |

## Deployment

`pnpm build`

## Questions ❓

If you have any questions about the project, please send an email to roberto@playjeuxstudios.com. I'll be happy to help!
