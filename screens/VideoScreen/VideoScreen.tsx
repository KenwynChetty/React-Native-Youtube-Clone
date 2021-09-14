import React,{ useEffect, useRef, useState } from 'react'
import { Text, View, Image, SafeAreaView,ScrollView,  FlatList, TouchableOpacity, ActivityIndicator  } from 'react-native';
import { AntDesign, MaterialCommunityIcons, FontAwesome5, Feather, MaterialIcons  } from '@expo/vector-icons'; 
import BottomSheet from '@gorhom/bottom-sheet';
import styles from "./styles"
import VideoListItem from '../../components/VideoListItem';
import VideoPlayer from '../../components/VideoPlayer';
import videos from '../../assets/data/videos.json';
import { LogBox } from 'react-native';
import VideoComments from '../../components/VideoComments';
import { useRoute } from '@react-navigation/native';
import { DataStore } from '@aws-amplify/datastore';
import { Video, Comment } from '../../src/models';


const VideoScreen = () => {
     
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])
    const commentsSheetRef = useRef<BottomSheet>(null)

    const openComments = () => {
        commentsSheetRef.current?.expand();
    }
    const [video, setVideo] = useState<Video | undefined>(undefined);
    const route = useRoute();
    const videoId = route.params?.id;
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const fetchComments = async () => {
          if (!video) {
            return;
          }
    
          const videoComments = (await DataStore.query(Comment)).filter(
            (comment) => comment.videoID === video.id
          );
    
          setComments(videoComments);
        };
    
        fetchComments();
      }, [video]);

    useEffect(() =>{
        DataStore.query(Video, videoId).then(setVideo);
    },[videoId])

    if (!video){
        return <ActivityIndicator />;
    }
    let viewsString = video.views.toString()
    if (video.views > 1000000){
        viewsString = (video.views / 1000000).toFixed(1) + 'M'
    } else if (video.views > 1000) {
        viewsString = (video.views / 1000).toFixed(1) + "K"
    }
    let subString = video.User.subscribers.toString()
    if (video.User.subscribers > 1000000){
        subString = (video.User.subscribers / 1000000).toFixed(1) + 'M'
    } else if (video.views > 1000) {
        subString = (video.User.subscribers / 1000).toFixed(1) + "K"
    } 
    return (
        <SafeAreaView style={{backgroundColor:"#1a1a1a", flex:1,}}>
            {/* Video Player*/}
            <VideoPlayer videoURI={video.videoUrl} thumbnailURI={video.thumbnail}/>
            {/* Video Info */}
            
            <View style={styles.videoInfoContainer}>
                <View style={styles.middleInfoContainer} >
                    <Text style={styles.videoInfoTags}>{video.tags}</Text> 
                    <Text style={styles.videoInfoTitle}>{video.title}</Text> 
                    <Text style={styles.videoInfoSubtitle}>{viewsString} Views - {video.createdAt}</Text> 
                </View>
                <View style={styles.videoDropMenu}>
                    <AntDesign name="down" size={12} color="white" />
                </View>
            </View>
            <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                {/* Action List */}
                <View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} nestedScrollEnabled={true} contentContainerStyle={styles.actionListContainer}>
                        <View style={styles.actionListItems}>
                            <AntDesign name="like1" size={20} color="white" />
                            <Text style={styles.actionText}>{video.likes}</Text>
                        </View>
                        <View style={styles.actionListItems}>
                            <AntDesign name="dislike2" size={20} color="white" />
                            <Text style={styles.actionText}>{video.dislikes}</Text>
                        </View>
                        <View style={styles.actionListItems}>
                            <MaterialCommunityIcons name="comment-multiple-outline" size={20} color="white" />
                            <Text style={styles.actionText}>Live chat</Text>
                        </View>
                        <View style={styles.actionListItems}>
                            <FontAwesome5 name="share-square" size={20} color="white" />
                            <Text style={styles.actionText}>Share</Text>
                        </View>
                        <View style={styles.actionListItems}>
                            <Feather name="download" size={20} color="white" />
                            <Text style={styles.actionText}>Download</Text>
                        </View>
                        <View style={styles.actionListItems}>
                            <MaterialIcons name="library-add" size={20} color="white" />
                            <Text style={styles.actionText}>Save</Text>
                        </View>
                    </ScrollView>
                </View> 
                {/* User Info */}
                <View style={styles.videoUserInfo}>
                    <Image style={styles.avatar} source={{uri: video.User?.image}}/>
                    <View style={styles.userInfo}>
                        <Text style={styles.username}>{video.User?.name}</Text>
                        <Text style={styles.subScriber}>{subString} Subscribers</Text>
                    </View>
                    <View style={styles.subscribeButton}>
                    <TouchableOpacity>
                        <Text style={{color:"red", opacity:0.7, fontSize:16, fontWeight:"bold"}}>SUBSCRIBE</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                {/* Comments */}
                <TouchableOpacity onPress={openComments} style={{padding: 10, borderBottomColor:"#404040", borderBottomWidth:5,}}>
                    <View style={styles.comTag}>
                        <Text style={{fontSize:16, color:"white",}}>Comments</Text>
                        <Text style={{fontSize:16, color:"grey",marginHorizontal:15, flex:1,}}>303</Text>
                        <View style={styles.videoCommentDropMenu}>
                            <AntDesign name="down" size={12} color="white" />
                        </View>
                    </View>                
                </TouchableOpacity>
                {/* All Comments */}
                
            {/* Recommended Videos */}
            <View>
            <FlatList 
            scrollEnabled={false}
            data={videos}
            renderItem={({item}) => <VideoListItem video={item}/>}
            />

        </View>
        </ScrollView>
        <BottomSheet 
        ref={commentsSheetRef} 
        snapPoints={[0,'64%']} 
        index={0} 
        backgroundComponent={({ style }) => (
            <View style={[style, { backgroundColor: "#4d4d4d", borderTopStartRadius:5,borderTopEndRadius:5 }]} />
          )}>
         <VideoComments comments={comments} videoID={video.id}/>
   
        </BottomSheet>
        </SafeAreaView>
    )
}

export default VideoScreen


