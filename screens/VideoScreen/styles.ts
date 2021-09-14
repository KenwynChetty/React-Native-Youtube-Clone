import { StyleSheet } from "react-native";
import { round } from "react-native-reanimated";

const styles = StyleSheet.create({
    videoPlayer:{
        width:'100%',
        aspectRatio: 16/9,
    },
    videoInfoContainer:{ 
        flexDirection:"row",
        padding: 5,
    },
    videoInfoTags:{
        color: "#0094e3",
        fontSize:14,
        marginBottom:-2,
    },
    middleInfoContainer:{
        justifyContent:"center",
        marginHorizontal:3,
        flex:1,

    },
    videoInfoTitle:{
        color:"white",
        fontWeight: "bold", 
        fontSize:17,
        marginVertical:7,
         
    },
    videoInfoSubtitle:{
        color:"grey",
        fontWeight: "200",
        fontSize:12,
 
     },
     videoDropMenu:{
        marginTop:5,
        marginRight:5,
     },
     actionListContainer:{
        marginVertical:5,
     },
     actionListItems:{
        width:70,
        height:50,
        justifyContent: 'space-around',
        alignItems:"center"
     },
     actionText:{
        color:"white",
        fontSize:12,
        marginTop:-5,
     },
     videoUserInfo:{
        flexDirection: "row",
        padding: 10,
        borderTopColor: "#404040",
        borderTopWidth:0.2,
        borderBottomColor: "#404040",
        borderBottomWidth:0.2,
     },
     avatar:{
        width:40,
        height:40,
        borderRadius:20,
        
     },
     userInfo:{
         flexDirection:"column",
         flex: 1,
     },
     username:{
        color:"white",
        fontWeight: "bold", 
        fontSize: 16,
        marginHorizontal:15,
     },
     subScriber:{
        color:"grey",
        fontWeight: "200",
        fontSize:12,
        marginHorizontal:15,
     },
     subscribeButton:{
        padding:10,
     },
     comTag:{
         flexDirection:"row",
     },
     videoCommentDropMenu:{
        marginTop:5,
        marginRight:10,
     },
})

export default styles