import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 'auto',
        gap: 15
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
        height: 'auto'
    },
    userPost:{
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
        top: 10,
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    audioWaveformContainer: {
        width: '100%',
        height: 40,
        left: 70,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
        justifyContent: 'center'
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
        flex:1,
        left: 12,
        backgroundColor: '#fff'
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 5,
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
        bottom: 5
    },
    optionsDropdown: {
        position: 'absolute',
        width: 150, 
        top: 30, 
        right: 0, 
        backgroundColor: '#fff', 
        borderRadius: 8, 
        elevation: 4, 
        shadowColor: '#000', 
        shadowOpacity: 0.1, 
        shadowRadius: 4, 
        padding: 8, 
        zIndex: 1,
        gap: 10
    },
    arrowUp: {
        left: 50,
        width: 40,
        height: 7,
        borderRadius: 20,
        backgroundColor: '#00000017',
    },
    editComment: {
        flex: 1,
        paddingLeft: 10,
    },
    comments: {
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 7
    },
    backComment: { 
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
        justifyContent: "center",
        borderRadius: 5,
        backgroundColor: "#eeeeee85",
    },
    select: {
        right: 1,
        width: 10,
        height: 10,
        borderRadius: 2,
        backgroundColor: '#000',
        transform: [{ rotate: '45deg' }],
    },
    text3: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0b0fe0ff',
    },
    text4: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    text5: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ff0000',
    },
    captionContainer1: {
        flex: 1,
        padding: 5,
        alignItems: 'center',
        backgroundColor: '#fff',
        gap: 10
    },
    header1: {
        backgroundColor: '#fff',
        borderRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        bottom: 3,
        width: '99%',
        height: 70,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOpacity: 2,
        elevation: 5,
    },
    usercaptionContainer: {
        alignItems: 'center',
    },
    profile: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    input: {
        width: '99%',
        minHeight: 45,
        maxHeight: "auto",
        borderColor: '#4B0082',
        borderWidth: 1,
        borderRadius: 5
    },
    updatePostButtonContainer: {
        width: '100%',
        backgroundColor: '#4B0082',
        alignItems: 'center',
        height: 40,
        borderRadius: 5,
        justifyContent: 'center'
    },
    updatePostButton: {
        width: '99%',
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    saveText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default styles;
