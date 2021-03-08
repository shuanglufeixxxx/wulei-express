import account from './account';
import featuredPicture from './featured-picture';
import featuredPost from './featured-post';
import image from './image';
import picture from './picture';
import postLike from './post-like';
import post from './post';

account();
featuredPicture();
featuredPost();
image();
picture();
postLike();
post();

export { apiv1, apiPrefix as apiV1Prefix } from './init-apiv1'