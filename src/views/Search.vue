<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Solicitar Pieza</ion-title>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Solicitar Pieza</ion-title>
        </ion-toolbar>
        <ion-toolbar>
          <ion-searchbar placeholder="Buscar" @change="buscar($event)"></ion-searchbar>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <div class="ion-padding">
          <div class="mb-3" v-if="store.name">
            <ion-label class="dp-block text-center">Tienda</ion-label>
            <ion-input
              type="text"
              class="input-rounded px-3 mt-2"
              :value="store.name"
              disabled
            >
            </ion-input>
          </div>

          <ion-item lines="none">
            <ion-label>Pieza</ion-label>
            <ionic-selectable
              class="mr-3"
              item-content
              :v-model="model.part"
              itemValueField="name"
              itemTextField="name"
              :items="parts"
              :canSearch="true"
            >
            </ionic-selectable>
          </ion-item>

          <ion-item lines="none" class="mt-3">
            <ion-label>Marca</ion-label>
            <ionic-selectable
              class="mr-3"
              item-content
              v-model="model.make"
              itemValueField="name"
              itemTextField="name"
              :items="makes"
              :canSearch="true"
              @change="onMakeSelection($event)"
            >
            </ionic-selectable>
          </ion-item>

          <ion-item lines="none" class="mt-3">
            <ion-label>Modelo</ion-label>
            <ionic-selectable
              class="mr-3"
              item-content
              v-model="model.model"
              itemValueField="name"
              itemTextField="name"
              :items="models"
              :canSearch="true"
              @change="onModelSelection($event)"
            >
            </ionic-selectable>
          </ion-item>

          <ion-item lines="none" class="mt-3">
            <ion-label>Año</ion-label>
            <ion-select class="mr-3" v-model="model.year">
              <ion-select-option v-for="item in years" :value="item">
                {{ item }}
              </ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item lines="none" class="mt-3">
            <ion-label>Condición</ion-label>
            <ion-select class="mr-3" v-model="model.condition">
              <ion-select-option v-for="item in conditions" :value="item.name">
                {{ item.name }}
              </ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item lines="none" class="mt-3">
            <ion-label>Origen</ion-label>
            <ion-select class="mr-3" v-model="model.source">
              <ion-select-option v-for="item in sources" :value="item.name">
                {{ item.name }}
              </ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item lines="none" class="mt-3">
            <ion-label>Cantidad</ion-label>
            <ion-select class="mr-3" v-model="model.quantity">
              <ion-select-option v-for="item in quantities" :value="item">
                {{ item }}
              </ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item class="mt-3">
            <ion-label position="floating">Descripción</ion-label>
            <ion-textarea
              :autocapitalize="'on'"
              v-model="model.description"
              position="floating"
            >
            </ion-textarea>
          </ion-item>
          <ion-button
            @click="validate()"
            shape="round"
            expand="block"
            color="gradient"
            class="mt-4 mx-3 mb-3"
          >
            Solicitar
          </ion-button>
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
  IonLabel,
  IonItem,
  IonSearchbar,
  IonButtons,
  IonBackButton,
  onIonViewWillEnter,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonButton,
  IonTextarea,
} from "@ionic/vue";

defineComponent({
  name: "StoresList",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonLabel,
    IonItem,
    IonSearchbar,
    IonButtons,
    IonBackButton,
    IonSelect,
    IonSelectOption,
    IonInput,
    IonButton,
    IonTextarea,
  },
});

onIonViewWillEnter(() => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
});

const loading = ref(false);
const storesList: Ref<Store[]> = ref([]);

function buscar(event: any) {
  console.log(event);
}
</script>

<style scoped></style>
