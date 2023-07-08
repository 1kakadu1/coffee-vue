import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/page/Home.vue";
import AboutPage from "@/page/About.vue";
import SingleProduct from "@/page/SingleProduct.vue"
import { VueElement } from "vue";

export enum RouterPath {
  home = "/",
  about = "/about",
  blog = '/blog',
  contact = '/contact',
  products_single = '/products/:slug'
}

const routes = [
  {
    path: RouterPath.home,
    name: "Home",
    component: HomePage,
    meta: {
      title: 'Home'
    }
  },
  {
    path: RouterPath.about,
    name: "About",
    component: AboutPage,
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
];



export const routerMenu: { label: string, href: RouterPath, icon?: VueElement, }[] = [
  { label: 'Главная', href: RouterPath.home },
  { label: 'Блог', href: RouterPath.blog },
  { label: 'О нас', href: RouterPath.about },
];

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