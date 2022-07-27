<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Tiendas</ion-title>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tiendas</ion-title>
        </ion-toolbar>
        <ion-toolbar>
          <ion-searchbar placeholder="Buscar" @change="buscar($event)"></ion-searchbar>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <ion-card class="mx-4">
          <ion-card-content>
            <ion-list v-if="!loading">
              <ion-item v-for="item in storesList" :key="item.id">
                <ion-avatar slot="start">
                  <img
                    src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                  />
                </ion-avatar>
                <ion-label>
                  <h2>{{ item.name }}</h2>
                  <h3>{{ item.address }}</h3>
                  <p>{{ item.email }}</p>
                </ion-label>
              </ion-item>
            </ion-list>

            <div v-if="loading">
              <ion-list>
                <ion-item v-for="(item, index) in [1, 2, 3, 4]" :key="index">
                  <ion-avatar slot="start">
                    <ion-skeleton-text></ion-skeleton-text>
                  </ion-avatar>
                  <ion-label>
                    <h2>
                      <ion-skeleton-text animated></ion-skeleton-text>
                    </h2>
                    <p>
                      <ion-skeleton-text animated></ion-skeleton-text>
                    </p>
                  </ion-label>
                </ion-item>
              </ion-list>
            </div>
          </ion-card-content>
        </ion-card>
        <div class="d-flex justify-content-center">
          <ion-text color="primary">
            <b>Quiero mi tienda aqui!</b>
          </ion-text>
        </div>
      </ion-content>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { defineComponent, ref, Ref } from "vue";
import { Store } from "../models/Store";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText,
  IonSkeletonText,
  IonAvatar,
  IonLabel,
  IonList,
  IonItem,
  IonCard,
  IonCardContent,
  IonSearchbar,
  IonButtons,
  IonBackButton,
  onIonViewWillEnter,
} from "@ionic/vue";

defineComponent({
  name: "StoresList",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonText,
    IonSkeletonText,
    IonAvatar,
    IonLabel,
    IonList,
    IonItem,
    IonCard,
    IonCardContent,
    IonSearchbar,
    IonButtons,
    IonBackButton,
  },
});

onIonViewWillEnter(() => {
  loading.value = true;
  setTimeout(() => {
    storesList.value = [
      {
        id: "1",
        address: "1234 Moon St. Miami FL",
        phoneNumber: "123-456-7890",
        email: "store@mail.com",
        name: "Store 1",
        location: "location",
        userType: 1,
      },
      {
        id: "2",
        address: "1234 Moon St. Miami FL",
        phoneNumber: "123-456-7890",
        email: "store@mail.com",
        name: "Store 2",
        location: "location",
        userType: 1,
      },
      {
        id: "3",
        address: "1234 Moon St. Miami FL",
        phoneNumber: "123-456-7890",
        email: "store@mail.com",
        name: "Store 3",
        location: "location",
        userType: 1,
      },
      {
        id: "4",
        address: "1234 Moon St. Miami FL",
        phoneNumber: "123-456-7890",
        email: "store@mail.com",
        name: "Store 4",
        location: "location",
        userType: 1,
      },
      {
        id: "5",
        address: "1234 Moon St. Miami FL",
        phoneNumber: "123-456-7890",
        email: "store@mail.com",
        name: "Store 5",
        location: "location",
        userType: 1,
      },
    ];
    loading.value = false;
  }, 2000);
});

const loading = ref(false);
const storesList: Ref<Store[]> = ref([]);

function buscar(event: any) {
  console.log(event);
}
</script>

<style scoped>
ion-icon,
b,
h6 {
  color: var(--ion-color-primary);
}

img {
  object-fit: contain;
}
</style>
