import { Dimensions, StyleSheet } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

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
        height: 'auto',
        marginTop: screenHeight * 0.03,
    
    },
    userPost:{
        width: 'auto',
        minHeight: screenHeight * 0.1,
        maxHeight: 'auto'
    },
    userImage: {
        width: screenWidth * 0.14,
        height: screenWidth * 0.14,
        borderRadius: (screenWidth * 0.14) / 2,
        marginRight: 5
    },
    commetImage: {
        width: screenWidth * 0.110,
        height: screenWidth * 0.110,
        borderRadius: (screenWidth * 0.110) / 2,
        marginRight: screenWidth * 0.02
    },
    caption: {
        fontSize: screenHeight * 0.017,
        padding: 5,
    },
    userInfoText: {
        flex: 1,
    },
    username: {
        fontSize: screenHeight * 0.022,
        fontWeight: 'bold',
        fontFamily: 'serif',
        left: screenWidth * 0.02
    },
    commentUsername: {
        fontSize: screenHeight * 0.020,
        fontWeight: 'bold',
        fontFamily: 'serif',
    },
    iconDownload: {
        marginLeft: screenWidth * 0.86,
        position: 'absolute',
        marginTop: screenHeight * -0.06,
    },
    createdat: {
        fontSize: screenHeight * 0.016,
        left: screenWidth * 0.03,
        color: '#000',
    },
    createdAt: {
        fontSize: screenHeight * 0.016,
        left: screenWidth * 0.33,
        color: '#000',
    },
    postImage: {
        width: screenWidth * 0.99,
        height: screenHeight * 0.5,
        right: screenWidth * 0.005,
        objectFit: 'contain',
        top: 18
    },
    audioDuration: {
        color: '#4B0082',
        fontSize: screenHeight * 0.017,
        marginTop: screenHeight * 0.007
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
        fontSize: screenHeight * 0.017,
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
        margin: screenHeight * 0.02 ,
        
    },
    main: {
        gap: screenHeight * 0.02
    },
    eachComment: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        gap: screenWidth * 0.003,
    },
    createpostContainer: {
        width: '100%',
        height: screenHeight * 0.2,
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    createpost: {
        marginTop: screenHeight * 0.04,
        width: '30%',
        height: '50%',
        borderRadius: 100
    },
    createpostText: {
        fontSize: screenHeight * 0.023,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center'
    },
    createpostext: {
        fontSize: screenHeight * 0.017,
        color: '#000000a6',
        marginTop: screenHeight * 0.001,     
    },
    itemContainer: {
        borderRadius: 5,
        width: '13%',
        marginTop: screenHeight * -0.01,
    },
    audio: {
        paddingLeft: 2,
        borderRadius:5,
        backgroundColor: '#f8f8f8',
    },
    textCommented: {
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
        flexDirection: 'row',
        fontSize: screenHeight * 0.015,
        justifyContent: 'space-between',
        marginTop: screenHeight * -0.015,
        minHeight: screenHeight * 0.05,
        minWidth: screenWidth * 0.6,
        padding: screenWidth * 0.01,
        width: "100%",
    },
    commenttext: {
        fontSize: screenHeight * 0.017,
       
    },
    diplayIsModelVisible: {
        width: "95%",
        flex: 1,
        top: screenHeight * 0.01,
        left: screenWidth * 0.02,
    },
    displayOption: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        paddingHorizontal:20
    },
    displayUsername: {
        color: '#ffffff',
        fontSize: screenHeight * 0.017,
        left: screenWidth * 0.05,
        bottom: screenHeight * 0.005
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

    editComment: {
        flex: 1,
        paddingLeft: screenWidth * 0.03,
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
        right: screenWidth * 0.02,
        width: screenWidth * 0.02,
        height: screenWidth * 0.02,
        borderRadius: 2,
        backgroundColor: '#000',
        transform: [{ rotate: '45deg' }],
    },
    text3: {
        fontSize: screenHeight * 0.017,
        fontWeight: 'bold',
        color: '#0b0fe0ff',
    },
    text4: {
        fontSize: screenHeight * 0.017,
        fontWeight: 'bold'
    },
    text5: {
        fontSize: screenHeight * 0.017,
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
    },
    separator: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#ccc',
        position: 'relative',
        marginTop: screenHeight * -0.5,
        marginBottom: screenHeight * 0.17,
    }
});

export default styles;
