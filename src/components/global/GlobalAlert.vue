<template>
    <div>
      <v-snackbar v-model="visible" :color="alertColor" location="top" timeout="1000">
          {{ message }}
          <template v-slot:actions>
            <v-btn
              color="white"
              variant="text"
              @click="visible = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { VSnackbar, VBtn } from 'vuetify/components';
export default defineComponent({
  name: "GlobalAlert",
  components: {
    VSnackbar,
    VBtn,
  },
  props: {
    message: {
      type: String,
      required: true, 
    },
    alertColor: {
      type: String, 
      required: true
    }
  },
  setup(props, { emit }) {
    const visible = ref(true)

    watch(
      visible,
      (newVal: boolean) => {
        if (!newVal) {
          emit('closed')
        }
      },
    );
    

    return {
      visible,
    }
  }
})
</script>