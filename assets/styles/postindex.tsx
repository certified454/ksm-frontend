import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    spaceBetween: {
        top: 10
    },
    text: {
        color: '#4B0082',
        fontWeight: 'bold',
        justifyContent: 'flex-start'
    },
    userdetail:{
        flex: 1,
        height: 'auto',
        objectFit: 'contain'
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        top: 10,
        height: 'auto',
        flex: 1,
    },
    userPost:{
        top: 25,
        width: 'auto',
        minHeight: 60,
        maxHeight: 'auto'
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 5
    },
    caption: {
        fontSize: 17,
        padding: 5,
    },
    userInfoText: {
        flex: 1,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        bottom: 2,
        left: 7
    },
    createdAt: {
        fontSize: 15,
        bottom: 2,
        left: 6,
        color: '#888',
    },
    postImage: {
        width: 360,
        height: 360,
        right: 5,
        objectFit: 'contain',
        top: 18
    },
    recordedAudioContainer: {
        width: '100%',
        height: 40,
        flexDirection: 'row'
    },
    audioWaveformContainer: {
        width: '100%',
        height: 40,
        left: 70,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    audioWaveform: {
        width: '100%',
        height: 40,
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    commentSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        top: 5
    },
    textInputContainer: {
        width: '70%',
        height: 'auto',
        right: 20
    },
    comment: {
        fontSize: 16,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth:0.5,
        borderColor: '#4B0082',
        width: '80%',
        left: 40,
        position: 'relative',
        paddingLeft: 15
    },
    like:{
        top: 1,
        left: 5,
        color: '#4B0082'
    },
    recordSection: {
        right: 15,
    },
    recordButton: {
      color: '#4B0082',
      right:7  
    },
    sendButton: {
      top: 3,
      right: 7
    },
    commentContainer: {
        top:5,
        flex:1,
        left: 12,
    },
    itemContainer: {
        borderRadius: 5,
        width: '80%',
        left: 45,
        bottom: 35
    },
    audio: {
        paddingLeft: 2,
        borderRadius:5,
        backgroundColor: '#f8f8f8',
    },
    commentAt: {
        bottom: 45,
        left: 240
    },
    textCommented: {
        fontFamily: 'sarif',
        fontSize: 17,
        bottom: 35,
        left: 50,
        width: "80%",
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
        minHeight: 40,
        minWidth: 20,
        padding: 5
    },
    commenttext: {
        fontSize: 18,
        left: 2
    },
    diplayIsModelVisible: {
        width: "95%",
        flex:1,
        top: 10,
        left: 10
    },
    readmore: {
        fontSize: 18
    },
    displayOption: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        paddingHorizontal:20
    },
    displayUsername: {
        color: '#ffffff',
        fontSize: 16,
        left: 50,
        bottom: 20
    },
    
});

export default styles;
