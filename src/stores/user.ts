import { acceptHMRUpdate, defineStore } from 'pinia'
import type {
  LoginParams,
  TokenResultModel,
} from '~/api/sys/model/userModel';

import { ResponseModel, FunctionalityInfo } from '~/api/sys/model/userModel';
import { getTokenApi } from '~/api/sys/user';

export const useUserStore = defineStore('user', () => {
  /**
   * Current name of the user.
   */
  const savedName = ref('')
  const previousNames = ref(new Set<string>())

  const usedNames = computed(() => Array.from(previousNames.value))
  const otherNames = computed(() => usedNames.value.filter(name => name !== savedName.value))

  /**
   * Current name of the user.
   */
  const savedToken = ref('')

  /**
   * Changes the current name of the user and saves the one that was used
   * before.
   *
   * @param name - new name to set
   */
  async function setNewName(name: string) {
	
	let authorizationToken = null
	if(name) {
		try {
			const data: TokenResultModel = await getTokenApi(toRaw({
			          password: 'abcF123',
			          username: name,
			        }), 'modal')
			
			const { token_type, access_token, response } = data
			
			const token = `${token_type} ${access_token}`
			const res = Object.assign(new ResponseModel(), JSON.parse(response)) as ResponseModel
			const employee = res.Employee;
			
			authorizationToken = token
			//console.log(authorizationToken)
		} catch {
			name = null
		}
	}
	  
    if (savedName.value)
      previousNames.value.add(savedName.value)
	
	savedToken.value = authorizationToken
    savedName.value = name
  }

  return {
    setNewName,
    otherNames,
    savedName,
	savedToken,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
