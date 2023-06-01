import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import { authGuard } from "../utils/AuthGuard";
export function Router() {
    const routes = [
        {
            path: '/',
            component: () => import('../layouts/Mainlayout.vue'),
            name: "MainLayout",
            children: [
                {
                    path: '/',
                    component: Home,
                    name: "Home",
                    children: [
                        {
                            path: '/create',
                            component: () => import('../pages/Create.vue'),
                            name: "Create",
                        }
                    ]
                },
                {
                    path: '/about',
                    name: 'About',
                    component: () => import('../pages/About.vue'),
                    meta: {
                        navigational: true
                    },
                    props: true
                },
                {
                    path: '/profile',
                    name: 'Profile',
                    component: () => import('../pages/Profile.vue'),
                    props: true,
                    beforeEnter: authGuard,
                    children: [
                        {
                            path: 'collection',
                            name: 'Collection',
                            component: () => import('../pages/Collection.vue'),
                            props: true,
                            meta: {
                                navigational: true
                            },
                            children: [
                                {
                                    path: 'media/:type',
                                    name: 'Media',
                                    component: () => import('../pages/Media.vue')
                                }
                            ]
                        },
                        {
                            path: 'details',
                            name: 'Details',
                            component: () => import('../pages/UserDetails.vue'),
                            props: true
                        }
                    ]
                },
                {
                    path: '/upload',
                    name: 'Upload',
                    component: () => import('../pages/UploadFile.vue'),
                    props: true
                },
                {
                    path: '/access_token=:url',
                    component: () => import('../pages/Verification.vue'),
                },
                {
                    props: (route) => ({ myUrl: route.params.myUrl }),
                    path: '/error=:myUrl',
                    component: () => import('../pages/Error.vue'),
                },
                {
                    path: '/:catchAll(.*)*',
                    component: () => import('../pages/ErrorNotFound.vue'),
                }
            ],
        },
        {
            path: '/verification',
            name: 'Verification',
            component: () => import('../pages/Verification.vue'),
            props: true
        },
        {
            path: '/search',
            name: 'Search',
            component: () => import('../pages/SERP.vue'),
            children: [
                {
                    path: '/:type',
                    name: 'SERPView',
                    component: () => import('../pages/SERPView.vue'),
                    props: true
                },
            ],
        },
        {
            path: '/reset/:param',
            name: 'Reset',
            component: () => import('../pages/Reset.vue'),
            props: true
        },
        {
            path: '/signin',
            name: 'SignIn',
            component: import('../pages/SignIn.vue'),
            props: (route) => ({ myUrl: route.query.myUrl }),
            meta: {
                noHeader: true
            }
        },
        {
            path: '/signup',
            name: 'SignUp',
            component: () => import('../pages/SignUp.vue'),
            props: (route) => ({ myUrl: route.query.myUrl }),
            meta: {
                noHeader: true
            }
        }
    ];
    const Router = createRouter({
        scrollBehavior: () => ({ left: 0, top: 0 }),
        routes,
        history: createWebHistory()
    });
    return Router;
}
