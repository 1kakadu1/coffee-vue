import { CartMutation } from "@/store/modules/cart/cart.model";
import { useCartStore } from "@/store/store";
import { type ICartModel } from "@/types";
import { countCart, totalPrice as getPrice } from "@/utils/cart.utils";
import { computed, reactive } from "vue";

export default function useCart(args?: { currentItemId?: string, currentItemSize?: string }, debug?: { name?: string }) {
    const storeCart = useCartStore();

    const state_args: { currentItemId?: string, currentItemSize?: string } = reactive(args || {})
    const onCartAdd = (value: ICartModel) => {
        storeCart.commit(CartMutation.add, { product: value.product, size: value.size });
    }
    const onCartSub = (value: ICartModel) => {
        storeCart.commit(CartMutation.sub, { product: value.product, size: value.size });
    }
    const onCartItemRemove = (id: string, size: string) => storeCart.commit(CartMutation.remove_item, { id, size });
    const onCartClear = () => storeCart.commit(CartMutation.clear);
    const currentCount = (id: string, size: string) => {
        return storeCart.state.products.find(item => item.id === id && item.size === size)?.count || 0
    };

    const cartList = computed(() => storeCart.state.products);
    const count = computed(() => countCart(storeCart.state.products));
    const openCart = computed(() => storeCart.state.open);
    const totalPrice = computed(() => getPrice(storeCart.state.products));
    const onToggleCart = () => {
        storeCart.commit(CartMutation.toggle, !storeCart.state.open);
    }
    const currentProductsID = computed(() => {
        const values: ICartModel[] = [];
        if (args?.currentItemId) {
            storeCart.state.products.forEach(item => {
                if (args?.currentItemId === item.id) {
                    values.push(item);
                }
            });
        }

        return values
    })

    const recalculate = (args: { currentItemId?: string, currentItemSize?: string }) => {
        state_args.currentItemId = args.currentItemId;
        state_args.currentItemSize = args.currentItemSize;
    }

    return {
        currentCount,
        onCartAdd,
        onCartSub,
        onCartClear,
        onCartItemRemove,
        cartList,
        count,
        totalPrice,
        storeCart,
        openCart,
        onToggleCart,
        currentProductsID,
        recalculate
    }
}