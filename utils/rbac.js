export const permissions = [
    {
        role: "client",
        actions: [
            "get_profile",
            "update_profile",
            "get_product_by_id",
            "get_products"
        ]
    },
    
    {
        role: "vendor",
        actions: [
            "get_profile",
            "update_profile",
            "add_product",
            "update_product",
            "get_product_by_id",
            "get_products",
            "delete_product"
        ]
    }
]