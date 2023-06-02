const express = require(`express`);
const Controller = require("../controllers/reviewsController");
const { loginAuthentication } = require("../middlewares/authentication");
const { postReviewAuthorization } = require("../middlewares/authorization");
const router = express.Router();

router.get(`/:GameId`, Controller.fetchReviewsByGameId);

router.use(loginAuthentication);

router.post(`/:GameId`, postReviewAuthorization, Controller.postReview);
router.delete("/GameId", postReviewAuthorization, Controller.deleteReview);

module.exports = router;
