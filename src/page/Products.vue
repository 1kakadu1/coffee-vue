<script  lang="ts" setup>
import PageLayoutComponent from "@/components/layouts/PageLayout.vue";
import ProductSkeleton from '@/components/cards/CardProductSkeleton.vue';
import CardProduct from '@/components/cards/CardProduct.vue';
import bg from "@/assets/img/products/producs-cofee.png";
import { api } from "@/services/api";
import useSWRV from "swrv/dist/use-swrv";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { RouterPath } from "@/types";
const { query } = useRoute()
const router = useRouter();
const activeCategory = ref(query['category'] ? query['category'] : 'id-all');
const { data: categotyList, error: errorCategortList } = useSWRV("category/list", api.getCategoryList);
const { data, error } = useSWRV(()=>{return activeCategory.value }, api.getProductsByCategoryID);
const isLoadingProduct = computed(() => {
    return data.value === undefined
})
const isLoadingCategory = computed(() => {
    return categotyList.value === undefined
})

const setCategory = (id: string)=>{
    console.log(id,activeCategory.value)
    activeCategory.value = id;
    router.push({ path: RouterPath.products, query: { category: id } })
}

</script>
<template>
    <PageLayoutComponent>
        <div class="products__header">
            <div class="products__bg">
                <div class="container">
                    <div class="row">
                        <div class="col-left">
                            <h1 class="products__title">Свежеобжаренный кофе</h1>
                        </div>
                        <div class="col-right">
                            <img :src="bg" class="products__img" loading="lazy" decoding="async" alt="">
                        </div>
                    </div>
                    
                    
                </div>
            </div>
            <svg viewBox="0 0 2177 288" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <path  d="M0 180L90.7083 150C181.417 120 362.833 60 544.25 36C725.667 12 907.083 24 1088.5 54C1269.92 84 1451.33 132 1632.75 174C1814.17 216 1995.58 252 2086.29 270L2177 288L2177 0L2086.29 0C1995.58 0 1814.17 0 1632.75 0C1451.33 0 1269.92 0 1088.5 0C907.083 0 725.667 0 544.25 0C362.833 0 181.417 0 90.7083 0L0 0L0 180Z" fill="#F9B300" fill-opacity="1.000000" fill-rule="evenodd"/>
            </svg>
        </div>
        <div class="negative__margin">
            <div class="container">
                <ul class="category">
                    <li class="category__item" :class="{active: activeCategory === item.id}" v-if="!isLoadingCategory" v-for="item in categotyList" :key="item.id" @click="()=> setCategory(item.id)">
                        <h4 class="category__name">
                            {{ item.name }}
                        </h4>
                        <img src="" alt="" class="category__preview" loading="lazy" decoding="async">
                    </li>
                    <li class="category__item-loading" v-else v-for="item in [1,2,3]" :key="item">
                        LOading
                    </li>
                </ul>
                <ul class="products__list" >
                    <li v-for="item in [1,2,3,4,5,6]" :key="item" v-if="isLoadingProduct">
                        <ProductSkeleton size="full" />
                    </li>
                    <li v-for="item in data || []" :key="item.id" v-else >
                        <card-product :product="item" size="full"></card-product>
                    </li>
                </ul>
            </div>
        </div>


    </PageLayoutComponent>
</template>


<style lang="scss" scoped>
    .products__header{
        overflow: hidden;
    }
    .products__bg{
        background-color: rgb(249, 179, 0);
        padding: 0px 40px;
        min-height: 468px;
        
    }
    .products__title{
        color: #fff;
        font-size: 60px;
        font-weight: 900;
    }
    .products__img{
        max-width: 682px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        width: 100%;
        object-fit: contain;
        object-position: center;
    }
    .row{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .col-left{
        width: 70%;
    }
    .col-right{
        position: relative;
        width: 30%;
        height: 455px;
    }

    .products__decor{
        width: 100%;
        margin-left: -10px;
        margin-right: -10px;
    }

    .products__list{
        margin-bottom: 100px;
        display: flex;
        flex-wrap: wrap;
        margin-left: -20px;
        margin-right: -20px;
        li{
            width: 33.333%;
            padding: 10px;
        }
    }

.category{
    display: flex;
    align-items: center;
    gap: 20px;
    &__item{
        width: 190px;
        height: 190px;
        padding: 10px;
        border-radius: 20px;
        background-color: #fff;
        box-shadow: 0 0 30px 0 rgba(149, 149, 149, 0.25);
        display: flex;
        justify-content: center;
        align-items: center;
        &.active{
            background-color: red;
        }
    }
    &__name{
        font-weight: 500;
        font-size: 20px;
        color: #000;
        padding-bottom: 18px;
    }
    &__preview{

    }
}

.negative__margin{
    margin-top: -300px;
}
</style>
  
  