<script  lang="ts" setup>
import PageLayoutComponent from "@/components/layouts/PageLayout.vue";
import bg from "@/assets/img/products/producs-cofee.png";
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
</style>
  
  