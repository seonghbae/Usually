import { Router } from 'express';
import { loginRequired } from '../middlewares';
import {
    categoryService,
    productService,
    userService,
    orderService,
} from '../services';
import { upload } from '../middlewares';

const jwt = require('jsonwebtoken');

const adminRouter = Router();

adminRouter.get('/', (req, res, next) => {
    res.send('admin main page');
});

// ***********
// USER API
// 전체 유저 목록을 가져옴 (배열 형태임)
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
adminRouter.get('/userlist', loginRequired, async function (req, res, next) {
    try {
        const user = await userService.getUser(req.currentUserId);

        // 현재 로그인 아이디의 role을 가져와 admin인지 판단후 아닐 경우 바로 리턴
        if (!user) {
            throw new Error('없는 회원입니다.');
        }
        if (user.role !== 'admin') {
            console.log(
                '서비스 사용 요청이 있습니다. 하지만, admin이 아닙니다.'
            );
            res.status(403).json({
                result: 'forbidden-approach',
                reason: '관리자만 사용할 수 있는 서비스입니다.',
            });

            return;
        }

        // 전체 사용자 목록을 얻음
        const users = await userService.getUsers();

        // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

// ***********
// CATEGORI API
//전체 카테고리 목록을 가져옴
adminRouter.get('/category', loginRequired, async (req, res, next) => {
    try {
        const user = await userService.getUser(req.currentUserId);

        //현재 로그인 아이디의 role을 가져와 admin인지 판단후 아닐 경우 바로 리턴
        if (!user) {
            throw new Error('없는 회원입니다.');
        }
        if (user.role !== 'admin') {
            console.log(
                '서비스 사용 요청이 있습니다. 하지만, admin이 아닙니다.'
            );
            res.status(403).json({
                result: 'forbidden-approach',
                reason: '관리자만 사용할 수 있는 서비스입니다.',
            });

            return;
        }
        const categories = await categoryService.getCategories();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
});

//선택한 카테고리의 상세 정보를 가져옴
adminRouter.get(
    '/category/:categoryId',
    loginRequired,
    async (req, res, next) => {
        try {
            const user = await userService.getUser(req.currentUserId);

            //현재 로그인 아이디의 role을 가져와 admin인지 판단후 아닐 경우 바로 리턴
            if (!user) {
                throw new Error('없는 회원입니다.');
            }
            if (user.role !== 'admin') {
                console.log(
                    '서비스 사용 요청이 있습니다. 하지만, admin이 아닙니다.'
                );
                res.status(403).json({
                    result: 'forbidden-approach',
                    reason: '관리자만 사용할 수 있는 서비스입니다.',
                });

                return;
            }
            const { categoryId } = req.params;
            const category = await categoryService.getCategory(categoryId);
            res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    }
);

//카테고리 생성
adminRouter.post('/category/create', loginRequired, async (req, res, next) => {
    try {
        const user = await userService.getUser(req.currentUserId);

        //현재 로그인 아이디의 role을 가져와 admin인지 판단후 아닐 경우 바로 리턴
        if (!user) {
            throw new Error('없는 회원입니다.');
        }
        if (user.role !== 'admin') {
            console.log(
                '서비스 사용 요청이 있습니다. 하지만, admin이 아닙니다.'
            );
            res.status(403).json({
                result: 'forbidden-approach',
                reason: '관리자만 사용할 수 있는 서비스입니다.',
            });

            return;
        }
        const { name, gender, recommendAge } = req.body;

        const existCategoryId = await categoryService.getCategoryId({
            name,
            gender,
            recommendAge,
        });
        if (existCategoryId) {
            res.status(403).json({
                result: 'forbidden-approach',
                reason: `${name}, ${gender}, ${recommendAge} 에 해당 하는 카테고리가 있습니다. categoryId : ${existCategoryId} 입니다.`,
            });
            return;
        }
        const newCategory = await categoryService.addCategory({
            name,
            gender,
            recommendAge,
        });
        res.status(200).json(newCategory);
    } catch (error) {
        next(error);
    }
});

//카테고리 수정
adminRouter.patch(
    '/category/:categoryId',
    loginRequired,
    async (req, res, next) => {
        try {
            const user = await userService.getUser(req.currentUserId);

            //현재 로그인 아이디의 role을 가져와 admin인지 판단후 아닐 경우 바로 리턴
            if (!user) {
                throw new Error('없는 회원입니다.');
            }
            if (user.role !== 'admin') {
                console.log(
                    '서비스 사용 요청이 있습니다. 하지만, admin이 아닙니다.'
                );
                res.status(403).json({
                    result: 'forbidden-approach',
                    reason: '관리자만 사용할 수 있는 서비스입니다.',
                });

                return;
            }

            const { categoryId } = req.params;
            const { name, gender, recommendAge } = req.body;
            const existCategoryId = await categoryService.getCategoryId({
                name,
                gender,
                recommendAge,
            });
            if (existCategoryId) {
                res.status(403).json({
                    result: 'forbidden-approach',
                    reason: `${name}, ${gender}, ${recommendAge} 에 해당 하는 카테고리가 있습니다. categoryId : ${existCategoryId} 입니다.`,
                });
                return;
            }

            const products = await productService.getCategoryProducts(
                categoryId
            );
            if (products.length > 0) {
                res.status(403).json({
                    result: 'forbidden-approach',
                    reason: '카테고리에 속한 상품을 비우고 수정해주세요.',
                });
                return;
            }

            const UpdatedCategoryInfo = {
                ...(name && { name }),
                ...(gender && { gender }),
                ...(recommendAge && { recommendAge }),
            };

            const UpdatedCategory = await categoryService.setCategory(
                categoryId,
                UpdatedCategoryInfo
            );

            res.status(200).json(UpdatedCategory);
        } catch (error) {
            next(error);
        }
    }
);

//카테고리 삭제
adminRouter.delete(
    '/category/:categoryId',
    loginRequired,
    async (req, res, next) => {
        try {
            const user = await userService.getUser(req.currentUserId);

            //현재 로그인 아이디의 role을 가져와 admin인지 판단후 아닐 경우 바로 리턴
            if (!user) {
                throw new Error('없는 회원입니다.');
            }
            if (user.role !== 'admin') {
                console.log(
                    '서비스 사용 요청이 있습니다. 하지만, admin이 아닙니다.'
                );
                res.status(403).json({
                    result: 'forbidden-approach',
                    reason: '관리자만 사용할 수 있는 서비스입니다.',
                });

                return;
            }

            const { categoryId } = req.params;
            const products = await productService.getCategoryProducts(
                categoryId
            );
            if (products.length > 0) {
                res.status(403).json({
                    result: 'forbidden-approach',
                    reason: '카테고리에 속한 상품을 비우고 삭제해주세요.',
                });
                return;
            }
            const deletedCategory = await categoryService.deleteCategory(
                categoryId
            );
            res.status(200).json(deletedCategory);
        } catch (error) {
            next(error);
        }
    }
);

// ***********
// PRODUCT API
//전체 상품 목록을 가져옴
adminRouter.get('/product', loginRequired, async (req, res, next) => {
    try {
        const user = await userService.getUser(req.currentUserId);

        //현재 로그인 아이디의 role을 가져와 admin인지 판단후 아닐 경우 바로 리턴
        if (!user) {
            throw new Error('없는 회원입니다.');
        }
        if (user.role !== 'admin') {
            console.log(
                '서비스 사용 요청이 있습니다. 하지만, admin이 아닙니다.'
            );
            res.status(403).json({
                result: 'forbidden-approach',
                reason: '관리자만 사용할 수 있는 서비스입니다.',
            });

            return;
        }
        const products = await productService.getProducts();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});

//선택한 상품의 상세 정보를 가져옴
adminRouter.get(
    '/product/:productId',
    loginRequired,
    async (req, res, next) => {
        try {
            const user = await userService.getUser(req.currentUserId);

            //현재 로그인 아이디의 role을 가져와 admin인지 판단후 아닐 경우 바로 리턴
            if (!user) {
                throw new Error('없는 회원입니다.');
            }
            if (user.role !== 'admin') {
                console.log(
                    '서비스 사용 요청이 있습니다. 하지만, admin이 아닙니다.'
                );
                res.status(403).json({
                    result: 'forbidden-approach',
                    reason: '관리자만 사용할 수 있는 서비스입니다.',
                });

                return;
            }
            const { productId } = req.params;
            const product = await productService.getProduct(productId);
            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }
);

//상품 생성
adminRouter.post(
    '/product/create',
    loginRequired,
    upload.single('src'),
    async (req, res, next) => {
        try {
            const user = await userService.getUser(req.currentUserId);

            //현재 로그인 아이디의 role을 가져와 admin인지 판단후 아닐 경우 바로 리턴
            if (!user) {
                throw new Error('없는 회원입니다.');
            }
            if (user.role !== 'admin') {
                console.log(
                    '서비스 사용 요청이 있습니다. 하지만, admin이 아닙니다.'
                );
                res.status(403).json({
                    result: 'forbidden-approach',
                    reason: '관리자만 사용할 수 있는 서비스입니다.',
                });

                return;
            }

            const {
                name,
                price,
                description,
                madeBy,
                inventory,
                category,
                gender,
                recommendAge,
            } = req.body;

            const categoryId = await categoryService.getCategoryId({
                name: category,
                gender,
                recommendAge,
            });
            if (!categoryId) {
                console.log(
                    '해당하는 카테고리가 없습니다. 카테고리를 먼저 생성해주세요'
                );
                res.status(403).json({
                    result: 'forbidden-approach',
                    reason: '해당하는 카테고리가 없습니다. 카테고리를 먼저 생성해주세요',
                });
                return;
            }

            const src = req.file.location;
            const newProduct = await productService.addProduct({
                categoryId,
                name,
                price,
                description,
                madeBy,
                inventory,
                src,
            });
            res.status(201).json(newProduct);
        } catch (error) {
            next(error);
        }
    }
);

//상품 수정
adminRouter.patch(
    '/product/:productId',
    loginRequired,
    upload.single('src'),
    async (req, res, next) => {
        try {
            const user = await userService.getUser(req.currentUserId);
            //현재 로그인 아이디의 role을 가져와 admin인지 판단후 아닐 경우 바로 리턴
            if (!user) {
                throw new Error('없는 회원입니다.');
            }
            if (user.role !== 'admin') {
                console.log(
                    '서비스 사용 요청이 있습니다. 하지만, admin이 아닙니다.'
                );
                res.status(403).json({
                    result: 'forbidden-approach',
                    reason: '관리자만 사용할 수 있는 서비스입니다.',
                });

                return;
            }

            const { productId } = req.params;

            let {
                name,
                price,
                description,
                madeBy,
                inventory,
                sellCount,
                category,
                gender,
                recommendAge,
            } = req.body;

            const categoryId = await categoryService.getCategoryId({
                name: category,
                gender,
                recommendAge,
            });

            if (!categoryId) {
                console.log(
                    '해당하는 카테고리가 없습니다. 카테고리를 먼저 생성해주세요'
                );
                res.status(403).json({
                    result: 'forbidden-approach',
                    reason: '해당하는 카테고리가 없습니다. 카테고리를 먼저 생성해주세요',
                });
                return;
            }

            let src = '';
            if (req.file) {
                src = req.file.location;
            }
            const updatedProductInfo = {
                ...(categoryId && { categoryId }),
                ...(name && { name }),
                ...(price && { price }),
                ...(description && { description }),
                ...(madeBy && { madeBy }),
                ...(inventory && { inventory }),
                ...(sellCount && { sellCount }),
                ...(src && { src }),
            };

            const updatedProduct = await productService.setProduct(
                productId,
                updatedProductInfo
            );

            res.status(200).json(updatedProduct);
        } catch (error) {
            next(error);
        }
    }
);

//상품 삭제
adminRouter.delete(
    '/product/:productId',
    loginRequired,
    async (req, res, next) => {
        try {
            const user = await userService.getUser(req.currentUserId);
            //현재 로그인 아이디의 role을 가져와 admin인지 판단후 아닐 경우 바로 리턴
            if (!user) {
                throw new Error('없는 회원입니다.');
            }
            if (user.role !== 'admin') {
                console.log(
                    '서비스 사용 요청이 있습니다. 하지만, admin이 아닙니다.'
                );
                res.status(403).json({
                    result: 'forbidden-approach',
                    reason: '관리자만 사용할 수 있는 서비스입니다.',
                });

                return;
            }

            const { productId } = req.params;

            const deletedProduct = await productService.deleteProduct(
                productId
            );

            res.status(200).json(deletedProduct);
        } catch (error) {
            next(error);
        }
    }
);

// ***********
// ORDER API
// 관리자가 주문 내역 전부 확인하는 api (아래는 /orderlist 이지만, 실제로는 /order/orderlist로 요청해야 함.)
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
adminRouter.get('/orderlist', loginRequired, async function (req, res, next) {
    try {
        //loginRequired에서 로그인한 회원의 정보 가져오기
        const user = await userService.getUser(req.currentUserId);

        if (!user) {
            throw new Error('없는 사용자입니다.');
        }

        //관리자가 아닐 경우 접근할 수 없도록 return
        if (user.role !== 'admin') {
            console.log(
                '서비스 사용 요청이 있습니다. 하지만, admin이 아닙니다.'
            );
            res.status(403).json({
                result: 'forbidden-approach',
                reason: '관리자만 사용할 수 있는 서비스입니다.',
            });

            return;
        }

        // 주문 목록 전부 반환
        const orders = await orderService.getOrders();

        //주묵 목록(배열)을 JSON 형태로 프론트에 보냄
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
});

export { adminRouter };
