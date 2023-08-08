const postsData = [
    {
        id: '1',
        title: 'First Post',
        content: 'This is the content of the first post.',
        author: {},
        createdAt: '2023-08-01T12:00:00Z',
    },
    {
        id: '2',
        title: 'Second Post',
        content: 'This is the content of the second post.',
        author: '2',
        createdAt: '2023-08-02T09:30:00Z',
    },
];
const usersData = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        posts: [postsData[0]],
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        posts: [postsData[1]],
    },
];
const resolvers = {
    Query: {
        post: (_, { id }) => {
            return postsData.find((post) => post.id === id);
        },
        user: (_, { id }) => {
            return usersData.find((user) => user.id === id);
        },
    },
    User: {
        posts: (user) => {
            return postsData.filter((post) => post.author === user.id);
        },
    },
};
export {};