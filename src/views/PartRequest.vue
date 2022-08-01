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

      <div class="mt-4 container my-container">
        <ion-card>
          <ion-card-content class="ion-padding">
            <ion-label color="dark">
              <b>Informcaion del Vehiculo</b>
            </ion-label>
            <form class="row g-3 mt-1">
              <div class="col-md-6">
                <label for="make" class="form-label">Marca:</label>
                <select
                  id="make "
                  class="form-select"
                  aria-label="Default select example"
                  v-model="partRequest.makeId"
                >
                  <option v-for="make in makes" :key="make.id" :value="make.id">
                    {{ make.name }}
                  </option>
                </select>
              </div>

              <div class="col-md-6 mt-3">
                <label for="make" class="form-label">Modelo:</label>
                <select
                  id="make "
                  class="form-select"
                  aria-label="Default select example"
                  v-model="partRequest.modelId"
                >
                  <option v-for="model in models" :key="model.id" :value="model.id">
                    {{ model.name }}
                  </option>
                </select>
              </div>

              <div class="col-md-6 my-3">
                <label for="make" class="form-label">Año:</label>
                <select
                  id="make "
                  class="form-select"
                  aria-label="Default select example"
                  v-model="partRequest.year"
                >
                  <option v-for="year in years" :key="year" :value="year">
                    {{ year }}
                  </option>
                </select>
              </div>
            </form>
          </ion-card-content>
        </ion-card>

        <ion-card>
          <ion-card-content>
            <ion-label color="dark">
              <b>Informacion de la Pieza</b>
            </ion-label>
            <form class="row g-3 mt-1">
              <div>
                <label for="part" class="form-label">Nombre de pieza:</label>
                <input class="form-control" id="part" v-model="partRequest.partId" />
              </div>

              <div class="col-md-6 mt-3">
                <label for="make" class="form-label">Condicion:</label>
                <select
                  id="make "
                  class="form-select"
                  aria-label="Default select example"
                  v-model="partRequest.condition"
                >
                  <option
                    v-for="condition in conditions"
                    :key="condition.id"
                    :value="condition.name"
                  >
                    {{ condition.name }}
                  </option>
                </select>
              </div>

              <div class="col-md-6 mt-3">
                <label for="make" class="form-label">Origen:</label>
                <select
                  id="make "
                  class="form-select"
                  aria-label="Default select example"
                  v-model="partRequest.source"
                >
                  <option v-for="source in sources" :key="source.id" :value="source.name">
                    {{ source.name }}
                  </option>
                </select>
              </div>

              <div class="col-12">
                <label for="customRange2" class="form-label">
                  Cantidad: <b>{{ partRequest.quantity }}</b>
                </label>
                <!-- <div class="col-12 px-lg-4">
                  <input type="range" class="form-range" min="0" max="10" id="customRange2"
                    v-model="partRequest.quantity" />
                </div> -->
                <ion-range
                  v-model="partRequest.quantity"
                  :ticks="true"
                  :snaps="true"
                  :min="0"
                  :max="10"
                ></ion-range>
              </div>

              <div class="col">
                <label for="vinNumber" class="form-label">Numero VIN:</label>
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="vinNumber"
                    aria-label="VIN Number"
                    aria-describedby="button-addon2"
                    v-model="partRequest.vinNumber"
                  />
                  <button
                    class="btn btn-primary"
                    type="button"
                    id="button-addon2"
                    @click="takePhoto()"
                  >
                    <ion-icon :icon="camera"></ion-icon>
                  </button>
                </div>
              </div>

              <div class="mb-3">
                <label for="aditionalNotes" class="form-label">Notas Adicionales:</label>
                <textarea
                  class="form-control"
                  id="aditionalNotes"
                  rows="3"
                  v-model="partRequest.notes"
                ></textarea>
              </div>
            </form>
          </ion-card-content>
        </ion-card>

        <div class="d-grid gap-2 col-12 col-md-6 mx-auto px-4 my-4">
          <ion-button :strong="true" @click="validate()" shape="round">
            Solicitar
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { defineComponent, ref, Ref, reactive } from "vue";
import { camera, trash, close } from "ionicons/icons";
import { Store } from "../models/Store";
import { VehiclePart } from "../models/VehiclePart";
import { Make } from "../models/Make";
import { Camera, CameraResultType, CameraSource, Photo } from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonButtons,
  IonBackButton,
  onIonViewWillEnter,
  IonButton,
  alertController,
  IonIcon,
  IonCard,
  IonCardContent,
  IonRange,
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
    IonButtons,
    IonBackButton,
    IonButton,
    IonIcon,
    IonRange,
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
  quantity: 0,
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
  { id: 1, name: "Nueva" },
  { id: 2, name: "Usada" },
  { id: 3, name: "Reemplazo" },
];
const sources = [
  { id: 1, name: "Americano" },
  { id: 2, name: "Europeo" },
  { id: 3, name: "Japones" },
  { id: 4, name: "Otro" },
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
  if (!isValid()) return;

  const alert = await alertController.create({
    header: "Confirmacion",
    buttons: [
      {
        text: "Cancelar",
        role: "cancel",
        handler: () => {
          console.log("Alert canceled");
        },
      },
      {
        text: "OK",
        role: "confirm",
        handler: () => {
          console.log("Alert confirmed");
        },
      },
    ],
  });

  await alert.present();
}

async function isValid() {
  let valid = true;
  const keys = Object.keys(partRequest);
  const requiredFields = [
    { label: "Pieza", name: "part" },
    { label: "Marca", name: "make" },
    { label: "Modelo", name: "model" },
    { label: "Año", name: "year" },
    { label: "Condicion", name: "condition" },
    { label: "Cantidad", name: "quantity" },
  ];
  let i = 0;

  while (valid && i < keys.length) {
    let index = requiredFields.findIndex((x) => x.name == keys[i]);
    type ObjectKey = keyof typeof partRequest;

    if (index != -1 && !partRequest[keys[i] as ObjectKey]) {
      const alert = await alertController.create({
        header: "Atencion",
        message: `El campo ${requiredFields[index].label} es requerido`,
        buttons: ["OK"],
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
@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}
</style>
