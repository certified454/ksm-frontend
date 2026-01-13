import { Dimensions, StyleSheet } from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:  screenHeight * 0.002,
        backgroundColor: '#e2e2e2',
    },
    childContainer: {
        flex: 1,
        width: '100%',
        height: screenHeight * 0.04,
        backgroundColor: '#ffffff',
    },
    earningsContainer: {
        width: '100%',
        height: screenHeight * 0.06,
        gap: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingInline: screenWidth * 0.03,
        backgroundColor: '#ffffff'
    },
    earningText: {
        fontSize: screenHeight * 0.022,
        color: '#4b0082',
        fontWeight: '500'
    },
    dashboard: {
        width: screenWidth * 0.31,
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    earningBox: {
        width: screenWidth * 0.12,
        height: screenHeight * 0.050,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: screenWidth * 0.006,
        borderColor: '#4c00829f',
        borderRadius: screenHeight * 0.01
    },
    balanceContainer: {
        backgroundColor: "rgba(76, 0, 130, 0.17)",
        width: '100%',
        height: screenHeight * 0.06,
        gap: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingInline: screenWidth * 0.03,
    },
    balanceText: {
        fontSize: screenHeight * 0.020,
        color: '#000',
        fontWeight: 'bold'
    },
    withdraw: {
        width: screenWidth * 0.3,
        height: screenHeight * 0.045,
        backgroundColor: '#4b0082',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: screenWidth * 0.006,
        borderRadius: screenHeight * 0.03
    },
    withdrawText: {
        fontSize: screenHeight * 0.020,
        color: '#fff'
    },
    flatlistItem: {
        flex: 1,
        marginTop: screenHeight * 0.01,
    },
    articleItem: {
        width: '95%',
        height: 'auto',
        backgroundColor: '#fff',
        alignSelf: 'center',
        gap: 10,
        marginBottom: screenHeight * 0.015,
        borderRadius: screenWidth * 0.02,
    },
    summaryBox: {
        width: '100%',
        height: screenHeight * 0.04,
        backgroundColor: '#ffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    summaryText: {
        fontSize: screenHeight * 0.018,
        color: '#4b0082',
        marginLeft: screenWidth * 0.4,
    },
    summaryLabel: {
        width: screenWidth * 0.3,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4b0082',
        borderTopRightRadius: screenWidth * 0.02,
        borderBottomLeftRadius: screenWidth * 0.07,
    },
    summaryLabelText: {
        color: '#fff',
        fontSize: screenHeight * 0.018,
        fontWeight: '500',
        marginLeft: screenWidth * 0.02,
    },
    articleContainer: {
        width: '98%',
        height: 'auto',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: screenWidth * 0.06,
        alignSelf: 'center',
        borderRadius: screenWidth * 0.02,
    },
    summaryFrame: {
        fontSize: screenHeight * 0.018,
        color: '#c5c5c5ff',  
    },
});
export default styles;