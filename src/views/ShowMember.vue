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
        <tr>
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
  name: 'ShowMember',
  data: () => ({
    member: {},
  }),
  mounted() {
    this.$parent.isLoading = true;
    this.$parent.axios.get('/api/login/get-user-info')
      .then((response) => {
        this.$log.debug('[ShowMember]', '/api/login/get-user-info', response);
        if (response.data !== '') {
          this.member = response.data;
        } else {
          this.$parent.openAlertPopup('사용자 정보를 찾을 수 없습니다.');
        }
      }).catch((err) => {
        const { status } = err.response;
        if (status === 401) { // Unauthorized
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
