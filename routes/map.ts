// import Router from 'express';

// const router = Router();

// const map = function (tree: object, route = '') {
//     for (const key in tree) {
//         const value = tree[key]
//         switch (typeof value) {
//             case 'object':
//                 map(value, route + key);
//                 break;
//             case 'function':
//                 router[key](route, value);
//                 break;
//             default:
//                 console.log(typeof value);
//         }
//     }
// };

// map({
//     '/post': {
//         '/:id': {
//             get: ''
//         },
//         post: ''
//     },
//     '/account': {
//         '/:id': {
//             get: ''
//         },
//         post: ''
//     },
//     '/postLike': {
//         '/:id': {
//             get: '',
//             delete: ''
//         },
//         post: ''
//     },
//     '/image': {
//         '/:id': {
//             get: ''
//         },
//         post: ''
//     },
//     '/featuredPicture': {
//         '/:id': {
//             get: ''
//         },
//         post: ''
//     },
//     '/featuredPost': {
//         '/:id': {
//             get: ''
//         },
//         post: ''
//     }
// })