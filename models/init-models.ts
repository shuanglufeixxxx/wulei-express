import type { Sequelize, Model } from "sequelize";
import { account } from "./account";
import type { accountAttributes, accountCreationAttributes } from "./account";
import { featured_picture } from "./featured_picture";
import type { featured_pictureAttributes, featured_pictureCreationAttributes } from "./featured_picture";
import { featured_post } from "./featured_post";
import type { featured_postAttributes, featured_postCreationAttributes } from "./featured_post";
import { hibernate_sequence } from "./hibernate_sequence";
import type { hibernate_sequenceAttributes, hibernate_sequenceCreationAttributes } from "./hibernate_sequence";
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

export {
  account,
  featured_picture,
  featured_post,
  hibernate_sequence,
  picture,
  picture_collection,
  picture_item,
  post,
  post_like,
  token,
};

export type {
  accountAttributes,
  accountCreationAttributes,
  featured_pictureAttributes,
  featured_pictureCreationAttributes,
  featured_postAttributes,
  featured_postCreationAttributes,
  hibernate_sequenceAttributes,
  hibernate_sequenceCreationAttributes,
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
};

export function initModels(sequelize: Sequelize) {
  account.initModel(sequelize);
  featured_picture.initModel(sequelize);
  featured_post.initModel(sequelize);
  hibernate_sequence.initModel(sequelize);
  picture.initModel(sequelize);
  picture_collection.initModel(sequelize);
  picture_item.initModel(sequelize);
  post.initModel(sequelize);
  post_like.initModel(sequelize);
  token.initModel(sequelize);


  return {
    account: account,
    featured_picture: featured_picture,
    featured_post: featured_post,
    hibernate_sequence: hibernate_sequence,
    picture: picture,
    picture_collection: picture_collection,
    picture_item: picture_item,
    post: post,
    post_like: post_like,
    token: token,
  };
}
