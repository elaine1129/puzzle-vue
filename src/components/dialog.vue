<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="auto">
      <v-card :text="content" :title="title">
        <template v-slot:actions>
          <v-btn class="ms-auto" text="OK" @click="closeDialog"></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts" setup>
import { toRefs } from 'vue';
const props = defineProps({
  dialog: Boolean,
  title: String,
  content: String
})

const { dialog } = toRefs(props)

const emit = defineEmits(['close'])

function closeDialog() {
  emit('close')
}


</script>