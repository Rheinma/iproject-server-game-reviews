const { Game } = require(`../models/`);

const postReviewAuthorization = async (req, res, next) => {
	try {
		const { id: UserId, verified } = req.user;
		const { GameId: id } = req.params;

		const foundGames = await Game.findByPk(id);

		if (!foundGames) {
			throw { name: `DATA_NOT_FOUND`, id };
		}

		if (!verified || verified == "Rejected") {
			throw { name: `FORBIDDEN` };
		}

		next();
	} catch (error) {
		next(error);
	}
};
module.exports = {
	postReviewAuthorization,
	// userDetailUpdateAuthorization,
};
