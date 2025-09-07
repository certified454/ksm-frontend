import { StyleSheet } from "react-native";

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
        alignItems: 'center',
    },
    userProfile: {
        width: '100%',
        height: '100%'
    },
    userDetailsContainer: {
        width: '90%',
        height: 250,
        position: 'absolute',
        top: 150,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
    },
    itemProp: {
        flexDirection: 'row',
        padding: 10,
        width: '100%',
        justifyContent: 'space-between',
        objectFit: 'contain'
    },
    itemPropTextUsername: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4B0092'
    },
    itemPropTextGender: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000',
        top: 4
    },
    editAccountButtonContainer: {
        width: '43%',
        height: 35,
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
        fontSize: 18,
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
        fontSize: 18,
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
        fontSize: 16,
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
        alignItems: 'center',
    },
    itemLocationText: {
        color: '#4B0082',
        fontSize: 17,
    },
    itemBio: {
        width: '90%',
        top: 20,
        left: 15
    },
    itemBioText: {
        fontSize: 16
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
        fontSize: 18,
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
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    displayUsername: {
        color: '#ffffff',
        fontSize: 16,
        left: 50,
        bottom: 20
    },
    postImage: {
        width: 360,
        height: 360,
        right: 5,
        objectFit: 'contain',
    },
    updateContainer: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        left: 17,
        gap: 5,
    },
    updateText: {
        fontSize: 18
    },
    updateInputContainer: {
        width: '90%',
        height: 38,
        borderColor: '#4B0082',
        borderBottomWidth: 1.5,
        borderRadius: 5,
        borderWidth: 1,
        paddingLeft: 2
    },
    updateOpacityContainer: {
        width: '90%',
        height: 38,
        backgroundColor: '#4B0082',
        borderRadius: 5,
        bottom: 30,
        paddingLeft: 2,
        justifyContent: 'center',
        alignContent: 'center'
    },
    textInput: {
        minHeight: 50,
        maxHeight: 100,
        bottom: 5,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        left: '40%'
    },
    warinigContainer: {
        width: '90%',
        height: 'auto',
       
        padding: 6,
        backgroundColor: 'rgba(255, 238, 0, 0.26)'
    },
    warning: {
     fontSize: 15,
     color: '#fa0101bb',
     fontWeight: 'bold'  
    },
    notice: {
     color: '#0f0f0fbb',
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
        fontSize: 20,
        color: '#4B0082',
        fontWeight: 'bold',
        left: 10
    },
    userTextGender: {
        fontSize: 16,
        color: '#000',
    },
    userTextLocation: {
        fontSize: 20,
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
        fontSize: 17,
        color: '#000000a6',
    }
})
export default styles;