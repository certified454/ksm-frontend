import { Dimensions, StyleSheet } from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#edededff'
    },
    containers: {
        width: '100%',
        minHeight: screenHeight,
        padding: 0,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    itemsContainer: {
        width: screenWidth * 1,
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15
    },
    inputItem: {
        fontSize: 16,
        backgroundColor: '#fff',
        borderRadius: 5,
        width: '100%',
        minHeight: 40,
        maxHeight: 100,
        paddingLeft: 15
    },
    inputContainerDate: {
        fontSize: 16,
        backgroundColor: '#fff',
        borderRadius: 5,
        width: '45%',
        minHeight: 40,
        maxHeight: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        padding: 15
    },
    inputContainer: {
        width: '90%',
        backgroundColor: 'rgba(76, 0, 130, 0.07)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        borderRadius: 5
    },
    addPoolsInput: {
        fontSize: 16,
        backgroundColor: '#fff',
        borderRadius: 5,
        width: '80%',
        minHeight: 40,
        maxHeight: 80,
        paddingLeft: 15
    },
    indexItems: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#f9f9f9'
    },
    text: {
        width: "80%",
        fontFamily: 'sarif',
        fontSize: 16,
        fontWeight: 'bold'
    },
    predictText: {
        fontSize: 17,
        color: '#008000',
        width: '90%',
        fontWeight: 'bold'
    },
    time: {
        width: '40%',
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(76, 0, 130, 0.07)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    create: {
        width: '20%',
        height: 65,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(76, 0, 130, 0.07)',
    },
    createChallenge: {
        width: '90%',
        height: 45,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4B0082'
    },
    createText: {
        fontSize: 17,
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    header: {
        width: '97%',
        height: 80,
        top: 2,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 2,
        elevation: 5,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    userHeader: {
        width: '97%',
        height: 80,
        top: 2,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        elevation: 3,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    userInfo: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#cccccc',
        marginRight: 10,
        shadowOpacity: 0.05,
        elevation: 3.5,
    },
    username: {
        fontSize: screenHeight * 0.020,
        fontWeight: 'bold',
        fontFamily: 'serif'
    },
    authorUsername: {
        fontSize: screenHeight * 0.018,
        fontFamily: 'serif',
        fontWeight: 'bold'
    },
    arrowback: {
        marginLeft: screenWidth * 0.05,
    },
    voterUsername: {
        fontSize: screenHeight * 0.020,
        fontWeight: 'bold',
        fontFamily: 'serif'
    },
    challengeItemsContainer: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#fff',
        borderRadius: 5
    },
    usersMainContainer: {
        width: '100%',
        height: '100%',
        gap: 10,
        padding: 7
    },
    backText: {
        fontSize: 18,
        fontWeight: 'bold',
        top: 12,
        color: '#4B0082'
    },
    userPredictContainer: {
        width: '100%',
        height: 'auto',
        backgroundColor: 'rgba(76, 0, 130, 0.07)',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    userPredictInstrutions: {
        fontSize: screenHeight * 0.020,
        color: '#008000',
        marginBottom: screenHeight * 0.01,
        marginLeft: screenWidth * 0.05,
        fontWeight: 'bold'
    },
    userPredictText: {
        fontSize: screenHeight * 0.018,
        color: '#000',
        width: '90%',
        fontWeight: 'semibold'
    },
    adminText: {
        fontSize: screenHeight * 0.020,
        color: '#4B0082',
        fontWeight: 'bold',
        left: 12,
        top: 10
    },
    challengeItem: {
        width: '100%',
        height: 'auto',
        padding: 10,
        top: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    challengeItemQuestion: {
        width: '100%',
        padding: 10,
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    challengeVotes: {
        width: '100%',
        padding: 10,
        top: 70
    },
    currentTime: {
        width: '40%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    currentTimeText: {
        fontSize: screenHeight * 0.017,
        color: '#4B0082',
    },
    live: {
        fontSize: screenHeight * 0.017,
        color: '#4B0082',
        fontWeight: 'bold'
    },
    itemTime: {
        fontSize: screenHeight * 0.017,
        fontWeight: 'bold'
    },
    currentDate: {
        width: '40%',
        padding: 10,
        height: 50,
        bottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
    },
    poolContainer: {
        backgroundColor: 'rgba(76, 0, 130, 0.07)',
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
        alignItems: 'baseline',
    },
    poolBlurContainer: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        width: '100%',
        alignItems: 'baseline',
    },
    pools: {
        width: '100%',
        padding: 10
    },
    poolText: {
        fontSize: screenHeight * 0.018,
        color: '#000',
        fontWeight: '500'
    },
    answerInput: {
        width: '90%',
        padding: 10,
        bottom: screenHeight * 0.040,
        fontSize: screenHeight * 0.016,
        borderWidth: 1,
        borderColor: '#4B0082',
        borderRadius: 5,
        minHeight: 50,
        maxHeight: 100,
        
    },
    challengeItems: {
        width: '100%',
        padding: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    challengeDetailsContainer: {
        width: screenWidth * 1,
        height: screenHeight * 0.40,
        overflow: 'hidden',
        alignItems: 'flex-end'
    },
    challengeDetails: {    
        gap: 3,
        height: 'auto',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 5,
        overflow: 'hidden',
    },
    challengeitems: {
        width: '80%',
        marginTop: screenHeight * 0.025,
        marginLeft:screenWidth * 0.03,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        borderBottomWidth: 1,
        borderBottomColor: '#cccc',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    backgrounImage: {
        width: screenWidth * 1, 
        height: screenHeight * 0.33, 
        objectFit: 'cover', 
        borderRadius: 5, 
    },
    creator: {
        marginLeft: screenWidth * 0.05,
        marginTop: screenHeight * 0.020,
        flexDirection: 'row',
        alignItems: 'center',
    },
    startDate: {
        width: '40%',
        padding: 10,
        marginTop: screenHeight * 0.01,
        flexDirection: 'row',
        alignItems: 'center',
    },
    endDate: {
        width: '40%',
        padding: 10,
        marginTop: screenHeight * 0.01,
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        fontSize: screenHeight * 0.020,
        fontFamily: 'poppins',
        width: '80%',
        marginLeft:screenWidth * 0.05,
        marginTop: screenHeight * 0.025,
    },
    dontMissOutText: {
        fontSize: screenHeight * 0.016,
        fontWeight: 'bold',
        color: '#4B0082',
        top: 10
    },
    checkItOutButton: {
        backgroundColor: '#4B0082',
        borderTopRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '35%',
        right: screenWidth * 0.055, 
        marginBottom: screenHeight * -0.007,
        height: screenHeight * 0.05,
        flexBasis: 'auto',
    },
    checkItOutText: {
        fontSize: screenHeight * 0.018,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 5
    },
    activeChallenge: {
        backgroundColor: 'green',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        left: screenWidth * 0.72,
        width: '25%',
        bottom: 0,
        borderTopStartRadius: 5
    },
    textActive: {
        color: '#fff',
        fontSize: screenHeight * 0.017,
        fontWeight: 'bold'
    },
    voteCount: {
        position: 'absolute',
        fontSize: screenHeight * 0.017,
        color: '#4B0082',
        fontWeight: 'bold',
        bottom: 11
    },
    icon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        left: 290,
        top: 38,
        position: 'absolute',
        borderRadius: 10
    },
    endedChallenge:  {
        backgroundColor: '#ff5050ff',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        left: screenWidth * 0.72,
        width: '25%',
        bottom: 0,
        borderTopStartRadius: 5
    },
    upcomingChallenge: {
        backgroundColor: 'rgba(76, 0, 130, 0.56)',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        left: screenWidth * 0.66,
        width: '28%',
        bottom: 0,
        borderTopStartRadius: 5
    },
    voteButtonContainer: {
        width: '70%',
        height: 45,
        left: 55,
        bottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#4B0082'
    },
    voteButtonText: {
        fontSize: screenHeight * 0.018,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    voteButton: {
        width: '100%',
        height: '80%',
        borderRadius: 5,
        backgroundColor: '#4B0082',
        justifyContent: 'center',
        alignItems: 'center',
    },
    answerPerUser: {
        width: '89%',
        height: screenHeight * 0.10,
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 20,
        left: 20,
        backgroundColor: '#ff4646ff'
    },
    answerPerUserText: {
        fontSize: screenHeight * 0.017,
        width: '90%',
        color: '#ffffff',
        fontWeight: 'bold'
    },
    voteContainer: {
        width: '100%',
        height: 'auto',
        padding: 10,
    },
    votes: {
        width: '100%',
        minHeight: 'auto',
        maxHeight: 100,
        paddingTop: 10,
        bottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userItems: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        borderRadius: 5,
        marginBottom: 6,
        width: '100%'
    },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5
    },
    itemProfilePicture: {
        width: screenWidth * 0.13,
        height: screenWidth * 0.13,
        borderRadius: screenHeight * 0.13,
        marginRight: screenWidth * 0.03,
        borderColor: '#cccccc',
        borderWidth: 1,
        shadowOpacity: 0.05,
        elevation: 2.5,
    },
    createdAT: {
        fontSize: 12,
        color: '#555',
    },
    voteTextContainer: {
        width: '90%',
        backgroundColor: '#f0f0f0',
        height: 'auto',
        left: 30,
        bottom: 10,
        borderRadius: 5
    },
    voteText: {
        fontSize: 14,
        color: '#000',
        padding: 10
    }
});

export default styles;