import express from "express"
import morgan from "morgan"

import collectionRouter from './Collection/router/collectionRouter'
import nftRouter from './NFT/router/nftRouter'
import userRouter from './User/router/userRouter'
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'))



app.use('/api/collection', collectionRouter)
app.use('/api/nft', nftRouter),
app.use('/api/user', userRouter)

module.exports = app;