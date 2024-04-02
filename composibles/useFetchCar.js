export default async (id) => {
    const {data, error} = await useFetch(`/api/car/${id}`);

    if(error.value){
        throw new Error({
            statusCode: error.value.statusCode,
            statusMessage: "Failed to fetch car"
        })
    }
    return {data};
}