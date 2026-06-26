<script setup>
import Spreadsheet from '@/components/Spreadsheet.vue';
import { getSheetsData } from '@/data/data';

const data = getSheetsData();
</script>

<template>
	<main>
		<Spreadsheet :data="data" />
	</main>
</template>
