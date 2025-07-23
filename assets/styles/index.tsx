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
    borderColor: "#4B0082",
    objectFit: "contain",
    left : 5,
  },
  username: {
    fontSize: 20,
    color: "#000000",
    fontFamily: "serif",
    left: 12
  },
  postImage: {
    width: 340,
    height: 320,
    borderRadius: 5,
    right: 12,
  },
  caption: {
    fontSize: 18,
    color: "#000000",
    fontFamily: "serif",
    top: 3,
    paddingHorizontal: 10,
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
  }
})

export default styles;