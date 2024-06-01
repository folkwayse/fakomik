<template>
    <div class="filter dropdown relative mb-4">
      <button
        type="button"
        class="dropdown-toggle bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center w-full"
        @click="toggle"
      >
        {{ title }} <span>{{ selectedLabel }}</span>
        <i class="fa fa-angle-down ml-auto" aria-hidden="true"></i>
      </button>
      <ul v-if="isOpen" class="dropdown-menu absolute z-10 mt-1 bg-white border border-gray-300 rounded shadow-lg w-full max-h-60 overflow-auto">
        <li v-for="option in options" :key="option.value" class="py-1 px-2 hover:bg-gray-100">
          <input
            type="checkbox"
            v-if="multiple"
            :id="option.id"
            :name="name"
            :value="option.value"
            v-model="selected"
            class="mr-2"
          />
          <input
            type="radio"
            v-else
            :id="option.id"
            :name="name"
            :value="option.value"
            v-model="selected"
            class="mr-2"
          />
          <label :for="option.id" class="text-gray-700">{{ option.label }}</label>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [Array, String, Number],
      default: () => (props.multiple ? [] : '')
    }
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const isOpen = ref(false);
  const selected = ref(props.modelValue);
  
  watch(selected, (newValue) => {
    emit('update:modelValue', newValue);
  });
  
  const toggle = () => {
    isOpen.value = !isOpen.value;
  };
  
  const selectedLabel = computed(() => {
    if (props.multiple) {
      return selected.value.length > 0 ? `${selected.value.length} selected` : 'All';
    } else {
      const selectedOption = props.options.find(option => option.value === selected.value);
      return selectedOption ? selectedOption.label : 'All';
    }
  });
  </script>
  