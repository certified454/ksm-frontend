import { Dimensions, StyleSheet } from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  containerItem: {
    flex: 1,
    marginTop: 0,
    paddingTop: 0,
    alignItems: 'flex-start',
  },
  itemCard: {
    zIndex: 1, 
    paddingVertical: 0, 
    height: screenHeight / 3.5,
    overflow: 'hidden', 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  profileItems: {
    width: screenWidth / 1,
    height: screenHeight / 9,
    paddingHorizontal: screenHeight / 60,
    paddingTop: screenHeight / 150,
  },
  container: {
    paddingInline: 10,
    backgroundColor: "#ffffff",
    marginTop: screenHeight / 100 * 0.5
  },
  header: {
    width: screenWidth - 20,
    height: screenHeight / 14,
    flexDirection: "row",
    alignItems: "center",
    right: screenWidth / 23
  },
  profileImage: {
    width: screenWidth / 6.8,
    height: screenHeight / 15,
    borderRadius: screenWidth / 3.4,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#cccccc",
    objectFit: "contain",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    elevation: 3.5
  },
  profileImages: {
    width: screenWidth / 6.8,
    height: screenHeight / 15,
  },
  username: {
    fontSize: screenWidth / 40 * 1.9,
    color: "#000000",
    fontFamily: "serif",
    left: screenWidth / 30,
    fontWeight: "bold",
  },
  createdAt: {
    fontSize: screenWidth / 40 * 1.4,
    left: 12,
    color: '#888',
  },
  textcomment: {
    fontSize: screenWidth / 40 * 1.7,
    marginBottom: screenHeight / 200
  },
  imageContainer: {
    width: screenWidth - 26,
    overflow: "hidden",
    height: screenHeight / 2.6,
    borderRadius: 5,
    shadowOpacity: 0.05,
    elevation: 1.5,
    marginTop: screenHeight / 100 * 0.3,
    right: screenHeight / 100,
    marginBottom: screenHeight / 100 * 0.7, 
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  profileButton: {
    marginRight: screenWidth / 1.3,
  },
  searchcontaiiner: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'flex-start',
    width: "80%",
    height: screenHeight / 15,
    gap: 3,
    right: screenWidth / 25,
    position: 'absolute',
    marginTop: screenHeight / 120,

  },
  searchContainer: {
    width: "15%",
    height:'100%',
    marginLeft: screenWidth / 10,
    position: 'absolute',
    right: screenWidth / 7.5,
    marginTop: screenHeight / 30,
  },
  textsearchInput: {
    width: '70%',
    height: '85%',
    backgroundColor: 'transparent',
    marginLeft: screenWidth / 12,
    borderWidth: 1,
    borderColor: '#9b9b9bff',
    borderRadius: 25,
    paddingLeft: 15
  },
  card:{   
    width: "auto",
    height: screenHeight / 3.35,
    borderRadius: 10,
    alignItems: 'center',
  },
  // postcard: {
  //   width: "90%",
  //   height: screenHeight / 2.15,
  //   backgroundColor: "#000",
  //   borderRadius: 10,
  //   top: 5,
  //   marginTop: 10
  // },
  mainContainer: {
    width: screenWidth - 110,
    height: '90%',
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#dddddd",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginLeft: 5,
    borderRadius: 5,
    flex: 1,
    flexDirection: "row",
    marginTop: screenHeight / -13,
  },
  match: {
    width: '100%',
    height: '100%',
  },
  item: {
    width: '100%',
    height: '100%',
    gap: 5,
    overflow: 'hidden'
  },
  matchDate: {
    width: "100%",
    height: screenHeight / 30,
    marginTop: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingInline: 5,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20
  },
  matchTime: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 9,
    marginTop: 2.5,
    marginLeft: 25,
    height: screenHeight / 35,
    backgroundColor: '#f5f5f5',
    borderTopEndRadius: 15,
    borderTopStartRadius: 15
  },
  teams: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingInline: 8,
    marginTop: -2.5 
  },
  team: {    
    flexDirection: "column",
    alignItems: "center",
    gap: 3
  },
  logo: {
    width: screenWidth / 9,
    height: screenHeight / 20,
    borderRadius: 100,
    shadowOpacity: 0.05,
    elevation: 3,
    backgroundColor: '#fff'
  },
  teamName: {
    fontFamily: 'poppins',
    color: "#1b1a1f",
    fontSize: 13,
    textAlign: "center",
    marginTop: 3
  },
  leagueName:{
    borderRadius: 5,
    flexDirection: "row",
    paddingInline: 5,
    alignItems: "center",
    gap: 3
  },
  vsText: {
    color: "#000",
    fontSize: 17,
    marginTop: 20,
    fontWeight: 'bold',
    fontFamily: 'serif'
  },
  locationText: {
    color: '#9b9b9bff',
    fontStyle: 'italic',
    fontSize: 10
  },
  leagueText:{
    color: "#000",
    fontSize: 13,
    fontWeight: '500'
  },
  timeText: {
    color: '#000',
    fontWeight: '500',
    fontSize: 13
  },
  hotmatchContainer: {
    position: 'absolute',
    top: 10,
    left: 120,
    backgroundColor: '#4c008254',
    borderRadius: 100,
    padding: 5,
    zIndex: 1,
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
    fontSize: screenWidth / 40 * 2.1,
    fontFamily: "serif",
    fontWeight: "bold",
    position: "absolute",
    marginLeft: - screenWidth / 1.6,
    marginTop: screenHeight / 100 * -9
  },
  adsbannerChallenge: {
    position: "absolute",
    marginTop: screenHeight / 13,
    marginLeft: screenWidth / 1.5,
    backgroundColor: "#dcdcdc",
    width: screenWidth / 4,
    height: screenHeight / 15,
    borderRadius: 100,
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
    height: screenHeight / 120,
    position: "absolute",
    backgroundColor: "#cccccc",
    marginTop: screenHeight / 3.85
  },
  tagContainer: {
    width: screenWidth / 1.1, 
    height: "auto",
    right: screenWidth / 50, 
    padding: 5, 
  },
  editPost: {
    flex: 1,
    paddingLeft: 10,
  },
  optionsDropdown: { 
    width: screenWidth / 2.5, 
    alignSelf: 'flex-end',
    marginTop: screenHeight / 20,
    position: screenWidth > 400 ? 'relative' : 'absolute',
    marginRight: -3.5, 
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
  optionDropdown: { 
    width: screenWidth / 2.2, 
    alignSelf: 'flex-end',
    marginTop: screenHeight / 20,
    position: screenWidth > 400 ? 'relative' : 'absolute',
    marginRight: -3.5, 
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
  post: { 
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 7
  },
  backPost: { 
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
    fontSize: screenWidth / 40 * 1.7,
    fontWeight: 'bold'
  },
  text5: {
    fontSize: screenWidth / 40 * 1.7,
    fontWeight: 'bold',
    color: '#ff0000',
  },
  text6: {
    fontSize: screenWidth / 40 * 1.7,
    fontWeight: 'bold'
  },
  captionContainer: { 
    flex: 1, 
    marginRight: 10, 
    width: 300,
  },
  tag: { 
    color: "#4B0082", 
    fontWeight: "500" 
  },
  mention: {
    color: "#4B0082", 
    fontWeight: "500"
  },
  seprationLine: {
    width: screenWidth - 20, 
    height: screenHeight / 150,
    bottom: 15, 
    right: screenWidth / 35, 
    backgroundColor: "#eeeeeeff"
  },
  commentSection: {
    width: screenWidth - 20,
    height: screenHeight / 13,
    right: 11,
    bottom: 10,
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
  userInfoText: {
    flex: 1,
  },
  caption: {
    fontSize: screenHeight / 50,
    fontFamily: "poppins",
    width: screenWidth / 1.1,
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
    justifyContent: "center",
  },
  likesCounts:{
    height: screenHeight / 20,
    backgroundColor: '#eeeeeeff',
    borderRadius: 30,
    width: screenWidth / 4,
    fontFamily: "sans-serif",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  notification: {
    marginLeft: screenWidth / 35,
    backgroundColor: "rgba(76, 0, 130, 0.12)",
    borderRadius: 50,
    padding: 8,
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
    matchContainer: {
        width: "100%",
        height: 'auto',
        padding: 10,
        gap: 10,
    },
    textinput: {
        width: '99%',
        minHeight: 40,
        maxHeight: "auto",
        borderColor: '#4B0082',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        fontSize: 16
    },
    animationPress: {
      width: screenWidth / 6,
      height: screenHeight / 13,
      backgroundColor: '#4c008250',
      borderRadius: screenWidth / 10,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: "#000",
      shadowOpacity: 0.1,
      elevation: 6,
    },
    
})
export default styles;