<template>
  <q-header bordered class="bg-grey-3 text-primary">
    <q-item>
      <q-item-section>
        <q-item-label>
          <q-skeleton type="text" width="150px" />
        </q-item-label>
        <q-item-label caption>
          <q-skeleton type="text" width="150px" />
        </q-item-label>
      </q-item-section>

      <q-item-section avatar>
        <q-skeleton type="QAvatar" />
      </q-item-section>
    </q-item>
  </q-header>

  <q-page class="q-pa-sm">
    <!-- Banner -->
    <div class="row q-pa-sm">
      <q-skeleton
        height="100px"
        width="100%"
        square
        style="border-radius: 20px"
      />
    </div>

    <!-- List -->
    <div class="row">
      <div class="col q-pb-sm q-pr-sm q-pl-sm">
        <q-skeleton height="85px" />
      </div>
      <div class="col q-pb-sm q-pr-sm">
        <q-skeleton height="85px" />
      </div>
    </div>
    <div class="row">
      <div class="col q-pb-sm q-pr-sm q-pl-sm">
        <q-skeleton height="85px" />
      </div>
      <div class="col q-pb-sm q-pr-sm">
        <q-skeleton height="85px" />
      </div>
    </div>

    <!-- Action -->
    <div class="row q-mt-md">
      <q-card class="col-4 text-center card">
        <q-skeleton height="85px" />
      </q-card>
      <q-card class="col-4 text-center card">
        <q-skeleton height="85px" />
      </q-card>
      <q-card class="col-4 text-center card">
        <q-skeleton height="85px" />
      </q-card>
      <q-card class="col-4 text-center card">
        <q-skeleton height="85px" />
      </q-card>
      <q-card class="col-4 text-center card">
        <q-skeleton height="85px" />
      </q-card>
    </div>
  </q-page>
</template>

<style scoped>
.card {
  box-shadow: none;
  padding: 5px;
}
</style>
