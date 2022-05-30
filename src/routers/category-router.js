import { Router } from 'express';
import { categoryService } from '../services';

const categoryRouter = Router();

categoryRouter.get('/', (req, res) => {
    res.send('category test');
});

//카테고리 이름 리스트 가져옴 : bracelet, necklace, earring, ring, watch
categoryRouter.get('/getName', async (req, res, next) => {
    try {
        const categoryName = await categoryService.getName();
        res.status(200).json(categoryName);
    } catch (error) {
        next(error);
    }
});

//카테고리 성별 리스트 가져옴 : woman, man
categoryRouter.get('/getGender', async (req, res, next) => {
    try {
        const categoryGender = await categoryService.getGender();
        res.status(200).json(categoryGender);
    } catch (error) {
        next(error);
    }
});

//카테고리 추천 나이 리스트 가져옴 : 10, 20, 30
categoryRouter.get('/getRecommendAge', async (req, res, next) => {
    try {
        const categoryRecommendAge = await categoryService.getRecommendAge();
        res.status(200).json(categoryRecommendAge);
    } catch (error) {
        next(error);
    }
});

//각 파라미터에 맞는 카테고리 아이디를 가져옴
categoryRouter.get('/:name/:gender/:recommendAge', async (req, res, next) => {
    try {
        const { name, gender, recommendAge } = req.params;
        const categoryId = await categoryService.getCategoryId({
            name,
            gender,
            recommendAge,
        });
        res.status(200).json(categoryId);
    } catch (error) {
        next(error);
    }
});

export { categoryRouter };
