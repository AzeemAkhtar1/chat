<template>
  <div class="list-group list-group-flush">
    <a 
      v-for="user in users" 
      :key="user._id"
      href="#"
      class="list-group-item list-group-item-action"
      :class="{ active: selectedUser && selectedUser._id === user._id }"
      @click.prevent="$emit('select-user', user)"
    >
      <div class="d-flex align-items-center">
        <div class="user-status" :class="{ online: user.isOnline }"></div>
        <div class="ms-3">
          <div class="fw-bold">{{ user.username }}</div>
          <small>{{ user.isOnline ? 'Online' : 'Offline' }}</small>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  props: {
    users: {
      type: Array,
      required: true
    },
    selectedUser: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
.user-status {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ccc;
}

.user-status.online {
  background-color: #28a745;
}

.list-group-item {
  border-left: none;
  border-right: none;
}

.list-group-item:first-child {
  border-top: none;
}

.list-group-item:last-child {
  border-bottom: none;
}

.list-group-item.active {
  background-color: #f8f9fa;
  border-color: #dee2e6;
  color: #212529;
}
</style>
