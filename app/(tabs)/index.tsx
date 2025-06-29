import styles from "@/assets/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Index() {
  const [search, setSearch] = useState("");

  const router = useRouter();

  return (
    <View style={{flex: 1, backgroundColor: "#eeeeee"}}>
      <View style={[styles.card, {position: "absolute", top: 0, zIndex:1, paddingVertical:10}]}>
          <View style={styles.searchcontaiiner}>
            <Ionicons name="person" size={27} color="#000" style={{left: 5, backdropFilter: "blur(10px)", backgroundColor: "#dddddd", borderRadius: 50, padding: 10 }}/>

            <Ionicons 
              name="notifications"
              size={27}
              color="#000"
              style={{left: 17, backdropFilter: "blur(10px)", backgroundColor: "#dddddd", borderRadius: 50, padding: 10}}
            />

            <TextInput style={styles.searchContainer}
            placeholder="Search"
            placeholderTextColor="#4B0082"
            value={search}
            onChangeText={setSearch}
          />
          <Ionicons
            name="search"
            size={27}
            color="#4B0082"
            style={{ backdropFilter: "blur(10px)", borderRadius: 50, padding: 10, position: "absolute", right: 12 }}
          />
          </View>

          <Text style={styles.generaltext}>Hot Match</Text>

          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ justifyContent: "center", position: "static", width: "auto", paddingTop: 10, alignItems: "center" }}
            >
            <View style={styles.match}>
              <Image
              source={{ uri: "https://th.bing.com/th/id/OIF.7XZOcxC98s3wGrpqtsdiGw?cb=iwc2&rs=1&pid=ImgDetMain" }}
              style={styles.imagecard} 
              />
              <View style={styles.matchlogo}>
                <Image
                  source={{ uri: "https://th.bing.com/th/id/OIP.Yhx1VBJ4TC52WU9Mk8zrUQHaEK?cb=iwc2&rs=1&pid=ImgDetMain"}} 
                  style={styles.teamlogo}
                />
              </View>
              
              <View style={[styles.matchlogo, {left: 210}]}>
                <Image
                  source={{ uri: "https://th.bing.com/th/id/OIP.k4TxdjJE9m1j7E9cOvOCJgHaFj?cb=iwc2&rs=1&pid=ImgDetMain"}} 
                  style={[styles.teamlogo, {width: 100, height: 100}]}
                />
              </View>
              <View style={styles.textcontainer}>
                <Text style={[styles.league, {left: "40%", top: 5}]}>Football</Text>
                <Text style={[styles.league, {color: "#dddddd",right: 10, fontSize: 13, top:12}]}>Spain-Laliga</Text>
              </View>
              <Text style={[styles.text, {top: 70, left:"50%", fontSize: 16, fontFamily: "san"}]}>Today</Text>
              <Text style={[styles.text, {top: 63, left:"65%", fontWeight: 700, fontSize: 28, fontFamily: "san"}]}>|</Text>
              <Text style={[styles.text, {top: 70, left:"70%", fontSize: 16, fontFamily: "san"}]}>20:00</Text>
              <Ionicons name="flash"
              size={23}
              color="#ffde21"
              style={{top:3, left: 3, backdropFilter: "blur(10px)", position: "absolute" }}/>

            </View>

            <View style={styles.match}>
              <Image
              source={{ uri: "https://th.bing.com/th/id/OIF.7XZOcxC98s3wGrpqtsdiGw?cb=iwc2&rs=1&pid=ImgDetMain" }}
              style={styles.imagecard} 
              />
              <View style={styles.matchlogo}>
                <Image
                  source={{ uri: "https://th.bing.com/th/id/OIP.Yhx1VBJ4TC52WU9Mk8zrUQHaEK?cb=iwc2&rs=1&pid=ImgDetMain"}} 
                  style={styles.teamlogo}
                />
              </View>
              
              <View style={[styles.matchlogo, {left: 210}]}>
                <Image
                  source={{ uri: "https://th.bing.com/th/id/OIP.k4TxdjJE9m1j7E9cOvOCJgHaFj?cb=iwc2&rs=1&pid=ImgDetMain"}} 
                  style={[styles.teamlogo, {width: 100, height: 100}]}
                />
              </View>
              <View style={styles.textcontainer}>
                <Text style={[styles.league, {left: "40%", top: 5}]}>Football</Text>
                <Text style={[styles.league, {color: "#dddddd",right: 10, fontSize: 13, top:12}]}>Spain-Laliga</Text>
              </View>
              <Text style={[styles.text, {top: 70, left:"50%", fontSize: 16, fontFamily: "san"}]}>Today</Text>
              <Text style={[styles.text, {top: 63, left:"65%", fontWeight: 700, fontSize: 28, fontFamily: "san"}]}>|</Text>
              <Text style={[styles.text, {top: 70, left:"70%", fontSize: 16, fontFamily: "san"}]}>20:00</Text>
              <Ionicons name="flash"
              size={23}
              color="#dddddd"
              style={{top:3, left: 3, backdropFilter: "blur(10px)", position: "absolute" }}/>
            </View>

            <View style={styles.match}>
              <Image
              source={{ uri: "https://th.bing.com/th/id/OIF.7XZOcxC98s3wGrpqtsdiGw?cb=iwc2&rs=1&pid=ImgDetMain" }}
              style={styles.imagecard} 
              />
              <View style={styles.matchlogo}>
                <Image
                  source={{ uri: "https://th.bing.com/th/id/OIP.Yhx1VBJ4TC52WU9Mk8zrUQHaEK?cb=iwc2&rs=1&pid=ImgDetMain"}} 
                  style={styles.teamlogo}
                />
              </View>
              
              <View style={[styles.matchlogo, {left: 210}]}>
                <Image
                  source={{ uri: "https://th.bing.com/th/id/OIP.k4TxdjJE9m1j7E9cOvOCJgHaFj?cb=iwc2&rs=1&pid=ImgDetMain"}} 
                  style={[styles.teamlogo, {width: 100, height: 100}]}
                />
              </View>
              <View style={styles.textcontainer}>
                <Text style={[styles.league, {left: "40%", top: 5}]}>Football</Text>
                <Text style={[styles.league, {color: "#dddddd",right: 10, fontSize: 13, top:12}]}>Spain-Laliga</Text>
              </View>
              <Text style={[styles.text, {top: 70, left:"50%", fontSize: 16, fontFamily: "san"}]}>Today</Text>
              <Text style={[styles.text, {top: 63, left:"65%", fontWeight: 700, fontSize: 28, fontFamily: "san"}]}>|</Text>
              <Text style={[styles.text, {top: 70, left:"70%", fontSize: 16, fontFamily: "san"}]}>20:00</Text>
              <Ionicons name="flash"
              size={23}
              color="#ffde21"
              style={{top:3, left: 3, backdropFilter: "blur(10px)", position: "absolute" }}/>
            </View>

            <View style={styles.match}>
              <Image
              source={{ uri: "https://th.bing.com/th/id/OIF.7XZOcxC98s3wGrpqtsdiGw?cb=iwc2&rs=1&pid=ImgDetMain" }}
              style={styles.imagecard} 
              />
              <View style={styles.matchlogo}>
                <Image
                  source={{ uri: "https://th.bing.com/th/id/OIP.Yhx1VBJ4TC52WU9Mk8zrUQHaEK?cb=iwc2&rs=1&pid=ImgDetMain"}} 
                  style={styles.teamlogo}
                />
              </View>
              
              <View style={[styles.matchlogo, {left: 210}]}>
                <Image
                  source={{ uri: "https://th.bing.com/th/id/OIP.k4TxdjJE9m1j7E9cOvOCJgHaFj?cb=iwc2&rs=1&pid=ImgDetMain"}} 
                  style={[styles.teamlogo, {width: 100, height: 100}]}
                />
              </View>
              <View style={styles.textcontainer}>
                <Text style={[styles.league, {left: "40%", top: 5}]}>Football</Text>
                <Text style={[styles.league, {color: "#dddddd",right: 10, fontSize: 13, top:12}]}>Spain-Laliga</Text>
              </View>
              <Text style={[styles.text, {top: 70, left:"50%", fontSize: 16, fontFamily: "san"}]}>Today</Text>
              <Text style={[styles.text, {top: 63, left:"65%", fontWeight: 700, fontSize: 28, fontFamily: "san"}]}>|</Text>
              <Text style={[styles.text, {top: 70, left:"70%", fontSize: 16, fontFamily: "san"}]}>20:00</Text>
              <Ionicons name="flash"
              size={23}
              color="#ffde21"
              style={{top:3, left: 3, backdropFilter: "blur(10px)", position: "absolute" }}/>
            </View>
            
            <View style={styles.match}>
              <Image
              source={{ uri: "https://th.bing.com/th/id/OIF.7XZOcxC98s3wGrpqtsdiGw?cb=iwc2&rs=1&pid=ImgDetMain" }}
              style={styles.imagecard} 
              />
              <View style={styles.matchlogo}>
                <Image
                  source={{ uri: "https://th.bing.com/th/id/OIP.Yhx1VBJ4TC52WU9Mk8zrUQHaEK?cb=iwc2&rs=1&pid=ImgDetMain"}} 
                  style={styles.teamlogo}
                />
              </View>
              
              <View style={[styles.matchlogo, {left: 210}]}>
                <Image
                  source={{ uri: "https://th.bing.com/th/id/OIP.k4TxdjJE9m1j7E9cOvOCJgHaFj?cb=iwc2&rs=1&pid=ImgDetMain"}} 
                  style={[styles.teamlogo, {width: 100, height: 100}]}
                />
              </View>
              <View style={styles.textcontainer}>
                <Text style={[styles.league, {left: "40%", top: 5}]}>Football</Text>
                <Text style={[styles.league, {color: "#dddddd",right: 10, fontSize: 13, top:12}]}>Spain-Laliga</Text>
              </View>
              <Text style={[styles.text, {top: 70, left:"50%", fontSize: 16, fontFamily: "san"}]}>Today</Text>
              <Text style={[styles.text, {top: 63, left:"65%", fontWeight: 700, fontSize: 28, fontFamily: "san"}]}>|</Text>
              <Text style={[styles.text, {top: 70, left:"70%", fontSize: 16, fontFamily: "san"}]}>20:00</Text>
              <Ionicons name="flash"
              size={23}
              color="#ffde21"
              style={{top:3, left: 3, backdropFilter: "blur(10px)", position: "absolute" }}/>
            </View>
          </ScrollView>
      </View>
      <View style={{width: "100%", height: 3, backgroundColor: "#cccccc", top: 295}}></View>
      <ScrollView style={{ flex: 1, marginTop: 290}} contentContainerStyle={{ justifyContent: "center" }}>
        

        <View style={{width: "auto", height: "auto"}}>

        <View style={styles.postcard}>

        </View>
        <View style={styles.postcard}>

        </View>
        <View style={styles.postcard}>

        </View>
        </View>


      </ScrollView>
    </View>
  )

}