import { ref, computed } from "vue";

export default function useClima () {

    //api 
    //EODA4BhG38SGCBBSzW1T7wEXzEvyeVdEmwwUZfoN
    //https://countryapi.io/api/name/austria?apikey=EODA4BhG38SGCBBSzW1T7wEXzEvyeVdEmwwUZfoN

    const dataCountry = ref({});
    const nameObjectCountry = ref('');
    const weatherCity = ref({});
    const error = ref('');
    const load = ref(false);

    const getWeather = async (consultData) => {
        //datos para enpoints
        const {code, country, city} = consultData;
        const apiKey = '2f5deed8287063d0878cc915706b6269'
        const apiKeyCountry = 'EODA4BhG38SGCBBSzW1T7wEXzEvyeVdEmwwUZfoN'
        weatherCity.value = {};
        dataCountry.value = {};
        nameObjectCountry.value = '';
        error.value = '';
        load.value = true;

        try {
            //consultar datos del pais
            const urlCountry = `https://countryapi.io/api/name/${country}?apikey=${apiKeyCountry}`
            const responseCountry = await fetch(urlCountry);
            if (responseCountry.status === 404) {
                throw new Error('NOT FOUND COUNTRY'); 
                /* 
                La palabra clave throw se usa para lanzar una excepción definida por el usuario. Cuando se lanza 
                una excepción, la ejecución del código se detiene y el control pasa al primer bloque catch en la pila
                de llamadas.
                En este caso, estamos lanzando un error con un mensaje personalizado para indicar que el país no fue 
                encontrado. Cuando este error es lanzado, la ejecución de la función getWeather se detiene y el 
                control pasa al bloque catch, donde podemos manejar el error y mostrar un mensaje de error al usuario.
                */
            }
            const resultCountry = await responseCountry.json();
            nameObjectCountry.value = Object.keys(resultCountry)[0] //accedemos al nombre del objeto
            dataCountry.value = resultCountry[nameObjectCountry.value] //asignamos solo los datos al nuevo objeto
            //dataCountry.value = resultCountry;
             

             //consultar primera API pora obtener la lat y lon
            const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${code}&limit=1&appid=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();
            const {lat, lon} = data[0];

            //consultar el clima del estado
            const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
            const responseWeather = await fetch(urlWeather);
            const dataWeather = await responseWeather.json();
            weatherCity.value = dataWeather;
            /* console.log( weatherCity.value) */

        } catch {
            error.value = 'Ciudad no encontrada'
        } finally {
            load.value = false;
        }

    }

    const showWeather = computed(() => {
        return (Object.values(weatherCity.value).length > 0) 
    })

    const formatTemperature = (temperature) => {
        return parseInt(temperature - 273.15);
    }

    const formatVisibility = (visibility) => {
        return visibility >= 1000 ? `${visibility / 1000} km` : `${visibility} m`; 
    }
 

    return {
        getWeather,
        dataCountry,
        nameObjectCountry,
        weatherCity,
        showWeather,
        error,
        load,
        formatTemperature,
        formatVisibility
    }

}