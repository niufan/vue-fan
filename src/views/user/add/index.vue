<template>
    <div id="user-add">
        <b-form novalidate>
            <b-form-group label="用户名">
                <b-form-input v-model="user.username"></b-form-input>
            </b-form-group>
            <b-form-group label="昵称">
                <b-form-input v-model="user.nickname"></b-form-input>
            </b-form-group>
            <b-form-group label="密码">
                <b-form-input v-model="user.password" type="password"></b-form-input>
            </b-form-group>
            <b-button variant="primary" type="button" @click="add">保存</b-button>
        </b-form>
    </div>
</template>

<script>
    export default {
        name: "UserAdd",
        data() {
            return {
                user: {}
            }
        },
        methods: {
            add() {
                this.user.registerTime = new Date();
                this.$axios.post('/api/user', this.user).then((res) => {
                    console.log(res);
                    alert('新增成功！');
                    this.$router.push('/user');
                });
            }
        }
    }
</script>

<style scoped>
#user-add {
    margin: 20px auto;
    width: 70%;
}
</style>