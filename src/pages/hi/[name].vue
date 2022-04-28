<script setup lang="ts">
import { useUserStore } from '~/stores/user'
// import { demoListApi } from '~/api/demo/table';
// import { DemoListItem } from '~/api/demo/table/model/tableModel';

const props = defineProps<{ name: string }>()
const router = useRouter()
const user = useUserStore()
const { t } = useI18n()

// watchEffect(() => {
//   user.setNewName(props.name)
// })

// try {
//   const response = await demoListApi({
//   	page: 2,
//   	pageSize: 5,
//   });
  
//   const {
//     items
//   } = response;
  
//   console.log(items)
  
// } catch (e) {

//   //异常处理
// } finally {

  
// }

</script>

<template>
  <div>
    <div text-4xl>
      <div i-carbon-pedestrian inline-block />
    </div>
    <p>
      {{ t('intro.hi', { name: props.name }) }}
    </p>

    <p text-sm opacity-50>
      <em>{{ t('intro.dynamic-route') }}</em>
    </p>

    <template v-if="user.otherNames.length">
      <p text-sm mt-4>
        <span opacity-75>{{ t('intro.aka') }}:</span>
        <ul>
          <li v-for="otherName in user.otherNames" :key="otherName">
            <router-link :to="`/hi/${otherName}`" replace>
              {{ otherName }}
            </router-link>
          </li>
        </ul>
      </p>
    </template>

    <div>
      <button
        btn m="3 t6" text-sm
        @click="router.back()"
      >
        {{ t('button.back') }}
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
