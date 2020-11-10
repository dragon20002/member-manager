<template>
  <div class="home">
    <table class="container table">
      <thead>
        <tr>
          <th>아이디</th>
          <th>이름</th>
          <th>전화번호</th>
          <th>이메일</th>
          <th>주소</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="member in members" :key="member.id">
          <td>{{ member.userId }}</td>
          <td>{{ member.name }}</td>
          <td>{{ member.telNo }}</td>
          <td>{{ member.email }}</td>
          <td>{{ member.address }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import router from '@/router';

export default {
  name: 'ShowMembers',
  data: () => ({
    members: [],
  }),
  mounted() {
    this.$parent.isLoading = true;
    this.$axios.get('/api/members')
      .then((response) => {
        this.members = response.data;
      }).catch((err) => {
        const { status } = err.response;
        if (status === 401) {
          this.$parent.hasAuth = false;

          // 로그인화면으로 이동
          router.push('/login');
        }
      }).finally(() => {
        this.$parent.isLoading = false;
      });
  },
};
</script>

<style scoped>
table thead {
  color: white;
  background-color: #42b983;
}

table tbody tr:nth-child(even) {
  background-color: #42b9832a;
}
</style>
