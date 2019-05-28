
export const loadPostsAction = async (dispatch) => {
    const res = await getPosts()
    dispatch({
        type: 'LOAD_POSTS',
        payload: [1,2,3,4,5,6]
    })
}