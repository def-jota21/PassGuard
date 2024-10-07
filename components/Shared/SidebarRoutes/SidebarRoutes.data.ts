import { CreditCard,Earth,  LayoutList,  Settings, Star, UserPen } from "lucide-react";


export const dataSidebarRoutes = [
    {
        title: 'Elements',
        icon: LayoutList,
        children: [ 
            {
                item: 'Favourites',
                icon: Star,
                href: '/favourites',
            },
            {
                item: 'Logins',
                icon: Earth,
                href: '/logins-elements',
            },
            {
                item: 'Credit Card',
                icon: CreditCard,
                href: '/credit-card',
            },
        ]
    },
];

export const dataSidebarConfiguration = [
    {
        title: 'Configuration',
        icon: Settings,
        children: [ 
            {
                item: 'Profile',
                icon: UserPen,
                href: '/profile',
                premium: false,
            },
            
        ]
    },

];
   