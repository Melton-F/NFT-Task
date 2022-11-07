import express from'express'
import bidController from '../bidController/bidController'
import bidController2 from '../bidController/bidController2'
const router = express.Router()

// router.route("/bid/:id").post(nftController.bidNFT)
router.route('/bidv2').post(bidController.bidNFTv2)
router.route('/showHighestBid').post(bidController.showHighestBid)
router.route('/confirm_The_Highest_Bid/:id').post(bidController.confirmBid)

router.route('/highestBidChange').post(bidController2.bidNFTv2)

module.exports = router