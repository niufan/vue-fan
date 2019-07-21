<template>
    <div id="user-list">
        <b-button-group size="sm">
            <b-button @click="toAdd" variant="outline-primary" >新增</b-button>
        </b-button-group>
        <b-table id="user-table" striped hover :items="usersByPage" :fields="fields">
            <template slot="username" slot-scope="row">
                <router-link :to="{path: '/user/' + row.item.objectId}">{{row.item.username}}</router-link>
            </template>
            <template slot="registerTime" slot-scope="row">
                {{ row.item.registerTime | datetime}}
            </template>
            <template slot="operations" slot-scope="row">
                <b-button-group size="sm">
                    <b-button @click="toEdit(row.item)" variant="outline-warning" >编辑</b-button>
                    <b-button @click="toDelete(row.item)" variant="outline-danger">删除</b-button>
                </b-button-group>
            </template>
        </b-table>
        <b-pagination aria-controls="user-table" align="right" v-model="current" :total-rows="total" :per-page="size" v-if="total > size"></b-pagination>
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
                size: 10,
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
                            this.$router.push({path: '/user'});
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