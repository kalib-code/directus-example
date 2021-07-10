module.exports = function registerEndpoint(router, { services, exceptions }) {
	const { ItemsService } = services;
	const { ServiceUnavailableException } = exceptions;

	router.get('/getItem', (req, res, next) => {
		const recipeService = new ItemsService('stores', { schema: req.schema, accountability: req.accountability });

		recipeService
			.readByQuery({ fields: ['*'] })
			.then((results) => res.json(results))
			.catch((error) => {
				return next(new ServiceUnavailableException(error.message));
			});
	});
};