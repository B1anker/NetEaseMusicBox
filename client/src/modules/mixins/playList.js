const playList = {
	methods: {
		setList(lists) {
			this.$store.dispatch('setLists', {
				container: lists
			})
		}
	}
}

export default playList;
