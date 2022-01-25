import express from 'express';
import { SuccessMsgResponse } from '../../../helper/ApiResponse';
import { ProtectedRequest } from '../../../helper/app-request';
import asyncHandler from '../../../helper/asyncHandler';
import { KeystoreModel } from '../../../models/KeyStore';


const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
/*-------------------------------------------------------------------------*/

router.delete(
  '/',
  asyncHandler(async (req: ProtectedRequest, res) => {
    await KeystoreModel.remove(req.keystore._id);
    new SuccessMsgResponse('Logout success').send(res);
  }),
);

export default router;
