<template>
	<div class="page">
		<spinner v-if="isLoading"/>

		<main class="main" v-else>
			<div class="container">
				<div class="laptop">
					<div class="sections">
						<section :class="['section', 'section-left', { 'section-error': isError }]">
							<div class="info">
								<div class="city-inner">
									<input v-model="curCity" type="text" class="search" @keyup.enter="changeCity">
									<i class="fas fa-search city-inner__ico" @click="changeCity" ></i>
								</div>

								<weather-summary v-if="!isError" :weatherInfo="weatherInfo"/>

								<div v-else class="error">
									<div class="error-title">
										Something went wrong!
									</div>

									<div v-if="weatherInfo?.message" class="error-message">
										{{ capitalizeFirstLetter(weatherInfo?.message) }}
									</div>
								</div>
							</div>
						</section>

						<section v-if="!isError" class="section section-right">
							<highlights :weatherInfo="weatherInfo"/>
						</section>
					</div>

					<div v-if="!isError" class="sections">
						<coords :coord="weatherInfo.coord"/>
						<humidity :humidity="weatherInfo.main.humidity"/>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>
	
<script>
import { mapState, mapActions } from 'pinia';
import { useRootStore } from '@/stores/store';

import WeatherSummary from "@app/components/weather-summary/WeatherSummary.vue";
import Highlights from "@app/components/highlights/Highlights.vue";
import Coords from "@app/components/coords/Coords.vue";
import Humidity from "@app/components/humidity/Humidity.vue";
import Spinner from "@app/components/spinner/Spinner.vue";

export default {
	name: 'main-page',

	components: {
		WeatherSummary, Highlights, Coords, Humidity, Spinner
	},

	data() {
		return {
			curCity: '',
		}
	},

	computed: {
		...mapState(useRootStore, ['weatherInfo', 'isLoading', 'city']),

		isError() {
			if (this.weatherInfo?.cod !== 200) {
				return true;
			} else {
				return false;
			}
		}
	},

	created() {
		// console.log('this.weatherInfo: ', this.weatherInfo);

		this.curCity = this.city;
	},

	
	methods: {
		...mapActions(useRootStore, ['getWeather', 'capitalizeFirstLetter', 'setCity']),

		changeCity() {
			this.setCity(this.curCity);

			this.getWeather();
		}
	},
};
</script>