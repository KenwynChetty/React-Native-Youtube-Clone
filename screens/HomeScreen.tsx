import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { LogBox } from 'react-native';

import { DataStore } from "@aws-amplify/datastore";
import {Video} from '../src/models';
import VideoListItem from "../components/VideoListItem";

const HomeScreen = () => {

  const [videos,setVideos] = useState<Video[]>([])

  useEffect(() =>{
    //fetchVideos
    DataStore.query(Video).then(setVideos)
  },[])

  useEffect(() => {
    LogBox.ignoreLogs(['Unhandled promise rejection: Error: No credentials, applicationId or region']);
    LogBox.ignoreLogs(['Possible Unhandled promise rejection: Error: No credentials, applicationId or region']);
    LogBox.ignoreLogs(['Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981 for more info.']);
}, [])

  return (
    <View>
      <FlatList
        data={videos}
        renderItem={({ item }) => <VideoListItem video={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
