import { Repository, Recommender, EAuth, Mailer, EmailType } from '@edifiles/services';
import { Action, FormType, NavLink, NavList, PageView, QuestionType, SectionView, ViewSection } from "./src/utils/types";
import { View } from "./src/utils/types";
import { WidgetName, useWidgets } from "./src/utils/useWidgets";
import { gql, useQuery } from '@urql/vue';
import Search from "../ui/src/components/ESearch.vue";
import { menus } from "./src/utils/menus";
import { watch } from 'vue';
import { onMounted } from 'vue';
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

/*const { data, fetching, error } = useQuery({
    query: postQuery,
    variables: { postId: 'your-post-id' },
});*/

const repo = new Repository()
const recom = new Recommender()
const auth = new EAuth()


const search: View = new View({
    id: 'search',
    layout: 'Grid',
    navType: 'top',
    size: 'col-12',
    sections: [{
        content: Search
    }]
})

export const userSignUp =  new QuestionType({
    title: 'Sign Up',
    index: 1,
    content: [{
        question: 'name',
        inputType: 'text',
        answer: '',
        options: [],
        name: '',
        image: ''
    },{
        question: 'email',
        inputType: 'email',
        answer: '',
        options: [],
        name: '',
        image: ''
    },{
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
            ()=> {
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
                })
            }
        ],
        onError: []
    })},
    meta: {
        isNew: false
    }
})

export const userView: View = new View({
    id: 'userView',
    layout: 'Grid',
    navType: 'center',
    size: 'col-12',
    sections: [new FormType('userForm','Submit', [userSignUp])]
})

const signIn: Action = new Action({
    label: 'Sign In',
    event: () => useRouter().push('/signin'),
    onResult: [],
    onError: []
})

export const userViewResolver = () => {
    const mailer = new Mailer()
    const userSignUp = () => {
        userView
    }
}

export const viewResolver = {
    async main() {
        return [
            useWidgets().get('Header'),
            useWidgets().get('Footer'),
            useWidgets().get('Main'),
            useWidgets().get('SidebarLeft'),
            useWidgets().get('SidebarRight')
        ]
    },
    async list(id: string, foreignTable?: {coll: string, key: string, fKey: string}, filters?: {prop: string, operator: any, value: string}[], range?: {lower: number, upper: number}, limit?: number, category?: string) {
        const latest = await recom.getLatest(id, category)
        const popular = await recom.getPopular(id, category)
        //const recommended = await recom.getRecommended(id, id, prepOptions.category)
        return [
            latest,
            popular,
            await repo.readItems(id, foreignTable, filters, range, limit )
        ]
    },
    async single(type: string, id: string, category?: string) {
        return [
            await repo.readItem(type, 'id', id),
            await recom.getRelated(type, id, category)
        ]
    }
}
const home: PageView = new PageView({
    id: 'home',
    layout: 'Grid',
    sections: [Home],
    children: []
})
const tools: PageView = new PageView({
    id: 'tools',
    layout: 'Grid',
    sections: [
        {
          //icon: "schedule",
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
        }],
    children: []
})

const mainLayout: PageView = new PageView({
    id: '',
    layout: 'Grid',
    sections: [
        menus, search
    ],
    children: [
        home, tools
    ]
})
export const GlobalView = {
    mainLayout
}

export const setGlobal = () => {
    Object.keys(GlobalView).forEach((key) => {
        const widgetKey = key as WidgetName;
        useWidgets().get(widgetKey).insert(...GlobalView[widgetKey])
      });
}

export  const view = new PageView({
    id: '',
    layout: 'Grid',
    sections: []
})


export const globalViewResolver = {
    main: async (params: any) => ({
        menus,
    }),
    userView
}

const filters = (...filters: any[]) => {

}

/*const resolver = (type: string) => {
    repo.readItems('',{type, })
    return {
        id: '',
        name: ''
    }
}*/

export const config = {
    template: {
        views: [
        ],
        xlinks: [],
        ylinks: [],
        style: {
            background: {},
            foreground: {},
            visuals: {}, //buttons, headers etc
            cards: {}
        },
        services: {}
    }
}