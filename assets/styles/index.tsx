import { Dimensions, StyleSheet } from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  containerItem: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: 0,
    paddingTop: 0,
  },
  container: {
    paddingInline: 10,
    backgroundColor: "#ffffff"
  },
  header: {
    width: screenWidth - 20,
    height: screenHeight / 14,
    flexDirection: "row",
    alignItems: "center",
    right: screenWidth / 23
 
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
    fontSize: screenWidth / 40 * 1.9,
    color: "#000000",
    fontFamily: "serif",
    left: screenWidth / 30,
    fontWeight: "bold",
  },
  createdAt: {
    fontSize: screenWidth / 40 * 1.5,
    top: 1,
    left: 12,
    color: '#888',
  },
  textcomment: {
    fontSize: screenWidth / 40 * 1.7,
    marginBottom: screenHeight / 120
  },
  postImage: {
    width: screenWidth - 25,
    backgroundColor: "#000",
    height: screenHeight / 2.50,
    borderRadius: 5,
    right: screenWidth / 50,
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
    height: '90%',
    backgroundColor: "#4B0082",
    marginLeft: 5,
    borderRadius: 5,
    overflow: "hidden",
    flex: 1,
    flexDirection: "row",
    top: 4,
  },
  item: {
    width: '100%',
    height: '100%',
    gap: 5
  },
  matchDate: {
    width: "100%",
    height: 30,
    top: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingInline: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15
  },
  matchTime: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 9,
    top: 3.5,
    left: 25,
    height: 20,
    backgroundColor: '#fff',
    borderTopEndRadius: 15,
    borderTopStartRadius: 15
  },
  teams: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingInline: 8,
    top: 0,
    
  },
  team: {
    flexDirection: "column",
    alignItems: "center",
    gap: 3
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  teamName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
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
    color: "#fff",
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'serif'
  },
  locationText: {
    color: '#9b9b9bff',
    fontStyle: 'italic',
    fontSize: 13
  },
  leagueText:{
    color: "#000",
    fontSize: 16,
    fontWeight: "bold"
  },
  timeText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16
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
    }
})
export default styles;