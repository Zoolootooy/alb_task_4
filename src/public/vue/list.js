var app = new Vue({
    el: '#app',
    data: {
        membersList: [],
    },
    created: function () {
        this.getMembersList()
    },
    methods: {
        getMembersList() {
            axios.post('getMembersList').then((response) => {
                this.membersList = response.data
            })
        }
    }
})