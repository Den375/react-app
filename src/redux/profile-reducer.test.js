import profileReducer, {addPostActionCreator, deletePost, setStatus, setUserProfile} from "./profile-reducer";

let state = {
    posts: [
        {id: 1, message: 'Изучаю React, и это мой первый пост', likesCount: 12},
        {id: 2, message: 'Я уже неплохо шарю', likesCount: 11},
        {id: 3, message: 'Чтобы написать актуальненькое', likesCount: 14},
    ],
    profile: null,
    status: null
};

it('add post, length of posts should be incremented', () => {
    // test data
    const action = addPostActionCreator('Hello')

    const newState = profileReducer(state, action)
    // expectation
    expect(newState.posts.length).toBe(4);
});

it('add post, message of new post should be correct', () => {
    // test data
    const action = addPostActionCreator('Hello')

    const newState = profileReducer(state, action)
    // expectation
    expect(newState.posts[3].message).toBe('Hello');
});

it('delete post, length of posts should be decremented', () => {
    // test data
    const action = deletePost(1)

    const newState = profileReducer(state, action)
    // expectation
    expect(newState.posts.length).toBe(2);
});

it('delete post, after deleting length of posts should`t be changed if id is incorrect', () => {
    // test data
    const action = deletePost(7213)

    const newState = profileReducer(state, action)
    // expectation
    expect(newState.posts.length).toBe(3);
});

it('profile changed', () => {
    // test data
    const action = setUserProfile({user: 'denis'})

    const newState = profileReducer(state, action)

    expect(newState.profile.user).toBe('denis')
});

it('status changed', () => {
    // test data
    const action = setStatus('i`m best of the best')

    const newState = profileReducer(state, action)

    // expectation
    expect(newState.status).toBe('i`m best of the best');

});