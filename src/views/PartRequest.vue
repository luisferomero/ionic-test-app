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
      </ion-header>

      <div class="mt-4">
        <ion-card>
          <ion-card-content>
            <ion-item-group>
              <ion-item-divider>
                <ion-label>
                  Informcaion del Vehiculo
                </ion-label>
              </ion-item-divider>
              <ion-item>
                <ion-label>Marca:</ion-label>
                <ion-select v-model="partRequest.makeId" @change="onMakeSelection">
                  <ion-select-option v-for="make in makes" :key="make.id" :value="make.id">
                    {{ make.name }}
                  </ion-select-option>
                </ion-select>
              </ion-item>

              <ion-item>
                <ion-label>Modelo:</ion-label>
                <ion-select v-model="partRequest.modelId">
                  <ion-select-option v-for="model in models" :key="model.id" :value="model.id">
                    {{ model.name }}
                  </ion-select-option>
                </ion-select>
              </ion-item>

              <ion-item>
                <ion-label>Año:</ion-label>
                <ion-select v-model="partRequest.year">
                  <ion-select-option v-for="year in years" :key="year" :value="year">
                    {{ year }}
                  </ion-select-option>
                </ion-select>
              </ion-item>
            </ion-item-group>
          </ion-card-content>
        </ion-card>

        <ion-item-group class="mt-5">
          <ion-item-divider>
            <ion-label>
              Informacion de la Pieza
            </ion-label>
          </ion-item-divider>
          <ion-item>
            <ion-label>Tipo de Pieza:</ion-label>
            <ion-input v-model="partRequest.partId"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Condicion:</ion-label>
            <ion-select v-model="partRequest.condition">
              <ion-select-option v-for="condition in conditions" :key="condition.id" :value="condition.name">
                {{ condition.name }}
              </ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item>
            <ion-label>Origen:</ion-label>
            <ion-select v-model="partRequest.source">
              <ion-select-option v-for="source in sources" :key="source.id" :value="source.name">
                {{ source.name }}
              </ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item>
            <ion-label>Cantidad:</ion-label>
            <ion-select v-model="partRequest.quantity">
              <ion-select-option v-for="(quantity, index) in quantities" :key="index" :value="quantity">
                {{ quantity }}
              </ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item lines="none">
            <ion-label>Numero VIN:</ion-label>
            <ion-input v-model="partRequest.vinNumber"></ion-input>
          </ion-item>

          <ion-item>
            <ion-button size="default" @click="takePhoto()">
              <ion-icon :icon="camera"></ion-icon>
            </ion-button>
          </ion-item>

          <ion-item>
            <ion-label position="floating">Notas Adicionales:</ion-label>
            <ion-textarea :autocapitalize="'on'" v-model="partRequest.notes" position="floating">
            </ion-textarea>
          </ion-item>
        </ion-item-group>

        <ion-button @click="validate()" shape="round" expand="block" class="my-4 mx-4">
          Solicitar
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { defineComponent, ref, Ref, reactive } from "vue";
import { camera, trash, close } from 'ionicons/icons';
import { Store } from "../models/Store";
import { VehiclePart } from '../models/VehiclePart';
import { Make } from '../models/Make';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonItem,
  IonButtons,
  IonBackButton,
  onIonViewWillEnter,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonButton,
  IonTextarea,
  alertController,
  IonIcon,
  IonItemDivider,
  IonItemGroup,
  IonCard,
  IonCardContent
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
    IonButtons,
    IonBackButton,
    IonSelect,
    IonSelectOption,
    IonInput,
    IonButton,
    IonTextarea,
    IonIcon,
    IonItemDivider,
    IonItemGroup
  },
});

onIonViewWillEnter(() => {
  loading.value = true;
  loadYears();
  setTimeout(() => {
    loading.value = false;
  }, 2000);
});

const loading = ref(false);
const partRequest = reactive({
  partId: "",
  makeId: "",
  modelId: "",
  year: "",
  condition: "",
  quantity: "",
  notes: "",
  source: "",
  type: "",
  vinNumber: "",
});
const store: Ref<Store> = ref({}) as Ref<Store>;
const parts: Ref<VehiclePart[]> = ref([]);
const makes: Ref<Make[]> = ref([
  { id: "1", name: "Toyota" },
  { id: "2", name: "Honda" },
  { id: "3", name: "Chevrolet" },
  { id: "4", name: "Ford" },
]);
const models: Ref<Make[]> = ref([]);
const quantities: number[] = [];
const years: number[] = [];
const conditions = [
  { id: 1, name: 'Nueva' },
  { id: 2, name: 'Usada' },
  { id: 3, name: 'Reemplazo' }
];
const sources = [
  { id: 1, name: 'Americano' },
  { id: 2, name: 'Europeo' },
  { id: 3, name: 'Japones' },
  { id: 4, name: 'Otro' },
];

function buscar(event: any) {
  console.log(event);
}

function loadYears() {
  const actualYear = new Date().getFullYear() + 1;
  for (let i = 0; i <= 50; i++) {
    years.push(actualYear - i);
    if (i < 10) {
      quantities.push(i + 1);
    }
  }
}

function onMakeSelection() {
  // service.loadModels(event.value.id).subscribe(resp => models = resp.data);
}

async function validate() {
  if (!isValid())
    return;

  const alert = await alertController.create({
    header: 'Confirmacion',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => { console.log('Alert canceled'); }
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: () => { console.log('Alert confirmed'); }
      }
    ]
  });

  await alert.present();
}

async function isValid() {
  let valid = true;
  const keys = Object.keys(partRequest);
  const requiredFields = [
    { label: 'Pieza', name: 'part' },
    { label: 'Marca', name: 'make' },
    { label: 'Modelo', name: 'model' },
    { label: 'Año', name: 'year' },
    { label: 'Condicion', name: 'condition' },
    { label: 'Cantidad', name: 'quantity' },
  ]
  let i = 0;

  while (valid && i < keys.length) {
    let index = requiredFields.findIndex(x => x.name == keys[i]);
    type ObjectKey = keyof typeof partRequest;

    if (index != -1 && !partRequest[keys[i] as ObjectKey]) {
      const alert = await alertController.create({
        header: 'Atencion',
        message: `El campo ${requiredFields[index].label} es requerido`,
        buttons: ['OK']
      });

      await alert.present();
      valid = false;
    }

    i++;
  }
  return valid;
}

async function takePhoto() {
  const photo = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 100,
  });
}

</script>

<style scoped>
</style>
