<script setup>
import {ref} from 'vue';
import vSelect from 'vue-select';

const props = defineProps({
  options: {
    required: true,
    type: Array
  },
  label: {
    default: 'label',
  },
  current: {
    default: null
  },
  searchable: {
    type: Boolean,
    default: true
  },
  clearable: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['item-selected']);

const selectedItem = ref(props.current);
const selected = (value) => {
  selectedItem.value = value;
  emit('item-selected', selectedItem.value);

}

</script>

<template>
  <v-select

    :label="label"
    :modelValue="selectedItem"
    :options="options"
    :searchable="searchable"
    :clearable="clearable"
    appendToBody
    @update:modelValue="selected"
  >
    <template #no-options="{ search, searching, loading }">
      <div style="opacity: 0.8">
        Не знайдено
      </div>
    </template>
  </v-select>
</template>

<style >
.vs__search {
  border-color: white;
}
.vs__actions {
  cursor: pointer;
}

</style>
