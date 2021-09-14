import React, { useState, useEffect } from 'react';
import {StyleSheet,Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import VideoPlayer from '../components/VideoPlayer';

export default function VideoUploadScreen() {
  const [video, setVideo] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing:true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setVideo(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button color="red" title="Upload Video" onPress={pickVideo} />
      <View style={{marginTop:20, borderRadius:5}}>
          {video && <VideoPlayer videoURI={video} />}
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({})