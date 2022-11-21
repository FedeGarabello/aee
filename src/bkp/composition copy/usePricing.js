import {onMounted, ref} from "vue";
import { getPricing } from "../services/precios.js";

export function usePricingService() {
    const services = ref([]);

    onMounted(async () => {
        await getPricing().then((prices) => {
            prices.forEach((doc) => {
                services.value.push(doc.data());
            });
        });
    });
    
    return {
        services,
    }
}
