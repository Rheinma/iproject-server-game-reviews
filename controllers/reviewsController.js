const { Game, User, UserReview } = require(`../models`);
const axios = require("axios");

class Controller {
	static async fetchReviewsByGameId(req, res, next) {
		let { GameId } = req.params;
		try {
			let reviews = await UserReview.findAll({
				where: { GameId },
				include: [
					{ model: Game },
					{ model: User, attributes: { exclude: [`password`] } },
				],
			});

			res.status(200).json({
				reviews,
			});
		} catch (error) {
			next(error);
		}
	}
	static async postReview(req, res, next) {
		let { review, score } = req.body;
		let { GameId } = req.params;
		let { id: UserId } = req.user;
		try {
			const axios = require('axios');

			const options = {
				method: 'GET',
				url: 'https://community-purgomalum.p.rapidapi.com/json',
				params: {
					text: review,
					add: 'asu,babi,anjing,monyet,tai,ngentot,bajingan,sialan,tahi,bitch',
					fill_text: '*****'
				},
				headers: {
					'X-RapidAPI-Key': '46223922d4msh2ca5fd58008bf09p191622jsn4e6bf15cc0bd',
					'X-RapidAPI-Host': 'community-purgomalum.p.rapidapi.com'
				}
			};

			try {
				const response = await axios.request(options);
				console.log(response.data);
			} catch (error) {
				console.error(error);
			}

			let { data } = await axios.request(options);

			review = data.result
			await UserReview.create({
				review,
				score,
				GameId,
				UserId,
			});

			res.status(201).json({
				message: "Review posted succesfull!",
			});
		} catch (error) {
			console.log(error);
			next(error);
		}
	}
	static async deleteReview(req, res, next) {
		try {
			const id = req.params.id;

			await UserReview.destroy({
				where: {
					id,
				},
			});

			res.status(200).json({
				message: `Review with id ${id} has been deleted`,
			});
		} catch (error) {
			next(error);
		}
	}
}

module.exports = Controller;
