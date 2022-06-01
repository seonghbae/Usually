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

        //console.log(req.currentUserId);
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
        author = user.shortId;
        /*console.log(author);
        const orders = await orderService.getOrdersByUser(author);
        orders.forEach((el) => {
            console.log(el.orderedProducts[0]);
        });
        console.log(orders);*/

        //console.log(author);
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

        //console.log(req.currentUserId);
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
        //console.log(user._id);

        const prevReview = await reviewService.getReview(reviewId);
        //console.log(prevReview.author);

        //작성자 여부 확인
        if (prevReview.author !== user.shortId) {
            res.status(403).json({
                result: 'forbidden-approach',
                reason: `작성자가 아닙니다.`,
            });
            return;
        }

        const reviewInfo = {
            ...(title && { title }),
            ...(content && { content }),
            ...(productId && { productId }),
        };

        //이전 리뷰가 존재하는지 확인
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

        //console.log(req.currentUserId);
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
        //console.log(user);
        //let author = user.shortId;

        //작성자 여부 확인
        const prevReview = await reviewService.getReview(reviewId);
        //console.log(prevReview.author);
        if (prevReview.author !== user.shortId) {
            res.status(403).json({
                result: 'forbidden-approach',
                reason: `작성자가 아닙니다.`,
            });
            return;
        }

        //이전 리뷰가 존재하는지 확인
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
