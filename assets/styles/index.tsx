import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
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
    height: 60,
  },
  searchContainer: {
    width: "57%",
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 26,
    paddingLeft: 20,
    left: 50,
    fontSize: 16,
    fontFamily: "sans-serif",
  },
  card:{   
    width: "auto",
    height: 290,
    borderRadius: 10,
    alignItems: 'center',
  },
  postcard: {
    width: "100%",
    height: 400,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    top: 5,
    marginTop: 10
  },
  match: {
    width: 300,
    height: 170,
    backgroundColor: "#4B0082",
    marginLeft: 5,
    borderRadius: 5,
    marginInline: 3,
    overflow: "hidden",
    flex: 1,
    flexDirection: "row",
    top: 4,
  },
  imagecard:{
    width: 300,
    height: 190,
    borderRadius: 5,
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
    top: 12
  },
  matchlogo:{
    width: 65,
    maxHeight: 65,
    position: "absolute",
    top: 50,
    left: 27,
    borderRadius: "100%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  teamlogo: {
    width: 130,
    height: 130,
    objectFit: "contain",
    borderRadius: "100%"
  },
  commentSection: {
    width: 340,
    height: 60,
    right:12,
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
    fontFamily: "serif",
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
    borderRadius: 30
  },
  likesCounts:{
    fontFamily: "sans-serif",
    flexDirection: "row",
    alignItems:'center',
    justifyContent: 'flex-start',
    top: 5,
    left: 5
  },

})

export default styles;