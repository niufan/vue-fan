<template>
    <div id="user-show">
        <b-form novalidate>
            <b-form-group label="用户名">
                <b-form-input v-model="user.username" readonly></b-form-input>
            </b-form-group>
            <b-form-group label="昵称">
                <b-form-input v-model="user.nickname" readonly></b-form-input>
            </b-form-group>
            <b-form-group label="密码">
                <b-form-input v-model="user.password" readonly type="password"></b-form-input>
            </b-form-group>
        </b-form>
    </div>
</template>

<script>
    export default {
        name: "UserDetail",
        data() {
            return {
                id: this.$route.params.id,
                user: {}
            };
        },
        mounted() {
            this.$axios.get('/api/user/' + this.id).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    this.user = res.data;
                }
            });
        }
    }
</script>

<style scoped>
    #user-show {
        margin: 20px auto;
        width: 70%;
    }
</style>