<template>
    <div id="user-list">
        <el-button-group>
            <el-button @click="toAdd" type="primary" icon="el-icon-plus" circle></el-button>
        </el-button-group>
        <el-table :data="usersByPage" style="width: 100%">
            <el-table-column prop="username" label="用户名" width="180" sortable>
                <template slot-scope="scope">
                    <router-link :to="{path: '/user/' + scope.row.objectId}">{{scope.row.username}}</router-link>
                </template>
            </el-table-column>
            <el-table-column  prop="nickname" label="昵称" width="180" sortable></el-table-column>
            <el-table-column prop="registerTime" label="注册时间" sortable>
                <template slot-scope="scope">
                    {{ scope.row.registerTime | datetime}}
                </template>
            </el-table-column>
            <el-table-column prop="operations" label="操作">
                <template slot-scope="scope">
                    <el-button-group>
                        <el-button @click="toEdit(scope.row)" type="warning" icon="el-icon-edit" circle></el-button>
                        <el-button @click="toDelete(scope.row)" type="danger" icon="el-icon-delete" circle></el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="current"
                :page-sizes="[5, 10, 25, 100]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "UserList",
        data() {
            return {
                fields: [
                    { label: '用户名', key: 'username', sortable: true },
                    { label: '昵称', key: 'nickname', sortable: true },
                    { label: '注册时间', key: 'registerTime', sortable: true },
                    { label: '操作', key: 'operations' }
                ],
                users: [],
                current: 1,
                size: 5,
                total: 0,
            };
        },
        computed: {
            usersByPage: function() {
                return this.users.slice((this.current - 1) * this.size, Math.min(this.current * this.size, this.total));
            }
        },
        mounted() {
            this.$axios.get('/api/user').then((res) => {
                console.log(res);
                if (res.status === 200) {
                    this.users = res.data.results;
                    this.total = this.users.length;
                }
            });
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.size = val;
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.current = val;
            },
            toAdd() {
                this.$router.push({path: '/user/add'});
            },
            toEdit(user) {
                this.$router.push({path: '/user/' + user.objectId + '/edit'});
            },
            toDelete(user) {
                if (window.confirm('确定删除吗？')) {
                    this.$axios.delete('/api/user/' + user.objectId).then((res) => {
                        console.log(res);
                        if (res.status === 200) {
                            window.location.reload();
                        }
                    });
                }
            }
        },
        filters: {
            datetime(value, format) {
                let date = new Date(value);
                console.log(date);
                format = format || 'yyyy-MM-dd HH:mm:ss';
                let o = {
                    "M+" : date.getMonth()+1,                 //月份
                    "d+" : date.getDate(),                    //日
                    "H+" : date.getHours(),                   //小时
                    "m+" : date.getMinutes(),                 //分
                    "s+" : date.getSeconds(),                 //秒
                    "q+" : Math.floor((date.getMonth()+3)/3), //季度
                    "S"  : date.getMilliseconds()             //毫秒
                };
                if(/(y+)/.test(format))
                    format = format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
                for(let k in o)
                    if(new RegExp("("+ k +")").test(format))
                        format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                return format;
            }
        }
    }
</script>

<style scoped>
    #user-list {
        margin: 20px auto;
        width: 70%;
    }
</style>