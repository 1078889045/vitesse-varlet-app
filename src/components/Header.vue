<script setup lang="ts">
import { toggleDark, isDark } from '~/composables'
import { useUserStore } from '~/stores/user'
import { StyleProvider } from '@varlet/ui'

import dark from '@varlet/ui/es/themes/dark'
import { Dialog, Snackbar } from '@varlet/ui'

//const dark = () => import('@varlet/ui/es/themes/dark')

// const { t, availableLocales, locale } = useI18n()

// const toggleLocales = () => {
//   // change to some real logic
//   const locales = availableLocales
//   locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
// }

const offsetY = ref(false)
// const menuList = ref([
//   { label: '选项一', value: 'menu1' },
//   { label: '选项二', value: 'menu2' }
// ])

//const props = defineProps<{ name: string }>()
const user = useUserStore()
const { savedName } = user

const router = useRouter()
const { t } = useI18n()

const { name } = router.currentRoute.value

const title = name?.indexOf('-') > 0 ? '' : t(`button.${name}`)

const welcome = t('intro.hi', { name: savedName }) 

const goBack = () => {
  // Snackbar({
  //   content: '返回',
  //   position: 'top'
  // })
  user.setNewName(null)
  router.push({ path:'/' })
}

let currentTheme = null

const toggleTheme = () => {
  currentTheme = isDark.value === true ? dark : null
  StyleProvider(currentTheme ? null : dark)
  toggleDark()
}

const initTheme = () => {
  currentTheme = isDark.value === true ? dark : null
  StyleProvider(currentTheme)
}

initTheme()

const actions = {
  confirm: async() => {
	  Snackbar.success('confirm')
	  logout()
  },
  cancel: () => Snackbar.error('cancel'),
  close: () => Snackbar.info('close'),
}

const onBeforeClose = (action, done) => {
  Snackbar.loading('正在异步关闭')
  setTimeout(() => {
    actions[action]()
    done()
  }, 1000)
}

const createAction = async () => {
  Dialog({
	title: '确认',
    message: '确认登出? ',
    onBeforeClose
  })
}

const logout = async () => {
	Snackbar.success("登出成功")
	// user.setNewName(null)
	// router.push({ path:'/' })
	goBack()
}

</script>

<template>
  <!-- <nav text-xl mt-6>
    <RouterLink class="icon-btn mx-2" to="/" :title="t('button.home')">
      <div i-carbon-campsite />
    </RouterLink>

    <button class="icon-btn mx-2 !outline-none" :title="t('button.toggle_dark')" @click="toggleDark()">
      <div i="carbon-sun dark:carbon-moon" />
    </button>
  </nav> -->
  
  <var-app-bar :title="title">
      <template #left>
        <var-button
          round
          text
          color="transparent"
          text-color="#fff"
          @click="goBack"
        >
          <var-icon name="chevron-left" :size="24" />
        </var-button>
      </template>
  
      <template #right>
		  <var-button 
		    round
		    text
		    color="transparent"
		    text-color="#fff"
			class="icon-btn mx-2 !outline-none" :title="t('button.toggle_dark')" @click="toggleTheme()">
		    <div i="carbon-sun dark:carbon-moon" text-xl />
		  </var-button>
		  
		  <var-menu
		    class="app-bar-example-menu"
		    :offset-y="42"
		    :offset-x="-20"
		    v-model:show="offsetY"
		  >
		  <var-button
		    round
		    text
		    color="transparent"
		    text-color="#ffffff"
		    @click="offsetY = true"
		  >
		    <var-icon name="menu" :size="24" />
		  </var-button>
		    
		  <template #menu>
		    <div class="app-bar-example-menu-list">
		      <!-- <var-cell
		        class="app-bar-example-menu-cell"
				border
		      >
				{{welcome}}
		      </var-cell> -->
			  <var-cell
			    class="app-bar-example-menu-cell"
				border
			  >
				<var-button
				  round
				  text
				  color="transparent"
				  block @click="createAction()">
				  <div i="carbon-logout" inline-block/>
				</var-button>
				
			  </var-cell>
		    </div>
		  </template>
		  </var-menu>
      </template>
    </var-app-bar>
  
</template>
