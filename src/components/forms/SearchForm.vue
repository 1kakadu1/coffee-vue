<template>
    <Teleport to="body">
        <transition name="search" mode="out-in" appear>
            <div class="search-form-container" v-if="open">
                <div class="container">
                    <form>
                        <div class="search-form__title">По результатам поиса найдено: {{ search_list.length }}</div>
                        <input-base :value="search" @input="onChangeField"
                            :classes="{ root: 'search-form__input-root', input: 'search-form__input' }"
                            placeholder="Введите что хотите найти. Например, 'Раф'"></input-base>
                    </form>
                    <div v-if="search_list.length === 0 && !loading && error === undefined">
                        <div class="search-form-empt">
                            Увы, но такого товара нет.
                        </div>
                        <router-link class="slide-item__link search-form__link" to="/products">Список
                            продуктов</router-link>
                    </div>

                    <div class="search-form-list__error" v-if="!loading && error !== undefined">
                        {{ error }}
                    </div>

                    <div class="search-form-list__loading" v-if="loading">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            style="margin: auto; display: block; shape-rendering: auto;" width="200px" height="200px"
                            viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                            <circle cx="50" cy="50" r="0" fill="none" stroke="#a25f4b" stroke-width="2">
                                <animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1"
                                    keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s"></animate>
                                <animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0"
                                    keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s"></animate>
                            </circle>
                            <circle cx="50" cy="50" r="0" fill="none" stroke="#f9b300" stroke-width="2">
                                <animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1"
                                    keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.5s"></animate>
                                <animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0"
                                    keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.5s"></animate>
                            </circle>
                        </svg>
                    </div>
                    <ul class="search-form-list scroll" v-if="search_list.length > 0 && !loading && error === undefined">
                        <li class="search-form-list__item" v-for="item in search_list" :key="item.id">
                            <router-link :to="'/products/' + item.slug">
                                <div class="row">
                                    <div class="col-4 col-md-2">
                                        <img class="search-form-list__item-preview" :src="item.preview" :alt="item.name">
                                    </div>
                                    <div class="col-8 col-md-10">
                                        <div class="search-form-list__item-name">
                                            {{ item.name }}
                                        </div>
                                        <div class="search-form-list__item-desc">
                                            {{ item.description }}
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>

            </div>
        </transition>

    </Teleport>
</template>
<script setup lang="ts">
import useDebouncedRef from '@/hooks/useDebounce';
import { SearchActions } from '@/store/modules/search/search.model';
import { useSearchStore } from '@/store/store';
import { computed, watch } from 'vue';

const search = useDebouncedRef<string>('', 600);
const store = useSearchStore();
const open = computed(() => store.state.open);
const search_list = computed(() => store.state.list);
const loading = computed(() => store.state.isLoading);
const error = computed(() => store.state.error);

const onChangeField = (e: Event) => {
    search.value = (e.target as HTMLInputElement).value;
}
const onSearch = (value: string) => store.dispatch(SearchActions.fetch, value);

watch(search, (new_search) => {
    if (new_search !== '') {
        onSearch(new_search);
    }
})

</script>
<style lang="scss">
@import "@/styles/vars.scss";

.search-form-container {
    position: fixed;
    top: 78px;
    left: 0;
    width: 100%;
    height: 340px;
    background-color: #fff;
    z-index: 100;
    transform: none;
    overflow: hidden;
}

.search-form {
    &-empt {
        font-weight: 500;
        text-align: center;
        padding-top: 20px;
    }

    &__loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    &__link {
        text-align: center;
    }

    &__title {
        padding-bottom: 12px;
        font-weight: 900;
    }

    &__input {
        width: 100%;
        border-width: 2px;
    }

    &__input-root {
        width: 100%;
    }

    &-list {
        overflow-y: auto;
        overflow-x: hidden;
        height: 236px;

        &__item {
            display: flex;
            padding-bottom: 10px;
            height: 128px;

            & .row {
                align-items: center;
                display: flex;
            }

            &-name {
                font-size: 16px;
                font-weight: 500;
                padding-bottom: 12px;
                color: $black;
            }

            &-preview {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
            }

            &-desc {
                font-size: 14px;
                font-weight: 400;
                color: $black;
            }
        }
    }
}

.search-enter-active,
.search-leave-active {
    transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.search-enter-from,
.search-leave-to {
    opacity: 0;
    transform: scale(0.3) translateY(-50%);
}
</style>