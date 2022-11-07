import express from'express'
import nftController from '../controller/nftController'
import upload from '../../middleware/upload'
const router = express.Router()

router.route('/')
    .get(nftController.showNFTs)
    .post(upload.single('nftImage'), nftController.createNFT)
    .post(nftController.createNFT)


router.post('/multiple', upload.array('nftImage'), nftController.createNFT)
router.route("/showNFTForCollection/:id").get(nftController.ShowTheNFTCollection)
router.route("/showUsersHavingNFT/:id").get(nftController.userHavingNFTs)
router.route("/sale/:id").post(nftController.forSale)
router.route('/showNFtsForSale').get(nftController.showSaleNFTs)
router.route("/buy/:id").post(nftController.buyNft)


router.route("/showSaleTypeBuyNFTs").get(nftController.showSaleTypeBuyNFTs)


router.route('/updateNFT/:id').patch(nftController.updateNftCollection)

router.route('/:id')
    .get(nftController.getNFTById)
    .patch(nftController.updateNFT)
    .delete(nftController.deleteNFT)

module.exports = router