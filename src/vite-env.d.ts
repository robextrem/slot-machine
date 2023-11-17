/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_VERSION: string,
    readonly VITE_APP_ENGINE: string,
    readonly VITE_APP_BACKEND_URL: string,
    readonly VITE_APP_FPS: string,
    readonly VITE_APP_USE_WEB_SOCKET: string,
    readonly VITE_APP_BACKEND_URL: string,
    readonly VITE_APP_NUM_REELS: number,
    readonly VITE_APP_NUM_SLOTS: number,
    readonly VITE_APP_NUM_SLOT_SYMBOLS: number,
    readonly VITE_APP_WIDTH: number,
    readonly VITE_APP_HEIGHT: number,
    readonly VITE_APP_SLOT_SIZE: number,
    readonly VITE_APP_REEL_SPEED: number,
    readonly VITE_APP_SPIN_DURATION: number,
    readonly VITE_APP_SPIN_DELAY: number,
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }