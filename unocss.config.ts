import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    // presetIcons({
    //   scale: 1.2,
    //   warn: true,
    // }),
	presetIcons({
	  customizations: {
		iconCustomizer(collection, icon, props) {
		  // customize all icons in this collection  
		  if (collection === 'my-other-icons') {
			props.width = '4em'
			props.height = '4em'
		  }
		  // customize this icon in this collection
		  if (collection === 'my-icons' && icon === 'account') {
			props.width = '6em'
			props.height = '6em'
		  }
		  // customize this @iconify icon in this collection  
		  if (collection === 'mdi' && icon === 'account') {
			props.width = '2em'
			props.height = '2em'
		  }
		  
		  if(collection === 'carbon') {
			props.width = '2em'
			props.height = '2em'  
			props.fontweight = 'border'
		  }
		  
		}
	  }
	}),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
})
