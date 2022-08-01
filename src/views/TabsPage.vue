<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/home">
          <ion-icon :icon="home" />
          <ion-label>Inicio</ion-label>
        </ion-tab-button>

        <!-- <ion-tab-button tab="tab2" href="/tabs/stores">
          <ion-icon :icon="cube" />
          <ion-label>Tiendas</ion-label>
        </ion-tab-button> -->

        <ion-tab-button tab="tab3" href="/tabs/partRequest">
          <ion-icon :icon="addCircle" />
          <ion-label>Piezas</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab4" href="/tabs/orders">
          <ion-icon :icon="listCircle" />
          <ion-label>Ordenes</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tabs" href="/tabs/chats">
          <ion-icon :icon="chatbubbles" />
          <ion-label>Chat</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import {
  ellipse,
  square,
  triangle,
  home,
  cube,
  addCircle,
  listCircle,
  chatbubbles,
} from "ionicons/icons";

export default defineComponent({
  name: "TabsPage",
  components: {
    IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
    IonRouterOutlet,
  },
  setup() {
    return {
      ellipse,
      square,
      triangle,
      home,
      cube,
      addCircle,
      listCircle,
      chatbubbles,
    };
  },
});
</script>
