const c=n=>`hsl(var(--${n}))`;
export default {darkMode:['class'],content:['./index.html','./src/**/*.{js,jsx}'],theme:{extend:{
 fontFamily:{sans:['-apple-system','BlinkMacSystemFont','"SF Pro Display"','Inter','system-ui','sans-serif'],serif:['-apple-system','BlinkMacSystemFont','"SF Pro Display"','Inter','system-ui','sans-serif']},
 colors:{border:c('border'),background:c('background'),foreground:c('foreground'),primary:{DEFAULT:c('primary'),foreground:c('primary-foreground')},secondary:{DEFAULT:c('secondary'),foreground:c('secondary-foreground')},muted:{DEFAULT:c('muted'),foreground:c('muted-foreground')},accent:{DEFAULT:c('accent'),foreground:c('accent-foreground')},card:{DEFAULT:c('card'),foreground:c('card-foreground')},ring:c('ring')},
 borderRadius:{lg:'var(--radius)',md:'calc(var(--radius) - 2px)',sm:'calc(var(--radius) - 4px)'}}},plugins:[]}
