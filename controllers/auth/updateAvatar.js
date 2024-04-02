const { ctrlWrapper } = require('../../helpers');

const { Admin } = require('../../models/admin');

const updateAvatar = async (req, res) => {
  const { _id } = req.admin;

  const avatarURL = req.files['avatar'][0].path;

  await Admin.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL: avatarURL,
  });
};
module.exports = {
  updateAvatar: ctrlWrapper(updateAvatar),
};

/**
 * 
 до 1 варіанту зберігати аватарки у папці public
  const path = require('path');
const fs = require('fs/promises');
const avatarsDir = path.resolve(__dirname, '../', 'public', 'avatars');

 */
/**
   1 варіант 
   const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join('avatars', filename);
  */

/**
 *  2 варіант збереження декількох картинок 
 const avatarURLs = req.files['avatar'].map((file) => file.path);

    await Admin.findByIdAndUpdate(_id, { avatarURLs: avatarURLs });

    res.json({
      avatarURLs: avatarURLs,
    });
  
 * 
 */
