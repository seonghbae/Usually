import * as Api from '/api.js';
import { addCommas } from '../useful-functions.js';

const userCount = document.getElementById('admin-page-total-user');
const orderCount = document.getElementById('admin-page-total-order');
const totalIncome = document.getElementById('admin-page-total-income');

// async function adminMainContentRender() {
//     try {
//         const totalOrder = await Api.get('');
//     } catch (err) {
//         console.error(err.stack);
//     }
// }

// adminMainContentRender();
