import { createWebHistory, createRouter } from "vue-router";
import Home from "@/page/Home.vue";
import OrderPage from "@/page/OrderPage.vue";
import About from "@/page/About.vue";
import SingleProduct from "@/page/SingleProduct.vue"
import Products from "@/page/Products.vue"
import { VueElement } from "vue";
import { RouterPath } from "@/types/models/router.model";

const routes = [
  {
    path: RouterPath.home,
    name: "Home",
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  {
    path: RouterPath.about,
    name: "About",
    component: About,
    meta: {
      title: 'About'
    }
  },
  {
    path: RouterPath.products_single,
    name: "Products single",
    component: SingleProduct,
    meta: {
      title: ''
    }
  },
  {
    path: RouterPath.products,
    name: "Products",
    component: Products,
    meta: {
      title: ''
    }
  },
  {
    path: RouterPath.order,
    name: "Order",
    component: OrderPage,
    meta: {
      title: 'Оформление заказа'
    }
  },
];



// export const routerMenu: { label: string, href: RouterPath, icon?: VueElement, }[] = [
//   { label: 'Главная', href: RouterPath.home },
//   { label: 'Блог', href: RouterPath.blog },
//   { label: 'О нас', href: RouterPath.about },
// ];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.fullPath.includes("/products") && to.params['slug']) {
      return { top: 0, behavior: 'smooth', }
    }
  }
});

router.beforeEach((to, from, next) => {
  const title = to.meta.title
  const titleFromParams = to.params.pageTitle;

  if (title) {
    document.title = (title as string).toString();
  }
  if (titleFromParams) {
    document.title = `${titleFromParams} - ${document.title}`;
  }
  next()
})

export default router;