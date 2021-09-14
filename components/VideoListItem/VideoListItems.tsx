import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View, Image, Touchable } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import styles from './styles'
import {useNavigation} from '@react-navigation/native'
import { Video } from '../../src/models'

type VideoListItemProps = {
    video: Video;
};

const VideoListItem = (props: VideoListItemProps) => {
    const {video} = props;

    const navigation = useNavigation();

    const minutes = Math.floor(video.duration / 60);
    const seconds = video.duration % 60

    let viewsString = video.views.toString()
    if (video.views > 1000000){
        viewsString = (video.views / 1000000).toFixed(1) + 'M'
    } else if (video.views > 1000) {
        viewsString = (video.views / 1000).toFixed(1) + "K"
    }

    const openVideoPage = () => {
        navigation.navigate("VideoScreen",{id: video.id});
    }

    return (
            <TouchableOpacity onPress={openVideoPage}>
            { /* Thumbnail component */}
                <View>
                    <Image style={styles.thumbnail} source={{uri: video.thumbnail }}/>
                    <View style={styles.timeContainer}>
                        <Text style={styles.time}>{minutes}:{seconds <10 ? '0' : ''}{seconds}</Text>
                    </View>
                </View>
                { /* Title Row */}
                <View style={styles.titleRow}>
                { /* Avatar */}
                    <Image style={styles.avatar} source={{uri: video.User?.image }}/>
                { /* Middle Container: Title, Subtitle ect. */}
                    <View style={styles.middleContainer} >
                           <Text style={styles.title}>{video.title}</Text> 
                           <Text style={styles.subtitle}>{video.User?.name || 'Unknown User'} - {viewsString} Views - {video.createdAt}</Text> 
                    </View>
                { /* More Icon */}
                <View style={styles.menu}>
                    <Entypo name="dots-three-vertical" size={18} color="white" />
                </View>
                </View>
            </TouchableOpacity>

    )
}


export default VideoListItem


