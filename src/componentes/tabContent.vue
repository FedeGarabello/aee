<script setup>
const props = defineProps ({
    lista: {
        type: Array,
        required: true
    },
    nav: {
        type: String,
        required: true
    }
})
</script>
<template>
    <div
        class="tab-pane fade"
        :id="`nav-${nav}`"
        role="tabpanel"
        :aria-labelledby="`nav-${nav}-tab`"
        tabindex="0"
    >
        <ul class="col-12 col-md-6">
            <li class="list-group-item" v-for="(j, index) in lista">
                <p>{{ index + 1 }}) {{ j.nombre }} {{ j.apellido }}</p>
            </li>
        </ul>
    </div>
</template>
