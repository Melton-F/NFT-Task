import express from'express'
import collectionController from '../controller/collectionController'
import upload from '../../middleware/upload'
const router = express.Router()

router.route('/')
    .get(collectionController.showCollections)
    .post(upload.single("collectionImage"), collectionController.createCollection)

router.route('/collectionsForTheUser/:id')
    .get(collectionController.collectionsInUser)

router.route('/:id')
    .get(collectionController.getCollectionById)
    .patch(collectionController.updateCollectionById)
    .delete(collectionController.deleteCollectionById)

module.exports = router