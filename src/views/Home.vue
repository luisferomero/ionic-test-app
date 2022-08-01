<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Inicio</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Inicio</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="d-flex flex-wrap justify-content-center px-4 mt-3 pt-5">
        <!-- <div class="my-card flex-fill shadow-sm bg-3" @click="redirectTo('stores')">
          <ion-icon :icon="cube" color="light" size="large"></ion-icon>
          <ion-text color="light">
            <b>Tiendas</b>
          </ion-text>
        </div> -->
        <div class="my-card flex-fill shadow-sm bg-2" @click="redirectTo('partRequest')">
          <ion-icon :icon="addCircle" color="light" size="large"></ion-icon>
          <ion-text color="light">
            <b>Solicitar Piezas</b>
          </ion-text>
        </div>

        <div class="my-card flex-fill shadow-sm bg-4" @click="redirectTo('orders')">
          <ion-icon :icon="listCircle" color="light" size="large"></ion-icon>
          <ion-text color="light">
            <b>Ordenes</b>
          </ion-text>
        </div>
        <div class="my-card flex-fill shadow-sm bg-5" @click="redirectTo('tabs/chats')">
          <ion-icon :icon="chatbubbles" color="light" size="large"></ion-icon>
          <ion-text color="light">
            <b>Conversaciones</b>
          </ion-text>
        </div>
        <br />
      </div>
      <div class="my-5 d-flex justify-content-center">
        <img width="320" height="135" src="../assets/img/banner.jpg" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { cube, addCircle, listCircle, chatbubbles } from "ionicons/icons";
import { defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonText,
} from "@ionic/vue";

const router = useRouter();
const route = useRoute();

defineComponent({
  name: "Tab1Page",
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonIcon, IonText },
});

function redirectTo(value: string) {
  router.push({
    path: value,
  });
}
</script>

<style>
.my-card {
  height: 125px;
  width: 125px;
  border-radius: 15px;
  margin: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.bg-1 {
  background-color: var(--ion-color-primary);
}

.bg-2 {
  background-color: var(--ion-color-secondary);
}

.bg-3 {
  background-color: var(--ion-color-tertiary);
}

.bg-4 {
  background-color: var(--ion-color-success);
}

.bg-5 {
  background-color: var(--ion-color-warning);
}
</style>
