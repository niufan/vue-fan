<template>
    <div id="user-edit">
        <el-form :model="user" class="demo-form-inline">
            <el-form-item label="用户名">
                <el-input v-model="user.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="user.nickname" placeholder="昵称"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="user.password" placeholder="密码" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
            </el-form-item>
        </el-form>
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