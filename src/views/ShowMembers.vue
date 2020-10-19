<template>
  <div class="home">
    <div class="table">
      <div class="row">
        <div class="col">아이디</div>
        <div class="col">이름</div>
        <div class="col">전화번호</div>
        <div class="col">이메일</div>
        <div class="col">주소</div>
      </div>
      <div class="row" v-for="member in members" :key="member.userId">
        <div class="col">{{ member.userId }}</div>
        <div class="col">{{ member.name }}</div>
        <div class="col">{{ member.telNo }}</div>
        <div class="col">{{ member.email }}</div>
        <div class="col">{{ member.address }}</div>
      </div>
    </div>
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
    this.$parent.axios.get(`${this.$data.$hostname}/api/members`)
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
