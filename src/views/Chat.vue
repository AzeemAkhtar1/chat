<template>
    <div class="container-fluid mt-4">
      <div class="row">
        <!-- Users List Sidebar -->
        <div class="col-md-3">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">Online Users</h5>
            </div>
            <div class="card-body p-0">
              <user-list 
                :users="onlineUsers"
                :selectedUser="selectedUser"
                @select-user="selectUser"
              />
            </div>
          </div>
        </div>
  
        <!-- Chat Window -->
        <div class="col-md-9">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">
                {{ selectedUser ? `Chat with ${selectedUser.username}` : 'Select a user to start chatting' }}
              </h5>
            </div>
            <div class="card-body">
              <chat-window 
                v-if="selectedUser"
                :messages="messages"
                :currentUser="currentUser"
                :selectedUser="selectedUser"
              />
              <message-input 
                v-if="selectedUser"
                @send-message="sendMessage"
                :isTyping="isTyping"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue'
  import { useStore } from 'vuex'
  import UserList from '../components/chat/UserList.vue'
  import ChatWindow from '../components/chat/ChatWindow.vue'
  import MessageInput from '../components/chat/MessageInput.vue'
  import { initializeSocket } from '../services/socket'
  
  export default {
    name: 'ChatView',
    components: {
      UserList,
      ChatWindow,
      MessageInput
    },
    setup() {
      const store = useStore()
      const socket = ref(null)
      const onlineUsers = ref([])
      const selectedUser = ref(null)
      const messages = ref([])
      const isTyping = ref(false)
      
      const currentUser = computed(() => store.getters['auth/currentUser'])
  
      onMounted(async () => {
        socket.value = await initializeSocket(currentUser.value.token)
        
        socket.value.on('users', (users) => {
          onlineUsers.value = users.filter(user => user._id !== currentUser.value._id)
        })
  
        socket.value.on('message', (message) => {
          messages.value.push(message)
        })
  
        socket.value.on('message-history', (history) => {
          messages.value = history
        })
  
        socket.value.on('typing', (user) => {
          if (selectedUser.value && user._id === selectedUser.value._id) {
            isTyping.value = true
            setTimeout(() => { isTyping.value = false }, 3000)
          }
        })
      })
  
      const selectUser = (user) => {
        selectedUser.value = user
        messages.value = []
        socket.value.emit('get-messages', {
          from: currentUser.value._id,
          to: user._id
        })
      }
  
      const sendMessage = (content) => {
        if (!selectedUser.value) return
  
        const message = {
          from: currentUser.value._id,
          to: selectedUser.value._id,
          content,
          timestamp: new Date()
        }
  
        socket.value.emit('send-message', message)
        messages.value.push(message)
      }
  
      return {
        onlineUsers,
        selectedUser,
        messages,
        currentUser,
        isTyping,
        selectUser,
        sendMessage
      }
    }
  }
  </script>
  
  <style scoped>
  .chat-body {
    padding: 0;
    height: calc(100vh - 200px);
    overflow: hidden;
  }
  </style>