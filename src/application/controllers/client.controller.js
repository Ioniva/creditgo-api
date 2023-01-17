const getClient = ((req, res) => {
    res.status(200).send("The client is...");
})

const getAllClient = ((req, res, next) => {
    try {
        throw new error("No se pudieron obtener los clientes...")
        res.status(200).send("This are ALL the client!");
    } catch (err) {
        next(err);
    }
})

export { getClient, getAllClient };
