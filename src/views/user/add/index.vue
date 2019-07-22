<template>
    <div id="user-add">
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
                <el-button type="primary" @click="add">保存</el-button>
            </el-form-item>
        </el-form>
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