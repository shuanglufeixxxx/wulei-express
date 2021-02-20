import type { Sequelize, Model } from "sequelize";
import { account } from "./account";
import type { accountAttributes, accountCreationAttributes } from "./account";
import { featured_picture } from "./featured_picture";
import type { featured_pictureAttributes, featured_pictureCreationAttributes } from "./featured_picture";
import { featured_post } from "./featured_post";
import type { featured_postAttributes, featured_postCreationAttributes } from "./featured_post";
import { picture } from "./picture";
import type { pictureAttributes, pictureCreationAttributes } from "./picture";
import { picture_collection } from "./picture_collection";
import type { picture_collectionAttributes, picture_collectionCreationAttributes } from "./picture_collection";
import { picture_item } from "./picture_item";
import type { picture_itemAttributes, picture_itemCreationAttributes } from "./picture_item";
import { post } from "./post";
import type { postAttributes, postCreationAttributes } from "./post";
import { post_like } from "./post_like";
import type { post_likeAttributes, post_likeCreationAttributes } from "./post_like";
import { token } from "./token";
import type { tokenAttributes, tokenCreationAttributes } from "./token";
import { refreshToken } from "./refreshToken";
import type { refreshTokenAttributes, refreshTokenCreationAttributes } from "./refreshToken";

export {
  account,
  featured_picture,
  featured_post,
  picture,
  picture_collection,
  picture_item,
  post,
  post_like,
  token,
  refreshToken,
};

export type {
  accountAttributes,
  accountCreationAttributes,
  featured_pictureAttributes,
  featured_pictureCreationAttributes,
  featured_postAttributes,
  featured_postCreationAttributes,
  pictureAttributes,
  pictureCreationAttributes,
  picture_collectionAttributes,
  picture_collectionCreationAttributes,
  picture_itemAttributes,
  picture_itemCreationAttributes,
  postAttributes,
  postCreationAttributes,
  post_likeAttributes,
  post_likeCreationAttributes,
  tokenAttributes,
  tokenCreationAttributes,
  refreshTokenAttributes,
  refreshTokenCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  account.initModel(sequelize);
  featured_picture.initModel(sequelize);
  featured_post.initModel(sequelize);
  picture.initModel(sequelize);
  picture_collection.initModel(sequelize);
  picture_item.initModel(sequelize);
  post.initModel(sequelize);
  post_like.initModel(sequelize);
  token.initModel(sequelize);
  refreshToken.initModel(sequelize);


  return {
    account: account,
    featured_picture: featured_picture,
    featured_post: featured_post,
    picture: picture,
    picture_collection: picture_collection,
    picture_item: picture_item,
    post: post,
    post_like: post_like,
    token: token,
    refreshToken: refreshToken,
  };
}
