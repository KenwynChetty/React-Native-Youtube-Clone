import React,{useRef} from 'react'
import { StyleSheet, Text, View,SafeAreaView, StatusBar } from 'react-native'
import { Video } from 'expo-av'

interface VideoPlayerProps{
    videoURI:string;
    thumbnailURI?: string;
}

const VideoPlayer = (props : VideoPlayerProps) => {
    const {videoURI, thumbnailURI} = props;
    
    
    
    return (
        <SafeAreaView style={{ marginTop:StatusBar.currentHeight}}>
            <Video 
            source={{ uri:videoURI}}
            posterSource={{uri:thumbnailURI}}
            posterStyle={{resizeMode:"cover",}}
            usePoster={false}
            resizeMode="contain"
            useNativeControls
            style={{width:"100%", aspectRatio:16/9,}}
            />
        </SafeAreaView>
    )
}

export default VideoPlayer

const styles = StyleSheet.create({})
