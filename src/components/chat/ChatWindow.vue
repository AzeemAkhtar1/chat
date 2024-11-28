<template>
  <div class="chat-messages" ref="messagesContainer">
    <div v-if="messages.length === 0" class="text-center text-muted my-4">
      No messages yet. Start the conversation!
    </div>
    <div 
      v-for="(message, index) in messages" 
      :key="index"
      class="message"
      :class="{ 'message-sent': isSentMessage(message), 'message-received': !isSentMessage(message) }"
    >
      <div class="message-content">
        {{ message.content }}
        <small class="message-time">{{ formatTime(message.timestamp || message.createdAt) }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUpdated, ref } from 'vue'

export default {
  name: 'ChatWindow',
  props: {
    messages: {
      type: Array,
      required: true
    },
    currentUser: {
      type: Object,
      required: true
    },
    selectedUser: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const messagesContainer = ref(null)

    const scrollToBottom = () => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }
    }

    onMounted(() => {
      scrollToBottom()
    })

    onUpdated(() => {
      scrollToBottom()
    })

    const isSentMessage = (message) => {
      return message.from === props.currentUser._id
    }

    const formatTime = (timestamp) => {
      return new Date(timestamp).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    }

    return {
      messagesContainer,
      isSentMessage,
      formatTime
    }
  }
}
</script>

<style scoped>
.chat-messages {
  height: 400px;
  overflow-y: auto;
  padding: 1rem;
}

.message {
  margin-bottom: 1rem;
  max-width: 70%;
}

.message-sent {
  margin-left: auto;
}

.message-received {
  margin-right: auto;
}

.message-content {
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  position: relative;
}

.message-sent .message-content {
  background-color: #007bff;
  color: white;
}

.message-received .message-content {
  background-color: #f1f1f1;
}

.message-time {
  display: block;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  opacity: 0.7;
}
</style>