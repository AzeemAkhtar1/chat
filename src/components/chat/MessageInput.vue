<template>
  <div class="message-input mt-3">
    <form @submit.prevent="handleSubmit">
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          v-model="message"
          placeholder="Type your message..."
          @input="handleTyping"
        >
        <button 
          class="btn btn-primary"
          type="submit"
          :disabled="!message.trim()"
        >
          Send
        </button>
      </div>
    </form>
    <small v-if="isTyping" class="text-muted">
      User is typing...
    </small>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'MessageInput',
  props: {
    isTyping: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const message = ref('')
    let typingTimeout = null

    const handleSubmit = () => {
      if (message.value.trim()) {
        emit('send-message', message.value)
        message.value = ''
      }
    }

    const handleTyping = () => {
      emit('typing')
      
      if (typingTimeout) {
        clearTimeout(typingTimeout)
      }
      
      typingTimeout = setTimeout(() => {
        emit('stop-typing')
      }, 3000)
    }

    return {
      message,
      handleSubmit,
      handleTyping
    }
  }
}
</script>

<style scoped>
.message-input {
  padding: 1rem;
  border-top: 1px solid #dee2e6;
}
</style>
