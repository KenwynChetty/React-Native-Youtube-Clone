import React,{useState} from 'react'
import { View, Text, TextInput, Pressable } from 'react-native'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import styles from '../VideoComments/styles'
import VideoComment from '../VideoComment'
import { Feather } from '@expo/vector-icons'
import {Auth} from 'aws-amplify'
import { DataStore } from '@aws-amplify/datastore'
import { Comment, User } from '../../src/models'

interface videoCommentProps{
    comments: Comment[],
    videoID: string,
} 

const VideoComments = ({comments, videoID}: videoCommentProps) => {
    const [newComment, setNewComment] = useState("");

    const sendComment = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      const userSub = userInfo.attributes.sub;
  
      const user = (await DataStore.query(User)).find(u => u.sub === userSub);
  
      if (!user) {
        console.error("User not found");
        return;
      }
  
      await DataStore.save(
        new Comment({
          comment: newComment,
          likes: 0,
          dislikes: 0,
          replies: 0,
          videoID,
          userID: user.id,
        })
      );
      setNewComment("");
    };
    return (
        <View style={styles.videoCommentsBg}>
            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center',backgroundColor:'#1f1f1f', borderBottomWidth:0.2, borderBottomColor:'grey'}}>
            <TextInput placeholder="Post A New Comment" value={newComment} onChangeText={setNewComment} placeholderTextColor="grey" style={styles.commentInput}/>
            <Pressable onPress={sendComment} style={{marginLeft:10, marginRight:10, }}>
                <Feather name="send" size={24} color="grey" />
            </Pressable>
            </View>
            <BottomSheetFlatList 
            data={comments}
            renderItem={({item}) => <VideoComment comment={item} />}
            />
        </View>
    )
}
 
export default VideoComments
