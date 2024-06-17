import { defineStore } from 'pinia';

import {BASE_URL, API_KEY} from "@/constants/constants";

export const useRootStore = defineStore('rootStore', {
	state() {
		return {
			city: 'Chelyabinsk',
			weatherInfo: {},

			isLoading: false,

			PRESSURE_UNITS: 0.750062,
		}
	},

	actions: {
		async getWeather() {
			this.isLoading = true;

			await fetch(`${BASE_URL}?q=${this.city}&appid=${API_KEY}&units=metric`)
				.then(res => res.json())
				.then(data => this.weatherInfo = data)

			setTimeout(() => {
				this.isLoading = false;
			}, 500); // Задержка на 0,5 секунды
		},

		setCity(value) {
			this.city = value;
		},

		capitalizeFirstLetter(str) {
			if (!str) return ''
		
			return str.charAt(0).toUpperCase() + str.slice(1)
		},
		
		getPressureMm(hpa) {
			return Math.round(hpa * this.PRESSURE_UNITS)
		},
		
		getTime(seconds) {
			return new Date(seconds * 1000).toLocaleTimeString('ru-RU', { timeZone: 'Atlantic/Reykjavik'})
		},
	},
})
