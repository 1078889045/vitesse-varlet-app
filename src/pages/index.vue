<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import logo from '/favicon.svg'
import { Snackbar } from '@varlet/ui'

const loading = ref(false)

const user = useUserStore()
const name = $ref(user.savedName)

const router = useRouter()
const go = async () => {
  loading.value = true;
  
  await user.setNewName(name)
  loading.value = false;
  
  //console.log(name);
  
  if(user.savedToken) {
	  console.log(user.savedToken)
	  Snackbar({ type: 'info', content: user.savedToken, contentClass: 'word-break', vertical: true, duration: 5000})
  }
  
  if (user.savedName)
     router.push(`/hi/${encodeURIComponent(user.savedName)}`)
  
}

const { t } = useI18n()
</script>

<template>
  <var-loading description="loading...." type="cube" :loading="loading">
  <div>
    <div text-4xl flex justify-center>
      <!-- <div i-carbon-campsite inline-block /> -->
	  <var-image 
	        
	        height="100px" 
	        fit="contain"
			radius="10"
			ripple
	        :src="logo"
	      />
    </div>
    <p>
      <a rel="noreferrer" href="http://www.bct-best3.com" target="_blank">
        BCT
      </a>
    </p>
    <p>
      <em text-sm opacity-75>{{ t('intro.desc') }}</em>
    </p>

    <div py-4 />

    <input
      id="input"
      v-model="name"
      :placeholder="t('intro.whats-your-name')"
      :aria-label="t('intro.whats-your-name')"
      type="text"
      autocomplete="false"
      p="x4 y2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="go"
    >
    <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>

    <div>
      <button
        btn m-3 text-sm
        :disabled="!name"
        @click="go"
      >
        {{ t('button.go') }}
      </button>
    </div>
  </div>
  </var-loading>
</template>

<style>
	.word-break {
		word-break: break-word;
	}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
