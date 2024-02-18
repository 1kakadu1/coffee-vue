import { useCartStore } from "@/store";
import { type ICartModel } from "@/types";
import { countCart, totalPrice as getPrice } from "@/utils/cart.utils";
import { computed, reactive } from "vue";

export default function useCart(args?: { currentItemId?: string, currentItemSize?: string }, debug?: { name?: string }) {
    const storeCart = useCartStore();

    const state_args: { currentItemId?: string, currentItemSize?: string } = reactive(args || {})
    const onCartAdd = (value: ICartModel) => {
        storeCart.addCart({ product: value.product, size: value.size });
    }
    const onCartSub = (value: ICartModel) => {
        storeCart.subCart({ product: value.product, size: value.size })
    }
    const onCartItemRemove = (id: string, size: string) => storeCart.removeItemCart({ id, size });
    const onCartClear = () => storeCart.clearCart();
    const currentCount = (id: string, size: string) => {
        return storeCart.products.find(item => item.id === id && item.size === size)?.count || 0
    };

    const cartList = computed(() => storeCart.products);
    const count = computed(() => countCart(storeCart.products));
    const openCart = computed(() => storeCart.open);
    const totalPrice = computed(() => getPrice(storeCart.products));
    const onToggleCart = () => {
        console.log(storeCart.open)
        storeCart.toggleCart(!storeCart.open);
    }
    const currentProductsID = computed(() => {
        const values: ICartModel[] = [];
        if (args?.currentItemId) {
            storeCart.products.forEach(item => {
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