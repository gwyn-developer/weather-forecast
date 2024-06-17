<template>
	<div class="summary">
		<pre/>
		
		<div
			:style="{backgroundImage: backgroundImage}"
			class="pic-main"
		/>

		<div class="weather">
			<div class="temp">
				{{ Math.round(weatherInfo?.main?.temp) }} °C
			</div>

			<div class="weather-desc text-block">
				{{ capitalizeFirstLetter(weatherInfo?.weather[0].description) }}
			</div>
		</div>

		<div class="city text-block">
			{{ weatherInfo?.name }}, {{ weatherInfo?.sys?.country }}
		</div>

		<div class="date text-block">
			{{ today }}
		</div>
	</div>
</template>

<script>
import { mapActions } from 'pinia';
import { useRootStore } from '@/stores/store';

export default {
	name: 'weather-summary',

	props: {
		weatherInfo: {
			type: [Object, null],
			default: null,
			required: true
		}
	},

	computed: {
		today() {
			return new Date().toLocaleString('en-EN', {weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'});
		},

		backgroundImage() {
			return 'url(' + `"/weather-main/${this.weatherInfo?.weather[0].description}.png"` + ')'
		}
	},

	methods: {
		...mapActions(useRootStore, ['capitalizeFirstLetter']),
	},
};
</script>