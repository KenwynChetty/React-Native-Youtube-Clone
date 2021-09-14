import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    thumbnail:{
        width:'100%',
        height: undefined,
        aspectRatio:16/9,
    },
    timeContainer:{
        backgroundColor:"#00000099",
        height:25,
        width:50,
        justifyContent:"center",
        alignItems: 'center',
        borderRadius:4,
        position: "absolute",
        right: 5,
        bottom: 5,
    },
    time:{
        color:"white",
        fontWeight: "bold",
    },
    titleRow:{ 
        backgroundColor: "#1a1a1a",
        flexDirection:"row",
        padding: 10,
    },
    avatar:{
        width:50,
        height:50,
        borderRadius:25,
        marginTop:5,
    },
    middleContainer:{
       marginHorizontal:10, 
       flex: 1,
       justifyContent:"center",
    },
    title:{
        color:"white",
        fontWeight: "bold", 
        
    },
    subtitle:{
        color:"grey",
        fontWeight: "200",
        fontSize:12,

    },
    menu:{
        marginRight:-5,
        marginTop:5,
    }
});

export default styles;