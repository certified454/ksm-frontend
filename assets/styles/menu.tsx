import { Dimensions, StyleSheet } from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 2, 
        alignItems: 'center',
        width: screenWidth -5,
        backgroundColor: '#fff',
    },
    innerContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        marginInline: 10,
        top: 10,
        gap: 5
    },
    userContainer: {
        minHeight: 100,
        width: "98%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        elevation: 3,
        marginLeft: screenWidth / 120,
    },
    item: {
        width: '100%',
        height: 110,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        gap: 13
    },
    onpress: {
        height: screenHeight / 9,
        width: "45%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        elevation: 2,
        overflow: 'hidden'
    },
    itemContainer: {
        height: screenHeight / 10,
        width: "90%",
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    itemslists: {
        width: '98%',
        height: '40%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    menuTitle: {
        fontSize: screenWidth / 40 * 2.3,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 40
    },
    userprofile: {
        width: '50%',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        marginRight: 15
    },
    userInfo: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 10
    },
    profilePictureContainer: {
        width: screenWidth / 6,
        height: screenWidth / 6,
        borderRadius: screenWidth / 6,
        position: 'absolute',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: screenHeight / -65,
        marginLeft: screenWidth / 60,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        elevation: 3.5
    },
    profilePicture: {
        width: screenWidth / 6,
        height: screenWidth / 6,
    },
    username: {
        fontSize: screenHeight * 0.023,
        fontWeight: 'bold',
        fontFamily: 'serif',
        marginTop: screenHeight / 15
    },
    itemslist: {
        alignSelf: 'center',
    },
    text: {
        fontSize: screenWidth / 40 * 1.5,
        width: '100%',
        textAlign: 'center',
        color: '#000',
    },
    logout: {
        height: screenHeight / 15,
        width: "98%",
        backgroundColor: '#4B0082',
        borderRadius: 5,
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: screenWidth / 80 * 2
    },
    logoutContent: {
        maxWidth: '50%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    logoutText: {
        color: '#f9f9f9',
        fontSize: screenWidth / 40 * 1.9,
        fontWeight: '500',
    },
    mainItemContainer: {
        height: 200,
        width: '100%', 
        overflow: 'hidden',
    },
    mainUserContainer:{
        width: '100%',
        position: 'absolute',
        height: 400,
        top: 200,
    },
    editProfile: {
        backgroundColor: '#fff',
        gap: 6, 
        borderRadius: 5,
        width: 120, 
        height:35, 
        flexDirection: 'row',
        justifyContent:'center', 
        alignItems: 'center'
    },
    icon: {
        width: 5,
        height: 35,
        borderRadius: 8,
        justifyContent: 'center',
        backgroundColor: '#e8e8e8',
        paddingLeft: 5,
    },
    iconBack: {
        width: screenWidth * 0.11,
        height: screenHeight * 0.05,
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#4c00829f',
        borderRadius: screenHeight * 0.01
    },
    iconView: {
        width: 'auto',
        height: 'auto',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        paddingLeft: 5,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    updateProfile: {
        flex: 1,
        gap: 10,
        left: 20,
        width: '100%',
    },
    updatedProfileView: {
        width: '90%',
        height: 'auto',
        gap: 2
    },
    UpdateUserProfileText: {
        fontSize: 17,
        left: 2
    },
    TextInput:{
    borderWidth: 1,
    borderColor: '#4B0082',
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginBottom: 0,
    minHeight: 45,
    maxHeight: 100,
    },
    dropDown: {
        borderWidth: 1,
        borderColor: '#4B0082',
        borderRadius: 5,
        width: '100%',
        backgroundColor: "#f9f9f9",
        height: 45
    },
    note: {
        marginVertical: 5,
        padding: 10,
        top: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#bbbbbbff',
        width: '90%',
    },
    updateProfileButton: {
        backgroundColor: '#4B0082',
        borderRadius: 5,
        width: '90%',
        height: 45,
        top: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    updateProfileButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    bio: {
        width: '100%',
        minHeight: 30,
        bottom: 20
    },
    textBio: {
        fontSize: 16,
        color: '#333',
        padding: 10,
    },
    userDetailContainer: {
        width: "95%",
        flex: 1,
        top: 10,
        left: 10
    },
    postItems: {
        flex: 1,
        aspectRatio: 1,
        margin: 3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4B0082',
        borderRadius: 5,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    }
})

export default styles;