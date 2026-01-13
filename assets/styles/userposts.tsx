import { Dimensions, StyleSheet } from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
        backgroundColor: '#ffffff'
    },
    containerItems: {
        width: '100%',
        height: 400,
        overflow: 'hidden'
    },
    userProfileContainer: {
        width: '100%',
        height: 200,
        alignItems: 'center'
    },
    userProfile: {
        width: '100%',
        height: '100%'
    },
    modalOverlay: { 
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.4)', 
        justifyContent: 'flex-end' 
    },
    modelDetailsContainer: { 
        backgroundColor: '#fff', 
        borderTopLeftRadius: 12, 
        borderTopRightRadius: 12, 
        maxHeight: '80%' 
    },
    searchCountryContainer: { 
        padding: 12, 
        borderBottomWidth: 1, 
        borderColor: '#eee'
    },
    countryItem: { padding: 12,
        borderBottomWidth: 1, 
        borderColor: '#eee', 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    searchCountry: {
        padding: 10, 
        backgroundColor: '#f5f5f5', 
        borderRadius: 8 
    },
    itemtext: {  
        marginRight: screenWidth * -0.03, 
    },
    userDetailsContainer: {
        width: '90%',
        height: screenHeight * 1,
        position: 'absolute',
        top: 150,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
    },
    closeModal: { 
        padding: 16, 
        alignItems: 'center' 
    },
    itemProp: {
        flexDirection: 'row',
        padding: 10,
        width: '100%',
        justifyContent: 'space-between',
        objectFit: 'contain'
    },
    itemPropTextUsername: {
        fontSize: screenHeight * 0.022,
        fontWeight: 'bold',
        fontFamily: 'serif',
        color: '#4B0092'
    },
    itemPropTextGender: {
        fontSize: screenHeight * 0.018,
        fontWeight: 'bold',
        fontFamily: 'monospace',
        color: '#000000',
        top: 4
    },
    editAccountButtonContainer: {
        width: '38%',
        height: screenHeight * 0.045,
    },
    editAccount: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#4B0082',
        gap: 5
    },
    editProfileText: {
        fontSize: screenHeight * 0.018,
        color: '#ffffff'
    },
    icon: {
        color: '#ffffff'
    },
    followButtonContainer: {
        width: '35%',
        height: 35,
      
    },
    followUser: {
        borderRadius: 5, 
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        position: 'absolute',
        justifyContent: 'center',
    },
    itemCall: {
        width: '96.5%',
        height: 40,
        flexDirection: 'row',
        overflow: 'hidden',
        justifyContent: 'space-between',
        top: 5
    },
    itemInnerContainer: {
        width: '30%',
        height: '88%', 
        justifyContent: 'center',
        alignItems: 'center'
    },
    seprateItem: {
        width: '1%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.18)',
        borderRadius: 10
    },
    itemCallText: {
        fontSize: screenHeight * 0.020,
        fontWeight: 'bold',
        color: '#000000',
    },
    call: {
        width: '100%',
        height: '100%',
        backgroundColor: '#4B0082',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 5,
        
    },
    callText:{
        fontSize:screenHeight * 0.018,
        color: '#ffffff',
        left: 3
    },
    itemLocation: {
        width: '100%',
        height: 30,
        flexDirection: 'row',
        overflow: 'hidden',
        top: 15,
    },
    itemLocationContainer: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'  
    },
    itemLocationText: {
        color: '#4B0082',
        fontSize: screenHeight * 0.020,
    },
    itemBio: {
        width: '90%',
        top: 20,
        left: 15
    },
    itemBioText: {
        fontSize: screenHeight * 0.019,
    },
    itemTitle: {
        width: '100%',
        height: 35,
        bottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5
    },
    itemTitleContainer: {
        width: '33%',
        height: '100%',
        backgroundColor: 'rgba(10, 10, 10, 0.05)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemTitleText: {
        fontSize: screenHeight * 0.018,
        fontFamily: 'sans-serif'
    },
    flatListContainer: {
        flex: 1,
        bottom: 19,
        width: '100%'
    },
    postItems: {
        width: '32.3%',
        margin: 2,
        aspectRatio: 1,
        borderRadius: 5,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    videoIcon: { 
        position: 'absolute',
        top: 0,
        right: 10
    }, 
    displayOption: {
        alignItems: 'flex-end',
        marginTop: screenHeight * -0.06,
    },
    iconDownload: {
        marginRight: screenWidth * 0.05,
    },
    postImage: {
        width: 360,
        height: 360,
        right: 5,
        objectFit: 'contain',
    },
    updateContainer: {
        width: screenWidth * 0.95,
        height: screenHeight * 0.06,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
    },
    updateText: {
        fontSize: screenHeight * 0.017
    },
    updateInputContainer: {
        width: '65%',
        height: screenHeight * 0.05,
        borderColor: '#4B0082',
        borderBottomWidth: 1.5,
        borderRadius: 5,
        borderWidth: 1,
        paddingLeft: 2
    },
    updateOpacityContainer: {
        width: '90%',
        height: screenHeight * 0.05,
        backgroundColor: '#4B0082',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        borderBottomWidth: 0.5,
        borderLeftWidth: 0.5,
        borderBottomColor: '#4B0082',
        borderLeftColor: '#4B0082',
        borderRadius: 5,
        backgroundColor: "#fff",
        padding: 10,
        marginBottom: 0,
        width: '65%',
        minHeight: 10,
        maxHeight: 100,
        fontSize: screenHeight * 0.016,
    },
    createpostContainer: {
        width: '100%',
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: 'green'
    },
    createpost: {
        width: screenWidth * 0.5,
        height: screenHeight * 0.3
    },
    createpostText: {
        fontSize: screenHeight * 0.023,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        marginTop: screenHeight * -0.07
    },
    createpostext: {
        fontSize: screenHeight * 0.017,
        color: '#000000a6',
        marginTop: screenHeight * 0.001,     
    },
    text: {
        fontSize: screenHeight * 0.019,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    warinigContainer: {
        width: '90%',
        height: 'auto',
        padding: 6,
        backgroundColor: 'rgba(255, 238, 0, 0.26)'
    },
    warning: {
     fontSize: screenHeight * 0.018,
     color: '#fa0101bb',
     fontWeight: 'bold'  
    },
    notice: {
     color: '#0f0f0fbb',
        fontSize: screenHeight * 0.016,
    },
    userInfo: {
        width: '100%',
        height: 'auto',
        flex: 1,
        gap: 5
    },
    userProfilePicture: {
        width: '100%',
        height: 300
    },
    userText: {
        fontSize: screenHeight * 0.022,
        color: '#4B0082',
        fontWeight: 'bold',
        marginLeft: screenWidth * 0.02, 
    },
    userTextGender: {
        fontSize: screenHeight * 0.017,
        color: '#000',
    },
    userTextLocation: {
        fontSize: screenHeight * 0.017,
        color: '#000',
    },
    userDetailsInfo: {
        width: '100%',
        height: 40,
        backgroundColor: '#f8f7f7ff',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    userDetailsInfoOther:{
        width: '98%',
        height: 'auto',
        paddingLeft: 10,
        gap: 5
    },
    userTextPlaceHolder: {
        fontSize: screenHeight * 0.017,
        color: '#000000a6',
    },
    
    
})
export default styles;