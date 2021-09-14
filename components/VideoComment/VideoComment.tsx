import React, {useState, useEffect} from 'react'
import { View, Text, Image } from 'react-native'
import styles from '../VideoComment/styles'
import { Comment, User } from '../../src/models';
import {DataStore} from "@aws-amplify/datastore"

interface VideoCommentProps{
    comment: Comment;
}

const VideoComment = ({comment}: VideoCommentProps) => {
    const [user, setUser] = useState<User | undefined>(undefined);

    useEffect(() => {
      DataStore.query(User, comment.userID as string).then(setUser);
    });
    return (
    <View style={{borderBottomColor:'grey', borderBottomWidth:0.3, marginTop:10,}}> 
        <View style={styles.comment}>
            <Image style={styles.commentAvatar} source={{uri: user?.image}}/>
            <Text style={{fontSize:10, color:"white", flex:1,marginHorizontal:10,}}>{comment.comment}</Text>
        </View>
    </View>
    )
}

export default VideoComment
