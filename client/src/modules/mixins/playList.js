const playList = {
	methods: {
		setList(id, index) {
			localStorage.setItem('playLists', JSON.stringify({id, index}));
			this.$store.dispatch('setLists', {
				id,
				index
			});
		}
	}
}

export default playList;
