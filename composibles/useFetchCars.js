export default async (city, filters) => {
    const {data, error, refresh} = await useFetch(`/api/cars/${city}`, {
        params: {...filters},

    });
    if(error.value){
        throw new Error({
            ...error.value,
            statusMessage: "Failed to fetch cars"
        })
    }
    return {data, refresh};
}