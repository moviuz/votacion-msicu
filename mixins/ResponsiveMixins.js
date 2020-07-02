export const ResponsiveMixins = {
    computed:{
        m_screenSize(){
            switch (this.$vuetify.breakpoint.name) { 
                case 'xs': return 'xs'
                case 'sm': return 'xs'
                case 'md': return 'lg'
                case 'lg': return 'lg'
                case 'xl': return 'lg'
              }
        },
    }
}