import { App, createApp, h } from 'vue'
import GlobalAlert from '@/components/global/GlobalAlert.vue'
import vuetify from './vuetify'; // Import the Vuetify instance

interface Confirm {
  success(message: string): void;
  error(message: string): void;
  info(message: string): void;
  warning(message: string): void;
}

const showAlert = (message: string, color: string) => { 
  const alertApp = createApp({
    render() {
      return h(GlobalAlert, {
        message,
        alertColor: color,
        onClosed: () => {
          document.body.removeChild(alertInstance.$el);
          alertApp.unmount();
        },
      });
    },
  });

  alertApp.use(vuetify);

  const alertInstance = alertApp.mount(document.createElement('div'));
  document.body.appendChild(alertInstance.$el);

}

const confirm: Confirm = {
  success(message: string) {
    showAlert(message, "success");
  },
  error(message: string) {
    showAlert(message, "error");
  },
  info(message: string) {
    showAlert(message, "info");
  },
  warning(message: string) {
    showAlert(message, "warning");
  },
};

export default {
  install(app: App) {
    app.config.globalProperties.$confirm = confirm;
  }
}