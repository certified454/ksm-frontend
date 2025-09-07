import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 360,
        alignItems: 'center',
        gap: 20
    },
    input: {
        minHeight: 10,
        maxHeight: 100,
    },
    videoContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    video: {
        width: '100%',
        height: 'auto',
        borderRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row'
    },
    videoSize: {
        width: 640,
        height: 620,
        justifyContent: 'center'
    },
    videoIcon: {
        position: 'absolute',
        bottom: 300,
        left: 0.1,
        textShadowColor: '#ecebebff',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    inputContainer: {
        width: '65%',
        borderRadius: 5,
        padding: 10,
        minHeight: 50,
        right: 65,
        backgroundColor: '#fff'
    },
    videocam: {
        left: 18
    },
    upload: {
        position: 'absolute',
        right: 18
    },
    itemContainer: {
        flex: 1
    },
    analysisContainer: {
        flex: 1,
        width: 360,
        height: 120,
        marginTop: 15,
    },
    profilePicture: {
        width: 60,
        height: 60,
        borderRadius: 60,
        left: 10
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    items: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 20
    },
    createdAt: {
        fontSize: 14,
        color: '#666',
        marginTop: 5
    },
    titleContainer:{
        top: 65,
        left: 20
    },
    titleText :  {
        fontSize: 16,
        color: '#333',
        marginBottom: 10
    },
    videoItem: {
        width: 360,
        height: 550,
        overflow: 'hidden',
    },
    videoItemVideo:{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    videoPlayer: {
        width: '100%',
        height: 650
    },
    likeAnalysis: {
        position: 'absolute',
        top: '48%',
        alignItems: 'center',
        justifyContent: 'center',
   
        right: 10
    },
    analysisLikesCount: {
        position: 'absolute',
        fontSize: 19,
        color: '#000',
        fontWeight: 'bold',
        left: 23
    },
    shareAnalysis: {
        position: 'absolute',
        top: '62%',
        right: 10
    },
    saveAnalysis: {
        position: 'absolute',
        top: '75%',
        right: 10
    },
    icons: {
        backgroundColor: '#4c008223',
        padding: 2,
        borderRadius: 50    
    },
    analysisDetailContainer: {
        flex: 1
    },
    analysisDetailItems: {
        width: 300
    }
    
});


export default styles;
