import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {maxLengthCreator} from "../../../utils/validators/validators";


const MyPosts = React.memo((props) => {

    let postsElements =
        [...props.posts].reverse().map(p => <Post message={p.message} likesCount={p.likesCount}/>);

    let addPost = (values) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddPostFormRedux onSubmit={addPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
})

const maxLength30 = maxLengthCreator(30)

const AddPostForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field name="newPostText" component={Textarea}
                   validate={maxLength30} placeholder='Post Message' type="text" />
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>
}

const AddPostFormRedux = reduxForm({form: 'profileAddNewPostForm'})(AddPostForm)

export default MyPosts;