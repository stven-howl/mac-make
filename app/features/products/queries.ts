
export const getProducts = async () => {
    const {data, error} = await client.from("product_list_view").select(`*`);
    if (error) throw new Error(error.message);

    return data

}