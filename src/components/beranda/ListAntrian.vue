<template>
  <div class="row">
    <div class="col q-pb-sm q-pr-sm q-pl-sm">
      <div class="glow-card-1">
        <q-card-section class="bg-blue-2">
          <div class="text-body2 float-left">Antrian Verifikasi</div>
          <q-icon name="layers" color="blue" size="20px" class="float-right" />
          <br />
          <div class="text-subtitle1 text-bold">9</div>
        </q-card-section>
      </div>
    </div>

    <div class="col q-pb-sm q-pr-sm">
      <div class="glow-card-2">
        <q-card-section class="bg-orange-2">
          <div class="text-body2 float-left">Antrian Jadwal</div>
          <q-icon
            name="calendar_month"
            color="orange"
            size="20px"
            class="float-right"
          />
          <br />
          <div class="text-subtitle1 text-bold">9714</div>
        </q-card-section>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col q-pb-sm q-pr-sm q-pl-sm">
      <div class="glow-card-3">
        <q-card-section class="bg-red-2">
          <div class="text-body2 float-left">Slot Hari Ini</div>
          <q-icon
            name="switch_account"
            color="red"
            size="20px"
            class="float-right"
          />
          <br />
          <div class="text-subtitle1 text-bold">22</div>
        </q-card-section>
      </div>
    </div>

    <div class="col q-pb-sm q-pr-sm">
      <div class="glow-card-4">
        <q-card-section class="bg-green-2">
          <div class="text-body2 float-left">Slot Tersedia</div>
          <q-icon
            name="contacts"
            color="green"
            size="20px"
            class="float-right"
          />
          <br />
          <div class="text-subtitle1 text-bold">8</div>
        </q-card-section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.glow-card-1 {
  border: 1px solid #007bff;
}
.glow-card-2 {
  border: 1px solid #af7305;
}
.glow-card-3 {
  border: 1px solid #a80101;
}
.glow-card-4 {
  border: 1px solid #23a801;
}
</style>
