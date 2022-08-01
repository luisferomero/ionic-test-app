<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Orden</ion-title>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Orden</ion-title>
        </ion-toolbar>
        <ion-toolbar>
          <ion-searchbar placeholder="Buscar" @change="buscar($event)"></ion-searchbar>
        </ion-toolbar>
      </ion-header>

      <div v-if="loading">
        <ion-item lines="none" v-for="(item, index) in [1, 2, 3, 4]" :key="index">
          <ion-thumbnail slot="start">
            <ion-skeleton-text></ion-skeleton-text>
          </ion-thumbnail>
          <ion-label>
            <h3>
              <ion-skeleton-text animated></ion-skeleton-text>
            </h3>
            <p>
              <ion-skeleton-text animated></ion-skeleton-text>
            </p>
            <p>
              <ion-skeleton-text animated></ion-skeleton-text>
            </p>
          </ion-label>
        </ion-item>
      </div>

      <div v-if="!loading">
        <ion-card v-for="(order, index) in orders" :key="order.id">
          <ion-card-content class="d-flex">
            <div class="col-5">
              <img src="../assets/img/test-piece.jpg" alt="Logo" class="rounded float-left img-fluid" />
            </div>
            <div class="col offset-1 d-flex flex-column">
              <b>{{ order.store.name }}</b>
              <p class="piece">
                <i>x{{ order.partRequest.vehiclePart.quantity }}</i>
                {{ order.partRequest.vehiclePart.part.name }}
              </p>
              <p class="model">
                {{ order.partRequest.vehiclePart.make.name }}
                {{ order.partRequest.vehiclePart.model.name }}
                {{ order.partRequest.vehiclePart.year }}
              </p>
              <b class="price">${{ order.price }}</b>
              <div class="d-flex justify-content-between w-100 mt-3">
                <ion-icon class="mr-1 btn-circle acept" :icon="checkmark" @click="accept(order)">
                </ion-icon>
                <ion-icon class="mr-1 btn-circle reject" :icon="close" @click="decline(order.id, index)">
                </ion-icon>
                <ion-icon class="mr-1 btn-circle more" :icon="ellipsisHorizontal" @click="presentActionSheet(order)">
                </ion-icon>
              </div>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ellipsisHorizontal, close, checkmark } from "ionicons/icons";
import { defineComponent, ref, Ref } from "vue";
import { Order } from "@/models/Order";

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSkeletonText,
  IonLabel,
  IonItem,
  IonCard,
  IonCardContent,
  IonSearchbar,
  IonButtons,
  IonBackButton,
  onIonViewWillEnter,
  IonIcon,
  IonThumbnail,
  alertController,
  AlertInput,
} from "@ionic/vue";

defineComponent({
  name: "StoresList",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonSkeletonText,
    IonLabel,
    IonItem,
    IonCard,
    IonCardContent,
    IonSearchbar,
    IonButtons,
    IonBackButton,
    IonIcon,
    IonThumbnail,
  },
});

onIonViewWillEnter(() => {
  loading.value = true;
  setTimeout(() => {
    orders.value = [
      {
        id: "1",
        status: 1,
        storeId: "1",
        userId: "1",
        comment: "commentario",
        date: new Date(),
        price: 69.99,
        partRequestId: "1",
        partRequest: {
          id: "1",
          userId: "1",
          vehiclePart: {
            part: {
              id: "1",
              name: "Amortiguador",
              description: "Amortiguador",
              date: new Date(),
            },
            make: {
              id: "1",
              name: "Toyota",
            },
            model: {
              id: "1",
              name: "Corolla",
            },
            year: 2014,
            condition: "Nuevo",
            quantity: 2,
            description: "descripcion",
            source: "source",
            type: "tipo",
          },
          date: new Date(),
          status: 1,
        },
        store: {
          id: "1",
          address: "1234 Moon St. Miami FL",
          phoneNumber: "123-456-7890",
          email: "store@mail.com",
          name: "Store 1",
          location: "location",
          userType: 1,
        },
      },
      {
        id: "1",
        status: 1,
        storeId: "1",
        userId: "1",
        comment: "commentario",
        date: new Date(),
        price: 69.99,
        partRequestId: "1",
        partRequest: {
          id: "1",
          userId: "1",
          vehiclePart: {
            part: {
              id: "1",
              name: "Amortiguador",
              description: "Amortiguador",
              date: new Date(),
            },
            make: {
              id: "1",
              name: "Toyota",
            },
            model: {
              id: "1",
              name: "Corolla",
            },
            year: 2014,
            condition: "Nuevo",
            quantity: 2,
            description: "descripcion",
            source: "source",
            type: "tipo",
          },
          date: new Date(),
          status: 1,
        },
        store: {
          id: "1",
          address: "1234 Moon St. Miami FL",
          phoneNumber: "123-456-7890",
          email: "store@mail.com",
          name: "Store 1",
          location: "location",
          userType: 1,
        },
      },
      {
        id: "1",
        status: 1,
        storeId: "1",
        userId: "1",
        comment: "commentario",
        date: new Date(),
        price: 69.99,
        partRequestId: "1",
        partRequest: {
          id: "1",
          userId: "1",
          vehiclePart: {
            part: {
              id: "1",
              name: "Amortiguador",
              description: "Amortiguador",
              date: new Date(),
            },
            make: {
              id: "1",
              name: "Toyota",
            },
            model: {
              id: "1",
              name: "Corolla",
            },
            year: 2014,
            condition: "Nuevo",
            quantity: 2,
            description: "descripcion",
            source: "source",
            type: "tipo",
          },
          date: new Date(),
          status: 1,
        },
        store: {
          id: "1",
          address: "1234 Moon St. Miami FL",
          phoneNumber: "123-456-7890",
          email: "store@mail.com",
          name: "Store 1",
          location: "location",
          userType: 1,
        },
      },
      {
        id: "1",
        status: 1,
        storeId: "1",
        userId: "1",
        comment: "commentario",
        date: new Date(),
        price: 69.99,
        partRequestId: "1",
        partRequest: {
          id: "1",
          userId: "1",
          vehiclePart: {
            part: {
              id: "1",
              name: "Amortiguador",
              description: "Amortiguador",
              date: new Date(),
            },
            make: {
              id: "1",
              name: "Toyota",
            },
            model: {
              id: "1",
              name: "Corolla",
            },
            year: 2014,
            condition: "Nuevo",
            quantity: 2,
            description: "descripcion",
            source: "source",
            type: "tipo",
          },
          date: new Date(),
          status: 1,
        },
        store: {
          id: "1",
          address: "1234 Moon St. Miami FL",
          phoneNumber: "123-456-7890",
          email: "store@mail.com",
          name: "Store 1",
          location: "location",
          userType: 1,
        },
      },
    ];
    loading.value = false;
  }, 2000);
});

const loading = ref(false);
const orders: Ref<Order[]> = ref([]);

function buscar(event: any) {
  console.log(event);
}

async function presentActionSheet(order: Order) {
  console.log(order);
  const alert = await alertController.create({
    header: "Opciones",
    buttons: [
      {
        text: "Chatear con la tienda",
        //icon: 'chatbubbles',
        handler: async () => {
          // await this.createChat(storeId, quotationObj);
        },
      },
      {
        text: "Información de la tienda",
        // icon: 'arrow-dropright-circle',
        handler: () => {
          // this.route.navigateByUrl(`/tabs/home/tiendas/tienda/${storeId}`);
          // this.presentModal(storeId).then(() => {
          //   actionSheet.dismiss()
          //   console.log(storeId);
          // })
        },
      },
      {
        text: "Cancelar",
        role: "cancel",
      },
    ],
  });

  await alert.present();
}

function accept(order: Order) {
  console.log(order);
  //navigate to payments
}

async function decline(orderId: string, index: number) {
  const optionsArray = [
    {
      type: "radio",
      label: "Precio elevado",
      value: "PrecioElevado",
    },
    {
      type: "radio",
      label: "Encontré mejor oferta",
      value: "MejorOferta",
    },
    {
      type: "radio",
      label: "Otro",
      value: "Otro",
    },
  ];
  const alert = await alertController.create({
    header: "¿Desea rechazar esta cotización?",
    message: "Favor indicar la razón",
    inputs: optionsArray as AlertInput[],
    buttons: [
      {
        text: "Cancelar",
        role: "cancel",
        cssClass: "secondary",
      },
      {
        text: "Aceptar",
        handler: (data) => {
          orders.value.splice(index, 1);
        },
      },
    ],
  });

  await alert.present();
}
</script>

<style scoped>
.btn-circle {
  font-size: 28px;
  padding: 8px;
  border-radius: 50%;
}

.acept {
  background-color: var(--ion-color-primary);
  color: white;
}

.reject {
  background-color: var(--ion-color-danger);
  color: white;
}

.more {
  color: white;
  /* border: 1.5px solid var(--ion-color-primary); */
  background-color: var(--ion-color-secondary);
}

.w-60 {
  width: 60%;
}
</style>
