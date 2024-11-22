const express = require('express');
const { addVideo, getAllVideos, getVideoWithId, editVideo, deleteVideo } = require('../controller/videoController');
const { protected } = require('../middlewares/auth');

const router = express.Router();

router.post('/add-video',protected,  addVideo);
router.get('/get-videos', getAllVideos);
router.get('/:id', getVideoWithId);
router.put('/:id', protected, editVideo);
router.delete('/:id',protected, deleteVideo);

module.exports = router;
