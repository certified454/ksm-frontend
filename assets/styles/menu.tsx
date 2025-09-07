import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 2, 
        justifyContent: 'flex-start', 
        alignItems: 'center',
        width: 360,
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
        gap: 10
    },
    userContainer: {
        minHeight: 100,
        width: "98%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 2,
        elevation: 5,
    },
    item: {
        width: '100%',
        height: 110,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        gap: 10,
        backgroundColor: '#ffffff',
    },
    onpress: {
        height: 80,
        width: "45%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        elevation: 5,
    },
    itemContainer: {
        height: 80,
        width: "45%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    menuTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        right: 30
    },
    userprofile: {
        width: '50%',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        right: 15
    },
    userInfo: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    profilePicture: {
        width: 60,
        height: 60,
        borderRadius: 60,
        position: 'absolute',
        top:-32,
        left: -30
    },
    username: {
        fontSize: 18,
        fontWeight: '500',
        top: 30
    },
    itemslist: {
        left: 67,
        bottom: 3
    },
    textitem: {
        fontSize: 17,
        left: 40,
        color: '#4B0082'
    },
    text: {
        fontSize: 18
    },
    logout: {
        height: 50,
        width: "98%",
        backgroundColor: '#4B0082',
        borderRadius: 5,
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userprofileImage: {
        width: "100%",
        height: 350,
        alignItems: 'center',
        overflow: 'hidden',
    },
    mainItemContainer: {
        height: 200,
        width: '100%', 
        overflow: 'hidden',
    },
     profileImage: {
        width: 360,
        height:  360
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