<template>
    <div id="user-show">
        <el-form :model="user" class="demo-form-inline">
            <el-form-item label="用户名">
                <el-input v-model="user.username" placeholder="用户名" readonly></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="user.nickname" placeholder="昵称" readonly></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="user.password" placeholder="密码" type="password" readonly></el-input>
            </el-form-item>
        </el-form>
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