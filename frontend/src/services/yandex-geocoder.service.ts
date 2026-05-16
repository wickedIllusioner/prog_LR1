import axios from 'axios'

class YandexGeocoderService {
	private readonly baseUrl = 'https://geocode-maps.yandex.ru/1.x/'

	private get apiKey() {
		return process.env.NEXT_PUBLIC_YANDEX_GEOCODER_API_KEY
	}

	async getCoordsFromAddress(
		address: string
	): Promise<[number, number] | null> {
		if (!this.apiKey) throw new Error('API ключ геокодера не найден в .env')

		try {
			const response = await axios.get(this.baseUrl, {
				params: {
					apikey: this.apiKey,
					geocode: address,
					format: 'json'
				}
			})

			const pos =
				response.data.response?.GeoObjectCollection?.featureMember?.[0]
					?.GeoObject?.Point?.pos

			if (pos) {
				const [lng, lat] = pos.split(' ').map(Number)
				return [lat, lng]
			}
			return null
		} catch (error) {
			console.error('Ошибка прямого геокодирования:', error)
			return null
		}
	}

	async getAddressFromCoords(coords: [number, number]): Promise<string | null> {
		if (!this.apiKey) throw new Error('API ключ геокодера не найден в .env')

		try {
			const geocodeParam = `${coords[1]},${coords[0]}`

			const response = await axios.get(this.baseUrl, {
				params: {
					apikey: this.apiKey,
					geocode: geocodeParam,
					format: 'json'
				}
			})

			const address =
				response.data.response?.GeoObjectCollection?.featureMember?.[0]
					?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text
			return address || null
		} catch (error) {
			console.error('Ошибка обратного геокодирования:', error)
			return null
		}
	}
}

export const yandexGeocoderService = new YandexGeocoderService()
