module.exports = {
    onLost(req, res) {
        res.status(404).json({
            status: "failed",
            message: "Route not found!",
        });
    },

    onError(err, req, res, next) {
        res.status(err.status || 500).json({
            status: "error",
            error: {
                name: err.name,
                message: err.message,
            },
        });
    },
};
