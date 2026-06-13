import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/*
  vite.config.js — Vite build tool configuration.
  The React plugin enables JSX transformation and Fast Refresh
  (live updates in the browser as you save files).
*/
export default defineConfig({
  plugins: [react()],
})
