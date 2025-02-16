const header = {
	state: {
        show:false,
        info:"Back"
	},
	mutations: {
		showHeader (state,info) {
           
              state.show = true
              state.info = info?info:"Back"
        },
        hideHeader (state) {
            state.show = false
        },

	}
}

export default header