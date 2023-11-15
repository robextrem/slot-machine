/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_VERSION: string,
    readonly VITE_APP_ENGINE: string,
    readonly VITE_APP_BACKEND_URL: string,
    readonly VITE_APP_FPS: string,
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }