import { Router } from 'express';
import { loginRequired } from '../middlewares';
import { reviewService, userService, orderService } from '../services';

const reviewRouter = Router();

//상품의 리뷰 목록 조회
reviewRouter.get('/:productId', loginRequired, async (req, res, next) => {
    try {
        const { productId } = req.params;

        const page = Number(req.query.page || 1);
        const perPage = Number(req.query.perPage || 10);
        const query = {};

        const [total, reviews] = await reviewService.getPaginatedReviews({
            query,
            page,
            perPage,
            productId,
        });

        const totalPage = Math.ceil(total / perPage);

        res.status(200).json({
            reviews,
            page,
            perPage,
            totalPage,
            path: req.baseUrl,
        });
    } catch (error) {
        next(error);
    }
});

//리뷰 상세 정보 조회
reviewRouter.get(
    '/:productId/:reviewId',
    loginRequired,
    async (req, res, next) => {
        try {
            const { productId, reviewId } = req.params;

            const review = await reviewService.getReview(reviewId);

            res.status(200).json(review);
        } catch (error) {
            next(error);
        }
    }
);

//리뷰 생성
reviewRouter.post('/', loginRequired, async (req, res, next) => {
    try {
        const { title, content, productId } = req.body;

        let author = req.body.author;

        //loginRequired에서 로그인한 회원의 정보 가져오기
        const user = await userService.getUser(req.currentUserId);
        //회원 여부 확인
        if (!user) {
            res.status(403).json({
                result: 'forbidden-approach',
                reason: `없는 사용자입니다.`,
            });
            return;
        }
        author = user._id;
        let allowedToCreateReview = false;
        const orders = await orderService.getOrdersByUser(user.shortId);

        orders.forEach((order) => {
            //주문마다 확인
            order.orderedProducts.forEach((product) => {
                //동시에 주문한 상품마다 확인
                if (productId === product.productId.productId) {
                    //현재 상품과 같으면 리뷰 등록 가능
                    allowedToCreateReview = true;
                    return;
                }
            });
        });
        //현재 상품이 주문한 상품 목록에 없으면 리뷰 등록 불가능 오류 처리
        if (!allowedToCreateReview) {
            res.status(403).json({
                result: 'forbidden-approach',
                reason: `상품을 구매한 사람만 리뷰를 남길 수 있습니다.`,
            });
            return;
        }
        const newReview = await reviewService.createReview({
            title,
            content,
            productId,
            author,
        });
        res.status(200).json(newReview);
    } catch (error) {
        next(error);
    }
});

//리뷰 수정
reviewRouter.patch('/:reviewId', loginRequired, async (req, res, next) => {
    try {
        const { reviewId } = req.params;
        const { title, content, productId } = req.body;

        //loginRequired에서 로그인한 회원의 정보 가져오기
        const user = await userService.getUser(req.currentUserId);
        //회원 여부 확인
        if (!user) {
            res.status(403).json({
                result: 'forbidden-approach',
                reason: `없는 사용자입니다.`,
            });
            return;
        }

        //현재 리뷰의 작성자 확인을 위해 가져오기
        const prevReview = await reviewService.getReview(reviewId);

        //작성자 여부 확인
        if (!prevReview.author._id.equals(user._id)) {
            res.status(403).json({
                result: 'forbidden-approach',
                reason: `작성자가 아닙니다.`,
            });
            return;
        }

        //수정된 리뷰만 가져오기
        const reviewInfo = {
            ...(title && { title }),
            ...(content && { content }),
            ...(productId && { productId }),
        };

        //수정할 리뷰 없으면 오류처리
        if (!prevReview.reviewId) {
            res.status(403).json({
                result: 'forbidden-approach',
                reason: `${prevReview.reviewId}에 해당하는 리뷰가 없습니다.`,
            });
            return;
        }

        const updatedReview = await reviewService.updateReview(
            reviewId,
            reviewInfo
        );
        res.status(200).json(updatedReview);
    } catch (error) {
        next(error);
    }
});

//리뷰 삭제
reviewRouter.delete('/:reviewId', loginRequired, async (req, res, next) => {
    try {
        const { reviewId } = req.params;

        //loginRequired에서 로그인한 회원의 정보 가져오기
        const user = await userService.getUser(req.currentUserId);

        //회원 여부 확인
        if (!user) {
            res.status(403).json({
                result: 'forbidden-approach',
                reason: `없는 사용자입니다.`,
            });
            return;
        }
        //let author = user.shortId;

        //작성자 여부 확인
        const prevReview = await reviewService.getReview(reviewId);

        if (!prevReview.author._id.equals(user._id)) {
            res.status(403).json({
                result: 'forbidden-approach',
                reason: `작성자가 아닙니다.`,
            });
            return;
        }

        //수정할 리뷰 없으면 오류처리
        if (!prevReview.reviewId) {
            res.status(403).json({
                result: 'forbidden-approach',
                reason: `${prevReview.reviewId}에 해당하는 리뷰가 없습니다.`,
            });
            return;
        }

        const deletedReview = await reviewService.deleteReview(reviewId);
        res.status(200).json(deletedReview);
    } catch (error) {
        next(error);
    }
});

export { reviewRouter };
