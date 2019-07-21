<template>
    <div id="user-edit">
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
            <b-button variant="primary" type="button" @click="save">保存</b-button>
        </b-form>
    </div>
</template>

<script>
    export default {
        name: "UserEdit",
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
        },
        methods: {
            save() {
                delete this.user.objectId;
                delete this.user.createdAt;
                delete this.user.updatedAt;
                this.$axios.put('/api/user/' + this.id, this.user).then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        alert('保存成功！');
                        this.$router.push({path: '/user'});
                    }
                });
            }
        }
    }
</script>

<style scoped>
    #user-edit {
        margin: 20px auto;
        width: 70%;
    }
</style>