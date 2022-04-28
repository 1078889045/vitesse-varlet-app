import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import generatedRoutes from '~pages'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

import { Dialog, Snackbar } from '@varlet/ui'
import '@varlet/ui/es/Dialog/style/index.js'
import '@varlet/ui/es/Snackbar/style/index.js'
import '@varlet/ui/es/ripple/style/index.js'


const routes = setupLayouts(generatedRoutes)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.globEager('./modules/*.ts')).forEach(i => i.install?.(ctx))
	ctx.app.use(Dialog).use(Snackbar)
  },
)
