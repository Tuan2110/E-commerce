export const color = [
    "white",
    "black",
    "brown",
    "gray",
    "red",
    "blue",
    "green",
    "pink"
];
export const filters = [
    {
        id:"color",
        name:"Color",
        options: [
            {value:"white", label:"White"},
            {value:"black", label:"Black"},
            {value:"brown", label:"Brown"},
            {value:"gray", label:"Gray"},
            {value:"red", label:"Red"},
            {value:"blue", label:"Blue"},
            {value:"green", label:"Green"},
            {value:"pink", label:"Pink"},
        ],
    },
    // {
    //     id:"size",
    //     name:"Size",
    //     options: [
    //         {value:"S", label:"S"},
    //         {value:"M", label:"M"},
    //         {value:"L", label:"L"},
    //     ]
    // }
]

export const singleFilter = [
    {
        id:"price",
        name:"Price",
        options: [
            {value:"0-99", label:"$0 - $99"},
            {value:"100-199", label:"$100 - $199"},
            {value:"200-999", label:"$200 - $999"},
            {value:"1000-9999", label:"$1000 - $9999"}
        ]
    },
    // {
    //     id:"discount",
    //     name:"Discount Range",
    //     options: [
    //         {value:"10",label:"10% And Above"},
    //         {value:"20",label:"20% And Above"},
    //         {value:"30",label:"30% And Above"},
    //         {value:"40",label:"40% And Above"},
    //         {value:"50",label:"50% And Above"},
    //         {value:"60",label:"60% And Above"},
    //         {value:"70",label:"70% And Above"},
    //         {value:"80",label:"80% And Above"},
    //     ]
    // },
    // {
    //     id:"stock",
    //     name:"Availability",
    //     options: [
    //         {value:"in_stock",label:"In Stock"},
    //         {value:"out_of_stock",label:"Out of Stock"},
    //     ]
    // }
]


export const sortOptions = [
    {name:"Price: Low to High", query: "price_low" , current: false},
    {name:"Price: High to Low", query: "price_high" , current: false},
]