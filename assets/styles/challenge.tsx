import { StyleSheet, Dimensions } from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
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
        shadowOpacity: 2,
        elevation: 5,
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
        marginRight: 10
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold'
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
        fontSize: 18,
        color: '#008000',
        marginBottom: 5,
        fontWeight: 'bold'
    },
    userPredictText: {
        fontSize: 16,
        color: '#000',
        width: '90%',
        fontWeight: 'semibold'
    },
    adminText: {
        fontSize: 18,
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
        fontSize: 15,
        color: '#4B0082',
        fontWeight: 'bold'
    },
    itemTime: {
        fontSize: 15,
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
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
    },
    answerInput: {
        width: '90%',
        height: 45,
        padding: 10,
        bottom: 30,
        borderWidth: 1,
        borderColor: '#4B0082',
        borderRadius: 5,
        marginVertical: 5,
    },
    challengeItems: {
        width: '100%',
        padding: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    challengeDetailsContainer: {
        top: 20,
        width: '100%',
        height: 280
    },
    challengeDetails: {
        top: 38,
        position: 'absolute',
        gap: 3,
        height: '79%',
        width: '100%',
        alignItems: 'baseline',
        backgroundColor: '#ffffffe1',
        borderRadius: 5,
        marginVertical: 5,
        overflow: 'hidden'
    },
    challengeitems: {
        width: '80%',
        top: 30,
        left: 30,
        borderTopWidth: 1,
        borderTopColor: '#4c00827e',
        borderBottomWidth: 1,
        borderBottomColor: '#4c00827e',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    backgrounImage: {
        width: 340, 
        height: '90%', 
        objectFit: 'cover', 
        borderRadius: 5, 
    },
    creator: {
        left: 10,
        top: 40,
        flexDirection: 'row',
        alignItems: 'center',
    },
    startDate: {
        width: '40%',
        padding: 10,
        top: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    endDate: {
        width: '40%',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        fontSize: 16,
        fontWeight: 'bold',
        width: '80%',
        left: 12,
        top: 20
    },
    dontMissOutText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#4B0082',
        top: 10
    },
    checkItOutButton: {
        backgroundColor: '#4B0082',
        borderTopRightRadius:5,
        padding: 10,
        alignItems: 'center',
        width: '40%',
        left: 203,
        top: 6
    },
    checkItOutText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 5
    },
    activeChallenge: {
        backgroundColor: 'green',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        left: 270,
        width: '22%',
        top: 20,
        borderTopStartRadius: 5
    },
    textActive: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    voteCount: {
        position: 'absolute',
        fontSize: 16,
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
        left: 270,
        width: '22%',
        top: 20,
        borderTopStartRadius: 5
    },
    upcomingChallenge: {
        backgroundColor: 'rgba(76, 0, 130, 0.56)',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        left: 253,
        width: '22%',
        top: 20,
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
        fontSize: 16,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    voteButton: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
        backgroundColor: '#4B0082',
        justifyContent: 'center',
        alignItems: 'center',
    },
    answerPerUser: {
        width: '89%',
        height: 50,
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
        fontSize: 14,
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
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10
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