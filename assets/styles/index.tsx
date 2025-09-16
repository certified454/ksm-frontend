import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerItem: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: 0,
    paddingTop: 0,
  },
  container: {
    paddingInline: 10,
    width: "100%",
  },
  header: {
    width: 340,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    right: 12,
 
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#cccccc",
    objectFit: "contain",
    left : 5,
  },
  username: {
    fontSize: 20,
    color: "#000000",
    fontFamily: "serif",
    left: 12,
    fontWeight: "bold",
  },
  postImage: {
    width: 340,
    height: 320,
    borderRadius: 5,
    right: 12,
  },
  searchcontaiiner: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    position: 'absolute',
    top: 5
  },
  searchContainer: {
    width: "15%",
    height:'100%',
    position: 'absolute',
    right: 2
  },
  card:{   
    width: "auto",
    height: 230,
    borderRadius: 10,
    alignItems: 'center',
  },
  postcard: {
    width: "90%",
    height: 400,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    top: 5,
    marginTop: 10
  },
  match: {
    width: 250,
    height: '100%',
    backgroundColor: "#4B0082",
    marginLeft: 5,
    borderRadius: 5,
    marginInline: 3,
    overflow: "hidden",
    flex: 1,
    flexDirection: "row",
    top: 4,
  },
 
  textcontainer: {
    width: "100%",
    height: 30,
    position: "absolute",
    flex: 1,
    flexDirection: "row"
  },
  league: {
    position: "absolute",
    fontSize: 20,
    fontWeight: 600,
    color: "#fff"
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "serif",
    position: "absolute",
    top: 10,
    left: "55%",
    transform: [{ translateX: -50 }],
    objectFit: "cover"
  },
  generaltext: {
    color: "#4B0082",
    fontSize: 23,
    fontFamily: "serif",
    fontWeight: "bold",
    right: 100,
    top: 60
  },
  matchlogo:{
    width: 45,
    maxHeight: 45,
    position: "absolute",
    top: 50,
    left: 27,
    borderRadius: "100%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  teamlogo: {
    width: 80,
    height: 80,
    objectFit: "contain",
    borderRadius: "100%"
  },
  sepration: {
    width: "100%",
    height: 8,
    position: "absolute",
    backgroundColor: "#cccccc",
    top: 220,
  },
  tagContainer: {
    width: 340, 
    height: "auto",
    top: 0, 
    padding: 10, 
    backgroundColor: "#ffffff"
  },
  captionContainer: { 
    flex: 1, 
    marginRight: 10, 
    width: 300,
  },
  tag: { 
    color: "#4B0082", 
    fontWeight: "bold" 
  },
  mention: {
    color: "#4B0082", 
    fontWeight: "bold"
  },
  seprationLine: {
    width: 340, 
    height: 7,
    bottom: 15, 
    right: 12, 
    backgroundColor: "#eeeeeeff"
  },
  commentSection: {
    width: 340,
    height: 60,
    right:12,
    bottom: 10,
    objectFit: 'contain',
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  }, 
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 10,
    height: 'auto',
    flex: 1,
  },
  createdAt: {
    fontSize: 15,
    top: 1,
    left: 12,
    color: '#888',
  },
  userInfoText: {
    flex: 1,
  },
  caption: {
    fontSize: 18,
    flexWrap: "wrap",
    flexShrink: 1
  },
  commentIcons:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "40%",
    left: 13,
  },
  likesSection: {
    backgroundColor: '#eeeeeeff',
    width: '60%',
    height: 40,
    borderRadius: 30,
  },
  likesCounts:{
    fontFamily: "sans-serif",
    flexDirection: "row",
    top: 7.5,
    left: 7
  },
  notification: {
    left: 17,
    backgroundColor: "#eeeeee85",
    borderRadius: 50,
    padding: 10,
  },
  searchBar: {
    flex: 1,
    height: '100%'
  },
  textInput: {
    width: '60%',
    height: '100%',
    backgroundColor: '#eeeeee85',
    borderRadius: 30,
    paddingLeft: 15,
    minHeight: 10,
    maxHeight: 50,
    fontSize: 18,
    left: 40
  },
  search: {
    backdropFilter: "blur(10px)",
    top: 7,
    position: "absolute"
  },
    text1: {
        fontWeight: 'bold',
        fontSize: 18,
        left: 10
    },
    text2: {
        fontSize: 16,
    },
    userContainer: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1
    },
    containerHobbies: {
        width: '50%',
        height: '100%',
        top: "39%",
        alignItems: 'center',
    },
    containerClick: {
        width: '35%',
        height: "100%",
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 100
    },
    cancel: {
        position: 'relative',
        right: 55,
    },
    searchTextInput: {
        width: '90%',
        height: '100%',
        backgroundColor: '#eeeeee85',
        borderRadius: 20,
        paddingLeft: 15,
        minHeight: 10,
        maxHeight: 50,
        fontSize: 18
    },
    share: {
      right: 16,
      bottom: 4
    }
})
export default styles;