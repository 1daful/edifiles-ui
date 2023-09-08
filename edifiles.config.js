import { Repository, Recommender, EAuth, Mailer } from '@edifiles/services';
import { Action, FormType, NavList, PageView, QuestionType } from "./src/utils/types";
import { View } from "./src/utils/types";
import { useWidgets } from "./src/utils/useWidgets";
import Search from "../ui/src/components/ESearch.vue";
import { menus } from "./src/utils/menus";
import Home from "./src/pages/Home.vue";
import { useRouter } from 'vue-router';
const postQuery = `
  query GetPost($postId: ID!) {
    post(id: $postId) {
      id
      title
      content
      author
      createdAt
    }
  }`;
const repo = new Repository();
const recom = new Recommender();
const auth = new EAuth();
const search = new View({
    id: 'search',
    layout: 'Grid',
    navType: 'top',
    size: 'col-4',
    sections: [{
            content: Search
        }]
});
export const userSignUp = new QuestionType({
    title: 'Sign Up',
    index: 1,
    content: [{
            question: 'name',
            inputType: 'text',
            answer: '',
            options: [],
            name: '',
            image: ''
        }, {
            question: 'email',
            inputType: 'email',
            answer: '',
            options: [],
            name: '',
            image: ''
        }, {
            question: 'password',
            inputType: 'password',
            answer: '',
            options: [],
            name: '',
            image: ''
        }],
    actions: {
        submit: new Action({
            label: 'Sign Up',
            event: auth.signUp,
            onResult: [
                () => {
                    new Mailer().sendEmail({
                        name: 'Welcome New User',
                        subject: '',
                        text: '',
                        templateKey: '',
                        html: '',
                        attachments: [],
                        inline_images: [],
                        headers: [],
                        messenger: '',
                        body: ''
                    });
                }
            ],
            onError: []
        })
    },
    meta: {
        isNew: false
    }
});
export const userView = new View({
    id: 'userView',
    layout: 'Grid',
    navType: 'center',
    size: 'col-12',
    sections: [new FormType('userForm', 'Submit', [userSignUp])]
});
const signIn = new Action({
    label: 'Sign In',
    event: () => useRouter().push('/signin'),
    onResult: [],
    onError: []
});
export const userViewResolver = () => {
    const mailer = new Mailer();
    const userSignUp = () => {
        userView;
    };
};
export const viewResolver = {
    async main() {
        return [
            useWidgets().get('Header'),
            useWidgets().get('Footer'),
            useWidgets().get('Main'),
            useWidgets().get('SidebarLeft'),
            useWidgets().get('SidebarRight')
        ];
    },
    async list(id, foreignTable, filters, range, limit, category) {
        const latest = await recom.getLatest(id, category);
        const popular = await recom.getPopular(id, category);
        return [
            latest,
            popular,
            await repo.readItems(id, foreignTable, filters, range, limit)
        ];
    },
    async single(type, id, category) {
        return [
            await repo.readItem(type, 'id', id),
            await recom.getRelated(type, id, category)
        ];
    }
};
const home = new PageView({
    id: 'home',
    layout: 'Grid',
    sections: [Home],
    children: []
});
const m = new NavList({
    id: '',
    content: [
        {
            path: '/signout',
            name: 'Log Out'
        }
    ],
    navType: 'top'
});
const tools = new PageView({
    id: 'tools',
    layout: 'Grid',
    sections: [
        {
            overlay: "../../public/hero_sunset.jpeg",
            noCard: false,
            items: [{
                    content: [{
                            label: "The Black Skirt",
                        }],
                },
                {
                    content: [
                        {
                            label: "This is about man's fallacy and illusion that leads to infactuation.",
                        },
                    ]
                },
                {
                    content: [
                        {
                            label: "27-03-34",
                        },
                        {
                            label: "Wonders Ayanfe",
                        }
                    ]
                }],
            actions: [
                {
                    name: "Create",
                    type: "Create",
                    label: "Create",
                    icon: "whatshot",
                    event: "Create",
                    onResult: [],
                    onError: []
                },
                {
                    name: "Read",
                    type: "Read",
                    label: "Read",
                    icon: "bluetooth",
                    event: "",
                    onResult: [],
                    onError: []
                },
            ],
        }
    ],
    children: []
});
const mainLayout = new PageView({
    id: '',
    layout: 'Grid',
    sections: [
        menus, search, m
    ],
    children: [
        home, tools
    ]
});
export const GlobalView = {
    mainLayout
};
export const setGlobal = () => {
    Object.keys(GlobalView).forEach((key) => {
        const widgetKey = key;
        useWidgets().get(widgetKey).insert(...GlobalView[widgetKey]);
    });
};
export const view = new PageView({
    id: '',
    layout: 'Grid',
    sections: []
});
export const globalViewResolver = {
    main: async (params) => ({
        menus,
    }),
    userView
};
const filters = (...filters) => {
};
export const config = {
    template: {
        views: [],
        xlinks: [],
        ylinks: [],
        style: {
            background: {},
            foreground: {},
            visuals: {},
            cards: {}
        },
        services: {}
    }
};
