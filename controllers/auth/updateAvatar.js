const { ctrlWrapper } = require('../../helpers');

const path = require('path');
const fs = require('fs/promises');
const { Admin } = require('../../models/admin');

const avatarsDir = path.resolve(__dirname, '../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  const { _id } = req.admin;
  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join('avatars', filename);

  await Admin.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};
module.exports = {
  updateAvatar: ctrlWrapper(updateAvatar),
};
